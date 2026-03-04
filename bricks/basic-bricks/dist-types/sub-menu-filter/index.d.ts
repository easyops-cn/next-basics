import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";
import type { MenuIcon } from "@next-core/brick-types";

export type SubMenuFilterItem = SubMenuFilterSimpleItem | SubMenuFilterGroup;

export interface SubMenuFilterSimpleItem {
  title: string;
  key: string;
  type?: "item";
  icon: MenuIcon;
  // to?: LocationDescriptor;
  style?: React.CSSProperties;
}

export interface SubMenuFilterGroup {
  type: "group" | "subMenu";
  title: string;
  items: SubMenuFilterSimpleItem[];
  key?: string;
}

export interface SubMenuFilterProps {
  menuItems?: SubMenuFilterItem[];
  suffixBrick?: { useBrick: UseBrickConf };
  unsearchable?: boolean;
  placeholder?: string;
  defaultSelectedKeys?: string[];
  defaultOpenKeys?: string[];
  selectable?: boolean;
  multiple?: boolean;
  inlineIndent?: number;
  transparentBackground?: boolean;
  accordion?: boolean;
  suffixBrickTriggerByHover?: boolean;
}

export interface SubMenuFilterEvents {
  "menu.select": CustomEvent<SubMenuFilterItem[]>;
  "menu.search": CustomEvent<string>;
  "menu.click": CustomEvent<SubMenuFilterItem>;
}

export interface SubMenuFilterEventsMap {
  onMenuSelect: "menu.select";
  onMenuSearch: "menu.search";
  onMenuClick: "menu.click";
}

export declare class SubMenuFilterElement extends HTMLElement {
  menuItems: SubMenuFilterItem[] | undefined;
  suffixBrick: { useBrick: UseBrickConf } | undefined;
  unsearchable: boolean | undefined;
  placeholder: string | undefined;
  defaultSelectedKeys: string[] | undefined;
  defaultOpenKeys: string[] | undefined;
  selectable: boolean | undefined;
  multiple: boolean | undefined;
  inlineIndent: number | undefined;
  transparentBackground: boolean | undefined;
  accordion: boolean | undefined;
  suffixBrickTriggerByHover: boolean | undefined;
}
