import React from "react";
import {
  AppstoreAddOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PartitionOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { BrickOptionItem } from "../interfaces";
import { StoryboardTreeView } from "../StoryboardTreeView/StoryboardTreeView";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventsView } from "../EventsView/EventsView";

import styles from "./BuilderToolbox.module.css";

export interface BuilderToolboxProps {
  brickList?: BrickOptionItem[];
}

export enum ToolboxTab {
  LIBRARY = "library",
  TREE_VIEW = "tree-view",
  EVENTS_VIEW = "events-view",
}

export function BuilderToolbox({
  brickList,
}: BuilderToolboxProps): React.ReactElement {
  const { fullscreen, setFullscreen } = useBuilderUIContext();
  const [activeTab, setActiveTab] = React.useState(ToolboxTab.LIBRARY);

  return (
    <div
      className={classNames(styles.builderToolbox, {
        [styles.fullscreen]: fullscreen,
      })}
      data-override-theme="dark"
    >
      <ul className={styles.tabList}>
        <li
          className={classNames({
            [styles.tabActive]: activeTab === ToolboxTab.LIBRARY,
          })}
        >
          <a
            className={styles.tabLink}
            role="button"
            onClick={() => setActiveTab(ToolboxTab.LIBRARY)}
          >
            <AppstoreAddOutlined />
          </a>
        </li>
        <li
          className={classNames({
            [styles.tabActive]: activeTab === ToolboxTab.TREE_VIEW,
          })}
        >
          <a
            className={styles.tabLink}
            role="button"
            onClick={() => setActiveTab(ToolboxTab.TREE_VIEW)}
          >
            <PartitionOutlined />
          </a>
        </li>
        <li
          className={classNames({
            [styles.tabActive]: activeTab === ToolboxTab.EVENTS_VIEW,
          })}
        >
          <a
            className={styles.tabLink}
            role="button"
            onClick={() => setActiveTab(ToolboxTab.EVENTS_VIEW)}
            style={{ fontSize: 12 }}
          >
            <FontAwesomeIcon icon="broadcast-tower" />
          </a>
        </li>
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
        {activeTab === ToolboxTab.LIBRARY && (
          <BrickLibrary brickList={brickList} />
        )}
        {activeTab === ToolboxTab.TREE_VIEW && <StoryboardTreeView />}
        {activeTab === ToolboxTab.EVENTS_VIEW && <EventsView />}
      </div>
    </div>
  );
}
