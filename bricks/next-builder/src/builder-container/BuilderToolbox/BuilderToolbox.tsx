import React from "react";
import {
  AppstoreAddOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PartitionOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { BrickOptionItem, ToolboxTab } from "../interfaces";
import { StoryboardTreeView } from "../StoryboardTreeView/StoryboardTreeView";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventsView } from "../EventsView/EventsView";
import { DataView } from "../DataView/DataView";
import { ContextConf } from "@next-core/brick-types";

import styles from "./BuilderToolbox.module.css";

export interface BuilderToolboxProps {
  brickList?: BrickOptionItem[];
  onContextUpdate?: (context: ContextConf[]) => void;
}

interface ToolboxTabConf {
  tab: ToolboxTab;
  icon: () => React.ReactElement;
  content: () => React.ReactElement;
}

React.createElement;

export function BuilderToolbox({
  brickList,
  onContextUpdate,
}: BuilderToolboxProps): React.ReactElement {
  const {
    fullscreen,
    setFullscreen,
    toolboxTab: activeTab,
    setToolboxTab: setActiveTab,
  } = useBuilderUIContext();

  const tabList: ToolboxTabConf[] = [
    {
      tab: ToolboxTab.LIBRARY,
      icon() {
        return <AppstoreAddOutlined />;
      },
      content() {
        return <BrickLibrary brickList={brickList} />;
      },
    },
    {
      tab: ToolboxTab.TREE_VIEW,
      icon() {
        return <PartitionOutlined />;
      },
      content() {
        return <StoryboardTreeView />;
      },
    },
    {
      tab: ToolboxTab.EVENTS_VIEW,
      icon() {
        return (
          <FontAwesomeIcon icon="broadcast-tower" style={{ fontSize: 12 }} />
        );
      },
      content() {
        return <EventsView />;
      },
    },
    {
      tab: ToolboxTab.DATA_VIEW,
      icon() {
        return <DatabaseOutlined />;
      },
      content() {
        return (
          <DataView brickList={brickList} onContextUpdate={onContextUpdate} />
        );
      },
    },
  ];

  return (
    <div
      className={classNames(styles.builderToolbox, {
        [styles.fullscreen]: fullscreen,
      })}
      data-override-theme="dark"
    >
      <ul className={styles.tabList}>
        {tabList.map((tabConf) => (
          <li
            key={tabConf.tab}
            className={classNames({
              [styles.tabActive]: activeTab === tabConf.tab,
            })}
          >
            <a
              className={styles.tabLink}
              role="button"
              onClick={() => setActiveTab(tabConf.tab)}
            >
              {tabConf.icon()}
            </a>
          </li>
        ))}
        <li>
          <a
            className={`${styles.tabLink} ${styles.fullscreenToggle}`}
            role="button"
            onClick={() => setFullscreen((prev) => !prev)}
          >
            {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
          </a>
        </li>
      </ul>
      <div className={styles.tabContent}>
        {tabList.find((tabConf) => tabConf.tab === activeTab)?.content()}
      </div>
    </div>
  );
}
