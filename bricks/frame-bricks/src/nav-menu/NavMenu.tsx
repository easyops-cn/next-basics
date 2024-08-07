/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect, CSSProperties } from "react";
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
  mainMenuTitleStyle: CSSProperties | undefined;
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
    item: SidebarMenuSimpleItems,
    mainMenuTitleStyle?: CSSProperties
  ): React.ReactNode => {
    return (
      <Menu.Item
        key={item.key}
        title={showTooltip ? item.text : ""}
        className={style.simpleMenuItem}
      >
        {item.useBrick
          ? renderBrickCom(item)
          : renderLinkCom(item, null, mainMenuTitleStyle)}
      </Menu.Item>
    );
  };

  const renderGroupMenu = (
    item: SidebarMenuGroups,
    mainMenuTitleStyle?: CSSProperties
  ): React.ReactNode => {
    if (item.items?.length > 0) {
      return (
        <Menu.ItemGroup
          key={item.key}
          className={style.groupWrapper}
          title={
            item.useBrick
              ? renderBrickCom(item)
              : renderSpanCom(item, style.groupText, mainMenuTitleStyle)
          }
        >
          {item.items?.map((innerItem) => renderMenuItem(innerItem))}
        </Menu.ItemGroup>
      );
    }
  };

  const renderSubMenu = (
    item: SidebarMenuGroups,
    mainMenuTitleStyle?: CSSProperties
  ): React.ReactNode => {
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
              : renderSpanCom(item, style.subMenuTitleText, mainMenuTitleStyle)
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
          placement={"bottomLeft"}
          onVisibleChange={(visible: boolean) => {
            // 阻止滚动穿透
            if (visible) {
              document.body.style.overflow = "hidden";
              document.body.style.touchAction = "none";
            } else {
              document.body.style.overflow = "";
              document.body.style.touchAction = "";
            }
          }}
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
    groupAsSubMenu?: boolean,
    mainMenuTitleStyle?: CSSProperties
  ): React.ReactNode => {
    return isDivider(item)
      ? renderDivider()
      : isSubMenu(item, groupAsSubMenu)
      ? renderSubMenu(item, mainMenuTitleStyle)
      : isGroup(item)
      ? renderGroupMenu(item, mainMenuTitleStyle)
      : renderSimpleMenuItem(item, mainMenuTitleStyle);
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
          : renderMenuItem(item, true, props.mainMenuTitleStyle)
      )}
    </Menu>
  );
}
