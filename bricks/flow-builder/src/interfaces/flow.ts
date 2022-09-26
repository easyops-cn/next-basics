import { MenuIcon } from "@next-core/brick-types";

export const stepList = [
  "task",
  "choice",
  "parallel",
  "map",
  "branch",
  "end",
  "iterator",
  "failed",
  "success",
] as const;

export type StepType = typeof stepList[number];

export interface StepItem {
  id: string;
  name: string;
  type: StepType;
  parameter?: any;
  output?: any;
  config?: {
    startAt?: string;
    [key: string]: any;
  };
  pre?: string;
  next?: string;
  parent?: string;
  children?: string[];
  end?: boolean;
}

export interface StepTreeNodeData {
  key: string;
  id: string;
  name: string;
  icon?: MenuIcon;
  iconTooltip?: string;
  data?: StepItem;
  children?: StepTreeNodeData[];
  badge?: MenuIcon;
  matchedSelf?: boolean;
  matched?: boolean;
}
