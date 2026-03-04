import type { UseBrickConf } from "@next-core/brick-types";

export interface itemData {
  list: Record<string, any>[];
  page_size?: number | string;
  page?: number | string;
}

export interface AdvanceListContainerProps {
  data: {
    list: Record<string, any>[];
    page_size?: number | string;
    page?: number | string;
  };
  titleBrick: { useBrick: UseBrickConf };
  suffixBrick?: { useBrick: UseBrickConf };
  itemClick?: () => void;
  selectable?: boolean;
  defaultActiveIndex?: number;
}

export interface AdvanceListContainerPropsInterface {
  data?: AdvanceListContainerProps["data"];
  titleBrick?: AdvanceListContainerProps["titleBrick"];
  suffixBrick?: AdvanceListContainerProps["suffixBrick"];
  showCard?: boolean;
  defaultActiveIndex?: number;
  notTriggerClickEventWhenInit?: boolean;
  selectable?: boolean;
}

export interface AdvanceListContainerEvents {
  "item.click": CustomEvent<{
    item: any;
    index: number;
  }>;
}

export interface AdvanceListContainerEventsMap {
  onItemClick: "item.click";
}

export declare class AdvanceListContainerElement extends HTMLElement {
  data: AdvanceListContainerProps1["data"] | undefined;
  titleBrick: AdvanceListContainerProps["titleBrick"] | undefined;
  suffixBrick: AdvanceListContainerProps["suffixBrick"] | undefined;
  showCard: boolean | undefined;
  defaultActiveIndex: number | undefined;
  notTriggerClickEventWhenInit: boolean | undefined;
  selectable: boolean | undefined;
}
