import React, { useState, useEffect } from "react";
import { cloneDeep, throttle, isEmpty } from "lodash";
import { Tree } from "antd";
import { NodeMouseEventParams } from "rc-tree/lib/contextTypes";
// import mockJSON from "./data.json";
// import { mockData } from "./mockData";
import { GeneralInput } from "../../../forms/src/general-input/GeneralInput";
import { isObject } from "@next-core/brick-utils";
import { StoryboardAssemblyResult } from "../shared/storyboard/interfaces";
import {
  symbolForNodeId,
  symbolForNodeInstanceId,
} from "../shared/storyboard/buildStoryboard";

interface SearchTreeProps {
  appId: string;
  projectId: string;
  tableData: StoryboardAssemblyResult;
  allowKeySearch?: boolean;
  titleClick?: (node: any) => void;
  titleFocus?: (node: any) => void;
  titleBlur?: (node: any) => void;
}

interface filterOption {
  allowKeySearch?: boolean;
}
interface builTreeOptions {
  parentPath?: string;
  parentId?: string;
  isSlots?: boolean;
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

function getTitle(item: PlainObject, defaultKey?: string): string {
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
  if (Object.prototype.toString.call(treeData) === "[object Object]") {
    // 对象类型
    const children = traversalObject(treeData, options);
    children.length > 0 && tree.push(...children);
  }
  return tree;
}

function buildTree(treeData: PlainObject | Array<PlainObject>) {
  isParentRouteLock = false;
  return traversalData(treeData);
}

function filter(
  tree: PlainObject | Array<PlainObject>,
  text: string,
  options: filterOption
) {
  const filterNode = (item: PlainObject | string, text: string): boolean => {
    if (isObject(item) && item) {
      for (const [k, v] of Object.entries(item)) {
        if (!["children", "key", HIGHTLIGHT].includes(k)) {
          if (options?.allowKeySearch && k.indexOf(text) >= 0) {
            item[HIGHTLIGHT] = true;
            return true;
          }
          if (v && Object.prototype.toString.call(v) === "[object Object]") {
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

export function SearchTree(props: SearchTreeProps): React.ReactElement {
  const {
    tableData,
    appId,
    projectId,
    allowKeySearch = true,
    titleClick,
    titleFocus,
    titleBlur,
  } = props;
  const [value, setValue] = useState("");
  const baseTree = buildTree(tableData?.storyboard || []);
  const [tree, setTree] = useState(baseTree);

  const setFilterTree = throttle((filterValue) => {
    // console.time('filterTree');
    if (filterValue !== "") {
      const result = filter(cloneDeep(baseTree), filterValue, {
        allowKeySearch,
      });
      setTree(result);
    } else {
      setTree(baseTree);
    }
    // console.timeEnd('filterTree');
  }, 1000);

  const handleFilterChange = (value: string) => {
    setValue(value);
    setFilterTree(value.trim());
  };

  const titleRender = (nodeData: PlainObject) => {
    const style = {
      background: nodeData[HIGHTLIGHT] ? "yellow" : null,
    };
    if (!isEmpty(nodeData?.[NODE_INFO])) {
      let url = "";
      if (nodeData[NODE_INFO].name) {
        // template
        url = `/next/next-builder/project/${projectId}/app/${appId}/template/${nodeData[NODE_INFO]?.realParentId}/visualize-builder?fullscreen=1`;
      } else if (nodeData[NODE_INFO][symbolForNodeInstanceId]) {
        // brick
        url = `/next/next-builder/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO]?.realParentId}&fullscreen=1&canvasIndex=0#brick,${nodeData[NODE_INFO][symbolForNodeInstanceId]}`;
      } else {
        // page
        url = `/next/next-builder/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO]?.realParentId}&fullscreen=1&canvasIndex=0`;
      }
      nodeData[NODE_INFO].url = url;
      return (
        <a style={style} href={url}>
          {getTitle(nodeData[NODE_INFO])}
        </a>
      );
    }
    return <span style={style}>{nodeData.title}</span>;
  };

  const onSelect = (_selectedKeys: React.Key[], item: any) =>
    titleClick?.(item?.node?.[NODE_INFO]);

  const onMouseEnter = (info: NodeMouseEventParams) =>
    titleFocus?.((info.node as any)?.[NODE_INFO]);

  const onMouseLeave = (info: NodeMouseEventParams) =>
    titleBlur?.((info.node as any)?.[NODE_INFO]);

  return (
    <div>
      <GeneralInput value={value} onChange={handleFilterChange} />
      <Tree
        defaultExpandAll
        treeData={tree}
        onSelect={onSelect}
        virtual
        height={500}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        titleRender={titleRender}
      />
    </div>
  );
}
