import { MouseEvent } from "react";
import { MenuIcon } from "@next-core/brick-types";
import { StepTreeNodeData } from "../interfaces";

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
  activeKey?: string;
  nodeClickFactory?: (data: StepTreeNodeData) => (event: MouseEvent) => void;
  mouseEnterFactory?: (data: StepTreeNodeData) => () => void;
  matchNode?: (node: StepTreeNodeData, lowerTrimmedQuery?: string) => boolean;
}

export interface ContextOfTreeList {
  q?: string;
}
