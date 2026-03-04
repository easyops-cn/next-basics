import React from "react";
import type { ButtonProps } from "antd/lib/button";
import type React from "react";

export declare type ButtonType = typeof ButtonTypes[number];

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
  /**
   * 卡片内容区域的样式对象
   */
  overlayInnerStyle?: React.CSSProperties;
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

export interface GeneralButtonProps {
  buttonName?: string;
  buttonIcon?: any;
  buttonType?: ButtonType;
  tooltip?: string;
  disabled?: boolean;
  disabledTooltip?: string;
  tooltipConfig?: TooltipConfig;
  buttonUrl?: string;
  buttonHref?: string;
  target?: string;
  dataSource?: Record<string, any>;
  disableAfterClick?: boolean;
  buttonProps?: ButtonProps & { icon?: string };
  loading?: boolean;
  buttonDanger?: boolean;
  buttonShape?: "circle" | "round";
  buttonSize?: "xs" | "small" | "large";
  fadedText?: boolean;
  buttonStyle?: React.CSSProperties;
  detail?: Record<string, any>;
}

export interface GeneralButtonEvents {
  "general.button.click": CustomEvent<Record<string, any>>;
}

export interface GeneralButtonEventsMap {
  onGeneralButtonClick: "general.button.click";
}

export declare class GeneralButtonElement extends HTMLElement {
  buttonName: string | undefined;
  buttonIcon: any | undefined;
  buttonType: ButtonType | undefined;
  tooltip: string | undefined;
  disabled: boolean | undefined;
  disabledTooltip: string | undefined;
  tooltipConfig: TooltipConfig | undefined;
  buttonUrl: string | undefined;
  buttonHref: string | undefined;
  target: string | undefined;
  dataSource: Record<string, any> | undefined;
  disableAfterClick: boolean | undefined;
  buttonProps: (ButtonProps & { icon?: string }) | undefined;
  loading: boolean | undefined;
  buttonDanger: boolean | undefined;
  buttonShape: "circle" | "round" | undefined;
  buttonSize: "xs" | "small" | "large" | undefined;
  fadedText: boolean | undefined;
  buttonStyle: React.CSSProperties | undefined;
  detail: Record<string, any> | undefined;
}
