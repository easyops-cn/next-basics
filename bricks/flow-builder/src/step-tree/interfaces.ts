import React from "react";
import { MenuIcon } from "@next-core/brick-types";
import { StepItem, StepTreeNodeData } from "../interfaces";

export interface StepTreeAction {
  action: string;
  icon: MenuIcon;
  title?: string;
}

export interface ActionClickDetail {
  action: string;
  data?: unknown;
}

export interface ContextOfWorkbenchTree {
  actions?: StepTreeAction[];
  actionsHidden?: boolean;
  onActionClick?(detail: ActionClickDetail): void;
  collapsible?: boolean;
  collapsedNodes?: string[];
  getCollapsedId?: (data: StepTreeNodeData) => string;
  onNodeToggle?(nodeId: string, collapsed: boolean): void;
  activeKey?: string;
  nodeClickFactory?: (
    data: StepTreeNodeData
  ) => (event: MouseEvent | React.MouseEvent) => void;
  contextMenuFactory?(
    node?: StepTreeNodeData
  ): (event: React.MouseEvent) => void;
  mouseEnterFactory?: (data: StepTreeNodeData) => () => void;
  mouseLeaveFactory?: (data: StepTreeNodeData) => () => void;
  matchNode?: (node: StepTreeNodeData, lowerTrimmedQuery?: string) => boolean;
}

export interface ActionClickDetail {
  action: string;
  data?: unknown;
}

export interface StepCheckedItem extends StepItem {
  checked?: boolean;
}
export type StepCheckMap = Map<string, StepCheckedItem>;

export interface ContextOfTreeList {
  q?: string;
  multipleSelectMode?: boolean;
  checkedMap?: StepCheckMap;
  setCheckedMap?: (data: StepCheckMap) => void;
}
