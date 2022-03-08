// istanbul ignore file
// For temporary usage only, will change soon.
import { getRuntime } from "@next-core/brick-kit";
import { BuilderRouteNode } from "@next-core/brick-types";
import { WorkbenchNodeData } from "../workbench-tree/WorkbenchTree";

export function workbenchRouteTree(
  routes: BuilderRouteNode[],
  activeRouteId?: string,
  linkFn?: (routeId: string) => WorkbenchNodeData["link"]
): WorkbenchNodeData[] {
  const tree: WorkbenchNodeData[] = [];
  const routeIds = new Set(routes.map((route) => route.id));
  const cachedChildren = new Map<string | number, WorkbenchNodeData[]>();
  const routeNodeMap = new Map<string, WorkbenchNodeData>();

  for (const route of routes) {
    const node: WorkbenchNodeData = {
      key: route.id,
      type: route.type,
      name: route.alias || route.path,
      active: activeRouteId && activeRouteId === route.id,
    };

    if (linkFn) {
      node.link = linkFn(route.id);
    }

    routeNodeMap.set(route.id, node);

    if (!route.parent?.length) {
      tree.push(node);
      continue;
    }

    const parentId = route.parent[0].id;
    if (!routeIds.has(parentId)) {
      continue;
    }

    // Parent node may be listed after its children.
    let cache = cachedChildren.get(parentId);
    if (!cache) {
      cache = [];
      cachedChildren.set(parentId, cache);
    }
    cache.push(node);
  }

  for (const routeId of routeIds) {
    const node = routeNodeMap.get(routeId);
    node.children = cachedChildren.get(node.key);
  }

  return tree;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.workbenchRouteTree",
  workbenchRouteTree
);
