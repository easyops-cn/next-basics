/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState } from "react";
import { Menu } from "antd";
import {
  SidebarMenuSimpleItem,
  SidebarMenuItem,
  SidebarMenuGroup,
} from "@next-core/brick-types";
import classNames from "classnames";
import { GeneralIcon, Link } from "@next-libs/basic-components";
import style from "./NavBar.module.css";

interface SidebarMenuProps {
  menuItems: SidebarMenuItem[];
  selectedKeys: string[];
}

function isGroup(item: SidebarMenuItem): item is SidebarMenuGroup {
  return item.type === "group";
}

function isSubMenu(
  item: SidebarMenuItem,
  showMenu?: boolean
): item is SidebarMenuGroup {
  return item.type === "subMenu" || (showMenu && item.type === "group");
}

export function NavBar(props: SidebarMenuProps): React.ReactElement {
  const { menuItems, selectedKeys } = props;
  const [selectedKey, setSelectedKey] = useState(selectedKeys ?? []);

  const renderSimpleMenuItem = (
    item: SidebarMenuSimpleItem,
    showEmptyIcon?: boolean
  ): React.ReactNode => {
    return (
      <Menu.Item
        key={String(item.key)}
        title={item.text}
        className={style.simpleMenuItem}
      >
        <Link to={item.to} href={item.href} target={item.target}>
          {showEmptyIcon ? (
            <i className={style.menuItemIcon}></i>
          ) : (
            item.icon && (
              <i className={style.menuItemIcon}>
                <GeneralIcon icon={item.icon} size={14} />
              </i>
            )
          )}
          <span
            className={classNames(style.menuText, style.simpleMenuItemText)}
          >
            {item.text}
          </span>
        </Link>
      </Menu.Item>
    );
  };

  const renderGroupMenu = (
    item: SidebarMenuGroup,
    showEmptyIcon?: boolean
  ): React.ReactNode => {
    return (
      <Menu.ItemGroup
        key={item.key}
        className={style.groupWrapper}
        title={
          <span>
            <i
              className={classNames(style.menuItemIcon, style.groupTitlePoint, {
                [style.hideGroupTitlePoint]: showEmptyIcon,
              })}
            ></i>
            <span className={classNames(style.menuText, style.groupText)}>
              {item.title}
            </span>
          </span>
        }
      >
        {item.items?.map((innerItem) =>
          renderMenuItem(innerItem, showEmptyIcon)
        )}
      </Menu.ItemGroup>
    );
  };

  const renderSubMenu = (item: SidebarMenuGroup): React.ReactNode => {
    return (
      <Menu.SubMenu
        key={item.key}
        className={style.subMenuWrapper}
        popupClassName={style.popupWrapper}
        title={
          <span>
            {item.icon && (
              <i className={style.menuItemIcon}>
                <GeneralIcon icon={item.icon} size={14} />
              </i>
            )}
            <span
              className={classNames(style.menuText, style.subMenuTitleText)}
            >
              {item.title}
            </span>
          </span>
        }
      >
        {item.items?.map((innerItem) => renderMenuItem(innerItem, true))}
      </Menu.SubMenu>
    );
  };

  const renderMenuItem = (
    item: SidebarMenuItem,
    showEmptyIcon?: boolean,
    showSubMenu?: boolean
  ): React.ReactNode => {
    // return renderGroupMenu(item, showEmptyIcon)
    return isSubMenu(item, showSubMenu)
      ? renderSubMenu(item)
      : isGroup(item)
      ? renderGroupMenu(item, showEmptyIcon)
      : renderSimpleMenuItem(item, showEmptyIcon);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={selectedKey}
      className={style.navBarContainer}
      onClick={(e) => setSelectedKey([e.key as string])}
    >
      {menuItems.map((item) => renderMenuItem(item, undefined, true))}
    </Menu>
  );
}
