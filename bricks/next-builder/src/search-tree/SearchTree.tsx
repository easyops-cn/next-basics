import React, { useState, useEffect } from "react";
import { cloneDeep } from "lodash";
import { Tree } from "antd";
import mockJSON from "./data.json";
import { GeneralInput } from "../../../forms/src/general-input/GeneralInput";
import { isObject } from "@next-core/brick-utils";

interface SearchTreeProps {
  allowKeySearch?: boolean;
}

interface filterOption {
  allowKeySearch?: boolean;
}
interface builTreeOptions {
  parentPath?: string;
  isSlots?: boolean;
  filterData?: string;
}

export interface PlainObject extends Object {
  [key: string]: any;
}

const HIGHTLIGHT = "$$hightlight";
const NODE_INFO = "$$info";

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
      [NODE_INFO]: clone(treeData[i]),
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
        [NODE_INFO]: clone(treeData[key]),
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

function filter(
  tree: PlainObject | Array<PlainObject>,
  text: string,
  options: filterOption
) {
  const filterNode = (item: PlainObject | string, text: string): boolean => {
    if (typeof item === "object") {
      for (const [k, v] of Object.entries(item)) {
        if (!["children", "key", HIGHTLIGHT].includes(k)) {
          // if (isObject(v)) {
          if (options?.allowKeySearch && k.indexOf(text) >= 0) {
            item[HIGHTLIGHT] = true;
            return true;
          }
          if (Object.prototype.toString.call(v) === "[object Object]") {
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

export function SearchTree(props: SearchTreeProps): React.ReactElement {
  const { allowKeySearch = true } = props;
  const [value, setValue] = useState("");
  const baseTree = buildTree(mockJSON);
  const [tree, setTree] = useState(baseTree);

  const handleFilterChange = (value: string) => {
    setValue(value);
    if (value.trim()) {
      setTree(
        filter(cloneDeep(baseTree), value.trim(), {
          allowKeySearch,
        })
      );
      // console.time('buildTree');
      // console.log("filter", filter(baseTree, value.trim(), {
      //   allowKeySearch,
      // }));
      // console.timeEnd('buildTree');
    } else {
      setTree(baseTree);
    }
  };

  const titleRender = (nodeData: PlainObject) => {
    if (nodeData[HIGHTLIGHT]) {
      return <span style={{ background: "yellow" }}>{nodeData.title}</span>;
    }
    return nodeData.title;
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    // console.log('selected', selectedKeys, info);
  };

  const onMouseEnter = (selectedKeys: any) => {
    // console.log('enter', selectedKeys);
  };

  const onMouseLeave = (selectedKeys: any) => {
    // console.log('leave', selectedKeys);
  };

  return (
    <div>
      <GeneralInput value={value} onChange={handleFilterChange} />
      <Tree
        defaultExpandAll
        treeData={tree}
        onSelect={onSelect}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        titleRender={titleRender}
      />
    </div>
  );
}
