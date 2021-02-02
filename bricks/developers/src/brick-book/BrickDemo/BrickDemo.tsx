import React, { useState, useEffect } from "react";
import { Collapse, Card, Button } from "antd";
import {
  BrickPreview,
  BrickPreviewRef,
} from "../../components/BrickPreview/BrickPreview";
import { BrickActions } from "../../components/BrickActions/BrickActions";
import { BrickEditor } from "../../components/BrickEditor/BrickEditor";
import styles from "./BrickDemo.module.css";
import { Action, StoryConf } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";
import ReactMarkdown from "react-markdown";
import style from "../../components/BrickDoc/BrickDoc.module.css";

interface BrickDemoProps {
  defaultConf: StoryConf;
  mode: string;
  actions?: Action[];
}

export function BrickDemo(props: BrickDemoProps): React.ReactElement {
  const previewRef = React.useRef<BrickPreviewRef>(null);
  const [conf, setConf] = React.useState(props.defaultConf);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    setDescription(props?.defaultConf?.description);
  }, [props.defaultConf]);

  const BrickEditorMemoized = React.useCallback(() => {
    const defaultConf = { ...props.defaultConf };
    delete defaultConf.description;
    return (
      <BrickEditor
        defaultConf={defaultConf}
        onConfChange={setConf}
        mode={props.mode}
      />
    );
  }, [props.defaultConf, props.mode]);
  const handleActionClick = (method: string, args: any[]): void => {
    /* istanbul ignore if */
    if (conf.portal) {
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
      <BrickPreview conf={conf} ref={previewRef} />
      <BrickActions actions={props.actions} onActionClick={handleActionClick} />
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
