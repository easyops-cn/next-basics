import type { UseBrickConf } from "@next-core/brick-types";

export interface itemData {
  list: Record<string, any>[];
  page_size?: number | string;
  page?: number | string;
}

export interface VirtualListContainerProps {
  data: Record<string, any>[];
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  oHeight: string;
  onScrollData?: any;
  total?: number;
}

export interface VirtualListContainerPropsInterface {
  data?: VirtualListContainerProps["data"];
  titleBrick?: VirtualListContainerProps["titleBrick"];
  suffixBrick?: VirtualListContainerProps["suffixBrick"];
  total?: number;
  oHeight?: string;
}

export interface VirtualListContainerEvents {
  "basic-bricks.scroll": CustomEvent<any>;
}

export interface VirtualListContainerEventsMap {
  onBasicBricksScroll: "basic-bricks.scroll";
}

export declare class VirtualListContainerElement extends HTMLElement {
  data: VirtualListContainerPropsInterface["data"] | undefined;
  titleBrick: VirtualListContainerPropsInterface["titleBrick"] | undefined;
  suffixBrick: VirtualListContainerPropsInterface["suffixBrick"] | undefined;
  total: number | undefined;
  oHeight: string | undefined;
}
