import React from "react";
import { isObject } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";
import { Key } from "antd/lib/table/interface";

export const symbolForHightlight = Symbol.for("hightlight");
export const symbolForRealParentId = Symbol.for("realParentId");
export const NODE_INFO = "$$info";

const iconTypeConstants = {
  app: {
    color: "cyan",
    icon: "landmark",
    lib: "fa",
    prefix: "fas",
  },
  bricks: {
    category: "app",
    color: "cyan",
    icon: "container",
    lib: "easyops",
  },
  brick: {
    color: "cyan",
    icon: "codepen",
    lib: "antd",
    theme: "outlined",
  },
  customTemplates: {
    color: "cyan",
    icon: "superscript",
    lib: "fa",
    prefix: "fas",
  },
  i18n: {
    color: "cyan",
    icon: "globe-americas",
    lib: "fa",
    prefix: "fas",
  },
  slots: {
    color: "cyan",
    icon: "codepen-circle",
    lib: "antd",
    theme: "outlined",
  },
  routes: {
    category: "app",
    color: "cyan",
    icon: "flow",
    lib: "easyops",
  },
  redirect: {
    category: "app",
    color: "cyan",
    icon: "flow",
    lib: "easyops",
  },
  main: {
    color: "cyan",
    icon: "appstore-add",
    lib: "antd",
    theme: "outlined",
  },
  menus: {
    color: "cyan",
    icon: "list-ul",
    lib: "fa",
    prefix: "fas",
  },
  meta: {
    color: "cyan",
    icon: "cogs",
    lib: "fa",
    prefix: "fas",
  },
  functions: {
    color: "cyan",
    icon: "function",
    lib: "antd",
    theme: "outlined",
  },
};

const ingoreKey = ["bricks", "slots"];

const supportKey = [
  "routes",
  "bricks",
  "slots",
  "meta",
  "customTemplates",
  "menus",
  "i18n",
  "app",
  "zh",
  "en",
  "main",
  "functions",
];

let isParentRouteLock = false;

export interface PlainObject extends Object {
  [key: string]: any;
}
interface builTreeOptions {
  parentPath?: string;
  parentId?: string;
  isSlots?: boolean;
  isTemplate?: boolean;
}

export interface SearchConfig {
  /** 根据key值搜索 */
  supportKey?: boolean;
  /** 支持模糊搜索 */
  supportFuzzy?: boolean;
  /** 支持忽略大小写搜索 */
  supportIngoreCase?: boolean;
}

function getType(item: PlainObject): keyof typeof iconTypeConstants {
  if (item.brick) return "brick";

  return item?.type;
}

function getTypeIcon(type: keyof typeof iconTypeConstants) {
  if (iconTypeConstants[type]) {
    return (
      <GeneralIcon
        style={{
          fontSize: 12,
          margin: "0 2px",
        }}
        icon={iconTypeConstants[type] as MenuIcon}
      />
    );
  } else {
    return (
      <span
        style={{
          display: "inline-block",
          width: 12,
          height: 12,
          margin: "0 2px",
        }}
      />
    );
  }
}

export function clone(obj: PlainObject) {
  const newObj: PlainObject = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (![...ingoreKey, "routes"].includes(k)) {
      newObj[k] = v;
    }
  }
  Object.getOwnPropertySymbols(obj).forEach((symbol) => {
    newObj[symbol as any] = obj[symbol as any];
  });
  return newObj;
}

export function getTitle(item: PlainObject, defaultKey?: string): string {
  return (
    (item &&
      (item.menuId ||
        item.brick ||
        item.alias ||
        item.path ||
        item.name ||
        item.type ||
        item.title)) ||
    defaultKey
  );
}

function getPath(parentPath = "", childPath: string) {
  return parentPath ? `${parentPath}/${childPath}` : childPath;
}

function traversalArray(
  treeData: Array<PlainObject>,
  options: builTreeOptions
) {
  const tree: Array<any> = [];
  for (let i = 0; i < treeData.length; i++) {
    const title = getTitle(treeData[i]);
    const path = getPath(options?.parentPath ?? "", String(i));
    let parentId = options.parentId ?? "";
    if (
      (!parentId && treeData[i][symbolForNodeId as any]) ||
      (parentId && !treeData[i][symbolForNodeInstanceId as any])
    ) {
      parentId = treeData[i][symbolForNodeId as any];
    }
    const child: PlainObject = {
      title,
      key: path,
      icon: getTypeIcon(getType(treeData[i])),
      isTpl: options?.isTemplate,
      [NODE_INFO]: clone({
        ...treeData[i],
        [symbolForRealParentId]: parentId,
      }),
    };
    if (options?.isSlots) child.unlink = true;
    const subTree = traversalData(treeData[i], {
      ...options,
      parentPath: path,
      parentId,
    });
    if (subTree.length > 0) {
      child.children = subTree;
    }
    tree.push(child);
  }

  return tree;
}

function traversalObject(treeData: PlainObject, options: builTreeOptions) {
  const tree: Array<PlainObject> = [];
  let isSlots = false;

  for (const key of Object.keys(treeData)) {
    if (supportKey.includes(key) || options?.isSlots) {
      let isParentRoutes = false;
      let parentId = options?.parentId ?? "";
      let isTemplate = options?.isTemplate ?? false;
      if (key === "slots") isSlots = true;
      if (key === "routes" && !isParentRouteLock) {
        isParentRouteLock = true;
        isParentRoutes = true;
      }
      if (!parentId && treeData[key][symbolForNodeId]) {
        parentId = treeData[key][symbolForNodeId];
      }
      const path = getPath(options?.parentPath ?? "", key);
      if (path === "meta/customTemplates") isTemplate = true;
      const child: PlainObject = {
        title: key,
        key: path,
        icon: getTypeIcon(getType(treeData[key])),
        isTpl: isTemplate,
        [NODE_INFO]: clone({
          // ...treeData[key],
          [symbolForRealParentId]: parentId,
        }),
      };
      if (options?.isSlots) child.unlink = true;
      const subTree = traversalData(treeData[key], {
        ...options,
        isSlots,
        parentPath: path,
        parentId,
        isTemplate,
      });
      if (subTree.length > 0) child.children = subTree;
      if (ingoreKey.includes(key) || (key === "routes" && !isParentRoutes)) {
        tree.push(...subTree);
      } else {
        tree.push(child);
      }
    }
  }

  return tree;
}

function traversalData(
  treeData: PlainObject | Array<PlainObject>,
  options?: builTreeOptions
) {
  const tree = [];
  if (Array.isArray(treeData)) {
    // 数组类型
    const children = traversalArray(treeData, options);
    children.length > 0 && tree.push(...children);
  }
  if (isObject(treeData)) {
    // 对象类型
    const children = traversalObject(treeData, options);
    children.length > 0 && tree.push(...children);
  }
  return tree;
}

export function buildTree(treeData: PlainObject | Array<PlainObject>) {
  isParentRouteLock = false;
  return traversalData(treeData);
}

export function filter(
  tree: PlainObject | Array<PlainObject>,
  text: string,
  config: SearchConfig = {
    supportKey: true,
    supportFuzzy: true,
    supportIngoreCase: true,
  }
) {
  const matchKey: Key[] = [];

  const isEqual = (v: string): boolean => {
    let a = v;
    let b = text;
    if (config.supportIngoreCase) {
      a = v.toLocaleLowerCase();
      b = text.toLocaleLowerCase();
    }
    if (config.supportFuzzy) {
      return a.includes(b);
    } else {
      return a === b;
    }
  };

  const setMatchItem = (item: PlainObject) => {
    item[symbolForHightlight as any] = true;
    // <% I18N(\"EDIT\", \"Edit\") %>
    item.key && matchKey.push(item.key);
  };

  const filterNode = (item: PlainObject | string, text: string): boolean => {
    if (isObject(item) && item) {
      for (const [k, v] of Object.entries(item)) {
        if (!["children", "key", "icon", symbolForHightlight].includes(k)) {
          if (config.supportKey && isEqual(k)) {
            setMatchItem(item);
            return true;
          }
          if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
              if (isObject(v[i])) {
                if (filterNode(v[i], text)) {
                  setMatchItem(item);
                  return true;
                }
              } else if (typeof v[i] === "string" && isEqual(v[i])) {
                setMatchItem(item);
                return true;
              }
            }
          } else if (isObject(v)) {
            if (filterNode(v, text)) {
              setMatchItem(item);
              return true;
            }
          } else if (typeof v === "string" && isEqual(v)) {
            setMatchItem(item);
            return true;
          }
        }
      }
    } else {
      return typeof item === "string" && isEqual(item);
    }
  };

  const nodeMatch = (node: PlainObject, text: string): boolean => {
    return filterNode(node, text);
  };

  const childMatch = (children: PlainObject): Array<PlainObject> => {
    /* eslint-disable @typescript-eslint/no-use-before-define */
    return children.reduce(getNodes, []);
  };

  const getNodes = (result: Array<PlainObject>, node: PlainObject) => {
    const isNodeMatch = nodeMatch(node, text);
    const children = childMatch(node?.children ?? []);

    if (children.length) {
      result.push({
        ...node,
        children,
      });
    } else if (isNodeMatch && !children.length) {
      result.push(node);
    }
    return result;
  };

  return {
    tree: tree.reduce(getNodes, []),
    matchKey: matchKey,
  };
}
