import React from "react";
import type { DataNode, TreeProps } from "antd/lib/tree";
import type { EventDataNode } from "rc-tree/lib/interface";
import type { UseBrickConf } from "@next-core/brick-types";
import type { MenuIcon } from "@next-core/brick-types";
import type { TreeNodeProps } from "antd/lib/tree";

export type BrickTreeNodeProps = Omit<AntTreeNodeProps, "children"> & {
  title?: string;
  icon?: TreeIcon;
  key?: React.Key;
  children?: BrickTreeNodeProps[];
};

export type TreeIcon =
  | MenuIcon
  | React.ComponentType<React.SVGAttributes<SVGElement>>;

export interface BrickTreeProps {
  selectedKeys?: React.Key[];
  checkedKeys?: React.Key[];
  expandedKeys?: React.Key[];
  configProps?: Omit<
    TreeProps,
    "selectedKeys" | "checkedKeys" | "expandedKeys"
  >;
  dataSource: BrickTreeNodeProps[];
  searchable?: boolean;
  searchQ?: string;
  placeholder?: string;
  searchParent?: boolean;
  checkAllEnabled?: boolean;
  checkedFilterConfig?: checkedFilterProps;
  checkedNotRelevant?: boolean;
  onSelect?(
    selectedKeys: React.Key[],
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ): void;
  onCheck?(
    checkedKeys:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] }
  ): void;
  onCheckV2?(
    checkedKeys:
      | React.Key[]
      | { checked: React.Key[]; halfChecked: React.Key[] },
    info: {
      event: "check";
      checked: boolean;
      checkedNodes: DataNode[];
      nativeEvent: MouseEvent;
    }
  ): void;
  onExpand?(expandedKeys: React.Key[]): void;
  onSearch?(value: string): void;
  suffixBrick?: { useBrick: UseBrickConf };
  suffixStopEvent?: boolean;
  afterSearchBrick?: { useBrick: UseBrickConf };
  beforeTreeBrick?: { useBrick: UseBrickConf };
  showSpecificationTitleStyle?: boolean;
  defaultExpandAll?: boolean;
  deselectable?: boolean;
  alsoSearchByKey?: boolean;
  isFilter?: boolean;
  iconUseBrick?: { useBrick: UseBrickConf };
  isDirectory?: boolean;
  hideSelectedNum?: boolean;
  hideBackground?: boolean;
  onlyHighlightBySearch?: boolean;
  height?: number | "auto";
}

export interface BrickTreeElementProps {
  dataSource?: BrickTreeNodeProps[];
  selectedKeys?: string[];
  checkedKeys?: string[];
  expandedKeys?: string[];
  searchable?: boolean;
  searchQ?: string;
  isFilter?: boolean;
  isDirectory?: boolean;
  alsoSearchByKey?: boolean;
  showSpecificationTitleStyle?: boolean;
  placeholder?: string;
  configProps?: TreeProps;
  searchParent?: boolean;
  checkAllEnabled?: boolean;
  checkedFilterConfig?: checkedFilterProps;
  checkedNotRelevant?: boolean;
  suffixBrick?: { useBrick: UseBrickConf };
  suffixStopEvent?: boolean;
  afterSearchBrick?: { useBrick: UseBrickConf };
  beforeTreeBrick?: { useBrick: UseBrickConf };
  defaultExpandAll?: boolean;
  deselectable?: boolean;
  iconUseBrick?: { useBrick: UseBrickConf };
  hideSelectedNum?: boolean;
  hideBackground?: boolean;
  onlyHighlightBySearch?: boolean;
  virtualScrollHeight?: number | "auto";
}

export interface BrickTreeEvents {
  "tree.select": CustomEvent<string[]>;
  "tree.selectV2": CustomEvent<{
    selectedKeys: string[];
    info: {
      event: "select";
      selected: boolean;
      node: EventDataNode;
      selectedNodes: DataNode[];
      nativeEvent: MouseEvent;
    };
  }>;
  "tree.check": CustomEvent<
    string[] | { checked: string[]; halfChecked: string[] }
  >;
  "tree.checkV2": CustomEvent<{
    checkedKeys: string[] | { checked: string[]; halfChecked: string[] };
    info: {
      event: "check";
      checked: boolean;
      checkedNodes: DataNode[];
      nativeEvent: MouseEvent;
    };
  }>;
  "tree.search": CustomEvent<string>;
  "tree.expand": CustomEvent<React.Key[]>;
}

export interface BrickTreeEventsMap {
  onTreeSelect: "tree.select";
  onTreeSelectV2: "tree.selectV2";
  onTreeCheck: "tree.check";
  onTreeCheckV2: "tree.checkV2";
  onTreeSearch: "tree.search";
  onTreeExpand: "tree.expand";
}

export declare class BrickTreeElement extends HTMLElement {
  dataSource: BrickTreeNodeProps[] | undefined;
  selectedKeys: string[] | undefined;
  checkedKeys: string[] | undefined;
  expandedKeys: string[] | undefined;
  searchable: boolean | undefined;
  searchQ: string | undefined;
  isFilter: boolean | undefined;
  isDirectory: boolean | undefined;
  alsoSearchByKey: boolean | undefined;
  showSpecificationTitleStyle: boolean | undefined;
  placeholder: string | undefined;
  configProps: TreeProps | undefined;
  searchParent: boolean | undefined;
  checkAllEnabled: boolean | undefined;
  checkedFilterConfig: checkedFilterProps | undefined;
  checkedNotRelevant: boolean | undefined;
  suffixBrick: { useBrick: UseBrickConf } | undefined;
  suffixStopEvent: boolean | undefined;
  afterSearchBrick: { useBrick: UseBrickConf } | undefined;
  beforeTreeBrick: { useBrick: UseBrickConf } | undefined;
  defaultExpandAll: boolean | undefined;
  deselectable: boolean | undefined;
  iconUseBrick: BrickTreeElementProps["iconUseBrick"] | undefined;
  hideSelectedNum: boolean | undefined;
  hideBackground: boolean | undefined;
  onlyHighlightBySearch: boolean | undefined;
  virtualScrollHeight: number | "auto" | undefined;
}
