import type { MenuIcon } from "@next-core/brick-types";
import type React from "react";

export type ImgIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

export interface BasicIconProps {
  icon?: MenuIcon | ImgIcon;
  size?: string;
  renderBg?: boolean;
  showWhenHover?: boolean;
  bg?: string;
  bgSize?: string;
  bgBorderRadius?: string;
  dataSource?: unknown;
}

export interface BasicIconEvents {
  "icon.click": CustomEvent<any>;
}

export interface BasicIconEventsMap {
  onIconClick: "icon.click";
}

export declare class BasicIconElement extends HTMLElement {
  icon: MenuIcon | ImgIcon | undefined;
  size: string | undefined;
  renderBg: boolean | undefined;
  showWhenHover: boolean | undefined;
  bg: string | undefined;
  bgSize: string | undefined;
  bgBorderRadius: string | undefined;
  dataSource: unknown | undefined;
}
