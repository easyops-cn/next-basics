import React from "react";
import {
  SidebarMenuSimpleItem,
  SidebarMenuGroup,
  UseBrickConf,
} from "@next-core/brick-types";
import { Menu } from "antd";
import { BrickAsComponent } from "@next-core/brick-kit";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import style from "./NavMenu.module.css";
import classNames from "classnames";

type MenuItemBrick = {
  useBrick?: UseBrickConf;
  instanceId?: string;
  divider?: boolean;
};
export type SidebarMenuSimpleItems = SidebarMenuSimpleItem & MenuItemBrick;
export type SidebarMenuGroups = SidebarMenuGroup & MenuItemBrick;
export type SidebarMenuItem = SidebarMenuSimpleItems | SidebarMenuGroups;

export function isDivider(item: SidebarMenuItem): boolean {
  return item?.divider;
}

export const renderDivider = (): React.ReactElement => {
  return (
    <Menu.Divider style={{ height: "1px", margin: "8px 12px 0px 12px" }} />
  );
};

export function isGroup(item: SidebarMenuItem): item is SidebarMenuGroups {
  return item.type === "group";
}

export function isSubMenu(
  item: SidebarMenuItem,
  groupAsSubMenu?: boolean
): item is SidebarMenuGroups {
  return item.type === "subMenu" || (groupAsSubMenu && item.type === "group");
}

export const renderBrickCom = (item: SidebarMenuItem): React.ReactElement => {
  return <BrickAsComponent useBrick={item.useBrick} data={item} />;
};

export const renderLinkCom = (
  item: SidebarMenuSimpleItems,
  classnames?: string | string[],
  linkStyle?: React.CSSProperties
): React.ReactElement => {
  return (
    <Link to={item.to} href={item.href} target={item.target} style={linkStyle}>
      {/* {item.icon && (
          <i className={style.menuItemIcon}>
            <GeneralIcon icon={item.icon} />
          </i>
        )} */}
      <span className={classNames(classnames)}>{item.text}</span>
    </Link>
  );
};

export const renderSpanCom = (
  item: SidebarMenuGroups,
  className?: string,
  mainMenuTitleStyle?: React.CSSProperties
): React.ReactElement => {
  return (
    <>
      <span
        className={classNames(style.menuText, className)}
        style={mainMenuTitleStyle}
      >
        {item.title}
      </span>
    </>
  );
};
