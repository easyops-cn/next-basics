// istanbul ignore file
// For temporary usage only, will change soon.
import { getRuntime } from "@next-core/brick-kit";
import { BuilderRouteNode } from "@next-core/brick-types";
import type { WorkbenchNodeData } from "../shared/workbench/interfaces";

export function getWorkbenchRouteTree(
  routes: BuilderRouteNode[],
  activeRouteId?: string,
  linkFn?: (
    routeId: string,
    routeType: BuilderRouteNode["type"]
  ) => WorkbenchNodeData["link"]
): WorkbenchNodeData[] {
  const tree: WorkbenchNodeData[] = [];
  const routeIds = new Set(routes.map((route) => route.id));
  const cachedChildren = new Map<string | number, WorkbenchNodeData[]>();
  const routeNodeMap = new Map<string, WorkbenchNodeData>();

  for (const route of routes) {
    const node: WorkbenchNodeData = {
      key: route.id,
      name: route.alias || route.path.replace(/^\$\{APP\.homepage\}/, ""),
      icon: {
        lib: "antd",
        theme: "outlined",
        icon:
          route.type === "redirect"
            ? "double-right"
            : route.type === "routes"
            ? "down"
            : "branches",
        color:
          route.type === "redirect"
            ? "var(--palette-cyan-7)"
            : route.type === "routes"
            ? undefined
            : "var(--palette-blue-7)",
      },
      data: route,
    };

    if (linkFn) {
      node.link = linkFn(route.id, route.type);
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
  "nextBuilder.getWorkbenchRouteTree",
  getWorkbenchRouteTree
);
