import { getRuntime } from "@next-core/brick-kit";
import { BuilderRouteNode } from "@next-core/brick-types";
import { computeConstantCondition } from "@next-core/brick-utils";
import { pipes } from "@next-core/pipes";
import type { WorkbenchNodeData } from "../shared/workbench/interfaces";

export function getWorkbenchRouteTree(
  routes: BuilderRouteNode[],
  activeRouteId?: string,
  linkFn?: (
    routeId: string,
    routeType: BuilderRouteNode["type"],
    routeInstanceId: string
  ) => WorkbenchNodeData["link"]
): WorkbenchNodeData[] {
  const tree: WorkbenchNodeData[] = [];
  const routeIds = new Set(routes.map((route) => route.id));
  const cachedChildren = new Map<string | number, WorkbenchNodeData[]>();
  const routeNodeMap = new Map<string, WorkbenchNodeData>();
  const nodeMap = new Map<string, BuilderRouteNode>();

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

    node.link = linkFn?.(route.id, route.type, route.instanceId);

    routeNodeMap.set(route.id, node);
    nodeMap.set(route.id, route);

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

  function markUnreachable(
    node: WorkbenchNodeData,
    parentIsUnreachable?: boolean
  ): void {
    if (parentIsUnreachable) {
      node.unreachable = true;
    } else {
      const route = nodeMap.get(node.key as string);
      if (route.if) {
        const check = { if: pipes.yaml(route.if as string) };
        computeConstantCondition(check);
        if (check.if === false) {
          node.unreachable = true;
        }
      }
    }

    if (Array.isArray(node.children)) {
      for (const child of node.children) {
        markUnreachable(child, node.unreachable);
      }
    }
  }

  for (const node of tree) {
    markUnreachable(node);
  }

  return tree;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getWorkbenchRouteTree",
  getWorkbenchRouteTree
);
