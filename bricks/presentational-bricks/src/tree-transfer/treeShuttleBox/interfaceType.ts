import { TreeProps } from "antd";
import { DataNode } from "rc-tree-select/lib/interface";
export type treeDataType = Required<Pick<TreeProps, "treeData">>;
export type onCheckType = Required<Pick<TreeProps, "onCheck">>;
export interface FunEntryType {
  treeData: DataNode[];
  callback?: (item: DataNode, parentId?: string | null | number) => void;
  replaceName?: string;
  parentId?: string | null | number;
}

export interface FlatEntryType extends treeDataType {
  callback?: (item: DataNode, index: number) => void;
  replaceName?: string;
}
