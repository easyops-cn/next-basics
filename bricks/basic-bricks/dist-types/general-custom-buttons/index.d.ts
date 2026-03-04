import React from "react";
import type { MenuIcon } from "@next-core/brick-types";
import { ButtonType, ButtonShape, ButtonSize } from "antd/lib/button";
import { TooltipPlacement } from "antd/lib/tooltip";
import type React from "react";

export interface CustomButton {
  /**
   * 是否收纳成下拉框
   */
  isDropdown?: boolean;
  /**
   * 菜单项分割线，只用在弹出菜单内
   */
  isDivider?: boolean;
  /**
   * 按钮名
   */
  text: string;
  /**
   * 按钮 icon，支持[icon图标库](/next/developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   */
  icon?: MenuIcon | string;
  /**
   * 按钮点击事件名
   */
  eventName: string;
  /**
   * 按钮字体颜色
   */
  color?: string;
  /**
   * 按钮 ID, updateButton 时使用
   */
  id?: string;
  /**
   * 是否禁用
   */
  disabled?: boolean;
  /**
   * 是否隐藏
   */
  hide?: boolean;
  /**
   * 样式类型
   */
  buttonType?: ButtonType | "icon";
  /**
   * 形状类型
   */
  buttonShape?: ButtonShape;
  /**
   * 点击跳转的地址，一般站内链接使用此属性
   */
  buttonUrl?: string;
  /**
   * 点击跳转的地址，一般站外链接使用此属性
   */
  buttonHref?: string;
  /**
   * 按钮大小
   */
  buttonSize?: ButtonSize;
  /**
   * 相当于 a 链接的 target 属性，buttonUrl 或 buttonHref 存在时生效
   */
  urlTarget?: string;
  /**
   * 	按钮简单的文字提示气泡框
   */
  tooltip?: string;
  /**
   * 	禁用按钮的 tooltip
   */
  disabledTooltip?: string;
  /**
   * tooltip 位置
   */
  tooltipPlacement?: TooltipPlacement;
  /**
   * 设置按钮载入状态
   */
  loading?: boolean;
  /**
   * 用于测试时定位的 ID
   */
  testId?: string;
  /**
   * 是否显示为危险样式
   */
  danger?: boolean;
  /**
   * 每个事件的数据源
   */
  dataSource?: any;
}

export type DropdownPlacement =
  | "bottomRight"
  | "topLeft"
  | "topCenter"
  | "topRight"
  | "bottomLeft"
  | "bottomCenter";

export interface GeneralCustomButtonsProps {
  customButtons?: CustomButton[];
  alignment?: "start" | "center" | "end" | "stretch";
  dataSource?: any;
  disableAfterClick?: boolean;
  isMoreButton?: boolean;
  useButtonDataSource?: boolean;
  moreBtnIcon?: MenuIcon | string;
  moreButtonType?: ButtonType;
  moreButtonShape?: "circle" | "no" | "rectangle" | "icon";
  dropdownBtnText?: string;
  dropdownBtnType?: "default" | "link";
  dropdownBtnIcon?: MenuIcon | string;
  dropdownPlacement?: DropdownPlacement;
  moreButtonStyle?: React.CSSProperties;
}

export interface GeneralCustomButtonsEvents {
  "buttons.visible.change": CustomEvent<boolean>;
}

export interface GeneralCustomButtonsEventsMap {
  onButtonsVisibleChange: "buttons.visible.change";
}

export declare class GeneralCustomButtonsElement extends HTMLElement {
  customButtons: CustomButton[] | undefined;
  alignment: "start" | "center" | "end" | "stretch" | undefined;
  dataSource: any | undefined;
  disableAfterClick: boolean | undefined;
  isMoreButton: boolean | undefined;
  useButtonDataSource: boolean | undefined;
  moreBtnIcon: MenuIcon | string | undefined;
  moreButtonType: ButtonType | undefined;
  moreButtonShape: "circle" | "no" | "rectangle" | "icon" | undefined;
  dropdownBtnText: string | undefined;
  dropdownBtnType: "default" | "link" | undefined;
  dropdownBtnIcon: MenuIcon | string | undefined;
  dropdownPlacement: DropdownPlacement | undefined;
  moreButtonStyle: React.CSSProperties | undefined;
  updateButton(id: string, btn: Partial<CustomButton>): void;
}
