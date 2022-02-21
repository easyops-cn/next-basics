/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { UnregisterCallback, Location } from "history";
import {
  SidebarMenuSimpleItem,
  SidebarMenuItem,
  SidebarMenuGroup,
} from "@next-core/brick-types";
import { getRuntime, getHistory } from "@next-core/brick-kit";
import classNames from "classnames";
import {
  GeneralIcon,
  Link,
  initMenuItemAndMatchCurrentPathKeys,
} from "@next-libs/basic-components";
import style from "./NavMenu.module.css";

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

export function NavMenu(props: SidebarMenuProps): React.ReactElement {
  const { menuItems, selectedKeys } = props;
  const [menus, setMenus] = useState(menuItems);

  const history = getHistory();
  const [location, setLocation] = useState<Location>(history.location);
  const unlisten: UnregisterCallback = history.listen((location) => {
    setLocation(location);
  });
  const { pathname, search } = location;

  const [selectedKey, setSelectedKey] = useState(selectedKeys ?? []);

  const getMenu = async (): Promise<void> => {
    if (menuItems) return;
    const appMenu = getRuntime().getCurrentRoute().menu;

    if (appMenu && "menuId" in appMenu) {
      const menu = await getRuntime().fetchMenu(appMenu?.menuId);
      const { selectedKeys } = initMenuItemAndMatchCurrentPathKeys(
        menu.menuItems,
        pathname,
        search,
        ""
      );
      setSelectedKey(selectedKeys);
      setMenus(menu.menuItems);
    }
  };

  useEffect(() => {
    getMenu();
    return unlisten;
  }, []);

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
            {/* {item.icon && (
              <i className={style.menuItemIcon}>
                <GeneralIcon icon={item.icon} size={14} />
              </i>
            )} */}
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
    return isSubMenu(item, showSubMenu)
      ? renderSubMenu(item)
      : isGroup(item)
      ? renderGroupMenu(item, false)
      : renderSimpleMenuItem(item, false);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={selectedKey}
      className={style.navMenuContainer}
      onClick={(e) => setSelectedKey([e.key as string])}
    >
      {menus.map((item) => renderMenuItem(item, undefined, true))}
    </Menu>
  );
}
