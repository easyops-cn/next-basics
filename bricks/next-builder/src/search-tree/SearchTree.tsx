import React, { useState } from "react";
import { cloneDeep, throttle } from "lodash";
import { Tree, Input } from "antd";
import { NodeMouseEventParams } from "rc-tree/lib/contextTypes";
import { StoryboardAssemblyResult } from "../shared/storyboard/interfaces";
import {
  filter,
  buildTree,
  symbolForHightlight,
  symbolForRealParentId,
  NODE_INFO,
  getTitle,
  PlainObject,
  SearchConfig,
} from "./utils";
import { symbolForNodeInstanceId } from "../shared/storyboard/buildStoryboard";

export interface SearchTreeProps {
  homepage: string;
  appId: string;
  projectId: string;
  treeData: StoryboardAssemblyResult;
  height?: number;
  searchConfig: SearchConfig;
  titleClick?: (node: any) => void;
  titleFocus?: (node: any) => void;
  titleBlur?: (node: any) => void;
}

export const titleRender = (props: {
  homepage: string;
  appId: string;
  projectId: string;
  nodeData: PlainObject;
}) => {
  const { homepage, appId, projectId, nodeData } = props;
  const style = {
    background: nodeData[symbolForHightlight as any] ? "yellow" : null,
    color: nodeData.unlink ? "#aaa" : null,
  };
  if (nodeData[NODE_INFO]?.[symbolForRealParentId] && !nodeData.unlink) {
    let url = "";
    if (nodeData.isTpl) {
      // template
      if (nodeData[NODE_INFO][symbolForNodeInstanceId]) {
        // brick
        url = `${homepage}/project/${projectId}/app/${appId}/template/${nodeData[NODE_INFO][symbolForRealParentId]}/visualize-builder?fullscreen=1&canvasIndex=0#brick,${nodeData[NODE_INFO][symbolForNodeInstanceId]}`;
      } else {
        url = `${homepage}/project/${projectId}/app/${appId}/template/${nodeData[NODE_INFO][symbolForRealParentId]}/visualize-builder?fullscreen=1`;
      }
    } else {
      // page
      if (nodeData[NODE_INFO][symbolForNodeInstanceId]) {
        // brick
        url = `${homepage}/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO][symbolForRealParentId]}&fullscreen=1&canvasIndex=0#brick,${nodeData[NODE_INFO][symbolForNodeInstanceId]}`;
      } else {
        url = `${homepage}/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO][symbolForRealParentId]}&fullscreen=1&canvasIndex=0`;
      }
    }
    nodeData.url = url;
    return (
      <a style={style} href={url}>
        {getTitle(nodeData[NODE_INFO]) || nodeData.title}
      </a>
    );
  }
  return <span style={style}>{nodeData.title}</span>;
};

export function SearchTree(props: SearchTreeProps): React.ReactElement {
  const {
    treeData,
    homepage,
    appId,
    projectId,
    height,
    searchConfig,
    titleClick,
    titleFocus,
    titleBlur,
  } = props;
  const [value, setValue] = useState("");
  const baseTree = buildTree(treeData?.storyboard);
  const [tree, setTree] = useState(baseTree);

  const setFilterTree = throttle((filterValue) => {
    if (filterValue !== "") {
      const result = filter(cloneDeep(baseTree), filterValue, searchConfig);
      setTree(result);
    } else {
      setTree(baseTree);
    }
  }, 1000);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    setFilterTree(event.target.value.trim());
  };

  const renderTitle = (nodeData: PlainObject) =>
    titleRender({
      homepage,
      appId,
      projectId,
      nodeData,
    });

  const onSelect = (_selectedKeys: React.Key[], item: any) =>
    titleClick?.({
      info: item.node[NODE_INFO],
      url: item.node.url,
    });

  const onMouseEnter = (info: NodeMouseEventParams) =>
    titleFocus?.({
      info: (info.node as PlainObject)[NODE_INFO],
      url: (info.node as PlainObject).url,
    });

  const onMouseLeave = (info: NodeMouseEventParams) =>
    titleBlur?.({
      info: (info.node as PlainObject)[NODE_INFO],
      url: (info.node as PlainObject).url,
    });

  return (
    <div>
      <Input
        placeholder="输入关键字搜索StoryBoard"
        value={value}
        onChange={handleFilterChange}
      />
      {tree.length ? (
        <Tree
          defaultExpandAll={true}
          showIcon={true}
          treeData={tree}
          virtual={true}
          height={Number(height)}
          titleRender={renderTitle}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ) : null}
    </div>
  );
}
