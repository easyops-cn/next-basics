import { cloneDeep } from "lodash";
import { RouteTreeNode } from "../interface";
import { BuilderRouteNode } from "@next-core/brick-types";

export interface GenerateRouteTreeParams {
  data: BuilderRouteNode[];
  selectedId?: string;
  disableParentNodeSelectable?: boolean;
}

export function generateRouteTree({
  data,
  selectedId,
  disableParentNodeSelectable
}: GenerateRouteTreeParams): RouteTreeNode[] {
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
  if(disableParentNodeSelectable){
    for(const node of list){
      if(node.children?.length){
        node.selectable = false;
      }
    }
  }
  return result;
}
