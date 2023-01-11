/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { UnregisterCallback, Location } from "history";
import {
  SidebarMenuSimpleItem,
  SidebarMenuGroup,
  UseBrickConf,
} from "@next-core/brick-types";
import { BrickAsComponent, getHistory } from "@next-core/brick-kit";
import classNames from "classnames";
import {
  Link,
  initMenuItemAndMatchCurrentPathKeys,
  GeneralIcon,
} from "@next-libs/basic-components";
import style from "./NavMenu.module.css";
type MenuItemBrick = {
  useBrick?: UseBrickConf;
  instanceId?: string;
  divider?: boolean;
};
type SidebarMenuSimpleItems = SidebarMenuSimpleItem & MenuItemBrick;
type SidebarMenuGroups = SidebarMenuGroup & MenuItemBrick;
type SidebarMenuItem = SidebarMenuSimpleItems | SidebarMenuGroups;

interface SidebarMenuProps {
  menuItems?: SidebarMenuItem[];
  isCustom?: boolean;
  selectedKeys?: string[];
  showTooltip?: boolean;
}

function isDivider(item: SidebarMenuItem) {
  return item?.divider;
}

function isGroup(item: SidebarMenuItem): item is SidebarMenuGroups {
  return item.type === "group";
}

function isSubMenu(
  item: SidebarMenuItem,
  showMenu?: boolean
): item is SidebarMenuGroups {
  return item.type === "subMenu" || (showMenu && item.type === "group");
}

export function NavMenu(props: SidebarMenuProps): React.ReactElement {
  const { menuItems, showTooltip } = props;

  const history = getHistory();
  const [location, setLocation] = useState<Location>(history.location);
  const unListen: UnregisterCallback = history.listen((location) => {
    setLocation(location);
  });
  const { pathname, search } = location;

  const [selectedKey, setSelectedKey] = useState<string[]>([]);

  const setSelected = async (): Promise<void> => {
    const { selectedKeys } = initMenuItemAndMatchCurrentPathKeys(
      menuItems,
      pathname,
      search,
      ""
    );
    setSelectedKey(selectedKeys);
  };

  useEffect(() => {
    setSelected();
    return unListen;
  }, []);

  const renderLinkCom = (item: SidebarMenuSimpleItems) => {
    return (
      <Link to={item.to} href={item.href} target={item.target}>
        {/* {item.icon && (
            <i className={style.menuItemIcon}>
              <GeneralIcon icon={item.icon} />
            </i>
          )} */}
        <span className={classNames(style.menuText, style.simpleMenuItemText)}>
          {item.text}
        </span>
      </Link>
    );
  };
  const renderSpanCom = (item: SidebarMenuGroups, classNme: string) => {
    return (
      <>
        <span className={classNames(style.menuText, classNme)}>
          {item.title}
        </span>
      </>
    );
  };
  const renderBrickCom = (item: SidebarMenuItem) => {
    return (
      <BrickAsComponent useBrick={item.useBrick} data={item}></BrickAsComponent>
    );
  };

  const renderDivider = () => {
    return (
      <Menu.Divider style={{ height: "1px", margin: "8px 12px 0px 12px" }} />
    );
  };

  const renderSimpleMenuItem = (
    item: SidebarMenuSimpleItems
  ): React.ReactNode => {
    return (
      <Menu.Item
        key={item.key}
        title={showTooltip ? item.text : ""}
        className={style.simpleMenuItem}
      >
        {item.useBrick ? renderBrickCom(item) : renderLinkCom(item)}
      </Menu.Item>
    );
  };

  const renderGroupMenu = (item: SidebarMenuGroups): React.ReactNode => {
    if (item.items?.length > 0) {
      return (
        <Menu.ItemGroup
          key={item.key}
          className={style.groupWrapper}
          title={
            item.useBrick
              ? renderBrickCom(item)
              : renderSpanCom(item, style.groupText)
          }
        >
          {item.items?.map((innerItem) => renderMenuItem(innerItem))}
        </Menu.ItemGroup>
      );
    }
  };

  const renderSubMenu = (item: SidebarMenuGroups): React.ReactNode => {
    if (item.items?.length > 0) {
      return (
        <Menu.SubMenu
          key={item.key}
          className={style.subMenuWrapper}
          popupClassName={style.popupWrapper}
          title={
            item.useBrick
              ? renderBrickCom(item)
              : renderSpanCom(item, style.subMenuTitleText)
          }
        >
          {item.items.map((innerItem) => renderMenuItem(innerItem))}
        </Menu.SubMenu>
      );
    }
  };

  const renderMenuItem = (
    item: SidebarMenuItem,
    showSubMenu?: boolean
  ): React.ReactNode => {
    return isDivider(item)
      ? renderDivider()
      : isSubMenu(item, showSubMenu)
      ? renderSubMenu(item)
      : isGroup(item)
      ? renderGroupMenu(item)
      : renderSimpleMenuItem(item);
  };

  return (
    <Menu
      mode="horizontal"
      selectedKeys={selectedKey}
      className={style.navMenuContainer}
    >
      {menuItems.map((item) => renderMenuItem(item, true))}
    </Menu>
  );
}
