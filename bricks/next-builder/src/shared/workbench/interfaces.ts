import type { MenuIcon } from "@next-core/brick-types";

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
  hover?: boolean;
  children?: WorkbenchNodeData[];
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
