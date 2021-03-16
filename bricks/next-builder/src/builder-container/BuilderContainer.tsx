import React from "react";
import classNames from "classnames";
import {
  BuilderRouteOrBrickNode,
  ContextConf,
  BuilderRouteNode,
} from "@next-core/brick-types";
import {
  AbstractBuilderDataManager,
  BuilderRuntimeNode,
  EventDetailOfNodeAdd,
  EventDetailOfNodeMove,
  EventDetailOfNodeReorder,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { BuilderToolbox } from "./BuilderToolbox/BuilderToolbox";
import { BuilderCanvas } from "./BuilderCanvas/BuilderCanvas";
import {
  BrickOptionItem,
  BuilderClipboard,
  BuilderClipboardType,
  BuilderDataType,
  ToolboxTab,
} from "./interfaces";
import {
  BuilderContextMenu,
  BuilderContextMenuProps,
} from "./BuilderContextMenu/BuilderContextMenu";
import { BuilderUIContext } from "./BuilderUIContext";
import { BuilderToolbar } from "./BuilderToolbar/BuilderToolbar";
import { getBuilderClipboard } from "./getBuilderClipboard";
import { defaultToolboxTab } from "./constants";

import styles from "./BuilderContainer.module.css";

export interface BuilderContainerProps extends BuilderContextMenuProps {
  dataSource?: BuilderRouteOrBrickNode[];
  routeList?: BuilderRouteNode[];
  brickList?: BrickOptionItem[];
  processing?: boolean;
  initialFullscreen?: boolean;
  initialToolboxTab?: ToolboxTab;
  initialEventStreamNodeId?: string;
  initialClipboardType?: BuilderClipboardType;
  initialClipboardSource?: string;
  onNodeAdd?: (event: CustomEvent<EventDetailOfNodeAdd>) => void;
  onNodeReorder?: (event: CustomEvent<EventDetailOfNodeReorder>) => void;
  onNodeMove?: (event: CustomEvent<EventDetailOfNodeMove>) => void;
  onNodeClick?: (event: CustomEvent<BuilderRuntimeNode>) => void;
  onToggleFullscreen?: (fullscreen?: boolean) => void;
  onSwitchToolboxTab?: (tab?: ToolboxTab) => void;
  onSelectEventStreamNode?: (nodeId?: string) => void;
  onClipboardChange?: (clipboard: BuilderClipboard) => void;
  onContextUpdate?: (context: ContextConf[]) => void;
  onRouteSelect?: (route: BuilderRouteNode) => void;
  onCurrentRouteClick?: (route: BuilderRouteNode) => void;
  onBuildAndPush?: () => void;
  onPreview?: () => void;
}

export function LegacyBuilderContainer(
  {
    dataSource,
    routeList,
    brickList,
    processing,
    initialFullscreen,
    initialToolboxTab,
    initialEventStreamNodeId,
    initialClipboardType,
    initialClipboardSource,
    onNodeAdd,
    onNodeReorder,
    onNodeMove,
    onNodeClick,
    onAskForDeletingNode,
    onToggleFullscreen,
    onSwitchToolboxTab,
    onSelectEventStreamNode,
    onClipboardChange,
    onNodeCopyPaste,
    onNodeCutPaste,
    onContextUpdate,
    onRouteSelect,
    onCurrentRouteClick,
    onBuildAndPush,
    onPreview,
  }: BuilderContainerProps,
  ref: React.Ref<AbstractBuilderDataManager>
): React.ReactElement {
  const [fullscreen, setFullscreen] = React.useState(initialFullscreen);
  const memoToolboxTab = React.useMemo(
    () => initialToolboxTab ?? defaultToolboxTab,
    [initialToolboxTab]
  );
  const [toolboxTab, setToolboxTab] = React.useState(memoToolboxTab);
  const [eventStreamNodeId, setEventStreamNodeId] = React.useState(
    initialEventStreamNodeId
  );
  const [dataType, setDataType] = React.useState<BuilderDataType>();
  const memoClipboard = React.useMemo(
    () => getBuilderClipboard(initialClipboardType, initialClipboardSource),
    [initialClipboardType, initialClipboardSource]
  );
  const [clipboard, setClipboard] = React.useState<BuilderClipboard>(
    memoClipboard
  );

  const manager = useBuilderDataManager();

  React.useImperativeHandle(ref, () => manager);

  React.useEffect(() => {
    let type = BuilderDataType.UNKNOWN;
    let rootNode: BuilderRouteOrBrickNode;
    if (dataSource?.length === 1) {
      rootNode = dataSource[0];
      switch (rootNode.type) {
        case "bricks":
          type = BuilderDataType.ROUTE_OF_BRICKS;
          break;
        case "routes":
          type = BuilderDataType.ROUTE_OF_ROUTES;
          break;
        case "redirect":
          type = BuilderDataType.ROUTE_OF_REDIRECT;
          break;
        case "custom-template":
          type = BuilderDataType.CUSTOM_TEMPLATE;
          break;
        // Rest types are currently not supported,
        // such as `"brick"`.
      }
    }
    if (type !== BuilderDataType.UNKNOWN) {
      manager.dataInit(dataSource[0]);
    } else {
      // eslint-disable-next-line no-console
      console.error("Unexpected dataSource", dataSource);
    }
    setDataType(type);
  }, [dataSource, manager]);

  React.useEffect(() => {
    manager.routeListInit(routeList);
  }, [routeList, manager]);

  React.useEffect(() => {
    const removeListenersOfNodeAdd = manager.onNodeAdd(onNodeAdd);
    const removeListenersOfNodeMove = manager.onNodeMove(onNodeMove);
    const removeListenersOfNodeReorder = manager.onNodeReorder(onNodeReorder);
    const removeListenersOfNodeClick = manager.onNodeClick(onNodeClick);
    return () => {
      removeListenersOfNodeAdd();
      removeListenersOfNodeMove();
      removeListenersOfNodeReorder();
      removeListenersOfNodeClick();
    };
  }, [manager, onNodeAdd, onNodeClick, onNodeMove, onNodeReorder]);

  React.useEffect(() => {
    setFullscreen(initialFullscreen);
  }, [initialFullscreen]);

  React.useEffect(() => {
    onToggleFullscreen?.(fullscreen);
  }, [fullscreen, onToggleFullscreen]);

  React.useEffect(() => {
    setToolboxTab(memoToolboxTab);
  }, [memoToolboxTab]);

  React.useEffect(() => {
    if (toolboxTab !== ToolboxTab.EVENTS_VIEW) {
      setEventStreamNodeId(null);
    }
    onSwitchToolboxTab?.(toolboxTab);
  }, [toolboxTab, onSwitchToolboxTab]);

  React.useEffect(() => {
    setEventStreamNodeId(initialEventStreamNodeId);
  }, [initialEventStreamNodeId]);

  React.useEffect(() => {
    onSelectEventStreamNode?.(eventStreamNodeId);
  }, [eventStreamNodeId, onSelectEventStreamNode]);

  React.useEffect(() => {
    setClipboard(memoClipboard);
  }, [memoClipboard]);

  React.useEffect(() => {
    onClipboardChange?.(clipboard);
  }, [clipboard, onClipboardChange]);

  return (
    <BuilderUIContext.Provider
      value={{
        dataType,
        brickList,
        processing,
        fullscreen,
        setFullscreen,
        toolboxTab,
        setToolboxTab,
        eventStreamNodeId,
        setEventStreamNodeId,
        clipboard,
        setClipboard,
        onRouteSelect,
        onCurrentRouteClick,
        onBuildAndPush,
        onPreview,
      }}
    >
      <div
        className={classNames(styles.builderContainer, {
          [styles.fullscreen]: fullscreen,
        })}
      >
        <BuilderToolbar />
        <div className={styles.builderWrapper}>
          <BuilderToolbox
            brickList={brickList}
            onContextUpdate={onContextUpdate}
          />
          <BuilderCanvas />
        </div>
      </div>
      <BuilderContextMenu
        onAskForDeletingNode={onAskForDeletingNode}
        onNodeCopyPaste={onNodeCopyPaste}
        onNodeCutPaste={onNodeCutPaste}
      />
    </BuilderUIContext.Provider>
  );
}

export const BuilderContainer = React.forwardRef(LegacyBuilderContainer);
