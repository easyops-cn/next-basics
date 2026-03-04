import type { SidebarMenu, SidebarSubMenu } from "@next-core/brick-types";

export interface MenuBarProps {
  menu?: SidebarMenu;
  subMenu?: SidebarSubMenu;
  collapsed?: boolean;
  softExpanded?: boolean;
}

export declare class MenuBarElement extends HTMLElement {
  menu: SidebarMenu | undefined;
  subMenu: SidebarSubMenu | undefined;
  collapsed: boolean | undefined;
  softExpanded: boolean | undefined;
}
