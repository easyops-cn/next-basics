import {
  RouteConf,
  BrickConf,
  SlotsConf,
  SlotConf,
  RouteConfOfRoutes,
  RouteConfOfBricks,
  SlotConfOfRoutes,
  SlotConfOfBricks,
  BrickConfInTemplate,
  BuilderRouteNode,
  BuilderBrickNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import {
  isObject,
  normalizeBuilderNode,
  normalizeMenu,
} from "@next-core/brick-utils";
import { isEmpty, sortBy } from "lodash";
import { BuildInfo, StoryboardToBuild } from "./interfaces";

export const symbolForNodeId = Symbol.for("nodeId");
export const symbolForNodeInstanceId = Symbol.for("nodeInstanceId");
export const symbolForNodeUseChildren = Symbol.for("useChildren");

type WeakMapOfNodeToConf = WeakMap<
  BuilderRouteOrBrickNode,
  RouteConf | BrickConf
>;

interface BuildContext {
  nodeToConf: WeakMapOfNodeToConf;
  keepIds?: boolean;
}

/**
 * @deprecated use `buildStoryboardV2` instead.
 */
export function buildStoryboard(data: BuildInfo): StoryboardToBuild {
  const keepIds = data.options?.keepIds;

  const fullList: BuilderRouteOrBrickNode[] = (
    data.routeList as BuilderRouteOrBrickNode[]
  ).concat(data.brickList);

  // A map from id to node.
  const idToNode = new Map<string, BuilderRouteOrBrickNode>(
    fullList.map((node) => [node.id, node])
  );
  const ctx: BuildContext = {
    nodeToConf: new WeakMap(),
    keepIds,
  };
  const nodeToParentCount = new WeakMap<BuilderRouteOrBrickNode, number>();

  // Ignore nodes with unknown ancients,
  // which are probably contained by custom templates.
  let list = fullList.filter((node) => checkNode(node, []));

  function checkNode(node: BuilderRouteOrBrickNode, stack: string[]): boolean {
    if (!node) {
      return false;
    }
    if (stack.includes(node.id)) {
      throw new Error(
        `Circular nodes found: ${stack.concat(node.id).join(",")}`
      );
    }
    return node.parent?.length
      ? checkNode(idToNode.get(node.parent[0].id), stack.concat(node.id))
      : true;
  }

  // Ensure parent nodes presented before child nodes.
  list.forEach(countParent);
  // Use sortBy to ensure that those nodes with the same parentCount will maintain the original sort.
  // Array.prototype.sort() in Chrome<70 uses unstable sorting algorithm.
  // Refs: https://bugs.chromium.org/p/v8/issues/detail?id=90
  list = sortBy(list, (v) => nodeToParentCount.get(v));

  function countParent(node: BuilderRouteOrBrickNode): number {
    let count = nodeToParentCount.get(node);
    if (!count) {
      count = node.parent?.length
        ? 1 + countParent(idToNode.get(node.parent[0].id))
        : 1;
      nodeToParentCount.set(node, count);
    }
    return count;
  }

  const routes: RouteConf[] = [];
  for (const node of list) {
    if (node.parent?.length) {
      const parentId = node.parent[0].id;
      const parentNode = idToNode.get(parentId);
      if (parentNode && ctx.nodeToConf.has(parentNode)) {
        mount(ctx, parentNode, node);
      } else {
        // eslint-disable-next-line no-console
        console.error("Parent error", node.parent[0], node);
      }
    } else {
      // Only route nodes at first level.
      if ((node as BuilderRouteNode).path) {
        routes.push(routeNodeToRouteConf(ctx, node as BuilderRouteNode));
      }
    }
  }

  const customTemplates = data.templateList?.map((template) => ({
    name: template.templateId,
    proxy: template.proxy,
    state: template.state,
    bricks: buildBricks(template.children, ctx) as BrickConfInTemplate[],
    ...(keepIds
      ? {
          [symbolForNodeId]: template.id,
        }
      : undefined),
  }));

  const menus = data.menus?.map(normalizeMenu);

  const i18n = data.i18n?.reduce(
    (acc, node) => {
      acc.en[node.name] = node.en;
      acc.zh[node.name] = node.zh;
      return acc;
    },
    {
      en: {},
      zh: {},
    } as Record<string, Record<string, string>>
  );

  const functions = data.functions?.map((fn) => ({
    name: fn.name,
    source: fn.source,
    typescript: fn.typescript,
  }));

  return {
    routes,
    meta: { customTemplates, menus, i18n, functions },
    dependsAll: data.dependsAll,
  };
}

function buildBricks(
  nodes: BuilderBrickNode[],
  ctx: BuildContext = {
    nodeToConf: new WeakMap(),
  }
): BrickConf[] {
  if (!nodes) {
    return [];
  }

  return nodes.map((node) => {
    const nodeConf = brickNodeToBrickConf(ctx, node);
    ctx.nodeToConf.set(node, nodeConf);
    normalizeBrickInSnippet(ctx, node);
    return nodeConf;
  });
}

function routeNodeToRouteConf(
  ctx: BuildContext,
  node: BuilderRouteNode
): RouteConf {
  const conf = normalize(node, ctx.keepIds) as unknown as RouteConf;

  // Ensure routes and bricks array according to node type.
  if (conf.type === "routes") {
    conf.routes = [];
  } else if (conf.type === "bricks") {
    conf.bricks = [];
  }

  ctx.nodeToConf.set(node, conf);
  return conf;
}

function brickNodeToBrickConf(
  ctx: BuildContext,
  node: BuilderBrickNode
): BrickConf {
  const conf = normalize(
    node,
    ctx.keepIds,
    // Also keep instance ids for bricks.
    ctx.keepIds
  ) as BrickConf;

  if (node.type === "template") {
    conf.template = conf.brick;
    delete conf.brick;
  }

  ctx.nodeToConf.set(node, conf);
  return conf;
}

function mount(
  ctx: BuildContext,
  parent: BuilderRouteOrBrickNode,
  child: BuilderRouteOrBrickNode
): void {
  switch (parent.type) {
    case "routes":
      mountRouteInRoute(ctx, parent, child as BuilderRouteNode);
      return;
    case "bricks":
      mountBrickInRoute(ctx, parent, child as BuilderBrickNode);
      return;
    case "brick":
      if ((child as BuilderRouteNode).path) {
        mountRouteInBrick(ctx, parent, child as BuilderRouteNode);
        return;
      } else if ((child as BuilderBrickNode).brick) {
        mountBrickInBrick(ctx, parent, child as BuilderBrickNode);
        return;
      }
  }
  // eslint-disable-next-line no-console
  console.error("Mount type error", parent, child);
}

function mountRouteInRoute(
  ctx: BuildContext,
  parent: BuilderRouteNode,
  child: BuilderRouteNode
): void {
  if (!child.path) {
    // eslint-disable-next-line no-console
    console.error("Mount type error", parent, child);
    return;
  }
  const parentConf = ctx.nodeToConf.get(parent) as RouteConfOfRoutes;
  parentConf.routes.push(routeNodeToRouteConf(ctx, child));
}

function mountBrickInRoute(
  ctx: BuildContext,
  parent: BuilderRouteNode,
  child: BuilderBrickNode
): void {
  if (!child.brick) {
    // eslint-disable-next-line no-console
    console.error("Mount type error", parent, child);
    return;
  }
  const parentConf = ctx.nodeToConf.get(parent) as RouteConfOfBricks;
  parentConf.bricks.push(brickNodeToBrickConf(ctx, child));
}

function mountRouteInBrick(
  ctx: BuildContext,
  parent: BuilderBrickNode,
  child: BuilderRouteNode
): void {
  const parentConf = ctx.nodeToConf.get(parent) as BrickConf;
  if (!parentConf.slots) {
    parentConf.slots = {};
  }
  if (!parentConf.slots[child.mountPoint]) {
    parentConf.slots[child.mountPoint] = {
      type: "routes",
      routes: [],
    };
  }
  if (parentConf.slots[child.mountPoint].type !== "routes") {
    // eslint-disable-next-line no-console
    console.error("Slot type error", parent, child);
    return;
  }
  (parentConf.slots[child.mountPoint] as SlotConfOfRoutes).routes.push(
    routeNodeToRouteConf(ctx, child)
  );
}

function mountBrickInBrick(
  ctx: BuildContext,
  parent: BuilderBrickNode,
  child: BuilderBrickNode
): void {
  const parentConf = ctx.nodeToConf.get(parent) as BrickConf;
  if (!parentConf.slots) {
    parentConf.slots = {};
  }
  if (!parentConf.slots[child.mountPoint]) {
    parentConf.slots[child.mountPoint] = {
      type: "bricks",
      bricks: [],
    };
  }
  if (parentConf.slots[child.mountPoint].type !== "bricks") {
    // eslint-disable-next-line no-console
    console.error("Slot type error", parent, child);
    return;
  }
  (parentConf.slots[child.mountPoint] as SlotConfOfBricks).bricks.push(
    brickNodeToBrickConf(ctx, child)
  );
  setUseChild(parentConf.properties, parentConf.slots);
}

function normalizeBrickInSnippet(
  ctx: BuildContext,
  node: BuilderBrickNode
): void {
  if (node.children) {
    (node.children as BuilderBrickNode[]).forEach((child) => {
      mountBrickInBrick(ctx, node, child);
      normalizeBrickInSnippet(ctx, child);
    });
  }
}

function normalize(
  node: BuilderRouteOrBrickNode,
  keepIds?: boolean,
  keepInstanceIds?: boolean
): Record<string, unknown> {
  const conf = normalizeBuilderNode(node);
  if (keepIds) {
    Object.assign(conf, {
      [symbolForNodeId]: node.id,
    });
  }
  if (keepInstanceIds) {
    Object.assign(conf, {
      [symbolForNodeInstanceId]: node.instanceId,
    });
  }
  return conf as Record<string, unknown>;
}

function setUseChild(
  parentConf: Record<string, unknown>,
  slots: SlotsConf
): void {
  if (!parentConf || !slots) return;

  const dfs = (conf: Record<string | symbol, any>): void => {
    for (const [k, v] of Object.entries(conf)) {
      if (Array.isArray(v) || isObject(v)) {
        dfs(v);
      }
      if (k === "useChildren" && typeof v === "string" && /^\[\w+\]$/.test(v)) {
        const matchUseChild: SlotConf = slots[v as string];
        if (matchUseChild?.type === "bricks") {
          Object.assign(conf, {
            [symbolForNodeUseChildren]: conf.useChildren,
          });
          conf.useBrick = matchUseChild.bricks[0];
          delete slots[v];
          delete conf.useChildren;
        }
      }
      if (!isEmpty(slots)) {
        Object.getOwnPropertySymbols(conf).forEach((symbol) => {
          if (symbol === symbolForNodeUseChildren) {
            const slotName: string = conf[symbol as any];
            const matchUseChild: SlotConf = slots[slotName];
            if (matchUseChild?.type === "bricks") {
              const targetBrick = Array.isArray(conf.useBrick)
                ? conf.useBrick
                : [conf.useBrick];
              conf.useBrick = [...targetBrick, ...matchUseChild.bricks];
              delete slots[slotName];
            }
          }
        });
      }
    }
  };

  dfs(parentConf);
}
