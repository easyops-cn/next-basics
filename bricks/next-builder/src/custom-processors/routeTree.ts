import { cloneDeep } from "lodash";
import { getRuntime } from "@next-core/brick-kit";
import { BuilderRouteNode } from "@next-core/brick-types";

export interface RouteTreeNode extends BuilderRouteNode {
  key: string;
  title: string;
  selected?: boolean;
  children?: RouteTreeNode[];
}

export function routeTree(
  data: BuilderRouteNode[],
  selectedId?: string
): RouteTreeNode[] {
  const result = [];
  const list = cloneDeep(data ?? []);

  // A map from id to route node.
  const idToRoute = new Map<string, BuilderRouteNode>(
    list.map((node) => [node.id, node])
  );

  for (const node of list) {
    const item = node as RouteTreeNode;
    item.key = item.id;
    item.title = item.path;

    if (selectedId && item.id === selectedId) {
      item.selected = true;
    }

    if (!item.parent || item.parent?.length == 0) {
      result.push(item);
      continue;
    }

    const parent = idToRoute.get(item.parent[0].id);
    if (!parent) {
      continue;
    }

    if (!parent.children) {
      parent.children = [];
    }
    parent.children.push(item);
  }
  return result;
}

getRuntime().registerCustomProcessor("nextBuilder.routeTree", routeTree);
