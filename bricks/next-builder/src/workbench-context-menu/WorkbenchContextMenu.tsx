// istanbul ignore file: working in progress
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Divider, Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { looseCheckIfByTransform } from "@next-core/brick-kit";
import { ActionClickDetail } from "../shared/workbench/interfaces";

import styles from "./WorkbenchContextMenu.module.css";

export interface WorkbenchContextMenuProps {
  menu: ContextMenuItem[];
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
  onActionClick,
}: WorkbenchContextMenuProps): React.ReactElement {
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const [menuPosition, setMenuPosition] = useState<React.CSSProperties>();
  const wrapperRef = useRef<HTMLDivElement>();

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
                  disabled={item.disabled}
                  onClick={() => {
                    onActionClick({
                      action: item.action,
                      data: contextMenuStatus.node,
                    });
                  }}
                >
                  {item.text}
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
