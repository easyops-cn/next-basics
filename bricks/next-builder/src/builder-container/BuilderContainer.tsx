import React, { useMemo } from "react";
import classNames from "classnames";
import { 
  BuilderRouteOrBrickNode, 
  ContextConf,
  BuilderRouteNode
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
import { BrickOptionItem, ToolboxTab } from "./interfaces";
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
  initialEventStreamActiveNodeUid?: number;
  onNodeAdd?: (event: CustomEvent<EventDetailOfNodeAdd>) => void;
  onNodeReorder?: (event: CustomEvent<EventDetailOfNodeReorder>) => void;
  onNodeMove?: (event: CustomEvent<EventDetailOfNodeMove>) => void;
  onNodeClick?: (event: CustomEvent<BuilderRuntimeNode>) => void;
  onAskForDeletingNode?: (node: BuilderRuntimeNode) => void;
  onToggleFullscreen?: (fullscreen?: boolean) => void;
  onSwitchToolboxTab?: (tab?: ToolboxTab) => void;
  onSwitchEventStreamActiveNode?: (nodeUid?: number) => void;
  onContextUpdate?: (context: ContextConf[]) => void;
  onRouteSelect?: (route:BuilderRouteNode)=>void;
}

export function LegacyBuilderContainer(
  {
    dataSource,
    routeList,
    brickList,
    processing,
    initialFullscreen,
    initialToolboxTab,
    initialEventStreamActiveNodeUid,
    onNodeAdd,
    onNodeReorder,
    onNodeMove,
    onNodeClick,
    onAskForDeletingNode,
    onToggleFullscreen,
    onSwitchToolboxTab,
    onSwitchEventStreamActiveNode,
    onContextUpdate,
    onRouteSelect,
  }: BuilderContainerProps,
  ref: React.Ref<AbstractBuilderDataManager>
): React.ReactElement {
  const [fullscreen, setFullscreen] = React.useState(initialFullscreen);
  const [toolboxTab, setToolboxTab] = React.useState(initialToolboxTab);
  const [
    eventStreamActiveNodeUid,
    setEventStreamActiveNodeUid,
  ] = React.useState(initialEventStreamActiveNodeUid);

  const manager = useBuilderDataManager();

  React.useImperativeHandle(ref, () => manager);

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
      setEventStreamActiveNodeUid(null);
    }
    onSwitchToolboxTab?.(toolboxTab);
  }, [toolboxTab, onSwitchToolboxTab]);

  React.useEffect(() => {
    setEventStreamActiveNodeUid(initialEventStreamActiveNodeUid);
  }, [initialEventStreamActiveNodeUid]);

  React.useEffect(() => {
    onSwitchEventStreamActiveNode?.(eventStreamActiveNodeUid);
  }, [eventStreamActiveNodeUid, onSwitchEventStreamActiveNode]);

  return (
    <BuilderUIContext.Provider
      value={{
        processing,
        fullscreen,
        setFullscreen,
        toolboxTab,
        setToolboxTab,
        eventStreamActiveNodeUid,
        setEventStreamActiveNodeUid,
      }}
    >
      <div
        className={classNames(styles.builderContainer, {
          [styles.fullscreen]: fullscreen,
        })}
      >
        <BuilderToolbox
          brickList={brickList}
          routeList={routeList}
          onContextUpdate={onContextUpdate}
          onRouteSelect={onRouteSelect}
        />
        <BuilderCanvas dataSource={dataSource} />
      </div>
      <BuilderContextMenu onAskForDeletingNode={onAskForDeletingNode} />
    </BuilderUIContext.Provider>
  );
}

export const BuilderContainer = React.forwardRef(LegacyBuilderContainer);
