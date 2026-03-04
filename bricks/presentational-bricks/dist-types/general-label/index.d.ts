import type { MenuIcon } from "@next-core/brick-types";

export interface GeneralLabelProps {
  text?: string;
  prefixIcon?: MenuIcon;
  suffixIcon?: MenuIcon;
  url?: string;
  href?: string;
  dataSource?: any;
  data?: any;
}

export interface GeneralLabelEvents {
  "label.click": CustomEvent<any>;
}

export interface GeneralLabelEventsMap {
  onLabelClick: "label.click";
}

export declare class GeneralLabelElement extends HTMLElement {
  text: string | undefined;
  prefixIcon: MenuIcon | undefined;
  suffixIcon: MenuIcon | undefined;
  url: string | undefined;
  href: string | undefined;
  dataSource: any | undefined;
  data: any | undefined;
}
