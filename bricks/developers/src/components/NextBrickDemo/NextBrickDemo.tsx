/* istanbul ignore file temporary */
import React, { createRef, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Action, StoryConf } from "@next-core/brick-types";
import classNames from "classnames";
import { Collapse, Spin } from "antd";
import ReactMarkdown from "react-markdown";
import { LoadingOutlined } from "@ant-design/icons";
import { NS_DEVELOPERS, K } from "../../i18n/constants";
import {
  NextBrickPreview,
  BrickPreviewRef,
} from "../NextBrickPreview/NextBrickPreview";
import { BrickActions } from "../BrickActions/BrickActions";
import { GeneralIcon } from "@next-libs/basic-components";
import { BrickEditor } from "../BrickEditor/BrickEditor";
import style from "../BrickDoc/BrickDoc.module.css";

import styles from "./NextBrickDemo.module.css";

interface NextBrickDemoProps {
  confList: DemoConf[];
  mode: string;
  actions?: Action[];
  storyId: string;
  activeTabIndex?: number;
}

interface DemoConf {
  previewConf: StoryConf | StoryConf[];
  description: {
    title: string;
    message?: string;
  };
  actions?: Action[];
}

export function NextBrickDemo(props: NextBrickDemoProps): React.ReactElement {
  const { confList, mode, storyId, activeTabIndex = 0 } = props;
  const { t } = useTranslation(NS_DEVELOPERS);
  const [tabIndex, setTabIndex] = useState(activeTabIndex);
  const [conf, setConf] = useState<DemoConf>(
    confList[tabIndex] ?? ({} as DemoConf)
  );

  const [refresh, setRefresh] = useState<boolean>(false);

  const previewRef = createRef<BrickPreviewRef>();

  const handleActionClick = (method: string, args: any[]): void => {
    const { previewConf } = conf;

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

  const handleTabClick = (curConf: DemoConf, index: number): void => {
    if (index === tabIndex) return;

    setRefresh(true);
    setConf(curConf);
    setTabIndex(index);
  };

  useEffect(() => {
    setTabIndex(activeTabIndex);
  }, [activeTabIndex]);

  useEffect(() => {
    const value = confList[0] ?? ({} as DemoConf);
    setTabIndex(0);
    setConf(value);
  }, [confList]);

  const BrickEditorMemoized = React.useCallback(() => {
    return (
      <BrickEditor
        defaultConf={conf.previewConf}
        onConfChange={(changeValue) =>
          setConf({ ...conf, previewConf: changeValue })
        }
        mode={mode}
      />
    );
  }, [conf, mode]);

  const renderMarkDown = (source: string): React.ReactElement => {
    return (
      <ReactMarkdown
        className={style.brickDocContainer}
        source={source}
        escapeHtml={false}
      />
    );
  };

  const handleFinish = useCallback(() => {
    setRefresh(false);
  }, []);

  return (
    <div className={styles.demoContainer}>
      <div className={styles.tab}>
        {confList.map((item, index) => (
          <span
            key={index}
            role="tab"
            className={classNames(styles.tabTitle, {
              [styles.tabSelected]: tabIndex === index,
            })}
            onClick={() => handleTabClick(item, index)}
          >
            {item.description?.title || t(K.DEMO, { index: index + 1 })}
            <span className={styles.loadingIcon}>
              {refresh && tabIndex === index && <LoadingOutlined />}
            </span>
          </span>
        ))}
      </div>

      <Spin spinning={refresh} indicator={null}>
        <NextBrickPreview
          conf={conf.previewConf}
          ref={previewRef}
          onFinish={handleFinish}
          storyId={storyId}
        />
      </Spin>

      <BrickActions
        actions={conf.actions ?? props.actions}
        onActionClick={handleActionClick}
      />
      <Collapse
        bordered={false}
        defaultActiveKey={["2"]}
        className={styles.demoContainerPane}
      >
        <Collapse.Panel
          showArrow={false}
          header={
            <div className={styles.demoContainerIcon}>
              <span className={styles.demoContainerIconSpan}>
                <GeneralIcon icon={{ lib: "fa", icon: "edit" }} />
              </span>
              {conf.description?.title}
            </div>
          }
          key="1"
          className={classNames(styles.demoContainerEdit, {
            [styles.demoContainerEditSingle]: !conf.description?.message,
          })}
        >
          {BrickEditorMemoized()}
        </Collapse.Panel>
        {conf.description?.message && (
          <Collapse.Panel
            disabled={true}
            showArrow={false}
            key="2"
            header={null}
            className={styles.demoContainerMemo}
          >
            {renderMarkDown(conf.description.message)}
          </Collapse.Panel>
        )}
      </Collapse>
    </div>
  );
}
