import type { MenuIcon } from "@next-core/brick-types";
import type { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export interface WorkbenchNodeData<T = unknown> {
  if?: boolean;
  key: string | number;
  name: string;
  icon?: MenuIcon | TextIcon;
  data?: T;
  labelColor?: string;
  link?:
    | {
        to: string;
      }
    | {
        href: string;
      };
  badge?: MenuIcon;
  children?: WorkbenchNodeData[];
  matched?: boolean;
  matchedSelf?: boolean;
  path?: string;
  isContainer?: boolean;
  originKey?: string;
  parentPath?: string;
  unreachable?: boolean;
}

export interface WorkbenchTreeAction {
  action: string;
  icon: MenuIcon;
  title?: string;
  if?: string | boolean;
}

export interface ActionClickDetail {
  action: string;
  data?: unknown;
}

export type WorkbenchRuntimeNode = BuilderRuntimeNode & {
  $isRoot?: boolean;
  $nextChildSort?: number;
};

export interface TextIcon {
  lib: "text";
  icon: string;
  color?: string;
}
