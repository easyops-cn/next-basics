/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { isEmpty, uniq } from "lodash";
import { UnregisterCallback, Location } from "history";
import { getHistory, getRuntime } from "@next-core/brick-kit";
import {
  SidebarMenuSimpleItem,
  SidebarMenuItem,
  SidebarMenuGroup,
} from "@next-core/brick-types";
import classNames from "classnames";
import {
  GeneralIcon,
  Link,
  initMenuItemAndMatchCurrentPathKeys,
} from "@next-libs/basic-components";
import style from "./SidebarMenu.module.css";

interface SidebarMenuProps {
  menuItems: SidebarMenuItem[];
  collapsed?: boolean;
  sideBarWidthTransitioning?: boolean;
}

function isGroup(item: SidebarMenuItem): item is SidebarMenuGroup {
  return item.type === "group";
}

function isSubMenu(item: SidebarMenuItem): item is SidebarMenuGroup {
  return item.type === "subMenu";
}

export function SidebarMenu(props: SidebarMenuProps): React.ReactElement {
  const { menuItems, collapsed, sideBarWidthTransitioning } = props;

  const history = getHistory();
  const [location, setLocation] = useState<Location>(history.location);
  const unlisten: UnregisterCallback = history.listen((location) => {
    setLocation(location);
  });
  const { pathname, search } = location;
  const showTextUi = React.useMemo(
    () => getRuntime()?.getFeatureFlags()["show-sidebar-text-ui"],
    []
  );

  let { selectedKeys, openedKeys } = initMenuItemAndMatchCurrentPathKeys(
    menuItems,
    pathname,
    search,
    ""
  );
  if (collapsed) {
    openedKeys = [];
  }

  useEffect(() => {
    return unlisten;
  }, []);

  const renderSimpleMenuItem = (
    item: SidebarMenuSimpleItem,
    showEmptyIcon?: boolean,
    iconClassname?: string
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
              <i
                className={
                  showTextUi ? style.newMenuItemIcon : style.menuItemIcon
                }
              >
                <GeneralIcon
                  icon={
                    isEmpty(item.icon.color) && showTextUi
                      ? { ...item.icon, color: "rgb(87, 104, 156,1)" }
                      : item.icon
                  }
                  size={20}
                  iconClassName={iconClassname}
                />
              </i>
            )
          )}
          <span
            className={classNames(style.menuText, style.simpleMenuItemText, {
              [style.menuTextColor]: showTextUi,
            })}
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
    if (item.items?.length > 0) {
      return (
        <Menu.ItemGroup
          key={item.key}
          className={style.groupWrapper}
          title={
            <span>
              <i
                className={classNames(
                  style.menuItemIcon,
                  style.groupTitlePoint,
                  {
                    [style.hideGroupTitlePoint]: !collapsed || showEmptyIcon,
                  }
                )}
              ></i>
              <span className={classNames(style.menuText, style.groupText)}>
                {item.title}
              </span>
            </span>
          }
        >
          {item.items.map((innerItem) =>
            renderMenuItem(innerItem, showEmptyIcon)
          )}
        </Menu.ItemGroup>
      );
    }
  };

  const renderSubMenu = (
    item: SidebarMenuGroup,
    iconClassName: string
  ): React.ReactNode => {
    if (item.items?.length > 0) {
      return (
        <Menu.SubMenu
          key={item.key}
          className={style.subMenuWrapper}
          title={
            <span>
              {item.icon && (
                <i
                  className={
                    showTextUi ? style.newMenuItemIcon : style.menuItemIcon
                  }
                >
                  <GeneralIcon
                    icon={
                      isEmpty(item.icon.color) && showTextUi
                        ? { ...item.icon, color: "rgb(87, 104, 156,1)" }
                        : item.icon
                    }
                    //icon={item.icon}

                    size={20}
                    iconClassName={iconClassName}
                  />
                </i>
              )}
              <span
                className={classNames(style.menuText, style.subMenuTitleText, {
                  [style.menuTextColor]: showTextUi,
                })}
              >
                {item.title}
              </span>
            </span>
          }
        >
          {item.items.map((innerItem) => renderMenuItem(innerItem, true))}
        </Menu.SubMenu>
      );
    }
  };

  const renderMenuItem = (
    item: SidebarMenuItem,
    showEmptyIcon?: boolean
  ): React.ReactNode => {
    return isSubMenu(item)
      ? renderSubMenu(item, style.iconStyle)
      : isGroup(item)
      ? renderGroupMenu(item, showEmptyIcon)
      : renderSimpleMenuItem(item, showEmptyIcon, style.iconStyle);
  };

  return (
    <Menu
      mode="inline"
      defaultOpenKeys={uniq(openedKeys)}
      defaultSelectedKeys={selectedKeys}
      selectedKeys={selectedKeys}
      className={classNames(style.menuContainer, {
        [style.collapsed]: collapsed,
        [style.sideBarWidthTransitioning]: sideBarWidthTransitioning,
      })}
      inlineCollapsed={collapsed}
    >
      {menuItems.map((item) => renderMenuItem(item))}
    </Menu>
  );
}
