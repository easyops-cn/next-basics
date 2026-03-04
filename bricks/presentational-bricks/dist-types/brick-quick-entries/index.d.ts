import React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";
import type { MenuIcon } from "@next-core/brick-types";

export interface LinkProps {
  icon: MenuIcon;
  target: string;
  text: string;
}

export interface TitleConfig {
  icon?: MenuIcon;
  title?: string;
  value?: string;
  tooltip?: string;
}

export interface BrickQuickEntriesProps {
  column?: number;
  row?: number;
  links?: LinkProps[];
  useBrick?: UseBrickConf;
  data?: any[];
  titleList?: TitleConfig[];
  showCard?: boolean;
  divider?: boolean;
  containerStyle?: React.CSSProperties;
  mode?: "multiCardGeneral" | "multiCardNoLine" | "default";
  useBricks?: UseBrickConf;
}

export interface BrickQuickEntriesEvents {
  "title.icon.click": CustomEvent<any>;
}

export interface BrickQuickEntriesEventsMap {
  onTitleIconClick: "title.icon.click";
}

export declare class BrickQuickEntriesElement extends HTMLElement {
  column: number | undefined;
  row: number | undefined;
  links: LinkProps[] | undefined;
  useBrick: UseBrickConf | undefined;
  data: any[] | undefined;
  titleList: TitleConfig[] | undefined;
  showCard: boolean | undefined;
  divider: boolean | undefined;
  containerStyle: React.CSSProperties | undefined;
  mode: "multiCardGeneral" | "multiCardNoLine" | "default" | undefined;
  useBricks: UseBrickConf | undefined;
}
