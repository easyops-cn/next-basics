import React, { useState } from "react";
import { cloneDeep, throttle } from "lodash";
import { Tree, Input } from "antd";
import { NodeMouseEventParams } from "rc-tree/lib/contextTypes";
import { StoryboardAssemblyResult } from "../shared/storyboard/interfaces";
import {
  filter,
  buildTree,
  HIGHTLIGHT,
  NODE_INFO,
  getTitle,
  PlainObject,
} from "./utils";
import { symbolForNodeInstanceId } from "../shared/storyboard/buildStoryboard";

export interface SearchTreeProps {
  homepage: string;
  appId: string;
  projectId: string;
  treeData: StoryboardAssemblyResult;
  allowKeySearch?: boolean;
  height?: number;
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
    background: nodeData[HIGHTLIGHT] ? "yellow" : null,
  };
  if (nodeData[NODE_INFO]?.realParentId) {
    let url = "";
    if (nodeData[NODE_INFO].name) {
      // template
      url = `${homepage}/project/${projectId}/app/${appId}/template/${nodeData[NODE_INFO].realParentId}/visualize-builder?fullscreen=1`;
    } else if (nodeData[NODE_INFO][symbolForNodeInstanceId]) {
      // brick
      url = `${homepage}/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO].realParentId}&fullscreen=1&canvasIndex=0#brick,${nodeData[NODE_INFO][symbolForNodeInstanceId]}`;
    } else {
      // page
      url = `${homepage}/project/${projectId}/app/${appId}/visualize-builder?root=${nodeData[NODE_INFO].realParentId}&fullscreen=1&canvasIndex=0`;
    }
    nodeData[NODE_INFO].url = url;
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
    allowKeySearch = true,
    height,
    titleClick,
    titleFocus,
    titleBlur,
  } = props;
  const [value, setValue] = useState("");
  const baseTree = buildTree(treeData?.storyboard ?? []);
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
    titleClick?.(item.node[NODE_INFO]);

  const onMouseEnter = (info: NodeMouseEventParams) =>
    titleFocus?.((info.node as any)[NODE_INFO]);

  const onMouseLeave = (info: NodeMouseEventParams) =>
    titleBlur?.((info.node as any)[NODE_INFO]);

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
