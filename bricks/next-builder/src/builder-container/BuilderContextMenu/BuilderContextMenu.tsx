import React from "react";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
  BuilderRuntimeNode,
  isBrickNode,
  isRouteNode,
} from "@next-core/editor-bricks-helper";
import { useTranslation } from "react-i18next";
import { useBuilderUIContext } from "../BuilderUIContext";
import {
  BuilderAppendBrickDetail,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
  ToolboxTab,
} from "../interfaces";
import { useCanPaste } from "./useCanPaste";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./BuilderContextMenu.module.css";
import { BuilderRouteNode } from "@next-core/brick-types";

export interface BuilderContextMenuProps {
  onAskForDeletingNode?: (node: BuilderRuntimeNode) => void;
  onNodeCopyPaste?: (detail: BuilderPasteDetailOfCopy) => void;
  onNodeCutPaste?: (detail: BuilderPasteDetailOfCut) => void;
  onAskForAppendingBrick?: (detail: BuilderAppendBrickDetail) => void;
}

export function BuilderContextMenu({
  onAskForDeletingNode,
  onNodeCopyPaste,
  onNodeCutPaste,
  onAskForAppendingBrick,
}: BuilderContextMenuProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const {
    clipboard,
    setClipboard,
    setToolboxTab,
    setEventStreamNodeId,
    onConvertToTemplate,
    onRouteSelect,
  } = useBuilderUIContext();
  const canPasteCallback = useCanPaste();
  const canPaste = React.useMemo(
    () => canPasteCallback(clipboard, contextMenuStatus.node),
    [canPasteCallback, clipboard, contextMenuStatus.node]
  );
  const [menuPosition, setMenuPosition] = React.useState<React.CSSProperties>();
  const wrapperRef = React.useRef<HTMLDivElement>();

  const handleCloseMenu = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      manager.contextMenuChange({
        active: false,
      });
    },
    [manager]
  );

  const handleDeleteNode = React.useCallback(() => {
    onAskForDeletingNode(contextMenuStatus.node);
  }, [contextMenuStatus.node, onAskForDeletingNode]);

  const handleShowEventsView = React.useCallback(() => {
    setToolboxTab(ToolboxTab.EVENTS_VIEW);
    setEventStreamNodeId(contextMenuStatus.node.id);
  }, [contextMenuStatus.node, setEventStreamNodeId, setToolboxTab]);

  const handleCopyNode = React.useCallback(() => {
    setClipboard({
      type: BuilderClipboardType.COPY,
      sourceId: contextMenuStatus.node.id,
    });
  }, [contextMenuStatus.node, setClipboard]);

  const handleCutNode = React.useCallback(() => {
    setClipboard({
      type: BuilderClipboardType.CUT,
      sourceInstanceId: contextMenuStatus.node.instanceId,
    });
  }, [contextMenuStatus.node, setClipboard]);

  const handlePasteNode = React.useCallback(() => {
    if (clipboard.type === BuilderClipboardType.CUT) {
      onNodeCutPaste({
        sourceInstanceId: clipboard.sourceInstanceId,
        targetInstanceId: contextMenuStatus.node.instanceId,
      });
    } else {
      onNodeCopyPaste({
        sourceId: clipboard.sourceId,
        targetId: contextMenuStatus.node.id,
      });
    }
    setClipboard(null);
  }, [
    clipboard,
    contextMenuStatus.node,
    onNodeCopyPaste,
    onNodeCutPaste,
    setClipboard,
  ]);

  const handleConvertToTemplate = React.useCallback(() => {
    onConvertToTemplate(contextMenuStatus.node);
  }, [contextMenuStatus.node, onConvertToTemplate]);

  const activeNodeIsBrick = React.useMemo(
    () => !!contextMenuStatus.node && isBrickNode(contextMenuStatus.node),
    [contextMenuStatus.node]
  );

  const activeNodeIsRoute = React.useMemo(
    () => !!contextMenuStatus.node && isRouteNode(contextMenuStatus.node),
    [contextMenuStatus.node]
  );

  const handleAppendBrick = React.useCallback(() => {
    onAskForAppendingBrick({
      node: contextMenuStatus.node,
      defaultSort: Math.max(
        manager
          .getData()
          .edges.filter((edge) => edge.parent === contextMenuStatus.node.$$uid)
          .length
      ),
    });
  }, [contextMenuStatus.node, manager, onAskForAppendingBrick]);

  const handleViewRoute = React.useCallback(() => {
    onRouteSelect(contextMenuStatus.node as BuilderRouteNode);
  }, [contextMenuStatus.node, onRouteSelect]);

  React.useEffect(() => {
    // Keep menu in viewport.
    const menu = wrapperRef.current?.firstElementChild as HTMLElement;
    if (menu) {
      const { width, height } = menu.getBoundingClientRect();
      setMenuPosition({
        left:
          contextMenuStatus.x + width > document.documentElement.clientWidth
            ? contextMenuStatus.x - width
            : contextMenuStatus.x,
        top:
          contextMenuStatus.y + height > document.documentElement.clientHeight
            ? contextMenuStatus.y - height
            : contextMenuStatus.y,
      });
    } else {
      setMenuPosition({
        left: -9999,
        top: -9999,
      });
    }
  }, [contextMenuStatus]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        display: contextMenuStatus.active ? "block" : "none",
      }}
      ref={wrapperRef}
      onClick={handleCloseMenu}
      onContextMenu={handleCloseMenu}
    >
      {contextMenuStatus.active && (
        <Menu
          prefixCls="ant-dropdown-menu"
          style={{
            width: "fit-content",
            ...menuPosition,
          }}
        >
          {activeNodeIsRoute && (
            <Menu.Item key="view-route" onClick={handleViewRoute}>
              {t(K.NODE_ACTION_VIEW_ROUTE)}
            </Menu.Item>
          )}
          {activeNodeIsBrick && (
            <Menu.Item key="events-view" onClick={handleShowEventsView}>
              {t(K.NODE_ACTION_EVENTS_VIEW)}
            </Menu.Item>
          )}
          <Menu.Item
            key="copy"
            onClick={handleCopyNode}
            disabled={!activeNodeIsBrick}
          >
            {t(K.NODE_ACTION_COPY)}
          </Menu.Item>
          <Menu.Item
            key="cut"
            onClick={handleCutNode}
            disabled={!activeNodeIsBrick}
          >
            {t(K.NODE_ACTION_CUT)}
          </Menu.Item>
          <Menu.Item key="paste" onClick={handlePasteNode} disabled={!canPaste}>
            {t(K.NODE_ACTION_PASTE)}
          </Menu.Item>
          <Menu.Item
            key="convert-to-template"
            onClick={handleConvertToTemplate}
            disabled={!activeNodeIsBrick}
          >
            {t(K.NODE_ACTION_CONVERT_TO_TEMPLATE)}
          </Menu.Item>
          {activeNodeIsBrick && (
            <Menu.Item key="append-brick" onClick={handleAppendBrick}>
              {t(K.NODE_ACTION_APPEND_BRICK)}
            </Menu.Item>
          )}
          <Menu.Item key="delete" onClick={handleDeleteNode}>
            {t(K.NODE_ACTION_DELETE)}
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}
