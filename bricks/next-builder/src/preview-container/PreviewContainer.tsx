// istanbul ignore file: working in progress
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "antd";
import { AimOutlined } from "@ant-design/icons";
import type {
  PreviewMessageContainerStartPreview,
  PreviewMessageContainerToggleInspecting,
  PreviewMessageFromContainer,
  PreviewMessageToContainer,
} from "@next-core/brick-types";

import styles from "./PreviewContainer.module.css";

export interface PreviewContainerProps {
  previewUrl: string;
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
}: PreviewContainerProps): React.ReactElement {
  const iframeRef = useRef<HTMLIFrameElement>();

  const [selectEnabled, setSelectEnabled] = useState(false);
  const [previewStarted, setPreviewStarted] = useState(false);

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
    sendToggleInspecting(selectEnabled, iframeRef, previewOrigin);
  }, [previewOrigin, selectEnabled]);

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
            setSelectEnabled(false);
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
            break;
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [previewOrigin, sameOriginWithOpener]);

  const handleToggleSelect = useCallback(() => {
    setSelectEnabled((prev) => !prev);
  }, []);

  useEffect(() => {
    if (loadedRef.current) {
      sendToggleInspecting(selectEnabled, iframeRef, previewOrigin);
    }
  }, [previewOrigin, selectEnabled]);

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

  return (
    <div className={styles.previewContainer}>
      <div className={styles.toolbar}>
        <Button
          type={selectEnabled ? "primary" : "default"}
          disabled={!sameOriginWithOpener || !previewStarted}
          icon={<AimOutlined />}
          size="small"
          onClick={handleToggleSelect}
        />
      </div>
      <div className={styles.iframeContainer}>
        <iframe
          className={styles.iframe}
          src={previewUrl}
          ref={iframeRef}
          onLoad={handleIframeLoad}
          onMouseOut={handleMouseOut}
        />
      </div>
    </div>
  );
}
