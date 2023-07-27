import React from "react";
import { Menu } from "antd";
import styles from "./LibraryMenu.module.css";
import sharedStyles from "../../shared/scrollbar.module.css";
import { LibraryMenuItem } from "../interfaces";
import classNames from "classnames";

interface LibraryMenuProps {
  defaultSelectedKeys?: string[];
  menuItems: LibraryMenuItem[];
  onItemClick?: (key: string) => void;
}

export function LibraryMenu({
  menuItems,
  defaultSelectedKeys,
  onItemClick,
}: LibraryMenuProps): React.ReactElement {
  const renderMenuItem = (item: LibraryMenuItem): React.ReactNode => {
    const list = item.children.map((row) => (
      <Menu.Item key={row.key}>{row.text}</Menu.Item>
    ));

    return item.type === "group" ? (
      <Menu.ItemGroup key={item.key} title={item.title}>
        {list}
      </Menu.ItemGroup>
    ) : (
      list
    );
  };

  const handleClick = (data: any): void => {
    onItemClick?.(data.key);
  };

  return (
    <div
      className={classNames(
        styles.menuContainer,
        sharedStyles.customScrollbarContainer
      )}
    >
      <Menu
        mode="inline"
        onClick={handleClick}
        defaultSelectedKeys={defaultSelectedKeys}
      >
        {menuItems?.map((item) => renderMenuItem(item))}
      </Menu>
    </div>
  );
}
