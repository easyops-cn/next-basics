import type { MenuIcon } from "@next-core/brick-types";

export interface FoldBrickV2Props {
  foldName?: string;
  defaultShow?: boolean;
  type?: "normal" | "primary";
  isShowFoldIcon?: boolean;
  foldStyle?: Record<string, string>;
  showDivider?: boolean;
  dividerOrientation?: "left" | "right" | "center";
  dividerDashed?: boolean;
  show?: boolean;
  hideFoldName?: boolean;
  foldIcon?: MenuIcon;
  foldIconStyle?: any;
}

export interface FoldBrickV2Events {
  "fold.change": CustomEvent<boolean>;
}

export interface FoldBrickV2EventsMap {
  onFoldChange: "fold.change";
}

export declare class FoldBrickV2Element extends HTMLElement {
  foldName: string | undefined;
  defaultShow: boolean | undefined;
  type: "normal" | "primary" | undefined;
  isShowFoldIcon: boolean | undefined;
  foldStyle: Record<string, string> | undefined;
  showDivider: boolean | undefined;
  dividerOrientation: "left" | "right" | "center" | undefined;
  dividerDashed: boolean | undefined;
  show: boolean | undefined;
  hideFoldName: boolean | undefined;
  foldIcon: MenuIcon | undefined;
  foldIconStyle: any | undefined;
}
