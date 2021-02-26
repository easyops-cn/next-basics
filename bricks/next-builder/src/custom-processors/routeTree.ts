import { getRuntime } from "@next-core/brick-kit";
import { RouteTreeNode } from "../interface";
import { BuilderRouteNode } from "@next-core/brick-types";
import { generateRouteTree } from "../utils/generateRouteTree";

export function routeTree(
  data: BuilderRouteNode[],
  selectedId?: string
): RouteTreeNode[] {
  return generateRouteTree({data,selectedId});
}

getRuntime().registerCustomProcessor("nextBuilder.routeTree", routeTree);
