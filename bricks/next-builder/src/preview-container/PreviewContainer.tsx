// istanbul ignore file: working in progress
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import classNames from "classnames";
import type {
  BuilderBrickNode,
  BuilderSnippetNode,
  Storyboard,
} from "@next-core/brick-types";
import type {
  BrickOutline,
  PreviewMessageContainerStartPreview,
  PreviewMessageContainerToggleInspecting,
  PreviewMessageFromContainer,
  PreviewMessageToContainer,
  PreviewSettings,
} from "@next-types/preview";

import styles from "./PreviewContainer.module.css";
import { buildBricks } from "../shared/storyboard/buildStoryboardV2";
import {
  BuilderDataManager,
  BuilderRuntimeEdge,
  BuilderRuntimeNode,
  EventDetailOfNodeAdd,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";

export interface PreviewContainerProps {
  previewUrl: string;
  appId?: string;
  templateId?: string;
  snippetGraphData?: BuilderSnippetNode[];
  routePath?: string;
  routeExact?: boolean;
  previewSettings?: PreviewSettings;
  inspecting?: boolean;
  viewportWidth?: number;
  viewportHeight?: number;
  previewOnNewWindow?: boolean;
  screenshotMaxWidth?: number;
  screenshotMaxHeight?: number;
  onPreviewStart?(): void;
  onUrlChange?(url: string): void;
  onScaleChange?(scale: number): void;
  onRouteMatch?(match: boolean): void;
  onCaptureStatusChange?(status: CaptureStatus): void;
  onScreenshotCapture?(screenshot: string): void;
  onPreviewerDrop?(params: Record<string, any>): void;
  onPreviewerResize?(resize: PreviewerResize): void;
}

export type CaptureStatus = "idle" | "capturing" | "ok" | "failed";
export type Direction = "top" | "right" | "bottom" | "left" | "inside";

export interface PreviewContainerRef {
  refresh(
    appId: string,
    storyboardPatch: Partial<Storyboard>,
    options: Record<string, unknown>
  ): void;
  reload(): void;
  capture(): void;
  resize(): void;
  manager: BuilderDataManager;
}

export interface PreviewerResize {
  x: number;
  y: number;
}

function sendToggleInspecting(
  enabled: boolean,
  iframeRef: React.MutableRefObject<HTMLIFrameElement>,
  previewOrigin: string
): void {
  iframeRef.current.contentWindow.postMessage(
    {
      sender: "preview-container",
      type: "toggle-inspecting",
      enabled,
    } as PreviewMessageContainerToggleInspecting,
    previewOrigin
  );
}

export function LegacyPreviewContainer(
  {
    previewUrl,
    appId,
    templateId,
    snippetGraphData,
    previewSettings,
    routePath,
    routeExact,
    inspecting,
    viewportWidth,
    viewportHeight,
    previewOnNewWindow,
    screenshotMaxWidth,
    screenshotMaxHeight,
    onPreviewStart,
    onUrlChange,
    onScaleChange,
    onRouteMatch,
    onCaptureStatusChange,
    onScreenshotCapture,
    onPreviewerDrop,
    onPreviewerResize,
  }: PreviewContainerProps,
  ref: React.Ref<PreviewContainerRef>
): React.ReactElement {
  const manager = useBuilderDataManager();
  const iframeRef = useRef<HTMLIFrameElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const minScale = Math.min(scaleX, scaleY, 1);
  const [routeMatch, setRouteMatch] = useState(true);
  const [captureStatus, setCaptureStatus] = useState<CaptureStatus>("idle");
  const [hoverIid, setHoverIid] = useState<string>();
  const [hoverAlias, setHoverAlias] = useState<string>();
  const [activeIid, setActiveIid] = useState<string>();
  const [activeAlias, setActiveAlias] = useState<string>();
  const [hoverOutlines, setHoverOutlines] = useState<BrickOutline[]>([]);
  const [activeOutlines, setActiveOutlines] = useState<BrickOutline[]>([]);
  const [dragDirection, setDragDirection] = useState<Direction>();
  const refScroll = useRef(scroll);
  const loadedRef = useRef(false);
  const refHoverIid = useRef<string>();
  const refHoverOutlines = useRef<BrickOutline[]>();
  const refDragDirection = useRef<Direction>();

  const [previewStarted, setPreviewStarted] = useState(false);
  const openerWindow: Window = previewOnNewWindow ? window.opener : window;

  const previewOrigin = useMemo(() => {
    const url = new URL(previewUrl, location.origin);
    return url.origin;
  }, [previewUrl]);

  // The opener should always have the same origin as current page.
  const sameOriginWithOpener = useMemo(() => {
    try {
      // The opener may be null or disallowed to access its origin.
      return openerWindow.origin === location.origin;
    } catch (e) {
      return false;
    }
  }, [openerWindow]);

  const getSnippetData = (snippetGraphData: BuilderSnippetNode[]) => {
    if (Array.isArray(snippetGraphData) && snippetGraphData.length > 0) {
      return {
        snippetId: snippetGraphData[0].snippetId,
        bricks: buildBricks(
          snippetGraphData[0].children as BuilderBrickNode[],
          {}
        ),
      };
    }
  };

  const setDirection = (pos: { x: number; y: number }): void => {
    const { x: clientX, y: clientY } = pos;
    if (refHoverOutlines.current?.length > 0) {
      const currentHoverNode = refHoverOutlines.current[0];
      const { left, top, width, height } = currentHoverNode;
      const { x, y } = refScroll.current;
      const isLeft = clientX - left - x < 10;
      const isRight =
        clientX - (left + (width - x)) > -10 &&
        clientX - (left + (width - x)) < 0;
      const isTop = clientY - (top - y) < 10;
      const isBottom =
        clientY - (top + (height - y)) > -10 &&
        clientY - (top + (height - y)) < 0;
      const direction: Direction = isLeft
        ? "left"
        : isRight
        ? "right"
        : isTop
        ? "top"
        : isBottom
        ? "bottom"
        : "inside";

      setDragDirection(direction);
      refDragDirection.current = direction;
    }
  };

  const handleDragEnd = (): void => {
    refDragDirection.current = null;
    setDragDirection(null);
  };

  const handleOnDrop = useCallback(
    (nodeData): void => {
      const direction = refDragDirection.current;
      const dragStatus =
        direction === "inside"
          ? "inside"
          : ["top", "left"].includes(direction)
          ? "top"
          : ["right", "bottom"].includes(direction)
          ? "bottom"
          : "";
      const { nodes, edges, rootId } = manager.getData();
      const hoverInstanceId = refHoverIid.current;
      if (hoverInstanceId === "#main-mount-point") {
        const parentNodes = nodes.find((item) => item.$$uid === rootId);
        onPreviewerDrop({
          nodeData,
          mountPoint: "bricks",
          dragStatus,
          parentNodes: [parentNodes],
          parentNode: parentNodes,
          dragOverInstanceId: parentNodes.instanceId,
        });
      } else {
        const hoverNode = nodes.find(
          (item) => item.instanceId === hoverInstanceId
        );
        const hoverEdge = edges.find((item) => item.child === hoverNode.$$uid);
        const getAllParentEdges = (
          edge: BuilderRuntimeEdge,
          list: number[] = []
        ): number[] => {
          list.push(edge.parent);
          const nodeEdge = edges.find((item) => item.child === edge.parent);
          if (nodeEdge) {
            list = list.concat(getAllParentEdges(nodeEdge));
          }
          return list;
        };
        const getAllParentNodes = (
          edges: number[]
        ): BuilderRuntimeNode<Record<string, unknown>>[] => {
          return nodes.filter((item) => {
            return edges.includes(item.$$uid);
          });
        };
        const parentList = dragStatus === "inside" ? [hoverEdge.child] : [];
        const parentEdges = getAllParentEdges(hoverEdge, parentList);
        const parentNodes = getAllParentNodes(parentEdges);
        onPreviewerDrop({
          nodeData,
          mountPoint:
            dragStatus === "inside" ? "content" : hoverEdge.mountPoint,
          dragStatus,
          parentNodes,
          parentNode: parentNodes[parentNodes.length - 1],
          dragOverInstanceId: hoverInstanceId,
        });
      }

      handleDragEnd();
    },
    [manager, onPreviewerDrop]
  );

  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    const snippetData = getSnippetData(snippetGraphData);
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "start-preview",
        options: {
          appId,
          templateId,
          snippetData: snippetData && JSON.stringify(snippetData),
          routePath,
          routeExact,
          settings: previewSettings,
        },
      } as PreviewMessageContainerStartPreview,
      previewOrigin
    );
  }, [
    snippetGraphData,
    appId,
    templateId,
    routePath,
    routeExact,
    previewSettings,
    previewOrigin,
  ]);

  useEffect(() => {
    // Active overrides hover.
    if (hoverIid && hoverIid === activeIid) {
      setHoverOutlines([]);
    }
  }, [activeIid, hoverIid]);

  const adjustOutlines = useCallback(
    (outlines: BrickOutline[]): BrickOutline[] => {
      const offsetLeft = iframeRef.current.offsetLeft;
      const offsetTop = iframeRef.current.offsetTop;
      return outlines.map(({ width, height, left, top }) => ({
        width: width * minScale,
        height: height * minScale,
        left: (left - scroll.x) * minScale + offsetLeft,
        top: (top - scroll.y) * minScale + offsetTop,
      }));
    },
    [minScale, scroll.x, scroll.y]
  );

  const [adjustedHoverOutlines, setAdjustedHoverOutlines] = useState<
    BrickOutline[]
  >([]);
  const [adjustedActiveOutlines, setAdjustedActiveOutlines] = useState<
    BrickOutline[]
  >([]);

  useEffect(() => {
    setAdjustedHoverOutlines(adjustOutlines(hoverOutlines));
  }, [hoverOutlines, adjustOutlines]);

  useEffect(() => {
    setAdjustedActiveOutlines(adjustOutlines(activeOutlines));
  }, [activeOutlines, adjustOutlines]);

  const refresh = useCallback(
    (
      appId: string,
      storyboardPatch: Partial<Storyboard>,
      options: { snippetGraphData: BuilderSnippetNode[] }
    ) => {
      const snippetData = getSnippetData(
        options.snippetGraphData || snippetGraphData
      );
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          type: "refresh",
          storyboardPatch,
          settings: previewSettings,
          options: {
            snippetData: snippetData && JSON.stringify(snippetData),
          },
        } as PreviewMessageFromContainer,
        previewOrigin
      );
    },
    [previewOrigin, previewSettings, snippetGraphData]
  );

  const reload = useCallback(() => {
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "reload",
      } as PreviewMessageFromContainer,
      previewOrigin
    );
    setHoverIid(null);
    setHoverAlias(null);
    setHoverOutlines([]);
    setActiveIid(null);
    setActiveAlias(null);
    setActiveOutlines([]);
  }, [previewOrigin]);

  const capture = useCallback(() => {
    setCaptureStatus("capturing");
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "capture",
        maxWidth: screenshotMaxWidth,
        maxHeight: screenshotMaxHeight,
      } as PreviewMessageFromContainer,
      previewOrigin
    );
  }, [previewOrigin, screenshotMaxHeight, screenshotMaxWidth]);

  const handleUrlChange = useCallback(
    (url: string) => {
      onUrlChange?.(url);
    },
    [onUrlChange]
  );

  const resize = (): void => {
    onPreviewerResize({
      x: containerRef.current.offsetWidth,
      y: containerRef.current.offsetHeight,
    });
  };

  useImperativeHandle(ref, () => ({
    refresh,
    reload,
    capture,
    resize,
    manager,
  }));

  useEffect(() => {
    document.addEventListener("dragend", handleDragEnd);
    return () => {
      document.removeEventListener("dragend", handleDragEnd);
    };
  }, []);

  useEffect(() => {
    if (!sameOriginWithOpener) {
      return;
    }
    const listener: (
      event: MessageEvent<PreviewMessageToContainer>
    ) => void = ({ data, origin }) => {
      if (!data) {
        return;
      }
      if (data.sender === "builder" && origin === location.origin) {
        if (data.type === "hover-on-brick" || data.type === "select-brick") {
          // Send to preview.
          iframeRef.current.contentWindow.postMessage(
            {
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer,
            previewOrigin
          );
        } else if (data.type === "hover-on-main") {
          iframeRef.current.contentWindow.postMessage(
            {
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer,
            previewOrigin
          );
        }
      } else if (data.sender === "previewer" && origin === previewOrigin) {
        switch (data.type) {
          case "hover-on-main":
          case "hover-on-brick":
          case "select-brick":
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            if (data.isDirection) {
              setDirection(data.position);
            }
            break;
          case "previewer-drop":
            handleOnDrop(data.nodeData);
            break;
          case "scroll":
            setScroll(data.scroll);
            refScroll.current = data.scroll;
            break;
          case "highlight-brick":
            if (data.highlightType === "active") {
              setActiveIid(data.iid);
              setActiveAlias(data.alias);
              setActiveOutlines(data.outlines);
            } else {
              setHoverIid(data.iid);
              setHoverAlias(data.alias);
              setHoverOutlines(data.outlines);
            }
            refHoverIid.current = data.iid;
            refHoverOutlines.current = data.outlines;
            break;
          case "context-menu-on-brick": {
            const box = iframeRef.current.getBoundingClientRect();
            const maxScale = scaleX > 1 ? 1 : scaleX;
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              position: {
                x: box.left + data.position.x * maxScale,
                y: box.top + data.position.y * maxScale,
              },
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            break;
          }
          case "preview-started":
            // Once the preview is started, send the message again.
            sendToggleInspecting(inspecting, iframeRef, previewOrigin);
            setPreviewStarted(true);
            onPreviewStart();
            break;
          case "url-change":
            handleUrlChange(data.url);
            break;
          case "route-match-change":
            setRouteMatch(data.match);
            onRouteMatch?.(data.match);
            break;
          case "capture-ok":
            setCaptureStatus("ok");
            onScreenshotCapture(data.screenshot);
            break;
          case "capture-failed":
            setCaptureStatus("failed");
            break;
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [
    handleUrlChange,
    onPreviewStart,
    onRouteMatch,
    openerWindow,
    previewOrigin,
    sameOriginWithOpener,
    scaleX,
    inspecting,
    onScreenshotCapture,
    handleOnDrop,
  ]);

  useEffect(() => {
    if (loadedRef.current) {
      // Do not inspect if route doesn't match.
      // E.g., when redirected to login page after preview started.
      sendToggleInspecting(inspecting && routeMatch, iframeRef, previewOrigin);
    }
  }, [previewOrigin, inspecting, routeMatch]);

  const handleMouseOut = useMemo(() => {
    if (!previewStarted) {
      return null;
    }
    return () => {
      // Delay posting message to allow iframe inner hovering message be sent before
      // mouse out from iframe itself.
      setTimeout(() => {
        openerWindow.postMessage({
          sender: "preview-container",
          forwardedFor: "previewer",
          type: "hover-on-brick",
          iidList: [],
        } as PreviewMessageFromContainer);
      }, 100);
    };
  }, [openerWindow, previewStarted]);

  // istanbul ignore next
  useEffect(() => {
    if (containerRef.current) {
      const computeScale = (): void => {
        setScaleX(
          viewportWidth ? containerRef.current.offsetWidth / viewportWidth : 1
        );
        setScaleY(
          viewportHeight
            ? containerRef.current.offsetHeight / viewportHeight
            : 1
        );
        onPreviewerResize({
          x: viewportWidth || containerRef.current.offsetWidth,
          y: viewportHeight || containerRef.current.offsetHeight,
        });
      };
      computeScale();
      const resizeObserver = new ResizeObserver(() => {
        computeScale();
        // Trigger re-computing active/hover node outlines, after the container resized.
        openerWindow.postMessage({
          type: "resize",
          sender: "preview-container",
        } as PreviewMessageFromContainer);
      });
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [viewportWidth, viewportHeight, openerWindow, onPreviewerResize]);

  useEffect(() => {
    onScaleChange?.(minScale);
  }, [minScale, onScaleChange]);

  useEffect(() => {
    if (captureStatus !== "idle") {
      onCaptureStatusChange?.(captureStatus);
    }
  }, [captureStatus, onCaptureStatusChange]);

  return (
    <div
      className={classNames(styles.previewContainer, {
        [styles.inspecting]: inspecting,
      })}
      ref={containerRef}
    >
      <div
        className={styles.iframeContainer}
        style={{
          width: minScale * viewportWidth || "100%",
          height: minScale * viewportHeight || "100%",
        }}
      >
        <iframe
          className={styles.iframe}
          src={previewUrl}
          ref={iframeRef}
          onLoad={handleIframeLoad}
          onMouseOut={handleMouseOut}
          style={{
            width: viewportWidth || `${100 / minScale}%`,
            height: viewportHeight || `${100 / minScale}%`,
            transform: `scale(${minScale})`,
          }}
        />
      </div>
      {adjustedHoverOutlines.map((outline, index) => (
        <BrickOutlineComponent
          key={index}
          alias={hoverAlias}
          iid={hoverIid}
          overIid={hoverIid}
          type="hover"
          dragDirection={dragDirection}
          {...outline}
        />
      ))}
      {adjustedActiveOutlines.map((outline, index) => (
        <BrickOutlineComponent
          key={index}
          alias={activeAlias}
          iid={activeIid}
          overIid={hoverIid}
          type="active"
          dragDirection={dragDirection}
          {...outline}
        />
      ))}
    </div>
  );
}

export const PreviewContainer = forwardRef(LegacyPreviewContainer);

interface BrickOutlineComponentProps extends BrickOutline {
  type: "active" | "hover" | "rootTpl";
  alias: string;
  hidden?: boolean;
  iid?: string;
  overIid?: string;
  dragDirection?: Direction;
}

function BrickOutlineComponent({
  type,
  alias,
  hidden,
  width,
  height,
  left,
  top,
  iid,
  overIid,
  dragDirection,
}: BrickOutlineComponentProps): React.ReactElement {
  const borderWidth = 2;
  const overflowed = top < 20;
  const isDrag = dragDirection && iid === overIid;
  const dragStyle = isDrag
    ? dragDirection === "inside"
      ? {
          border: "2px dashed goldenrod",
        }
      : {
          [`border-${dragDirection}`]: "2px dashed goldenrod",
        }
    : {};
  const isHiddenAlias = isDrag && dragDirection !== "inside";
  return (
    <div
      className={classNames(styles.outline, styles[type], {
        [styles.overflowed]: overflowed,
        [styles.hidden]: hidden,
      })}
      style={{
        width: width + borderWidth * 2,
        height: height + borderWidth * 2,
        left: left - borderWidth,
        top: top - borderWidth,
        ...dragStyle,
      }}
    >
      {!isHiddenAlias && <div className={styles.alias}>{alias}</div>}
    </div>
  );
}
