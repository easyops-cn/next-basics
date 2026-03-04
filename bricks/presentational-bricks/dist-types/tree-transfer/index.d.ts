import React from "react";
import type { DataNode } from "rc-tree-select/lib/interface";
import type React from "react";

export interface TreeTransferProps {
  dataSource?: any[];
  selectedKeys?: string[];
  listStyle?: React.CSSProperties;
  showSearch?: boolean;
  titles?: string[];
  shownumItem?: boolean;
  replaceFields?: { key: string; title: string };
  defaultExpandAll?: boolean;
}

export interface TreeTransferEvents {
  "general.transfer.change": CustomEvent<Array<DataNode["key"]>>;
}

export interface TreeTransferEventsMap {
  onGeneralTransferChange: "general.transfer.change";
}

export declare class TreeTransferElement extends HTMLElement {
  dataSource: any[] | undefined;
  selectedKeys: string[] | undefined;
  listStyle: React.CSSProperties | undefined;
  showSearch: boolean | undefined;
  titles: string[] | undefined;
  shownumItem: boolean | undefined;
  replaceFields: { key: string; title: string } | undefined;
  defaultExpandAll: boolean | undefined;
}
