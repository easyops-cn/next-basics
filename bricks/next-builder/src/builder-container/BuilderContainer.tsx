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
import { BrickOptionItem, BuilderDataType, ToolboxTab } from "./interfaces";
import { BuilderContextMenu } from "./BuilderContextMenu/BuilderContextMenu";
import { BuilderUIContext } from "./BuilderUIContext";

import styles from "./BuilderContainer.module.css";

export interface BuilderContainerProps {
  dataSource?: BuilderRouteOrBrickNode[];
  routeList?: BuilderRouteNode[];
  brickList?: BrickOptionItem[];
  processing?: boolean;
  initialFullscreen?: boolean;
  initialToolboxTab?: ToolboxTab;
  initialEventStreamNodeId?: string;
  onNodeAdd?: (event: CustomEvent<EventDetailOfNodeAdd>) => void;
  onNodeReorder?: (event: CustomEvent<EventDetailOfNodeReorder>) => void;
  onNodeMove?: (event: CustomEvent<EventDetailOfNodeMove>) => void;
  onNodeClick?: (event: CustomEvent<BuilderRuntimeNode>) => void;
  onAskForDeletingNode?: (node: BuilderRuntimeNode) => void;
  onToggleFullscreen?: (fullscreen?: boolean) => void;
  onSwitchToolboxTab?: (tab?: ToolboxTab) => void;
  onSelectEventStreamNode?: (nodeId?: string) => void;
  onContextUpdate?: (context: ContextConf[]) => void;
  onRouteSelect?: (route: BuilderRouteNode) => void;
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
    onNodeAdd,
    onNodeReorder,
    onNodeMove,
    onNodeClick,
    onAskForDeletingNode,
    onToggleFullscreen,
    onSwitchToolboxTab,
    onSelectEventStreamNode,
    onContextUpdate,
    onRouteSelect,
  }: BuilderContainerProps,
  ref: React.Ref<AbstractBuilderDataManager>
): React.ReactElement {
  const [fullscreen, setFullscreen] = React.useState(initialFullscreen);
  const [toolboxTab, setToolboxTab] = React.useState(initialToolboxTab);
  const [eventStreamNodeId, setEventStreamNodeId] = React.useState(
    initialEventStreamNodeId
  );
  const [dataType, setDataType] = React.useState<BuilderDataType>();

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
        case "custom-template":
          type = BuilderDataType.CUSTOM_TEMPLATE;
          break;
        case "routes":
          type = BuilderDataType.ROUTE_OF_ROUTES;
          break;
        // Rest types are currently not supported,
        // such as `"redirect"`.
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
    setToolboxTab(initialToolboxTab);
  }, [initialToolboxTab]);

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

  return (
    <BuilderUIContext.Provider
      value={{
        dataType,
        processing,
        fullscreen,
        setFullscreen,
        toolboxTab,
        setToolboxTab,
        eventStreamNodeId,
        setEventStreamNodeId,
        onRouteSelect,
      }}
    >
      <div
        className={classNames(styles.builderContainer, {
          [styles.fullscreen]: fullscreen,
        })}
      >
        <BuilderToolbox
          brickList={brickList}
          onContextUpdate={onContextUpdate}
        />
        <BuilderCanvas />
      </div>
      <BuilderContextMenu onAskForDeletingNode={onAskForDeletingNode} />
    </BuilderUIContext.Provider>
  );
}

export const BuilderContainer = React.forwardRef(LegacyBuilderContainer);
