import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { Tree } from "antd";
import mockJSON from "./data.json";
import { GeneralInput } from "../../../forms/src/general-input/GeneralInput";
import { isObject } from "@next-core/brick-utils";

interface builTreeOptions {
  parentPath?: string;
  isSlots?: boolean;
  filterData?: string;
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

const objPropKeys = ["properties", "transform", "events"];

let isParentRouteLock = false;

function clone(obj: PlainObject, isDeep?: boolean) {
  if (isDeep) {
    return cloneDeep(obj);
  }
  const newObj: PlainObject = Object.create(null);
  for (const [k, v] of Object.entries(obj)) {
    if (
      ["string", "boolean", "number"].includes(typeof v) ||
      objPropKeys.includes(k)
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
    const path = getPath(options.parentPath, String(i));
    const child: PlainObject = {
      title,
      key: path,
      ...clone(treeData[i]),
    };
    const subTree = traversalData(treeData[i], {
      ...options,
      parentPath: path,
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
      if (key === "slots") isSlots = true;
      if (key === "routes" && !isParentRouteLock) {
        isParentRouteLock = true;
        isParentRoutes = true;
      }
      const path = getPath(options.parentPath ?? "", key);
      const child: PlainObject = {
        title: key,
        key: path,
        ...clone(treeData[key]),
      };
      const subTree = traversalData(treeData[key], {
        ...options,
        isSlots,
        parentPath: path,
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
  if (Object.prototype.toString.call(treeData) === "[object Object]") {
    // 对象类型
    const children = traversalObject(treeData, options);
    children.length > 0 && tree.push(...children);
  }
  return tree;
}

function buildTree(
  treeData: PlainObject | Array<PlainObject>,
  filterData?: string
) {
  isParentRouteLock = false;
  return traversalData(treeData, {
    filterData,
  });
}

function filter(tree: PlainObject | Array<PlainObject>, text: string) {
  const filterItem = (item: PlainObject | string, text: string) => {
    if (typeof item === "object") {
      for (const [k, v] of Object.entries(item)) {
        if (k !== "children") {
          if (isObject(v)) {
            if (filterItem(v, text)) {
              v.hightlight = true;
              return true;
            }
          } else if (Array.isArray(v)) {
            for (let i = 0; i < v.length; i++) {
              if (typeof v[i] === "object") {
                if (filterItem(v[i], text)) {
                  v[i].hightlight = true;
                  return true;
                }
              } else if (typeof v[i] === "string" && v[i].indexOf(text) >= 0) {
                v[i].hightlight = true;
                return true;
              }
            }
          } else if (typeof v === "string" && v.indexOf(text) >= 0) {
            item.hightlight = true;
            return true;
          }
        }
      }
      return false;
    } else {
      return typeof item === "string" && item.indexOf(text) >= 0;
    }
  };
  const getNodes = (result: Array<PlainObject>, node: PlainObject) => {
    if (filterItem(node, text)) {
      text !== "" && (node.highlight = true);
      result.push(node);
      return result;
    }
    if (Array.isArray(node.children)) {
      const subNode = node.children.reduce(getNodes, []);
      if (subNode.length) result.push({ ...node, children: subNode });
    }
    return result;
  };

  return tree.reduce(getNodes, []);
}

export function SearchTree(): React.ReactElement {
  const [value, setValue] = useState("");
  const baseTree = buildTree(mockJSON);
  const [tree, setTree] = useState(baseTree);

  const handleFilterChange = (value: string) => {
    setValue(value);
    setTree(value.trim() ? filter(baseTree, value.trim()) : baseTree);
    // console.time('buildTree');
    // console.log("filter", filter(baseTree, value))
    // console.timeEnd('buildTree');
  };

  const titleRender = (nodeData: PlainObject) => {
    if (nodeData.highlight) {
      return <span style={{ background: "yellow" }}>{nodeData.title}</span>;
    }
    return nodeData.title;
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
  };

  return (
    <div>
      <GeneralInput value={value} onChange={handleFilterChange} />
      <Tree
        defaultExpandAll
        treeData={tree}
        onSelect={onSelect}
        titleRender={titleRender}
      />
    </div>
  );
}
