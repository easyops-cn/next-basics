import React, { useState, useEffect } from "react";
import { Collapse, Card, Spin } from "antd";
import {
  BrickPreview,
  BrickPreviewRef,
  processConf,
} from "../../components/BrickPreview/BrickPreview";
import { BrickActions } from "../../components/BrickActions/BrickActions";
import { BrickEditor } from "../../components/BrickEditor/BrickEditor";
import styles from "./BrickDemo.module.css";
import { i18nText, getRuntime } from "@next-core/brick-kit";
import {
  Action,
  StoryConf,
  SnippetConf,
  BrickConf,
} from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import style from "../../components/BrickDoc/BrickDoc.module.css";

interface BrickDemoProps {
  defaultConf: StoryConf | SnippetConf;
  mode: string;
  actions?: Action[];
}

declare type DemoConf = {
  previewConf: StoryConf | StoryConf[];
  description: {
    title: string;
    message?: string;
  };
  actions?: Action[];
};
// 兼容新的SnippetConf格式
function getAdjustedConf(defaultConf: StoryConf | SnippetConf): DemoConf {
  let adjustedConf: DemoConf;
  // 新格式里必须有bricks
  if ((defaultConf as SnippetConf).bricks) {
    const snippetConf = defaultConf as SnippetConf;
    const bricks = [].concat(snippetConf.bricks).filter(Boolean);
    adjustedConf = {
      previewConf: bricks,
      description: {
        title: i18nText(snippetConf.title),
        message: i18nText(snippetConf.message),
      },
      actions: snippetConf.actions,
    };
  } else {
    const storyConf = { ...(defaultConf as StoryConf) };
    const description = storyConf.description;
    delete storyConf.description;
    adjustedConf = {
      previewConf: storyConf,
      description,
    };
  }
  return adjustedConf;
}

export function BrickDemo(props: BrickDemoProps): React.ReactElement {
  const [adjustedConf, setAdjustedconf] = useState(
    getAdjustedConf(props.defaultConf)
  );
  const previewRef = React.useRef<BrickPreviewRef>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const [previewConf, setPreviewConf] = React.useState(
    adjustedConf.previewConf
  );
  const [description, setDescription] = useState(adjustedConf.description);
  const [actions, setActions] = useState(adjustedConf.actions);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setAdjustedconf(getAdjustedConf(props.defaultConf));
  }, [props.defaultConf]);

  useEffect(() => {
    setPreviewConf(adjustedConf.previewConf);
    setDescription(adjustedConf.description);
    setActions(adjustedConf.actions);
  }, [adjustedConf]);

  useEffect(() => {
    if (window.STANDALONE_MICRO_APPS) {
      const previewRender = (iframeRef.current.contentWindow as any)
        ._preview_render;
      previewRender?.({ conf: processConf(previewConf) });
    }
  }, [previewConf]);

  const BrickEditorMemoized = React.useCallback(() => {
    // const defaultConf = { ...adjustedConf };
    // delete defaultConf.description;
    return (
      <BrickEditor
        defaultConf={previewConf}
        onConfChange={setPreviewConf}
        mode={props.mode}
      />
    );
  }, [previewConf, props.mode]);
  const handleActionClick = (method: string, args: any[]): void => {
    /* istanbul ignore if */
    if (
      (previewConf as StoryConf).portal ||
      (previewConf as StoryConf[])[0]?.portal
    ) {
      /* istanbul ignore if */
      if (previewRef.current?.portal.firstChild) {
        (previewRef.current.portal.firstChild as any)[method](...args);
      }
      /* istanbul ignore else */
    } else {
      /* istanbul ignore if */
      if (previewRef.current?.container.firstChild) {
        (previewRef.current.container.firstChild as any)[method](...args);
      }
    }
  };

  const renderMarkDown = (source: string) => {
    return (
      <ReactMarkdown
        className={style.brickDocContainer}
        source={source}
        escapeHtml={false}
      />
    );
  };

  const handleIframeLoad = async (): Promise<void> => {
    const contentWindow = iframeRef.current.contentWindow;
    const previewRender = (contentWindow as any)._preview_render;
    await previewRender({ conf: processConf(previewConf) });

    iframeRef.current.height =
      contentWindow.document.body.scrollHeight + 80 + "px";
    setLoading(false);
  };

  return (
    <Card className={styles.demoContainer} bordered={false}>
      {window.STANDALONE_MICRO_APPS ? (
        <Spin spinning={loading} tip="Loading...">
          <iframe
            src={`${getRuntime().getBasePath()}preview.html`}
            ref={iframeRef}
            onLoad={handleIframeLoad}
            className={styles.previewContainer}
          />
        </Spin>
      ) : (
        <BrickPreview conf={previewConf} ref={previewRef} />
      )}
      <BrickActions
        actions={actions || props.actions}
        onActionClick={handleActionClick}
      />
      <Collapse bordered={false} defaultActiveKey={["2"]}>
        <Collapse.Panel
          showArrow={false}
          header={
            <div className={styles.demoContainerIcon}>
              <span className={styles.demoContainerIconSpan}>
                <GeneralIcon icon={{ lib: "fa", icon: "edit" }} />
              </span>
              {description?.title}
            </div>
          }
          key="1"
          className={classNames(styles.demoContainerEdit, {
            [styles.demoContainerEditSingle]: !description?.message,
          })}
        >
          {BrickEditorMemoized()}
        </Collapse.Panel>
        {description?.message && (
          <Collapse.Panel
            disabled={true}
            showArrow={false}
            key="2"
            header={null}
            className={styles.demoContainerMemo}
          >
            {renderMarkDown(description.message)}
          </Collapse.Panel>
        )}
      </Collapse>
    </Card>
  );
}
