import type { UseBrickConf } from "@next-core/brick-types";

export interface BrickTimelineProps {
  itemList: ItemProps[];
  useBrick?: UseBrickConf;
  statusMap?: Record<string, StatusColor>;
  type?: "base" | "extension";
  timeType?: TimeType;
  showCard?: boolean;
  mode?: "left" | "right" | "alternate";
  onClick?: (data: ItemProps) => void;
}

export type ItemProps = TimelineItem | Record<string, any>;

export interface TimelineItem {
  title: string;
  description: string;
  time: string | number;
  status: string;
  link: string;
}

export type StatusColor = "green" | "red" | "gray" | "blue";

export type TimeType = "second" | "default";

export interface BrickTimelinePropsInterface {
  itemList?: BrickTimelineProps["itemList"];
  useBrick?: UseBrickConf;
  statusMap?: BrickTimelineProps["statusMap"];
  type?: BrickTimelineProps["type"];
  timeType?: BrickTimelineProps["timeType"];
  showCard?: boolean;
  mode?: BrickTimelineProps["mode"];
}

export interface BrickTimelineEvents {
  "item.click": CustomEvent<ItemProps>;
}

export interface BrickTimelineEventsMap {
  onItemClick: "item.click";
}

export declare class BrickTimelineElement extends HTMLElement {
  itemList: BrickTimelinePropsInterface["itemList"] | undefined;
  useBrick: UseBrickConf | undefined;
  statusMap: BrickTimelinePropsInterface["statusMap"] | undefined;
  type: BrickTimelinePropsInterface["type"] | undefined;
  timeType: BrickTimelinePropsInterface["timeType"] | undefined;
  showCard: boolean | undefined;
  mode: BrickTimelinePropsInterface["mode"] | undefined;
}
