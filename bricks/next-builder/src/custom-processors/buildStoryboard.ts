import { getRuntime } from "@next-core/brick-kit";
import {
  RouteConf,
  BrickConf,
  RouteConfOfRoutes,
  RouteConfOfBricks,
  SlotConfOfRoutes,
  SlotConfOfBricks,
  CustomTemplateProxy,
  BrickConfInTemplate,
  CustomTemplate,
  MetaI18n,
  ResolveConf,
  BuilderRouteNode,
  BuilderBrickNode,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import { sortBy } from "lodash";
import yaml from "js-yaml";

interface BuildInfo {
  routeList: BuilderRouteNode[];
  brickList: BuilderBrickNode[];
  templateList?: TemplateNode[];
  menus?: MenuNode[];
  i18n?: I18nNode[];
  dependsAll?: boolean;
}

interface TemplateNode {
  templateId: string;
  children?: BuilderBrickNode[];
  proxy?: CustomTemplateProxy;
}

interface MenuNode {
  menuId: string;
  items?: MenuItemNode[];
  dynamicItems?: boolean;
  itemsResolve?: ResolveConf;
}

interface MenuItemNode {
  text: string;
  children?: MenuItemNode[];
}

interface StoryboardToBuild {
  routes: RouteConf[];
  meta: {
    customTemplates?: CustomTemplate[];
    menus?: Record<string, unknown>[];
    i18n?: MetaI18n;
  };
  dependsAll?: boolean;
}

interface I18nNode {
  name: string;
  en: string;
  zh: string;
}

const jsonFieldsInRoute = [
  "menu",
  "providers",
  "segues",
  "defineResolves",
  "redirect",
];

// Fields stored as yaml string will be parsed when build & push.
const yamlFieldsInRoute = ["permissionsPreCheck"];

const jsonFieldsInBrick = ["properties", "events", "lifeCycle", "params", "if"];

// Fields stored as yaml string will be parsed when build & push.
const yamlFieldsInBrick = ["permissionsPreCheck"];

// Fields started with `_` will be removed by default.
const fieldsToRemoveInRoute = [
  "appId",
  "children",
  "creator",
  "ctime",
  "id",
  "instanceId",
  "graphInfo",
  "modifier",
  "mountPoint",
  "mtime",
  "org",
  "parent",
  "sort",

  "deleteAuthorizers",
  "readAuthorizers",
  "updateAuthorizers",
];

const fieldsToRemoveInBrick = fieldsToRemoveInRoute.concat("type");

const fieldsToKeepInMenu = [
  "menuId",
  "title",
  "icon",
  "titleDataSource",
  "defaultCollapsed",
  "link",
  "items",
  "type",
  "dynamicItems",
  "itemsResolve",
];

const fieldsToKeepInMenuItem = [
  "text",
  "to",
  "target",
  "icon",
  "exact",
  "key",
  "activeIncludes",
  "activeExcludes",
  "activeMatchSearch",
  "type",
  "sort",
  "children",
  "defaultExpanded",
  "if",
];

export function buildStoryboard(data: BuildInfo): StoryboardToBuild {
  const fullList: BuilderRouteOrBrickNode[] = (data.routeList as BuilderRouteOrBrickNode[]).concat(
    data.brickList
  );

  // A map from id to node.
  const idToNode = new Map<string, BuilderRouteOrBrickNode>(
    fullList.map((node) => [node.id, node])
  );
  const nodeToConf = new WeakMap<
    BuilderRouteOrBrickNode,
    RouteConf | BrickConf
  >();
  const nodeToParentCount = new WeakMap<BuilderRouteOrBrickNode, number>();

  // Ignore nodes with unknown ancients,
  // which are probably contained by custom templates.
  let list = fullList.filter(checkNode);

  function checkNode(node: BuilderRouteOrBrickNode): boolean {
    return node
      ? node.parent?.length
        ? checkNode(idToNode.get(node.parent[0].id))
        : true
      : false;
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
      if (parentNode && nodeToConf.has(parentNode)) {
        mount(parentNode, node);
      } else {
        // eslint-disable-next-line no-console
        console.error("Parent error", node.parent[0], node);
      }
    } else {
      // Only route nodes at first level.
      if ((node as BuilderRouteNode).path) {
        routes.push(routeNodeToRouteConf(node as BuilderRouteNode));
      }
    }
  }

  const customTemplates = data.templateList?.map((template) => ({
    name: template.templateId,
    proxy: template.proxy,
    bricks: getBricksOfTemplate(template.children),
  }));

  const menus = data.menus?.map((node) => {
    const menuConf = keep(node, fieldsToKeepInMenu);
    menuConf.items = keepItems(node.items, fieldsToKeepInMenuItem);
    return menuConf;
  });

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

  function routeNodeToRouteConf(node: BuilderRouteNode): RouteConf {
    const conf = (normalize(
      node,
      fieldsToRemoveInRoute,
      jsonFieldsInRoute,
      yamlFieldsInRoute
    ) as unknown) as RouteConf;

    // Ensure routes and bricks array according to node type.
    if (conf.type === "routes") {
      conf.routes = [];
    } else if (conf.type === "bricks") {
      conf.bricks = [];
    }

    nodeToConf.set(node, conf);
    return conf;
  }

  function brickNodeToBrickConf(node: BuilderBrickNode): BrickConf {
    const conf = normalize(
      node,
      fieldsToRemoveInBrick,
      jsonFieldsInBrick,
      yamlFieldsInBrick
    ) as BrickConf;

    if (node.type === "template") {
      conf.template = conf.brick;
      delete conf.brick;
    }

    nodeToConf.set(node, conf);
    return conf;
  }

  function mount(
    parent: BuilderRouteOrBrickNode,
    child: BuilderRouteOrBrickNode
  ): void {
    switch (parent.type) {
      case "routes":
        mountRouteInRoute(parent, child as BuilderRouteNode);
        return;
      case "bricks":
        mountBrickInRoute(parent, child as BuilderBrickNode);
        return;
      case "brick":
        if ((child as BuilderRouteNode).path) {
          mountRouteInBrick(parent, child as BuilderRouteNode);
          return;
        } else if ((child as BuilderBrickNode).brick) {
          mountBrickInBrick(parent, child as BuilderBrickNode);
          return;
        }
    }
    // eslint-disable-next-line no-console
    console.error("Mount type error", parent, child);
  }

  function mountRouteInRoute(
    parent: BuilderRouteNode,
    child: BuilderRouteNode
  ): void {
    if (!child.path) {
      // eslint-disable-next-line no-console
      console.error("Mount type error", parent, child);
      return;
    }
    const parentConf = nodeToConf.get(parent) as RouteConfOfRoutes;
    parentConf.routes.push(routeNodeToRouteConf(child));
  }

  function mountBrickInRoute(
    parent: BuilderRouteNode,
    child: BuilderBrickNode
  ): void {
    if (!child.brick) {
      // eslint-disable-next-line no-console
      console.error("Mount type error", parent, child);
      return;
    }
    const parentConf = nodeToConf.get(parent) as RouteConfOfBricks;
    parentConf.bricks.push(brickNodeToBrickConf(child));
  }

  function mountRouteInBrick(
    parent: BuilderBrickNode,
    child: BuilderRouteNode
  ): void {
    const parentConf = nodeToConf.get(parent) as BrickConf;
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
      routeNodeToRouteConf(child)
    );
  }

  function mountBrickInBrick(
    parent: BuilderBrickNode,
    child: BuilderBrickNode
  ): void {
    const parentConf = nodeToConf.get(parent) as BrickConf;
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
      brickNodeToBrickConf(child)
    );
  }

  function getBricksOfTemplate(
    nodes: BuilderBrickNode[]
  ): BrickConfInTemplate[] {
    if (!nodes) {
      return [];
    }
    return nodes.map((node) => {
      const nodeConf = brickNodeToBrickConf(node);
      nodeToConf.set(node, nodeConf);
      normalizeBrickInTemplate(node);
      return nodeConf as BrickConfInTemplate;
    });
  }

  function normalizeBrickInTemplate(node: BuilderBrickNode): void {
    if (node.children) {
      (node.children as BuilderBrickNode[]).forEach((child) => {
        mountBrickInBrick(node, child);
        normalizeBrickInTemplate(child);
      });
    }
  }

  return {
    routes,
    meta: { customTemplates, menus, i18n },
    dependsAll: data.dependsAll,
  };
}

function normalize(
  node: BuilderRouteOrBrickNode,
  fieldsToRemove: string[],
  jsonFields: string[],
  yamlFields: string[]
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(node)
      // Remove unused fields from CMDB.
      // Consider fields started with `_` as unused.
      .filter(([key]) => key[0] !== "_" && !fieldsToRemove.includes(key))
      // Parse json fields.
      .map(([key, value]) => [
        key,
        jsonFields.includes(key)
          ? safeJsonParse(value as string)
          : yamlFields.includes(key)
          ? safeYamlParse(value as string)
          : value,
      ])
  );
}

function keep(
  node: MenuNode | MenuItemNode,
  fieldsToKeep: string[]
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(node)
      // Keep certain fields from CMDB.
      .filter((item) => fieldsToKeep.includes(item[0]))
  );
}

function keepItems(
  nodes: MenuItemNode[],
  fieldsToKeep: string[]
): Record<string, unknown>[] {
  return nodes?.map((node) => {
    const menuItemConf = keep(node, fieldsToKeep);
    menuItemConf.children = keepItems(node.children, fieldsToKeep);
    return menuItemConf;
  });
}

function safeJsonParse(value: string): unknown {
  if (!value) {
    return;
  }
  try {
    return JSON.parse(value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("JSON.parse() failed", value);
  }
}

function safeYamlParse(value: string): unknown {
  if (!value) {
    return;
  }
  try {
    const result = yaml.safeLoad(value, {
      schema: yaml.JSON_SCHEMA,
      json: true,
    });
    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to parse yaml string", value);
  }
}

getRuntime().registerCustomProcessor(
  "nextBuilder.buildStoryboard",
  buildStoryboard
);
