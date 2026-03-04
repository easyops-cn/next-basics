import type { UseBrickConf } from "@next-core/brick-types";

export type InfoDetail = {
  key: string;
  title: string;
  detail: string;
};

export interface CollapseInfoListProps {
  dataSource?: InfoDetail[];
  titleBrick?: { useBrick: UseBrickConf };
  extraBrick?: { useBrick: UseBrickConf };
}

export interface CollapseInfoListEvents {
  "collapse-info-list.change": CustomEvent<string[]>;
}

export interface CollapseInfoListEventsMap {
  onCollapseInfoListChange: "collapse-info-list.change";
}

export declare class CollapseInfoListElement extends HTMLElement {
  dataSource: InfoDetail[] | undefined;
  titleBrick: { useBrick: UseBrickConf } | undefined;
  extraBrick: { useBrick: UseBrickConf } | undefined;
}
