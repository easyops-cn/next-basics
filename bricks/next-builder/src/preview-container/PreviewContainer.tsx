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
import type { Storyboard } from "@next-core/brick-types";
import type {
  BrickOutline,
  PreviewMessageContainerStartPreview,
  PreviewMessageContainerToggleInspecting,
  PreviewMessageFromContainer,
  PreviewMessageToContainer,
  PreviewSettings,
} from "@next-types/preview";

import styles from "./PreviewContainer.module.css";

export interface PreviewContainerProps {
  previewUrl: string;
  appId?: string;
  templateId?: string;
  previewSettings: PreviewSettings;
  inspecting?: boolean;
  viewportWidth?: number;
  viewportHeight?: number;
  previewOnNewWindow?: boolean;
  onPreviewStart?(): void;
  onUrlChange?(url: string): void;
  onScaleChange?(scale: number): void;
}

export interface PreviewContainerRef {
  refresh(appId: string, storyboardPatch: Partial<Storyboard>): void;
  reload(): void;
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
    previewSettings,
    inspecting,
    viewportWidth,
    viewportHeight,
    previewOnNewWindow,
    onPreviewStart,
    onUrlChange,
    onScaleChange,
  }: PreviewContainerProps,
  ref: React.Ref<PreviewContainerRef>
): React.ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);
  const minScale = Math.min(scaleX, scaleY, 1);

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

  const loadedRef = useRef(false);
  const handleIframeLoad = useCallback(() => {
    loadedRef.current = true;
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "start-preview",
        options: {
          appId,
          templateId,
          settings: previewSettings,
        },
      } as PreviewMessageContainerStartPreview,
      previewOrigin
    );
  }, [appId, previewOrigin, previewSettings, templateId]);

  const [hoverIid, setHoverIid] = useState<string>();
  const [hoverAlias, setHoverAlias] = useState<string>();
  const [activeIid, setActiveIid] = useState<string>();
  const [activeAlias, setActiveAlias] = useState<string>();
  const [hoverOutlines, setHoverOutlines] = useState<BrickOutline[]>([]);
  const [activeOutlines, setActiveOutlines] = useState<BrickOutline[]>([]);

  useEffect(() => {
    // Active overrides hover.
    if (hoverIid && hoverIid === activeIid) {
      setHoverOutlines([]);
    }
  }, [activeIid, hoverIid]);

  const [scroll, setScroll] = useState({ x: 0, y: 0 });

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
    (appId: string, storyboardPatch: Partial<Storyboard>) => {
      iframeRef.current.contentWindow.postMessage(
        {
          sender: "preview-container",
          type: "refresh",
          appId,
          storyboardPatch,
          templateId,
          settings: previewSettings,
        } as PreviewMessageFromContainer,
        previewOrigin
      );
    },
    [previewOrigin, previewSettings, templateId]
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

  const handleUrlChange = useCallback(
    (url: string) => {
      onUrlChange?.(url);
    },
    [onUrlChange]
  );

  useImperativeHandle(ref, () => ({
    refresh,
    reload,
  }));

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
        }
      } else if (data.sender === "previewer" && origin === previewOrigin) {
        switch (data.type) {
          case "hover-on-brick":
          case "select-brick":
          case "resize":
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            break;
          case "scroll":
            setScroll(data.scroll);
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
    openerWindow,
    previewOrigin,
    sameOriginWithOpener,
    scaleX,
    inspecting,
  ]);

  useEffect(() => {
    if (loadedRef.current) {
      sendToggleInspecting(inspecting, iframeRef, previewOrigin);
    }
  }, [previewOrigin, inspecting]);

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
    if (!viewportWidth) {
      setScaleX(1);
    }
    if (!viewportHeight) {
      setScaleY(1);
    }
    if (containerRef.current && (viewportWidth || viewportHeight)) {
      const computeScale = (): void => {
        if (viewportWidth) {
          setScaleX(containerRef.current.offsetWidth / viewportWidth);
        }
        if (viewportHeight) {
          setScaleY(containerRef.current.offsetHeight / viewportHeight);
        }
      };
      computeScale();
      const resizeObserver = new ResizeObserver(computeScale);
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [viewportWidth, viewportHeight]);

  useEffect(() => {
    onScaleChange?.(minScale);
  }, [minScale, onScaleChange]);

  return (
    <div className={styles.previewContainer} ref={containerRef}>
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
          type="hover"
          {...outline}
        />
      ))}
      {adjustedActiveOutlines.map((outline, index) => (
        <BrickOutlineComponent
          key={index}
          alias={activeAlias}
          type="active"
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
}

function BrickOutlineComponent({
  type,
  alias,
  hidden,
  width,
  height,
  left,
  top,
}: BrickOutlineComponentProps): React.ReactElement {
  const borderWidth = 2;
  const overflowed = top < 20;
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
      }}
    >
      <div className={styles.alias}>{alias}</div>
    </div>
  );
}
