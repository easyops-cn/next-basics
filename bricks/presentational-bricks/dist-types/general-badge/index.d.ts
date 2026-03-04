import type { MenuIcon, UseBrickConf } from "@next-core/brick-types";
import type { MenuIcon } from "@next-core/brick-types";
import type { UseBrickConf } from "@next-core/brick-types";

export interface GeneralBadgeProps {
  content?: string | { useBrick: UseBrickConf; dataSource?: any };
  contentIcon?: MenuIcon;
  dataSource?: any;
  color?: string;
  count?: number;
  overflowCount?: number;
  dot?: boolean;
  offset?: [number, number];
  showZero?: boolean;
  disablePointerEvents?: boolean;
}

export declare class GeneralBadgeElement extends HTMLElement {
  content: string | { useBrick: UseBrickConf; dataSource?: any } | undefined;
  contentIcon: MenuIcon | undefined;
  dataSource: any | undefined;
  color: string | undefined;
  count: number | undefined;
  overflowCount: number | undefined;
  dot: boolean | undefined;
  offset: [number, number] | undefined;
  showZero: boolean | undefined;
  disablePointerEvents: boolean | undefined;
}
