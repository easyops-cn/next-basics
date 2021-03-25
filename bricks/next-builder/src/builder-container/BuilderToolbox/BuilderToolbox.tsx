import React, { useEffect } from "react";
import {
  PartitionOutlined,
  DatabaseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ContextConf } from "@next-core/brick-types";
import { JsonStorage } from "@next-libs/storage";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { BuilderDataType, ToolboxTab } from "../interfaces";
import { StoryboardTreeView } from "../StoryboardTreeView/StoryboardTreeView";
import { useBuilderUIContext } from "../BuilderUIContext";
import { EventsView } from "../EventsView/EventsView";
import { DataView } from "../DataView/DataView";
import {
  useBuilderDataManager,
  useShowRelatedNodesBasedOnEvents,
} from "@next-core/editor-bricks-helper";
import { localStorageKeyForShowRelatedNodesBasedOnEvents } from "../constants";

import styles from "./BuilderToolbox.module.css";

export interface BuilderToolboxProps {
  onContextUpdate?: (context: ContextConf[]) => void;
}

interface ToolboxTabConf {
  tab: ToolboxTab;
  icon: () => React.ReactElement;
  content: () => React.ReactElement;
  availableDataTypes?: BuilderDataType[];
}

interface ToolboxResizerStatus {
  startWidth: number;
  startX: number;
}

const toolboxWidthKey = "next-builder-toolbox-width";
const defaultToolboxWidth = 273;
const minToolboxWidth = defaultToolboxWidth;

export function BuilderToolbox({
  onContextUpdate,
}: BuilderToolboxProps): React.ReactElement {
  const {
    dataType,
    toolboxTab: activeTab,
    setToolboxTab: setActiveTab,
  } = useBuilderUIContext();
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [toolboxWidth, setToolboxWidth] = React.useState(
    storage.getItem(toolboxWidthKey) ?? defaultToolboxWidth
  );
  const [
    resizerStatus,
    setResizerStatus,
  ] = React.useState<ToolboxResizerStatus>(null);
  const [resized, setResized] = React.useState(false);

  const manager = useBuilderDataManager();
  const showRelatedEvents = useShowRelatedNodesBasedOnEvents();

  useEffect(() => {
    const showFromStorage = storage.getItem(
      localStorageKeyForShowRelatedNodesBasedOnEvents
    );
    const shouldShow = activeTab === ToolboxTab.EVENTS_VIEW || showFromStorage;
    if (shouldShow !== showRelatedEvents) {
      manager.setShowRelatedNodesBasedOnEvents(shouldShow);
    }
  }, [activeTab]);

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
        return <PlusOutlined />;
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
        return <DataView onContextUpdate={onContextUpdate} />;
      },
      availableDataTypes: [
        BuilderDataType.ROUTE_OF_BRICKS,
        BuilderDataType.ROUTE_OF_ROUTES,
      ],
    },
  ];

  const handleColResizeMouseDown = React.useCallback(
    (event: React.MouseEvent) => {
      // Prevent text selecting.
      event.preventDefault();
      setResizerStatus({
        startWidth: toolboxWidth,
        startX: event.clientX,
      });
      setResized(false);
    },
    [toolboxWidth]
  );

  React.useEffect(() => {
    if (!resizerStatus) {
      return;
    }

    const handleColResizeMouseMove = (event: MouseEvent): void => {
      setResized(true);
      setToolboxWidth(
        Math.max(
          minToolboxWidth,
          Math.min(
            document.documentElement.clientWidth - 300,
            resizerStatus.startWidth + event.clientX - resizerStatus.startX
          )
        )
      );
    };

    const handleColResizeMouseUp = (): void => {
      setResizerStatus(null);
    };

    window.addEventListener("mousemove", handleColResizeMouseMove);
    window.addEventListener("mouseup", handleColResizeMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleColResizeMouseMove);
      window.removeEventListener("mouseup", handleColResizeMouseUp);
    };
  }, [resizerStatus]);

  React.useEffect(() => {
    if (!resizerStatus && resized) {
      storage.setItem(toolboxWidthKey, toolboxWidth);
    }
  }, [resized, resizerStatus, storage, toolboxWidth]);

  return (
    <div
      className={styles.builderToolbox}
      data-override-theme="dark"
      style={{
        width: toolboxWidth,
      }}
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
      </ul>
      <div className={styles.tabContent}>
        {tabList.find((tabConf) => tabConf.tab === activeTab)?.content()}
      </div>
      <div
        className={classNames(styles.toolboxResizer, {
          [styles.toolboxResizerActive]: !!resizerStatus,
        })}
        onMouseDown={handleColResizeMouseDown}
      >
        {/* Use a fullscreen mask to keep cursor status when dragging the resizer. */}
        <div className={styles.toolboxResizerMask} />
      </div>
    </div>
  );
}
