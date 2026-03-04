import type { LinkProps } from "@next-libs/basic-components";
import type { MenuIcon } from "@next-core/brick-types";

export interface MappingValue {
  text?: string;
  color?: Color;
  icon?: MenuIcon;
  iconSize?: number;
}

export enum Color {
  green = "green",
  red = "red",
  blue = "blue",
  orange = "orange",
  cyan = "cyan",
  purple = "purple",
  geekblue = "geekblue",
  gray = "gray",
  yellow = "yellow",
  "green-inverse" = "green-inverse",
  "red-inverse" = "red-inverse",
  "blue-inverse" = "blue-inverse",
  "orange-inverse" = "orange-inverse",
  "cyan-inverse" = "cyan-inverse",
  "purple-inverse" = "purple-inverse",
  "geekblue-inverse" = "geekblue-inverse",
  "gray-inverse" = "gray-inverse",
  "yellow-inverse" = "yellow-inverse",
}

export interface BrickValueMappingProps {
  value?: string | number;
  fields?: {
    value: string;
  };
  mapping?: Record<string | number, MappingValue>;
  showTagCircle?: boolean;
  dataSource?: Record<string, any>;
  triggerClickEvent?: boolean;
  isTextEllipsis?: boolean;
  link?: LinkProps;
  data?: any;
}

export interface BrickValueMappingEvents {
  "brick-value-mapping.click": CustomEvent<{
    data: any;
    value: string | number;
  }>;
}

export interface BrickValueMappingEventsMap {
  onBrickValueMappingClick: "brick-value-mapping.click";
}

export declare class BrickValueMappingElement extends HTMLElement {
  value: string | number | undefined;
  fields:
    | {
        value: string;
      }
    | undefined;
  mapping: Record<string | number, MappingValue> | undefined;
  showTagCircle: boolean | undefined;
  dataSource: Record<string, any> | undefined;
  triggerClickEvent: boolean | undefined;
  isTextEllipsis: boolean | undefined;
  link: LinkProps | undefined;
  data: any | undefined;
}
