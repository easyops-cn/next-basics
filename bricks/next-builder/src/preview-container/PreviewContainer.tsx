// istanbul ignore file: working in progress
import React, {
  useCallback,
  useEffect,
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
} from "@next-core/brick-types";

import styles from "./PreviewContainer.module.css";
import classNames from "classnames";

export interface PreviewContainerProps {
  previewUrl: string;
  inspecting?: boolean;
  viewportWidth?: number;
  onPreviewStart?(): void;
  onInspectingToggle?(enabled: boolean): void;
}

const openerWindow: Window = window.opener || window;

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

export function PreviewContainer({
  previewUrl,
  inspecting,
  viewportWidth,
  onPreviewStart,
  onInspectingToggle,
}: PreviewContainerProps): React.ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>();
  const containerRef = useRef<HTMLDivElement>();

  const [internalInspecting, setInternalInspecting] = useState(inspecting);
  const [previewStarted, setPreviewStarted] = useState(false);

  useEffect(() => {
    setInternalInspecting(inspecting);
  }, [inspecting]);

  useEffect(() => {
    onInspectingToggle(internalInspecting);
  }, [internalInspecting, onInspectingToggle]);

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
  }, []);

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
    // Once the iframe is loaded, send the message again.
    sendToggleInspecting(inspecting, iframeRef, previewOrigin);
  }, [inspecting, previewOrigin]);

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
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            break;
          case "select-brick":
            setInternalInspecting(false);
            // Send to builder.
            openerWindow.postMessage({
              ...data,
              sender: "preview-container",
              forwardedFor: data.sender,
            } as PreviewMessageFromContainer);
            // Todo(steve): Focus not working?
            openerWindow.focus();
            break;
          case "preview-started":
            setPreviewStarted(true);
            onPreviewStart();
            break;
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [onPreviewStart, previewOrigin, sameOriginWithOpener]);

  useEffect(() => {
    if (loadedRef.current) {
      sendToggleInspecting(internalInspecting, iframeRef, previewOrigin);
    }
  }, [previewOrigin, internalInspecting]);

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
  }, [previewStarted]);

  const [scale, setScale] = useState(1);

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

  const containerOversized = scale > 1;

  return (
    <div
      className={classNames(styles.previewContainer, {
        [styles.oversized]: containerOversized,
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
          containerOversized
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
