import React, { useState, useEffect } from "react";
import { Collapse, Card } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import { Action, StoryConf, SnippetConf } from "@next-core/brick-types";
import { getAdjustedConf } from "../../share/processor";
import {
  BrickPreview,
  BrickPreviewRef,
} from "../../components/BrickPreview/BrickPreview";
import { BrickActions } from "../../components/BrickActions/BrickActions";
import { BrickEditor } from "../../components/BrickEditor/BrickEditor";
import styles from "./BrickDemo.module.css";

import style from "../../components/BrickDoc/BrickDoc.module.css";

interface BrickDemoProps {
  defaultConf: StoryConf | SnippetConf;
  mode: string;
  actions?: Action[];
}

export function BrickDemo(props: BrickDemoProps): React.ReactElement {
  const [adjustedConf, setAdjustedconf] = useState(
    getAdjustedConf(props.defaultConf)
  );
  const previewRef = React.useRef<BrickPreviewRef>(null);
  const [previewConf, setPreviewConf] = React.useState(
    adjustedConf.previewConf
  );
  const [description, setDescription] = useState(adjustedConf.description);
  const [actions, setActions] = useState(adjustedConf.actions);

  useEffect(() => {
    setAdjustedconf(getAdjustedConf(props.defaultConf));
  }, [props.defaultConf]);

  useEffect(() => {
    setPreviewConf(adjustedConf.previewConf);
    setDescription(adjustedConf.description);
    setActions(adjustedConf.actions);
  }, [adjustedConf]);

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

  return (
    <Card className={styles.demoContainer} bordered={false}>
      <BrickPreview conf={previewConf} ref={previewRef} />
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
