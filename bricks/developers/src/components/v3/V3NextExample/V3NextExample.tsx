/* istanbul ignore file temporary */
import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useLayoutEffect,
  useEffect,
} from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import { getRuntime, useCurrentTheme } from "@next-core/brick-kit";
import { debounceByAnimationFrame } from "@next-core/brick-utils";
import { Spin } from "antd";
import classNames from "classnames";
import { V3BrickEditor } from "../V3BrickEditor/V3BrickEditor";
import styles from "./style.module.css";

interface V3NextExampleProps {
  type?: string;
  code?: string;
  altCode?: string;
  gap?: boolean;
  onBlur?: (code: string, mode: string) => void;
}

const EXAMPLE_IFRAME_MIN_HEIGHT = 88;

export function V3NextExample(props: V3NextExampleProps): React.ReactElement {
  const { code, altCode, type, gap, onBlur } = props;

  const iframeRef = useRef<HTMLIFrameElement>();

  const theme = useCurrentTheme();

  const [language, changeLanguage] = useState<string>(type || "yaml");
  const [sourceShown, setSourceShown] = useState(false);
  const [defaultCode, setDefaultCode] = useState(
    language === type ? code : altCode
  );
  const [currentCode, setCurrentCode] = useState(defaultCode);

  useEffect(() => {
    changeLanguage(type || "yaml");
  }, [type]);

  useEffect(() => {
    const newCode = language === type ? code : altCode;
    setDefaultCode(newCode);
    setCurrentCode(newCode);
  }, [altCode, code, language, type]);

  const languageAndCode = useMemo(
    () => `${language}:${currentCode}`,
    [currentCode, language]
  );

  const [ready, setReady] = useState(false);
  const [iframeHeight, setIframeHeight] = useState(EXAMPLE_IFRAME_MIN_HEIGHT);
  const debouncedSetIframeHeight = useMemo(
    () => debounceByAnimationFrame(setIframeHeight),
    []
  );

  const handleIframeLoad = useCallback(() => {
    const check = () => {
      if ((iframeRef.current?.contentWindow as any)?._preview_only_render) {
        setReady(true);
      } else {
        setTimeout(check, 100);
      }
    };
    check();
  }, []);

  useLayoutEffect(() => {
    if (!ready) {
      return;
    }
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        debouncedSetIframeHeight(
          Math.max(
            EXAMPLE_IFRAME_MIN_HEIGHT,
            entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height
          )
        );
      }
    });
    ro.observe(iframeRef.current.contentDocument.body, {
      box: "border-box",
    });
    return () => {
      ro.disconnect();
    };
  }, [debouncedSetIframeHeight, ready]);

  useEffect(() => {
    if (!ready) {
      return;
    }
    const render = (iframeRef.current?.contentWindow as any)
      ?._preview_only_render;
    if (!render) {
      return;
    }
    const colonIndex = languageAndCode.indexOf(":");
    const deferredLanguage = languageAndCode.substring(0, colonIndex);
    const deferredCode = languageAndCode.substring(colonIndex + 1);
    render(
      deferredLanguage,
      {
        [deferredLanguage]: deferredCode,
      },
      {
        theme,
        styleText: gap
          ? `#preview-root { display: flex; flex-wrap: wrap; gap: 0.27em; }`
          : "",
      }
    );
  }, [theme, ready, gap, languageAndCode]);

  return (
    <div className={styles.example}>
      <div className={styles.previewBox}>
        <Spin spinning={!ready} tip="Loading...">
          <div className={styles.preview}>
            <iframe
              ref={iframeRef}
              src={`${getRuntime().getBasePath()}_brick-preview-v3_/preview/`}
              loading="lazy"
              onLoad={handleIframeLoad}
              className={styles.iframe}
              height={iframeHeight}
            />
          </div>
        </Spin>
      </div>
      <div
        className={classNames(styles.editorBox, {
          [styles.shown]: sourceShown,
        })}
      >
        <V3BrickEditor
          value={defaultCode}
          mode={language}
          onDebouncedChange={setCurrentCode}
          onBlur={onBlur}
        />
      </div>
      <div className={styles.toolbar}>
        <button
          className={classNames(styles.button, styles.sourceButton)}
          onClick={() => setSourceShown((prev) => !prev)}
        >
          {sourceShown ? (
            <UpOutlined width={14} height={14} />
          ) : (
            <DownOutlined width={14} height={14} />
          )}
          <span>Source</span>
        </button>
        <button
          className={classNames(styles.button, styles.active)}
          onClick={() => {
            setSourceShown(true);
          }}
        >
          YAML
        </button>
      </div>
    </div>
  );
}
