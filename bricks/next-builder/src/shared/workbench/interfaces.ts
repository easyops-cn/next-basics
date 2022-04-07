import type { MenuIcon } from "@next-core/brick-types";
import type { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";

export interface WorkbenchNodeData<T = unknown> {
  key: string | number;
  name: string;
  icon?: MenuIcon;
  data?: T;
  labelColor?: string;
  link?:
    | {
        to: string;
      }
    | {
        href: string;
      };
  children?: WorkbenchNodeData[];
  matched?: boolean;
  matchedSelf?: boolean;
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
