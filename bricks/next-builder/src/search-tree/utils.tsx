import React from "react";
import { isObject } from "@next-core/brick-utils";
import { GeneralIcon } from "@next-libs/basic-components";
import { MenuIcon } from "@next-core/brick-types";
import { symbolForNodeId } from "../shared/storyboard/buildStoryboard";

export const HIGHTLIGHT = "$$hightlight";
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
];

const objPropKeys = ["properties", "transform", "events", "context"];

let isParentRouteLock = false;

export interface PlainObject extends Object {
  [key: string]: any;
}

interface filterOption {
  allowKeySearch?: boolean;
}
interface builTreeOptions {
  parentPath?: string;
  parentId?: string;
  isSlots?: boolean;
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

function clone(obj: PlainObject) {
  const newObj: PlainObject = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (
      ["string", "boolean", "number"].includes(typeof v) ||
      objPropKeys.includes(k)
    ) {
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
    item?.menuId ||
    item?.brick ||
    item?.alias ||
    item?.path ||
    item?.name ||
    item?.type ||
    item?.title ||
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
    let parentId = options.parentId;
    if (!parentId && treeData[i][symbolForNodeId as any]) {
      parentId = treeData[i][symbolForNodeId as any];
    }
    const child: PlainObject = {
      title,
      key: path,
      icon: getTypeIcon(getType(treeData[i])),
      [NODE_INFO]: clone({
        ...treeData[i],
        realParentId: parentId,
      }),
    };
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

  for (const key in treeData) {
    if (supportKey.includes(key) || options?.isSlots) {
      let isParentRoutes = false;
      let parentId = options?.parentId ?? "";
      if (key === "slots") isSlots = true;
      if (key === "routes" && !isParentRouteLock) {
        isParentRouteLock = true;
        isParentRoutes = true;
      }
      if (!parentId && treeData[key][symbolForNodeId]) {
        parentId = treeData[key][symbolForNodeId];
      }
      const path = getPath(options?.parentPath ?? "", key);
      const child: PlainObject = {
        title: key,
        key: path,
        icon: getTypeIcon(getType(treeData[key])),
        [NODE_INFO]: clone({
          ...treeData[key],
          realParentId: parentId,
        }),
      };
      const subTree = traversalData(treeData[key], {
        ...options,
        isSlots,
        parentPath: path,
        parentId,
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
  options: filterOption
) {
  const filterNode = (item: PlainObject | string, text: string): boolean => {
    if (isObject(item) && item) {
      for (const [k, v] of Object.entries(item)) {
        if (!["children", "key", "icon", HIGHTLIGHT].includes(k)) {
          if (options?.allowKeySearch && k.indexOf(text) >= 0) {
            item[HIGHTLIGHT] = true;
            return true;
          }
          if (v && isObject(v)) {
            if (filterNode(v, text)) {
              item[HIGHTLIGHT] = true;
              return true;
            }
          } else if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
              if (typeof v[i] === "object") {
                if (filterNode(v[i], text)) {
                  item[HIGHTLIGHT] = true;
                  return true;
                }
              } else if (typeof v[i] === "string" && v[i].indexOf(text) >= 0) {
                item[HIGHTLIGHT] = true;
                return true;
              }
            }
          } else if (typeof v === "string" && v.indexOf(text) >= 0) {
            item[HIGHTLIGHT] = true;
            return true;
          }
        }
      }
    } else {
      return typeof item === "string" && item.indexOf(text) >= 0;
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

  return tree.reduce(getNodes, []);
}
