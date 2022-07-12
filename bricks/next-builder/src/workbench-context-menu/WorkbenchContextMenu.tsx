import React, { useEffect, useRef, useState } from "react";
import { Divider, Menu } from "antd";
import { BuilderContextMenuStatus } from "@next-core/editor-bricks-helper";
import { looseCheckIfByTransform } from "@next-core/brick-kit";
import { ActionClickDetail } from "../shared/workbench/interfaces";
import type { BuilderClipboard } from "../builder-container/interfaces";

import styles from "./WorkbenchContextMenu.module.css";

export interface WorkbenchContextMenuProps {
  contextMenuStatus?: BuilderContextMenuStatus;
  menu: ContextMenuItem[];
  clipboard?: BuilderClipboard;
  canPaste?: boolean;
  onActionClick?(detail: ActionClickDetail): void;
  handleCloseMenu?: (event: React.MouseEvent) => void;
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
  contextMenuStatus,
  menu,
  clipboard,
  canPaste,
  onActionClick,
  handleCloseMenu,
}: WorkbenchContextMenuProps): React.ReactElement {
  const [menuPosition, setMenuPosition] = useState<React.CSSProperties>();
  const wrapperRef = useRef<HTMLDivElement>();

  const isPaste = (action: string): boolean => {
    return action.includes("paste");
  };

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
                      : isPaste(item.action)
                      ? !canPaste
                      : item.action === "clear-clipboard"
                      ? !clipboard
                      : undefined
                  }
                  onClick={() => {
                    onActionClick({
                      action: item.action,
                      data: contextMenuStatus.node,
                      ...(isPaste(item.action)
                        ? {
                            clipboard,
                          }
                        : null),
                    });
                  }}
                >
                  {item.text}
                  {isPaste(item.action) && clipboard?.nodeAlias && (
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
