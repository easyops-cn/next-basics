/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import { Menu, Popover } from "antd";
import { UnregisterCallback, Location } from "history";
import { getHistory } from "@next-core/brick-kit";
import { initMenuItemAndMatchCurrentPathKeys } from "@next-libs/basic-components";
import {
  SidebarMenuItem,
  SidebarMenuGroups,
  SidebarMenuSimpleItems,
  isDivider,
  isGroup,
  isSubMenu,
  renderBrickCom,
  renderDivider,
  renderLinkCom,
  renderSpanCom,
} from "./utils";
import style from "./NavMenu.module.css";
import { ThreeLevelMenuPopoverContent } from "./ThreeLevelMenuPopoverContent";

interface SidebarMenuProps {
  menuItems?: SidebarMenuItem[];
  isCustom?: boolean;
  selectedKeys?: string[];
  showTooltip?: boolean;
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
          popupOffset={[0, 3]}
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

  const renderThreeLevelMenu = (item: SidebarMenuGroups): React.ReactNode => {
    return (
      <Menu.Item key={item.key} className={style.threeLevelMenuItem}>
        <Popover
          zIndex={1060}
          align={{ offset: [0, -3] }}
          overlayInnerStyle={{ overflow: "hidden" }}
          overlayClassName={style.threeLevelMenuPopover}
          placement={"bottom"}
          content={
            <ThreeLevelMenuPopoverContent
              menuItem={item}
              selectedKey={selectedKey}
            />
          }
        >
          <div
            className={style.threeLevelBox}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className={style.threeLevelContainer}>
              {item.useBrick ? renderBrickCom(item) : renderSpanCom(item)}
            </div>
          </div>
        </Popover>
      </Menu.Item>
    );
  };

  const renderMenuItem = (
    item: SidebarMenuItem,
    groupAsSubMenu?: boolean
  ): React.ReactNode => {
    return isDivider(item)
      ? renderDivider()
      : isSubMenu(item, groupAsSubMenu)
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
      {menuItems.map((item) =>
        isSubMenu(item, true) &&
        item.childLayout === "category" &&
        item.items?.length
          ? renderThreeLevelMenu(item)
          : renderMenuItem(item, true)
      )}
    </Menu>
  );
}
