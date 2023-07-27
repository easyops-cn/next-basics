import { BuilderRouteNode } from "@next-core/brick-types";

export interface RouteTreeNode extends BuilderRouteNode {
  key: string;
  title: string;
  selected?: boolean;
  children?: RouteTreeNode[];
}

export interface TypeFieldItem {
  id: string;
  name: string;
  type: string;
  originType: string;
  required?: boolean;
  timeFormat?: string;
  options?: unknown[];
  model?: "multiple" | "tags";
  placeholder?: string;
  regex?: string;
}

interface WorkflowDataChildrenOption {
  label: string;
  value: string;
  [key: string]: any;
}

export interface WorkflowDataItem extends WorkflowDataChildrenOption {
  options?: WorkflowDataChildrenOption[];
}

interface WorkflowStepInfo {
  selectedModel?: string;
  selectedStepId?: string;
  comments?: {
    passRequired?: boolean;
    rejectRequired?: boolean;
  };
  approvers?: string[];
  notifier?: string[];
  condition: any;
}

export interface WorkflowValueInfo {
  type: WorkFLowValueType;
  value: any;
}

interface WorkflowVariable {
  id: string;
  name: string;
  required: "true" | "false";
  value?: Record<string, any>;
  valueInfo?: WorkflowValueInfo;
}

export type WorkFLowNodeType =
  | "approval"
  | "start_approval"
  | "notice"
  | "cmdb_create"
  | "cmdb_edit"
  | "cmdb_search"
  | "cmdb_delete"
  | "condition"
  | "gateway"
  | "start"
  | "end";

export interface WorkFlowNode {
  name?: string;
  id: string;
  type: WorkFLowNodeType;
  parallel?: boolean;
  gatewayType?: "inclusive" | "exclusive";
  approver?: string[];
  ccPerson?: string[];
  stepInfo?: WorkflowStepInfo[];
  stepVariable?: WorkflowVariable[];
  pre?: string[];
  next?: string[];
  parent?: string;
  children?: string[];
}

export enum WorkFLowValueType {
  CONST = "const",
  EXPR = "expr",
}

export interface WorkflowCondition {
  fieldKey: string;
  comparator: string;
  valueInfo: WorkflowValueInfo;
}
export interface ComparatorOption {
  id: string;
  name: string;
}
