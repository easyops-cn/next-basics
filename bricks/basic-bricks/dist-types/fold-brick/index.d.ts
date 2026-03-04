import type { UseBrickConf } from "@next-core/brick-types";

export interface FoldBrickProps {
  useBrick?: UseBrickConf;
  foldName?: string;
  foldStyle?: Record<string, string>;
  defaultShow?: boolean;
}

export declare class FoldBrickElement extends HTMLElement {
  useBrick: UseBrickConf | undefined;
  foldName: string | undefined;
  foldStyle: Record<string, string> | undefined;
  defaultShow: boolean | undefined;
}
