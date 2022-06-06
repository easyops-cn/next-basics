import {
  RouteConf,
  BrickConf,
  BrickConfInTemplate,
  BuilderRouteNode,
  BuilderBrickNode,
  BuilderRouteOrBrickNode,
  SlotConf,
  Contract,
} from "@next-core/brick-types";
import {
  isObject,
  normalizeBuilderNode,
  normalizeMenu,
  isRouteNode,
} from "@next-core/brick-utils";
import { safeLoad, JSON_SCHEMA } from "js-yaml";
import { get, isEmpty } from "lodash";
import { BuildInfoV2, StoryboardToBuild } from "./interfaces";
import { ContractCenterApi_batchSearchContract } from "@next-sdk/next-builder-sdk";
import {
  ScanBricksAndTemplates,
  DependContract,
  DependContractOfApi,
} from "../../data-providers/ScanBricksAndTemplates";

export const symbolForNodeId = Symbol.for("nodeId");
export const symbolForNodeInstanceId = Symbol.for("nodeInstanceId");

interface BuildContext {
  keepIds?: boolean;
  appId?: string;
  internalTemplateNames?: Set<string>;
}

/**
 * Refined building storyboard with graph api response.
 */
export async function buildStoryboardV2(
  data: BuildInfoV2
): Promise<StoryboardToBuild> {
  const keepIds = data.options?.keepIds;
  const ctx: BuildContext = {
    keepIds,
  };

  const routes = buildRoutes(data.routeList, ctx);

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

  const meta = {
    customTemplates,
    menus,
    i18n,
    functions,
    mocks: data.mocks,
  };

  // 基于当前最新的 storyboard 扫描 contract 信息
  const { contractData: contractStr } = ScanBricksAndTemplates({
    storyboard: {
      app: data.app,
      routes,
      meta,
    },
    version: "workspace",
    dependencies: data.dependencies,
  });

  const deps: DependContract[] = get(
    safeLoad(contractStr, { schema: JSON_SCHEMA, json: true }),
    "contracts[0].deps"
  );

  const contracts = deps?.filter(
    (item) => item.type === "contract"
  ) as DependContractOfApi[];

  let contractList: Contract[];
  if (!isEmpty(contracts)) {
    try {
      contractList = (
        await ContractCenterApi_batchSearchContract({
          contract: contracts.map((item) => {
            const arr = item.contract.split(".");
            const apiName = arr.pop();

            return {
              fullContractName: `${arr.join(".")}@${apiName}`,
              version: item.version,
            };
          }),
        })
      ).list as Contract[];
    } catch (e) {
      /* istanbul ignore next */
      contractList = [];
    }
  }

  return {
    routes,
    meta: {
      ...meta,
      contracts: contractList,
    },
    dependsAll: data.dependsAll,
  };
}

export function buildRoutes(
  nodes: BuilderRouteNode[],
  ctx: BuildContext
): RouteConf[] {
  return nodes ? nodes.map((node) => buildRoute(node, ctx)) : [];
}

function buildRoute(node: BuilderRouteNode, ctx: BuildContext = {}): RouteConf {
  const routeConf = normalize(node, ctx.keepIds) as unknown as RouteConf;
  switch (routeConf.type) {
    case "routes":
      routeConf.routes = buildRoutes(node.children as BuilderRouteNode[], ctx);
      break;
    case "bricks":
      routeConf.bricks = buildBricks(node.children as BuilderBrickNode[], ctx);
  }
  return routeConf;
}

/**
 * This is used for building custom-templates and snippets.
 */
export function buildBricks(
  nodes: BuilderBrickNode[],
  ctx?: BuildContext
): BrickConf[] {
  return nodes ? nodes.map((node) => buildBrick(node, ctx)) : [];
}

function buildBrick(node: BuilderBrickNode, ctx?: BuildContext): BrickConf {
  const brickConf = brickNodeToBrickConf(node, ctx);
  if (node.type === "brick") {
    if (node.children?.length > 0) {
      brickConf.slots = {};
      const useChildrenMap = new Map<string, BrickConf[]>();
      for (const child of node.children) {
        const mountPoint = child.mountPoint ?? "";
        if (/^\[\w+\]$/.test(mountPoint)) {
          let bricks = useChildrenMap.get(mountPoint);
          if (!bricks) {
            useChildrenMap.set(mountPoint, (bricks = []));
          }
          bricks.push(buildBrick(child as BuilderBrickNode, ctx));
        } else {
          const type = isRouteNode(child) ? "routes" : "bricks";
          let slotConf = brickConf.slots[mountPoint];
          if (!slotConf) {
            slotConf = brickConf.slots[mountPoint] = {
              type,
              [type]: [],
            } as unknown as SlotConf;
          } else if (slotConf.type !== type) {
            // eslint-disable-next-line no-console
            console.error("Slot type error", node, child);
            return;
          }
          if (slotConf.type === "routes") {
            slotConf.routes.push(buildRoute(child as BuilderRouteNode, ctx));
          } else {
            slotConf.bricks.push(buildBrick(child as BuilderBrickNode, ctx));
          }
        }
      }
      if (useChildrenMap.size > 0) {
        replaceUseChildren(brickConf.properties, useChildrenMap);
      }
    }
  }
  return brickConf;
}

function replaceUseChildren(
  value: unknown,
  useChildrenMap: Map<string, BrickConf[]>
): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      replaceUseChildren(item, useChildrenMap);
    }
  } else if (isObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (k === "useChildren") {
        const children = useChildrenMap.get(v);
        if (children) {
          delete value[k];
          value.useBrick = children.length === 1 ? children[0] : children;
        }
      } else {
        replaceUseChildren(v, useChildrenMap);
      }
    }
  }
}

function brickNodeToBrickConf(
  node: BuilderBrickNode,
  ctx: BuildContext = {}
): BrickConf {
  const conf = normalize(
    node,
    ctx.keepIds,
    // Also keep instance ids for bricks.
    ctx.keepIds
  ) as BrickConf;

  // Prefix with appId for internal custom templates.
  if (
    ctx.internalTemplateNames &&
    node.type !== "template" &&
    typeof conf.brick === "string" &&
    conf.brick.includes("-") &&
    !conf.brick.includes(".") &&
    ctx.internalTemplateNames.has(conf.brick)
  ) {
    // Todo(steve): replace `useBrick` which use internal custom templates.
    // Only consider this after `useBrick` supports using custom templates.
    conf.brick = `${ctx.appId}.${conf.brick}`;
  }

  if (node.type === "template") {
    conf.template = conf.brick;
    delete conf.brick;
  }

  return conf;
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
