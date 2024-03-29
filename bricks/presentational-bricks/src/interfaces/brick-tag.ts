import { MenuIcon } from "@next-core/brick-types";

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
