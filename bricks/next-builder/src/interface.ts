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
  required?: boolean;
  timeFormat?: string;
}

interface WorkflowDataChildrenOption {
  label: string;
  value: string;
}

export interface WorkflowDataItem extends WorkflowDataChildrenOption {
  options?: WorkflowDataChildrenOption[];
}
