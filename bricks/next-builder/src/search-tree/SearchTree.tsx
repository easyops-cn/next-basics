import React, { useState, useEffect } from "react";
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
import { Key } from "antd/lib/table/interface";
import { GeneralIcon } from "@next-libs/basic-components";

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

enum searchType {
  key,
  fuzzy,
  ingoreCase,
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
    searchConfig = {},
    titleClick,
    titleFocus,
    titleBlur,
  } = props;
  const [value, setValue] = useState("");
  const baseTree = buildTree(treeData?.storyboard);
  const [tree, setTree] = useState(baseTree);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [supportKey, setSupportKey] = useState<boolean>(
    searchConfig.supportKey ?? true
  );
  const [supportIngoreCase, setSupportIngoreCase] = useState<boolean>(
    searchConfig.supportIngoreCase ?? true
  );
  const [supportFuzzy, setSupportFuzzy] = useState<boolean>(
    searchConfig.supportFuzzy ?? true
  );

  const setFilterTree = throttle((filterValue, searchConfig = {}) => {
    if (filterValue !== "") {
      const { tree, matchKey } = filter(
        cloneDeep(baseTree),
        filterValue,
        Object.assign(
          {},
          {
            supportFuzzy,
            supportIngoreCase,
            supportKey,
          },
          searchConfig
        )
      );
      setExpandedKeys(matchKey);
      setTree(tree);
    } else {
      setExpandedKeys([]);
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

  const handleClickIcon = (type: searchType) => {
    switch (type) {
      case searchType.fuzzy:
        setSupportFuzzy(!supportFuzzy);
        setFilterTree(value, {
          supportFuzzy: !supportFuzzy,
        });
        break;
      case searchType.key:
        setSupportKey(!supportKey);
        setFilterTree(value, {
          supportKey: !supportKey,
        });
        break;
      case searchType.ingoreCase:
        setSupportIngoreCase(!supportIngoreCase);
        setFilterTree(value, {
          supportIngoreCase: !supportIngoreCase,
        });
        break;
    }
  };

  const renderInputSuffixIcon = () => {
    return (
      <>
        <span title="区分大小写">
          <GeneralIcon
            icon={{
              color: supportIngoreCase ? "orange" : "#8c8c8c",
              icon: "ingore-case",
              category: "default",
              lib: "easyops",
            }}
            size={20}
            style={{
              marginRight: 5,
            }}
            onClick={() => handleClickIcon(searchType.ingoreCase)}
          />
        </span>
        <span title="全字匹配">
          <GeneralIcon
            icon={{
              color: !supportFuzzy ? "orange" : "#8c8c8c",
              category: "default",
              icon: "full-word",
              lib: "easyops",
            }}
            size={20}
            style={{
              marginRight: 5,
            }}
            onClick={() => handleClickIcon(searchType.fuzzy)}
          />
        </span>
        <span title="支持Key查询">
          <GeneralIcon
            icon={{
              color: supportKey ? "orange" : "#8c8c8c",
              category: "default",
              icon: "key",
              lib: "easyops",
            }}
            size={20}
            style={{
              marginRight: 5,
            }}
            onClick={() => handleClickIcon(searchType.key)}
          />
        </span>
      </>
    );
  };

  useEffect(() => {
    setTree(buildTree(treeData?.storyboard));
  }, [treeData]);

  return (
    <div>
      <Input
        placeholder="输入关键字搜索StoryBoard"
        value={value}
        onChange={handleFilterChange}
        suffix={renderInputSuffixIcon()}
      />
      {tree.length ? (
        <Tree
          key={`table-${value}-${supportFuzzy}-${supportIngoreCase}-${supportKey}`}
          onExpand={setExpandedKeys}
          expandedKeys={expandedKeys}
          showIcon={true}
          treeData={tree}
          virtual={true}
          height={Number(height)}
          titleRender={renderTitle}
          onSelect={onSelect}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
      ) : (
        <div
          style={{
            color: "#8c8c8c",
            textAlign: "center",
            margin: 20,
          }}
        >
          {" "}
          = = Search Empty = =
        </div>
      )}
    </div>
  );
}
