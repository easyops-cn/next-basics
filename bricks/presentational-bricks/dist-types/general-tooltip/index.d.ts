import React from "react";
import type React from "react";
import type { MenuIcon } from "@next-core/brick-types";
import type { UseBrickConf } from "@next-core/brick-types";

export interface GeneralTooltipProps {
  icon?: MenuIcon;
  iconContainerStyle?: React.CSSProperties;
  content: string | string[];
  title?: string;
  type: "tooltip" | "popover";
  text?: string;
  tooltipConfig?: TooltipConfig;
  triggerByIcon?: boolean;
  displayBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  textEllipsis?: boolean;
}

export interface TooltipConfig {
  /**
   * 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom`
   */
  placement?: TooltipPlacement;
  /**
   * 箭头是否指向目标元素中心
   */
  arrowPointAtCenter?: boolean;
  /**
   * 卡片样式
   */
  overlayStyle?: React.CSSProperties;
}

export type TooltipPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";

export interface DisplayBrick {
  useBrick: UseBrickConf;
  data?: any;
}

export interface GeneralTooltipElementProps {
  content?: GeneralTooltipProps["content"];
  icon?: GeneralTooltipProps["icon"];
  text?: string;
  iconContainerStyle?: React.CSSProperties;
  type?: GeneralTooltipProps["type"];
  header?: string;
  tooltipConfig?: TooltipConfig;
  triggerByIcon?: boolean;
  displayBrick?: DisplayBrick;
  textEllipsis?: boolean;
}

export declare class GeneralTooltipElement extends HTMLElement {
  content: GeneralTooltipElementProps["content"] | undefined;
  icon: GeneralTooltipElementProps["icon"] | undefined;
  text: string | undefined;
  iconContainerStyle: React.CSSProperties | undefined;
  type: GeneralTooltipElementProps["type"] | undefined;
  header: string | undefined;
  tooltipConfig: TooltipConfig | undefined;
  triggerByIcon: boolean | undefined;
  displayBrick: DisplayBrick | undefined;
  textEllipsis: boolean | undefined;
}
