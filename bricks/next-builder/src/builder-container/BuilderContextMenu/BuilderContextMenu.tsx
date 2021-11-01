import React from "react";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
  BuilderRuntimeNode,
  isBrickNode,
  isRouteNode,
  useBuilderData,
} from "@next-core/editor-bricks-helper";
import { BuilderRouteNode } from "@next-core/brick-types";
import { useTranslation } from "react-i18next";
import { useBuilderUIContext } from "../BuilderUIContext";
import {
  BuilderAppendBrickOrRouteDetail,
  BuilderClipboard,
  BuilderClipboardOfCopy,
  BuilderClipboardOfCut,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
  ToolboxTab,
} from "../interfaces";
import { useCanPaste } from "./useCanPaste";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./BuilderContextMenu.module.css";

export interface BuilderContextMenuProps {
  onAskForDeletingNode?: (node: BuilderRuntimeNode) => void;
  onNodeCopy?: (detail: BuilderClipboardOfCopy) => void;
  onNodeCut?: (detail: BuilderClipboardOfCut) => void;
  onNodeCopyPaste?: (detail: BuilderPasteDetailOfCopy) => void;
  onNodeCutPaste?: (detail: BuilderPasteDetailOfCut) => void;
  onClipboardClear?: () => void;
  onAskForAppendingBrick?: (detail: BuilderAppendBrickOrRouteDetail) => void;
  onAskForAppendingRoute?: (detail: BuilderAppendBrickOrRouteDetail) => void;
}

export function BuilderContextMenu({
  onAskForDeletingNode,
  onNodeCopy,
  onNodeCut,
  onNodeCopyPaste,
  onNodeCutPaste,
  onClipboardClear,
  onAskForAppendingBrick,
  onAskForAppendingRoute,
}: BuilderContextMenuProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const { rootId } = useBuilderData();
  const {
    clipboard,
    migrateClipboard,
    legacySetClipboard,
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
    const data: BuilderClipboard = {
      type: BuilderClipboardType.COPY,
      sourceId: contextMenuStatus.node.id,
      nodeType: contextMenuStatus.node.type,
      nodeAlias: contextMenuStatus.node.alias,
    };
    onNodeCopy(data);
    legacySetClipboard(data);
  }, [contextMenuStatus.node, onNodeCopy, legacySetClipboard]);

  const handleCutNode = React.useCallback(() => {
    const data: BuilderClipboard = {
      type: BuilderClipboardType.CUT,
      sourceInstanceId: contextMenuStatus.node.instanceId,
      nodeType: contextMenuStatus.node.type,
      nodeAlias: contextMenuStatus.node.alias,
    };
    onNodeCut(data);
    legacySetClipboard(data);
  }, [contextMenuStatus.node, onNodeCut, legacySetClipboard]);

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
    legacySetClipboard(null);
  }, [
    clipboard,
    contextMenuStatus.node,
    onNodeCopyPaste,
    onNodeCutPaste,
    legacySetClipboard,
  ]);

  const handleClearClipboard = React.useCallback(() => {
    onClipboardClear();
  }, [onClipboardClear]);

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

  const activeNodeIsRoot = React.useMemo(
    () => !!contextMenuStatus.node && contextMenuStatus.node.$$uid === rootId,
    [contextMenuStatus.node, rootId]
  );

  const canCopyOrCut = React.useMemo(
    () => !activeNodeIsRoot && (activeNodeIsBrick || activeNodeIsRoute),
    [activeNodeIsBrick, activeNodeIsRoot, activeNodeIsRoute]
  );

  const canAppendRoute = React.useMemo(
    () =>
      !!contextMenuStatus.node &&
      (contextMenuStatus.node.type === "brick" ||
        contextMenuStatus.node.type === "routes"),
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

  const handleAppendRoute = React.useCallback(() => {
    onAskForAppendingRoute({
      node: contextMenuStatus.node,
    });
  }, [contextMenuStatus.node, onAskForAppendingRoute]);

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
          {activeNodeIsRoute && !activeNodeIsRoot && (
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
            disabled={!canCopyOrCut}
          >
            {t(K.NODE_ACTION_COPY)}
          </Menu.Item>
          <Menu.Item key="cut" onClick={handleCutNode} disabled={!canCopyOrCut}>
            {t(K.NODE_ACTION_CUT)}
          </Menu.Item>
          <Menu.Item key="paste" onClick={handlePasteNode} disabled={!canPaste}>
            {t(K.NODE_ACTION_PASTE)}
            {clipboard?.nodeAlias ? (
              <span className={styles.pasteNameWrapper}>
                (<span className={styles.pasteName}>{clipboard.nodeAlias}</span>
                )
              </span>
            ) : null}
          </Menu.Item>
          {migrateClipboard && (
            <Menu.Item
              key="clear-clipboard"
              onClick={handleClearClipboard}
              disabled={!clipboard}
            >
              {t(K.NODE_ACTION_CLEAR_CLIPBOARD)}
            </Menu.Item>
          )}
          {!activeNodeIsRoot && (
            <Menu.Item
              key="convert-to-template"
              onClick={handleConvertToTemplate}
              disabled={!activeNodeIsBrick}
            >
              {t(K.NODE_ACTION_CONVERT_TO_TEMPLATE)}
            </Menu.Item>
          )}
          {activeNodeIsBrick && (
            <Menu.Item key="append-brick" onClick={handleAppendBrick}>
              {t(K.NODE_ACTION_APPEND_BRICK)}
            </Menu.Item>
          )}
          {canAppendRoute && (
            <Menu.Item key="append-route" onClick={handleAppendRoute}>
              {t(K.NODE_ACTION_APPEND_ROUTE)}
            </Menu.Item>
          )}
          {!activeNodeIsRoot && (
            <Menu.Item key="delete" onClick={handleDeleteNode}>
              {t(K.NODE_ACTION_DELETE)}
            </Menu.Item>
          )}
        </Menu>
      )}
    </div>
  );
}
