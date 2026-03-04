import type { MenuIcon } from "@next-core/brick-types";

export interface BrickLinkProps {
  label?: string;
  url?: string;
  href?: string;
  target?: string;
  tooltip?: string;
  tooltipProps?: Record<string, any>;
  dataSource?: Record<string, any>;
  labelColor?: string;
  underLine?: boolean;
  icon?: MenuIcon;
  disabled?: boolean;
  hideExternalIcon?: boolean;
  notToJumpWhenEmpty?: boolean;
  type?: "link" | "text";
  iconAlign?: "left" | "right";
  native?: boolean;
  labelField?: string;
  detail?: any;
  urlTemplate?: string;
}

export interface BrickLinkEvents {
  "link.click": CustomEvent<any>;
}

export interface BrickLinkEventsMap {
  onLinkClick: "link.click";
}

export declare class BrickLinkElement extends HTMLElement {
  label: string | undefined;
  url: string | undefined;
  href: string | undefined;
  target: string | undefined;
  tooltip: string | undefined;
  tooltipProps: Record<string, any> | undefined;
  dataSource: Record<string, any> | undefined;
  labelColor: string | undefined;
  underLine: boolean | undefined;
  icon: MenuIcon | undefined;
  disabled: boolean | undefined;
  hideExternalIcon: boolean | undefined;
  notToJumpWhenEmpty: boolean | undefined;
  type: "link" | "text" | undefined;
  iconAlign: "left" | "right" | undefined;
  native: boolean | undefined;
  labelField: string | undefined;
  detail: any | undefined;
  urlTemplate: string | undefined;
}
