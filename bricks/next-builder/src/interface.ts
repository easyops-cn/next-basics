import { BuilderRouteNode } from "@next-core/brick-types";

export interface RouteTreeNode extends BuilderRouteNode {
  key: string;
  title: string;
  selected?: boolean;
  children?: RouteTreeNode[];
}