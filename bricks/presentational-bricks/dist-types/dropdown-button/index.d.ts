import type { MenuIcon } from "@next-core/brick-types";

export interface DropdownButtonProps {
  options?: Option[];
  leftButtonIcon?: MenuIcon | string;
  rightButtonIcon?: MenuIcon | string;
  buttonName?: string;
  disabled?: boolean;
  textPlacement?: "right" | "left";
  tooltip?: string;
  value?: any[];
}

export interface DropdownButtonEvents {
  "select.change": CustomEvent<{ value: any; item: any }>;
  "left.button.click": CustomEvent<{ item: any }>;
}

export interface DropdownButtonEventsMap {
  onSelectChange: "select.change";
  onLeftButtonClick: "left.button.click";
}

export declare class DropdownButtonElement extends HTMLElement {
  options: Option[] | undefined;
  leftButtonIcon: MenuIcon | string | undefined;
  rightButtonIcon: MenuIcon | string | undefined;
  buttonName: string | undefined;
  disabled: boolean | undefined;
  textPlacement: "right" | "left" | undefined;
  tooltip: string | undefined;
  value: any[] | undefined;
}
