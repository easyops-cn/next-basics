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
  BrickPackage,
  BuilderBrickNode,
  BuilderSnippetNode,
  Contract,
  SiteTheme,
  Storyboard,
  StoryboardContextItem,
} from "@next-core/brick-types";
import type {
  BrickOutline,
  ExcuteProxyMethodResult,
  PreviewMessageContainerProxyMethod,
  PreviewMessageContainerStartPreview,
  PreviewMessageContainerToggleInspecting,
  PreviewMessageContainerForward,
  PreviewMessageContainerBack,
  PreviewMessageContainerUpdatePreviewRoute,
  PreviewMessageContainerUpdatePreviewUrl,
  PreviewMessageFromContainer,
  PreviewMessageToContainer,
  PreviewSettings,
  UpdateStoryboardType,
  PreviewBaseMessage,
  PreviewDataOption,
  PreviewMessagePreviewContractUpdateDetail,
  PreviewDebugData,
} from "@next-types/preview";
import { ContractCenterApi_batchSearchContract } from "@next-sdk/next-builder-sdk";

import styles from "./PreviewContainer.module.css";
import { buildBricks } from "../shared/storyboard/buildStoryboardV2";
import {
  BuilderDataManager,
  BuilderRuntimeEdge,
  BuilderRuntimeNode,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { omit } from "lodash";
import {
  batchSetAppsLocalTheme,
  developHelper,
  getRuntime,
} from "@next-core/brick-kit";
import { JsonStorage } from "@next-core/brick-utils";

export interface PreviewContainerProps {
  previewUrl: string;
  appId?: string;
  templateId?: string;
  formId?: string;
  formData?: FormData;
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
  onScreenshotCapture?(screenshot: Blob): void;
  onPreviewerDrop?(params: Record<string, any>): void;
  onPreviewerResize?(resize: PreviewerResize): void;
  onInspectSingleDataValueSuccess?(value: unknown): void;
  onInspectAllDataValuesSuccess?(
    value: Map<string, StoryboardContextItem>
  ): void;
  onInspectDataValueError?(value: unknown): void;
  onContractUpdate: (value: PreviewMessagePreviewContractUpdateDetail) => void;
  onExcuteProxyMethodSuccess?(result: ExcuteProxyMethodResult): void;
  onExcuteProxyMethodError?(result: ExcuteProxyMethodResult): void;
  onPreviewDebug?(result: any[]): void;
  onMatchApiCache?(num: number): void;
  onDebugValueSuccess?(value: unknown): void;
  onDebugValueError?(alue: unknown): void;
}

export type CaptureStatus = "idle" | "capturing" | "ok" | "failed";
export type Direction = "top" | "right" | "bottom" | "left" | "inside";

export interface PreviewContainerRef {
  excuteProxyMethod(ref: string, method: string, args?: any[]): void;
  refresh(
    appId: string,
    storyboardPatch: Partial<Storyboard>,
    options: Record<string, unknown>
  ): void;
  reload(): void;
  capture(): void;
  resize(): void;
  toggleTheme(): void;
  back(): void;
  forward(): void;
  inspectDataValue(name: string, option: PreviewDataOption): void;
  debugDataValue(debugData: PreviewDebugData, options: PreviewDataOption): void;
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

const cacheContractMap = new Map<string, Contract>();
export function LegacyPreviewContainer(
  {
    previewUrl,
    appId,
    templateId,
    formId,
    formData,
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
    onInspectSingleDataValueSuccess,
    onInspectAllDataValuesSuccess,
    onInspectDataValueError,
    onDebugValueSuccess,
    onDebugValueError,
    onContractUpdate,
    onExcuteProxyMethodSuccess,
    onExcuteProxyMethodError,
    onPreviewDebug,
    onMatchApiCache,
  }: PreviewContainerProps,
  ref: React.Ref<PreviewContainerRef>
): React.ReactElement {
  const manager = useBuilderDataManager();
  const iframeRef = useRef<HTMLIFrameElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [scroll, setScroll] = useState({ x: 0, y: 0 });
  const [contentScroll, setContentScroll] = useState({ x: 0, y: 0 });
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
  const [contextOutlines, setContextOutlines] = useState<BrickOutline[]>([]);
  const [dragDirection, setDragDirection] = useState<Direction>();
  const [isShowMask, setIsShowMask] = useState<boolean>(false);
  const refScroll = useRef(scroll);
  const refContentScroll = useRef(contentScroll);
  const loadedRef = useRef(false);
  const refHoverIid = useRef<string>();
  const refHoverOutlines = useRef<BrickOutline[]>();
  const refDragDirection = useRef<Direction>();

  const [previewStarted, setPreviewStarted] = useState(false);
  const openerWindow: Window = previewOnNewWindow ? window.opener : window;

  const storage = new JsonStorage(localStorage);
  const LOCAL_STORAGE_APPS_THEME_KEY = "apps-theme";

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
        data: snippetGraphData[0].snippetData,
        params: snippetGraphData[0].snippetParams,
        context: snippetGraphData[0].context,
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

  const isDragOverTheMask = (e: DragEvent): boolean => {
    if (!iframeRef.current) return false;
    const { left, top, right, bottom } =
      iframeRef.current.getBoundingClientRect();
    const { clientX, clientY } = e;
    return (
      clientX >= left && clientX <= right && clientY >= top && clientY <= bottom
    );
  };

  const handleDragStart = (): void => {
    setIsShowMask(true);
  };

  const handleDragOver = (e: DragEvent): void => {
    e.preventDefault();
    if (isDragOverTheMask(e)) {
      const { left, top } = iframeRef.current.getBoundingClientRect();
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          position: {
            x: e.clientX - left,
            y: e.clientY - top,
          },
          forwardedFor: "builder",
          type: "hover-on-iframe",
        },
        previewOrigin
      );
    }
  };

  const handleOnDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      // dragstart should setData: nodeData and it's work
      const nodeData = e.dataTransfer.getData("nodeData");
      if (isDragOverTheMask(e) && nodeData) {
        const transformNodeData = JSON.parse(nodeData);
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
            nodeData: transformNodeData,
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
          const hoverEdge = edges.find(
            (item) => item.child === hoverNode.$$uid
          );
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
            nodeData: transformNodeData,
            mountPoint:
              dragStatus === "inside" ? "content" : hoverEdge.mountPoint,
            dragStatus,
            parentNodes: parentNodes.map((node) =>
              omit(node, ["parent", "children"])
            ),
            parentNode: parentNodes[parentNodes.length - 1],
            dragOverInstanceId: hoverInstanceId,
          });
        }
      }
    },
    [manager, onPreviewerDrop]
  );

  const handleDragEnd = (): void => {
    refDragDirection.current = null;
    setDragDirection(null);
    setIsShowMask(false);
  };

  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    const snippetData = getSnippetData(snippetGraphData);
    setHoverOutlines([]);
    setActiveOutlines([]);

    // V3 exposes `getBrickPackagesById` instead of `getBrickPackages`
    const agentPackageId = "bricks/visual-builder";
    const agentBrick = "visual-builder.inject-preview-agent";
    const pkg: BrickPackage =
      (developHelper as any).getBrickPackagesById?.(agentPackageId) ??
      developHelper
        .getBrickPackages?.()
        .find((pkg) => (pkg as { id?: string }).id === agentPackageId);
    if (!pkg) {
      // eslint-disable-next-line no-console
      console.error(`Cannot find preview agent package: ${agentPackageId}`);
    }

    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "start-preview",
        options: {
          appId,
          templateId,
          formId,
          formData,
          snippetData: snippetData && JSON.stringify(snippetData),
          routePath,
          routeExact,
          settings: previewSettings,
          clearPreviewRequestCacheIgnoreList:
            getRuntime().getCurrentApp().config
              ?.clearPreviewRequestCacheIgnoreList || [],
          agent: {
            brick: agentBrick,
            pkg: pkg && {
              ...pkg,
              filePath: `${location.origin}${getRuntime().getBasePath()}${
                window.PUBLIC_ROOT ?? ""
              }${pkg.filePath}`,
            },
          },
        },
      } as PreviewMessageContainerStartPreview,
      previewOrigin
    );
  }, [
    snippetGraphData,
    appId,
    templateId,
    formId,
    formData,
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
      return outlines.map(
        ({ width, height, left, top, alias, hasContentScroll }) => ({
          width: width * minScale,
          height: height * minScale,
          left:
            (left - scroll.x - (hasContentScroll ? contentScroll.x : 0)) *
              minScale +
            offsetLeft,
          top:
            (top - scroll.y - (hasContentScroll ? contentScroll.y : 0)) *
              minScale +
            offsetTop,
          ...(alias ? { alias } : {}),
        })
      );
    },
    [minScale, scroll.x, scroll.y, contentScroll.x, contentScroll.y]
  );

  const [adjustedHoverOutlines, setAdjustedHoverOutlines] = useState<
    BrickOutline[]
  >([]);
  const [adjustedActiveOutlines, setAdjustedActiveOutlines] = useState<
    BrickOutline[]
  >([]);
  const [adjustedContextOutlines, setAdjustedContextOutlines] = useState<
    BrickOutline[]
  >([]);

  useEffect(() => {
    setAdjustedHoverOutlines(adjustOutlines(hoverOutlines));
  }, [hoverOutlines, adjustOutlines]);

  useEffect(() => {
    setAdjustedActiveOutlines(adjustOutlines(activeOutlines));
  }, [activeOutlines, adjustOutlines]);

  useEffect(() => {
    setAdjustedContextOutlines(adjustOutlines(contextOutlines));
  }, [contextOutlines, adjustOutlines]);

  const refresh = useCallback(
    (
      appId: string,
      storyboardPatch: Partial<Storyboard>,
      options: {
        snippetGraphData: BuilderSnippetNode[];
        updateStoryboardType?: UpdateStoryboardType;
        settings?: PreviewSettings;
      }
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
            updateStoryboardType: options.updateStoryboardType,
            settings: options.settings,
          },
        } as PreviewMessageFromContainer,
        previewOrigin
      );
    },
    [previewOrigin, previewSettings, snippetGraphData]
  );

  const toggleTheme = () => {
    const res = {} as Record<string, SiteTheme>;
    const store = storage.getItem(LOCAL_STORAGE_APPS_THEME_KEY) as Record<
      string,
      SiteTheme
    >;
    const curTheme =
      store && Object.keys(store).includes(appId) ? store[appId] : "light";
    res[appId] = (curTheme === "dark-v2" ? "light" : "dark-v2") as SiteTheme;
    batchSetAppsLocalTheme(res);
  };

  const back = useCallback(() => {
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "back",
      } as PreviewMessageContainerBack,
      previewOrigin
    );
  }, [previewOrigin]);

  const forward = useCallback(() => {
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "forward",
      } as PreviewMessageContainerForward,
      previewOrigin
    );
  }, [previewOrigin]);

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

  const inspectDataValue = useCallback(
    (name: string, option: PreviewDataOption) => {
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          type: "inspect-data-value",
          name,
          option,
        } as PreviewBaseMessage,
        previewOrigin
      );
    },
    [previewOrigin]
  );

  const debugDataValue = useCallback(
    async (debugData: PreviewDebugData, options: PreviewDataOption) => {
      try {
        let contractData;

        if (debugData.resolve && debugData.resolve.useProvider.includes("@")) {
          const useProvider = debugData.resolve.useProvider;
          const cacheContract = cacheContractMap.get(useProvider);
          if (cacheContract) {
            contractData = cacheContract;
          } else {
            const arr = useProvider.split(":");
            contractData = (
              await ContractCenterApi_batchSearchContract({
                contract: [
                  {
                    fullContractName: arr[0],
                    version: arr[1],
                  },
                ],
              })
            ).list[0] as Contract;

            cacheContractMap.set(useProvider, contractData);
          }
        }

        iframeRef.current.contentWindow.postMessage(
          {
            sender: "preview-container",
            type: "debug-data-value",
            debugData,
            contractData,
            options,
          },
          previewOrigin
        );
      } catch (error) {
        onDebugValueError(error);
      }
    },
    [onDebugValueError, previewOrigin]
  );

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

  const excuteProxyMethod = useCallback(
    (ref, method, args) => {
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          type: "excute-proxy-method",
          proxyMethodArgs: [ref, method, args],
        } as PreviewMessageContainerProxyMethod,
        previewOrigin
      );
    },
    [previewOrigin]
  );

  const previewUrlInitializedRef = useRef(false);
  const [initialPreviewUrl, setInitialPreviewUrl] = useState(previewUrl);
  useEffect(() => {
    // Never reset `iframe.src` once it has been set.
    if (!previewUrlInitializedRef.current && previewUrl) {
      previewUrlInitializedRef.current = true;
      setInitialPreviewUrl(previewUrl);
    }
  }, [previewUrl]);

  const lastPreviewUrlRef = useRef(previewUrl);
  useEffect(() => {
    if (lastPreviewUrlRef.current !== previewUrl) {
      lastPreviewUrlRef.current = previewUrl;
      if (loadedRef.current && previewUrl) {
        iframeRef.current.contentWindow.postMessage(
          {
            sender: "preview-container",
            type: "update-preview-url",
            previewUrl,
          } as PreviewMessageContainerUpdatePreviewUrl,
          previewOrigin
        );
      }
    }
  }, [previewOrigin, previewUrl]);

  useEffect(() => {
    if (loadedRef.current) {
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          type: "update-preview-route",
          routePath,
          routeExact,
        } as PreviewMessageContainerUpdatePreviewRoute,
        previewOrigin
      );
    }
  }, [previewOrigin, routeExact, routePath]);

  useImperativeHandle(ref, () => ({
    refresh,
    reload,
    capture,
    resize,
    manager,
    excuteProxyMethod,
    toggleTheme,
    back,
    forward,
    inspectDataValue,
    debugDataValue,
  }));

  useEffect(() => {
    window.addEventListener("dragstart", handleDragStart);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleOnDrop);
    window.addEventListener("dragend", handleDragEnd);
    return () => {
      window.removeEventListener("dragstart", handleDragStart);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleOnDrop);
      window.removeEventListener("dragend", handleDragEnd);
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
        if (
          data.type === "hover-on-brick" ||
          data.type === "select-brick" ||
          data.type === "hover-on-main" ||
          data.type === "hover-on-context"
        ) {
          // Send to preview.
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
          case "scroll":
            setScroll(data.scroll);
            refScroll.current = data.scroll;
            break;
          case "content-scroll":
            setContentScroll(data.scroll);
            refContentScroll.current = data.scroll;
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
          case "highlight-context":
            setContextOutlines(data.outlines);
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
            sendToggleInspecting(
              inspecting && routeMatch,
              iframeRef,
              previewOrigin
            );
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
          case "excute-proxy-method-success":
            onExcuteProxyMethodSuccess(data.data);
            break;
          case "excute-proxy-method-error":
            onExcuteProxyMethodError(data.data);
            break;
          case "preview.debug":
            onPreviewDebug(data.res);
            break;
          case "match-api-cache":
            onMatchApiCache(data.num);
            break;
          case "inspect-single-data-value-success":
            onInspectSingleDataValueSuccess(data.data);
            break;
          case "inspect-all-data-values-success":
            onInspectAllDataValuesSuccess(
              data.data as Map<string, StoryboardContextItem>
            );
            break;
          case "inspect-data-value-error":
            onInspectDataValueError(data.data);
            break;
          case "debug-data-value-success":
            onDebugValueSuccess(data.data);
            break;
          case "debug-data-value-error":
            onDebugValueError(data.data);
            break;
          case "contract-update":
            onContractUpdate(data.data);
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
    onExcuteProxyMethodSuccess,
    onExcuteProxyMethodError,
    onPreviewDebug,
    onMatchApiCache,
    onInspectSingleDataValueSuccess,
    onInspectAllDataValuesSuccess,
    onInspectDataValueError,
    onContractUpdate,
    routeMatch,
    onDebugValueSuccess,
    onDebugValueError,
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
          src={initialPreviewUrl}
          ref={iframeRef}
          onLoad={handleIframeLoad}
          onMouseOut={handleMouseOut}
          style={{
            width: viewportWidth || `${100 / minScale}%`,
            height: viewportHeight || `${100 / minScale}%`,
            transform: `scale(${minScale})`,
            pointerEvents: isShowMask ? "none" : "initial",
          }}
        />
        <div
          className={styles.mask}
          style={{
            display: isShowMask ? "block" : "none",
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
      {adjustedContextOutlines.map((outline, index) => (
        <BrickOutlineComponent
          key={index}
          type="context"
          dragDirection={dragDirection}
          {...outline}
        />
      ))}
    </div>
  );
}

export const PreviewContainer = forwardRef(LegacyPreviewContainer);

interface BrickOutlineComponentProps extends BrickOutline {
  type: "active" | "hover" | "rootTpl" | "context";
  alias?: string;
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
