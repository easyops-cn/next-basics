import React from "react";
import classNames from "classnames";
import {
  BuilderRouteOrBrickNode,
  ContextConf,
  BuilderRouteNode,
  BuilderCustomTemplateNode,
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
  BuilderCanvasType,
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
import { EventStreamNode } from "./EventStreamCanvas/interfaces";

import styles from "./BuilderContainer.module.css";

export interface BuilderContainerProps extends BuilderContextMenuProps {
  appId?: string;
  dataSource?: BuilderRouteOrBrickNode[];
  routeList?: BuilderRouteNode[];
  brickList?: BrickOptionItem[];
  processing?: boolean;
  initialFullscreen?: boolean;
  initialToolboxTab?: ToolboxTab;
  initialEventStreamNodeId?: string;
  initialClipboardType?: BuilderClipboardType;
  initialClipboardSource?: string;
  initialCanvasType?: BuilderCanvasType;
  initialStoryboardQuery?: string;
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
  onTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
  onCurrentRouteClick?: (route: BuilderRouteNode) => void;
  onCurrentTemplateClick?: (template: BuilderCustomTemplateNode) => void;
  onBuildAndPush?: () => void;
  onPreview?: () => void;
  onEventNodeClick?: (eventNode: EventStreamNode) => void;
  onConvertToTemplate?: (node: BuilderRuntimeNode) => void;
  onWorkbenchClose?: () => void;
  onSwitchCanvasType?: (canvasType: BuilderCanvasType) => void;
  onStoryboardQueryUpdate?: (storyboardQuery: string) => void;
}

export function LegacyBuilderContainer(
  {
    appId,
    dataSource,
    routeList,
    brickList,
    processing,
    initialFullscreen,
    initialToolboxTab,
    initialEventStreamNodeId,
    initialClipboardType,
    initialClipboardSource,
    initialCanvasType,
    initialStoryboardQuery,
    onNodeAdd,
    onNodeReorder,
    onNodeMove,
    onNodeClick,
    onAskForDeletingNode,
    onAskForAppendingBrick,
    onToggleFullscreen,
    onSwitchToolboxTab,
    onSelectEventStreamNode,
    onClipboardChange,
    onNodeCopyPaste,
    onNodeCutPaste,
    onContextUpdate,
    onRouteSelect,
    onTemplateSelect,
    onCurrentRouteClick,
    onCurrentTemplateClick,
    onBuildAndPush,
    onPreview,
    onEventNodeClick,
    onConvertToTemplate,
    onWorkbenchClose,
    onSwitchCanvasType,
    onStoryboardQueryUpdate,
  }: BuilderContainerProps,
  ref: React.Ref<AbstractBuilderDataManager>
): React.ReactElement {
  const [fullscreen, setFullscreen] = React.useState(initialFullscreen);
  const [highlightNodes, setHighlightNodes] = React.useState(new Set<number>());

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

  const memoCanvasType = React.useMemo(() => initialCanvasType, [
    initialCanvasType,
  ]);
  const [canvasType, setCanvasType] = React.useState(memoCanvasType);

  const memoStoryboardQuery = React.useMemo(() => initialStoryboardQuery, [
    initialStoryboardQuery,
  ]);
  const [storyboardQuery, setStoryboardQuery] = React.useState(
    memoStoryboardQuery
  );

  const manager = useBuilderDataManager();

  React.useImperativeHandle(ref, () => manager);

  React.useEffect(() => {
    setCanvasType(memoCanvasType);
  }, [memoCanvasType]);

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
    // If the canvas type is not specified, set to portal canvas if the
    // canvas is not empty and has only portal bricks in first level,
    // otherwise set to main canvas.
    if (!initialCanvasType) {
      const { rootId, nodes, edges } = manager.getData();
      const rootChildNodes = edges
        .filter((edge) => edge.parent === rootId)
        .map((edge) => nodes.find((node) => node.$$uid === edge.child));
      const newCanvasType =
        rootChildNodes.length > 0 &&
        !rootChildNodes.some((node) => !node.portal)
          ? BuilderCanvasType.PORTAL
          : BuilderCanvasType.MAIN;
      setCanvasType(newCanvasType);
    }
  }, [initialCanvasType, manager]);

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

  React.useEffect(() => {
    onSwitchCanvasType?.(canvasType);
  }, [canvasType, onSwitchCanvasType]);

  React.useEffect(() => {
    setStoryboardQuery(memoStoryboardQuery);
  }, [memoStoryboardQuery]);

  React.useEffect(() => {
    onStoryboardQueryUpdate?.(storyboardQuery);
  }, [storyboardQuery, onStoryboardQueryUpdate]);

  const handleClickOverlay = (): void => {
    onWorkbenchClose?.();
  };

  return (
    <BuilderUIContext.Provider
      value={{
        appId,
        dataType,
        brickList,
        processing,
        fullscreen,
        setFullscreen,
        toolboxTab,
        setToolboxTab,
        highlightNodes,
        setHighlightNodes,
        eventStreamNodeId,
        setEventStreamNodeId,
        clipboard,
        setClipboard,
        canvasType,
        setCanvasType,
        storyboardQuery,
        setStoryboardQuery,
        onRouteSelect,
        onTemplateSelect,
        onCurrentRouteClick,
        onCurrentTemplateClick,
        onBuildAndPush,
        onPreview,
        onEventNodeClick,
        onConvertToTemplate,
        onWorkbenchClose,
      }}
    >
      <div
        className={classNames(styles.builderWrapper, {
          [styles.fullscreen]: fullscreen,
        })}
      >
        <div
          className={styles.builderOverlay}
          onClick={handleClickOverlay}
        ></div>
        <div className={styles.builderContainer}>
          <BuilderToolbar />
          <div className={styles.builderBodyWrapper}>
            <BuilderToolbox onContextUpdate={onContextUpdate} />
            <BuilderCanvas />
          </div>
        </div>
        <BuilderContextMenu
          onAskForDeletingNode={onAskForDeletingNode}
          onAskForAppendingBrick={onAskForAppendingBrick}
          onNodeCopyPaste={onNodeCopyPaste}
          onNodeCutPaste={onNodeCutPaste}
        />
      </div>
    </BuilderUIContext.Provider>
  );
}

export const BuilderContainer = React.forwardRef(LegacyBuilderContainer);
