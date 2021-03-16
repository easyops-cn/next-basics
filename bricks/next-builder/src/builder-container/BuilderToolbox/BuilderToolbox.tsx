import React from "react";
import {
  FullscreenExitOutlined,
  FullscreenOutlined,
  PartitionOutlined,
  DatabaseOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ContextConf } from "@next-core/brick-types";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { BrickOptionItem, BuilderDataType, ToolboxTab } from "../interfaces";
import { StoryboardTreeView } from "../StoryboardTreeView/StoryboardTreeView";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventsView } from "../EventsView/EventsView";
import { DataView } from "../DataView/DataView";

import styles from "./BuilderToolbox.module.css";

export interface BuilderToolboxProps {
  brickList?: BrickOptionItem[];
  onContextUpdate?: (context: ContextConf[]) => void;
}

interface ToolboxTabConf {
  tab: ToolboxTab;
  icon: () => React.ReactElement;
  content: () => React.ReactElement;
  availableDataTypes?: BuilderDataType[];
}

React.createElement;

export function BuilderToolbox({
  brickList,
  onContextUpdate,
}: BuilderToolboxProps): React.ReactElement {
  const {
    dataType,
    fullscreen,
    setFullscreen,
    toolboxTab: activeTab,
    setToolboxTab: setActiveTab,
  } = useBuilderUIContext();
  const tabList: ToolboxTabConf[] = [
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
      tab: ToolboxTab.LIBRARY,
      icon() {
        return <PlusSquareOutlined />;
      },
      content() {
        return <BrickLibrary />;
      },
      availableDataTypes: [
        BuilderDataType.ROUTE_OF_BRICKS,
        BuilderDataType.CUSTOM_TEMPLATE,
      ],
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
      availableDataTypes: [
        BuilderDataType.ROUTE_OF_BRICKS,
        BuilderDataType.CUSTOM_TEMPLATE,
      ],
    },
    {
      tab: ToolboxTab.DATA_VIEW,
      icon() {
        return <DatabaseOutlined />;
      },
      content() {
        return (
          <DataView onContextUpdate={onContextUpdate} />
        );
      },
      availableDataTypes: [
        BuilderDataType.ROUTE_OF_BRICKS,
        BuilderDataType.ROUTE_OF_ROUTES,
      ],
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
        {tabList.map(
          (tabConf) =>
            (!tabConf.availableDataTypes ||
              tabConf.availableDataTypes.includes(dataType)) && (
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
            )
        )}
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
