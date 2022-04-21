import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Divider, Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { looseCheckIfByTransform } from "@next-core/brick-kit";
import { ActionClickDetail } from "../shared/workbench/interfaces";
import type { BuilderClipboard } from "../builder-container/interfaces";
import { useCanPaste } from "../builder-container/BuilderContextMenu/useCanPaste";

import styles from "./WorkbenchContextMenu.module.css";

export interface WorkbenchContextMenuProps {
  menu: ContextMenuItem[];
  clipboard?: BuilderClipboard;
  onActionClick?(detail: ActionClickDetail): void;
}

export type ContextMenuItem = ContextMenuAction | ContextMenuDivider;

export interface ContextMenuAction {
  action: string;
  text: string;
  disabled?: boolean;
  if?: string | boolean;
}

export interface ContextMenuDivider {
  divider: true;
  if?: string | boolean;
}

export function WorkbenchContextMenu({
  menu,
  clipboard,
  onActionClick,
}: WorkbenchContextMenuProps): React.ReactElement {
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const [menuPosition, setMenuPosition] = useState<React.CSSProperties>();
  const wrapperRef = useRef<HTMLDivElement>();

  const canPasteCallback = useCanPaste();
  const canPaste = useMemo(
    () => canPasteCallback(clipboard, contextMenuStatus.node),
    [canPasteCallback, clipboard, contextMenuStatus.node]
  );

  const handleCloseMenu = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      manager.contextMenuChange({
        active: false,
      });
    },
    [manager]
  );

  useEffect(() => {
    // Keep menu in viewport.
    const menuElement = wrapperRef.current?.firstElementChild as HTMLElement;
    if (menuElement) {
      const { width, height } = menuElement.getBoundingClientRect();
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
          className={styles.dropdownMenu}
          style={{
            ...menuPosition,
          }}
        >
          {menu.map((item, index) =>
            looseCheckIfByTransform(item, contextMenuStatus.node) ? (
              isDivider(item) ? (
                <Divider key={index} />
              ) : (
                <Menu.Item
                  key={item.action}
                  disabled={
                    // We customize default behaviors for certain actions.
                    typeof item.disabled === "boolean"
                      ? item.disabled
                      : item.action === "paste"
                      ? !canPaste
                      : item.action === "clear-clipboard"
                      ? !clipboard
                      : undefined
                  }
                  onClick={() => {
                    onActionClick({
                      action: item.action,
                      data: contextMenuStatus.node,
                      ...(item.action === "paste"
                        ? {
                            clipboard,
                          }
                        : null),
                    });
                  }}
                >
                  {item.text}
                  {item.action === "paste" && clipboard?.nodeAlias && (
                    <span className={styles.pasteNameWrapper}>
                      (
                      <span className={styles.pasteName}>
                        {clipboard.nodeAlias}
                      </span>
                      )
                    </span>
                  )}
                </Menu.Item>
              )
            ) : null
          )}
        </Menu>
      )}
    </div>
  );
}

function isDivider(item: ContextMenuItem): item is ContextMenuDivider {
  return !!(item as ContextMenuDivider).divider;
}
