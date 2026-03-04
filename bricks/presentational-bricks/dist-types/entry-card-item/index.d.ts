import React from "react";
import type { MenuIcon } from "@next-core/brick-types";
import type React from "react";

export type Color =
  | "purple"
  | "red"
  | "softOrange"
  | "cyan"
  | "blue"
  | "darkPurple"
  | "lightCyan"
  | "brightOrange"
  | "white";

export type Size = "small" | "default";

export interface EntryCardItemProps {
  dataSource?: Record<string, any>;
  cardTitle?: string;
  description?: string;
  fields?: {
    cardTitle?: string;
    icon?: string;
    iconColor?: string;
  };
  icon?: MenuIcon;
  iconColor?: Color;
  iconSize?: Size;
  target?: string;
  url?: string;
  urlTemplate?: string;
  hoverHighLight?: boolean;
  showCard?: boolean;
  cardStyle?: React.CSSProperties;
  disabled?: boolean;
  tip?: string;
}

export declare class EntryCardItemElement extends HTMLElement {
  dataSource: Record<string, any> | undefined;
  cardTitle: string | undefined;
  description: string | undefined;
  fields:
    | {
        cardTitle?: string;
        icon?: string;
        iconColor?: string;
      }
    | undefined;
  icon: MenuIcon | undefined;
  iconColor: Color | undefined;
  iconSize: Size | undefined;
  target: string | undefined;
  url: string | undefined;
  urlTemplate: string | undefined;
  hoverHighLight: boolean | undefined;
  showCard: boolean | undefined;
  cardStyle: React.CSSProperties | undefined;
  disabled: boolean | undefined;
  tip: string | undefined;
}
