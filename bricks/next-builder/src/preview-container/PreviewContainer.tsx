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
import type {
  PreviewMessageContainerStartPreview,
  PreviewMessageContainerToggleInspecting,
  PreviewMessageFromContainer,
  PreviewMessageToContainer,
} from "@next-types/preview";

import styles from "./PreviewContainer.module.css";
import classNames from "classnames";

export interface PreviewContainerProps {
  previewUrl: string;
  inspecting?: boolean;
  viewportWidth?: number;
  previewOnNewWindow?: boolean;
  onPreviewStart?(): void;
  onUrlChange?(url: string): void;
}

export interface PreviewContainerRef {
  refresh(): void;
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
    inspecting,
    viewportWidth,
    previewOnNewWindow,
    onPreviewStart,
    onUrlChange,
  }: PreviewContainerProps,
  ref: React.Ref<PreviewContainerRef>
): React.ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>();
  const containerRef = useRef<HTMLDivElement>();
  const [scale, setScale] = useState(1);

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
      } as PreviewMessageContainerStartPreview,
      previewOrigin
    );
  }, [previewOrigin]);

  const refresh = useCallback(() => {
    iframeRef.current.contentWindow.postMessage(
      {
        sender: "preview-container",
        type: "refresh",
      } as PreviewMessageFromContainer,
      previewOrigin
    );
  }, [previewOrigin]);

  const handleUrlChange = useCallback(
    (url: string) => {
      onUrlChange?.(url);
    },
    [onUrlChange]
  );

  useImperativeHandle(ref, () => ({
    refresh,
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
      if (data.sender === "builder") {
        if (data.type === "hover-on-brick" && origin === location.origin) {
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
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            break;
          case "context-menu-on-brick": {
            const box = iframeRef.current.getBoundingClientRect();
            const maxScale = scale > 1 ? 1 : scale;
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
    scale,
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
      openerWindow.postMessage({
        sender: "preview-container",
        forwardedFor: "previewer",
        type: "hover-on-brick",
        iidList: [],
      } as PreviewMessageFromContainer);
    };
  }, [openerWindow, previewStarted]);

  const computeScale = useCallback(() => {
    setScale(containerRef.current.offsetWidth / viewportWidth);
  }, [viewportWidth]);

  // istanbul ignore next
  useEffect(() => {
    if (!viewportWidth) {
      setScale(1);
      return;
    }
    if (containerRef.current) {
      computeScale();
      const resizeObserver = new ResizeObserver(computeScale);
      resizeObserver.observe(containerRef.current);
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [computeScale, viewportWidth]);

  return (
    <div
      className={classNames(styles.previewContainer, {
        [styles.oversized]: scale > 1,
      })}
      ref={containerRef}
    >
      <iframe
        className={styles.iframe}
        src={previewUrl}
        ref={iframeRef}
        onLoad={handleIframeLoad}
        onMouseOut={handleMouseOut}
        style={
          scale > 1
            ? {
                width: viewportWidth,
                height: "100%",
                transform: `initial`,
              }
            : {
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: `scale(${scale})`,
              }
        }
      />
    </div>
  );
}

export const PreviewContainer = forwardRef(LegacyPreviewContainer);
