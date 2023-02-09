/* istanbul ignore file temporary */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { Spin, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { StoryConf } from "@next-core/brick-types";
import { getRuntime, getCurrentTheme } from "@next-core/brick-kit";
import { debounceByAnimationFrame, JsonStorage } from "@next-core/brick-utils";
import classNames from "classnames";
import { NS_DEVELOPERS, K } from "../../i18n/constants";
import { processConf } from "../BrickPreview/BrickPreview";
import styles from "./NextBrickPreview.module.css";

const storage = new JsonStorage(localStorage);
const storageKey = "developer-brick-preview";
interface NextBrickPreviewProps {
  conf: StoryConf | StoryConf[];
  onFinish?: () => void;
  containerStyle?: React.CSSProperties;
}

export interface BrickPreviewRef {
  container: HTMLElement;
  portal: HTMLElement;
}

interface ResizerStatus {
  startHeigh: number;
  startY: number;
}

export function LegacyNextBrickPreview(
  { conf, onFinish, containerStyle }: NextBrickPreviewProps,
  ref: React.Ref<BrickPreviewRef>
): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const iframeRef = useRef<HTMLIFrameElement>();
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState<number>();
  const [defaultMinSize, setDefaultMinSize] = useState<number>();
  const [finish, setFinish] = useState(false);
  const [resizeStatus, setResizerStatus] = useState<ResizerStatus>(null);

  const debouncedSetSize = useMemo(() => debounceByAnimationFrame(setSize), []);

  const renderBrick = useCallback(
    async (conf: StoryConf | StoryConf[]) => {
      const contentWindow = iframeRef.current.contentWindow;
      const previewRender = (contentWindow as any)._preview_render;
      await previewRender({
        conf: processConf(conf),
        theme: getCurrentTheme(),
      });

      const defaultSize = contentWindow.document.body.scrollHeight + 40;
      setDefaultMinSize(defaultSize);
      const refinedHeight = Math.max(
        (storage.getItem(storageKey) as number) ?? 0,
        defaultSize
      );

      debouncedSetSize(refinedHeight);

      onFinish?.();
    },
    [onFinish, debouncedSetSize]
  );

  React.useImperativeHandle(ref, () => ({
    get container() {
      return iframeRef.current.contentDocument.querySelector(
        "#main-mount-point"
      ) as HTMLElement;
    },
    get portal() {
      return iframeRef.current.contentDocument.querySelector(
        "#portal-mount-point"
      ) as HTMLElement;
    },
  }));

  const handleResizerMouseDown = useCallback(
    (event: MouseEvent) => {
      // Prevent text selecting.
      event.preventDefault();
      setResizerStatus({
        startHeigh: size,
        startY: event.clientY,
      });
      setFinish(false);
    },
    [size]
  );

  useEffect(() => {
    if (!resizeStatus) {
      return;
    }

    const handleResizerMouseMove = (event: MouseEvent): void => {
      const modifiedSize = Math.min(
        document.documentElement.clientHeight,
        resizeStatus.startHeigh + (event.clientY - resizeStatus.startY) * 1
      );

      setFinish(true);

      debouncedSetSize(Math.max(defaultMinSize, modifiedSize));
    };

    const handleResizerMouseUp = (): void => {
      setResizerStatus(null);
    };

    window.addEventListener("mousemove", handleResizerMouseMove);
    window.addEventListener("mouseup", handleResizerMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleResizerMouseMove);
      window.removeEventListener("mouseup", handleResizerMouseUp);
    };
  }, [resizeStatus, debouncedSetSize, defaultMinSize]);

  useEffect(() => {
    if (!resizeStatus && finish) {
      storage.setItem(storageKey, size);
    }
  }, [finish, resizeStatus, size]);

  useEffect(() => {
    !loading && renderBrick(conf);
  }, [conf, loading, renderBrick]);

  const handleIframeLoad = async (): Promise<void> => {
    await renderBrick(conf);
    setLoading(false);
  };

  return (
    <Spin spinning={loading} tip="Loading...">
      <iframe
        src={`${getRuntime().getBasePath()}preview.html`}
        ref={iframeRef}
        onLoad={handleIframeLoad}
        className={styles.previewContainer}
        height={size}
        style={containerStyle}
      />
      <div
        title={t(K.MOVED_BY_DRAGGING)}
        className={classNames(styles.bar, {
          [styles.resizing]: !!resizeStatus,
        })}
        onMouseDown={handleResizerMouseDown}
      >
        <div className={styles.mask} />
      </div>
    </Spin>
  );
}

export const NextBrickPreview = forwardRef(LegacyNextBrickPreview);
