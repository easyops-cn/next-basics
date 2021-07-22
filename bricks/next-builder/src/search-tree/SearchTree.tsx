import React from "react";
import { cloneDeep } from "lodash";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../i18n/constants";
import mockJSON from "./data.json";

interface builTreeOptions {
  isSlots?: boolean;
}

export interface PlainObject extends Object {
  [key: string]: any;
}

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

let isParentRouteLock = false;

function clone(obj: PlainObject, isDeep?: boolean) {
  if (isDeep) {
    return cloneDeep(obj);
  }
  const newObj: PlainObject = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (
      ["string", "boolean", "number"].includes(typeof v) ||
      ["properties", "transform", "events"].includes(k)
    ) {
      newObj[k] = v;
    }
  }
  return newObj;
}

function getTitle(item: PlainObject, defaultKey?: string): string {
  return (
    item?.menuId ||
    item?.brick ||
    item?.alias ||
    item?.path ||
    item?.name ||
    item?.type ||
    defaultKey
  );
}

function traversalArray(treeData: Array<PlainObject>) {
  const tree: Array<any> = [];

  for (let i = 0; i < treeData.length; i++) {
    const title = getTitle(treeData[i]);
    const child: PlainObject = {
      title,
      key: i,
      ...clone(treeData[i]),
    };
    const subTree = traversalData(treeData[i]);
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
      if (key === "slots") isSlots = true;
      if (key === "routes" && !isParentRouteLock) {
        isParentRouteLock = true;
        isParentRoutes = true;
      }
      const child: PlainObject = {
        title: key,
        key: key,
        ...clone(treeData[key]),
      };
      const subTree = traversalData(treeData[key], {
        isSlots,
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
    const children = traversalArray(treeData);
    children.length > 0 && tree.push(...children);
  }
  if (Object.prototype.toString.call(treeData) === "[object Object]") {
    // 对象类型
    const children = traversalObject(treeData, options);
    children.length > 0 && tree.push(...children);
  }
  return tree;
}

function buildTree() {
  isParentRouteLock = false;
  return traversalData(mockJSON);
}

export function SearchTree(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  buildTree();

  return <div>{t(K.NEXT_BUILDER)} works!</div>;
}
