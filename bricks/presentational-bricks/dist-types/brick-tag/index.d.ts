import React from "react";
import type { TooltipProps } from "antd";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";
import type { MenuIcon } from "@next-core/brick-types";

export type TagListType = {
  key: string;
  label: string;
  tooltip?: string;
  icon?: string | MenuIcon;
  checked?: boolean;
  color?: string | Color;
  disabled?: boolean;
  disabledTooltip?: string;
};

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

export enum TagTypeProps {
  Tag = "Tag",
  CheckableTag = "CheckableTag",
}

export interface BrickTagProps {
  label?: string;
  tagList?: TagListType[] | string[];
  showTagCircle?: boolean;
  showCard?: boolean;
  color?: string | Color;
  multipleCheck?: boolean;
  dataSource?: Record<string, any>;
  closable?: boolean;
  componentType?: TagTypeProps;
  default?: string | string[];
  cancelable?: boolean;
  configProps?: Record<string, any>;
  disabledTooltip?: string;
  tooltipProps?: TooltipProps;
  fields?: {
    label: string;
    key: string;
    icon?: string;
    tagList?: string;
  };
  textEllipsis?: boolean;
  tagStyle?: React.CSSProperties;
  tagCheckedStyle?: React.CSSProperties;
  tagHoverStyle?: React.CSSProperties;
  afterBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };
}

export interface BrickTagEvents {
  "checked.update": CustomEvent<string[]>;
  "checked.update.v2": CustomEvent<{ label: string; key: string }[]>;
  "tag.close": CustomEvent<{
    current: Record<string, any>;
    tagList: Record<string, any>[];
  }>;
  "tag.click": CustomEvent<TagListType>;
}

export interface BrickTagEventsMap {
  onCheckedUpdate: "checked.update";
  onCheckedUpdateV2: "checked.update.v2";
  onTagClose: "tag.close";
  onTagClick: "tag.click";
}

export declare class BrickTagElement extends HTMLElement {
  label: string | undefined;
  tagList: TagListType[] | string[] | undefined;
  showTagCircle: boolean | undefined;
  showCard: boolean | undefined;
  color: string | Color | undefined;
  multipleCheck: boolean | undefined;
  dataSource: Record<string, any> | undefined;
  closable: boolean | undefined;
  componentType: TagTypeProps | undefined;
  default: string | string[] | undefined;
  cancelable: boolean | undefined;
  configProps: Record<string, any> | undefined;
  disabledTooltip: string | undefined;
  tooltipProps: TooltipProps | undefined;
  fields:
    | {
        label: string;
        key: string;
        icon?: string;
        tagList?: string;
      }
    | undefined;
  textEllipsis: boolean | undefined;
  tagStyle: React.CSSProperties | undefined;
  tagCheckedStyle: React.CSSProperties | undefined;
  tagHoverStyle: React.CSSProperties | undefined;
  afterBrick:
    | {
        useBrick: UseBrickConf;
        data: unknown;
      }
    | undefined;
}
