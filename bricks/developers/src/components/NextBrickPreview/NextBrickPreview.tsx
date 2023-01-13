/* istanbul ignore file temporary */
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Spin } from "antd";
import { useTranslation } from "react-i18next";
import { StoryConf } from "@next-core/brick-types";
import { getRuntime } from "@next-core/brick-kit";
import { NS_DEVELOPERS, K } from "../../i18n/constants";
import { processConf } from "../BrickPreview/BrickPreview";
import styles from "./NextBrickPreview.module.css";

interface NextBrickPreviewProps {
  conf: StoryConf | StoryConf[];
  onFinish?: () => void;
}

export interface BrickPreviewRef {
  container: HTMLElement;
  portal: HTMLElement;
}

export function LegacyNextBrickPreview(
  { conf, onFinish }: NextBrickPreviewProps,
  ref: React.Ref<BrickPreviewRef>
): React.ReactElement {
  const { t } = useTranslation(NS_DEVELOPERS);
  const iframeRef = useRef<HTMLIFrameElement>();
  const [loading, setLoading] = useState(true);

  const renderBrick = useCallback(
    async (conf: StoryConf | StoryConf[]) => {
      const contentWindow = iframeRef.current.contentWindow;
      const previewRender = (contentWindow as any)._preview_render;
      await previewRender({ conf: processConf(conf) });

      iframeRef.current.height =
        contentWindow.document.body.scrollHeight + 80 + "px";

      onFinish?.();
    },
    [onFinish]
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
      />
    </Spin>
  );
}

export const NextBrickPreview = forwardRef(LegacyNextBrickPreview);
