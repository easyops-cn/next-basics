import { MenuIcon } from "@next-core/brick-types";
export type StepType =
  | "task"
  | "choice"
  | "parallel"
  | "map"
  | "branch"
  | "iterator"
  | "failed"
  | "success";

export interface StepItem {
  id: string;
  name: string;
  type: StepType;
  parameter?: any;
  output?: any;
  config?: any;
  end?: boolean;
  next?: string;
  parent?: string;
  children?: string[];
}

export interface StepTreeNodeData {
  key: string;
  name: string;
  icon?: MenuIcon;
  iconTooltip?: string;
  data?: StepItem;
  children?: StepTreeNodeData[];
  badge?: MenuIcon;
  matchedSelf?: boolean;
  matched?: boolean;
}
