import React, { useState, useEffect, useRef } from "react";
import { cloneDeep, debounce } from "lodash";
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
import { Field, InstanceList } from "@next-libs/cmdb-instances";
import className from "classnames";
import styles from "./SearchTree.module.css";
import { BrickAsComponent } from "@next-core/brick-kit";
import searchBoardModel from "./searchModel.json";
import { ModelCmdbObject } from "@next-sdk/cmdb-sdk/dist/types/model/cmdb";
import { UseBrickConf } from "@next-core/brick-types";

export enum operation {
  /** 等于 */
  $eq = "$eq",
  /** 不等于 */
  $ne = "$ne",
  /** 包含 */
  $like = "$like",
  /** 不包含 */
  $nlike = "$nlike",
  /** true: 存在(不为空); false: 不存在(为空) */
  $exists = "$exists",
}

export interface SearchItem {
  text: string | boolean | Array<string>;
  op: operation;
}
export interface SearchInfoProps {
  [fields: string]: SearchItem;
}
export interface SearchTreeProps {
  homepage: string;
  appId: string;
  projectId: string;
  treeData: StoryboardAssemblyResult;
  height?: number;
  searchConfig?: SearchConfig;
  searchContent: {
    useBrick: UseBrickConf;
  };
  titleClick?: (node: PlainObject) => void;
  titleFocus?: (node: PlainObject) => void;
  titleBlur?: (node: PlainObject) => void;
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
}): JSX.Element => {
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
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const [supportKey, setSupportKey] = useState<boolean>(
    searchConfig.supportKey ?? true
  );
  const [supportIngoreCase, setSupportIngoreCase] = useState<boolean>(
    searchConfig.supportIngoreCase ?? true
  );
  const [supportFuzzy, setSupportFuzzy] = useState<boolean>(
    searchConfig.supportFuzzy ?? true
  );

  const [searchContentDetail, setSearchContentDetail] = useState<{
    info: PlainObject;
    url: string;
  }>();

  const setFilterTree = useRef(
    debounce((filterValue, searchConfig = {}) => {
      if (filterValue !== "") {
        const { tree, matchKey } = filter({
          tree: cloneDeep(baseTree),
          text: filterValue,
          config: Object.assign(
            {},
            {
              supportFuzzy,
              supportIngoreCase,
              supportKey,
            },
            searchConfig
          ),
        });
        setExpandedKeys(matchKey);
        setTree(tree);
        setForceUpdate(Math.random());
      } else {
        setExpandedKeys([]);
        setTree(baseTree);
      }
    }, 300)
  ).current;

  const handleAutoSearch = (fields: Field[]): void => {
    if (fields) {
      const searchInfo: SearchInfoProps = {};
      fields.forEach((item) => {
        const text = item.values[0];
        if (
          text === "" ||
          text === null ||
          (Array.isArray(text) && !text.length)
        )
          return;
        searchInfo[item.id] = {
          op: item.currentCondition.operations[0].operator,
          text: text,
        };
      });
      if (Object.keys(searchInfo).length) {
        setFilterTree(searchInfo);
      } else {
        setFilterTree("");
      }
    }
  };

  const handleFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setValue(event.target.value);
    setFilterTree(event.target.value.trim());
  };

  const renderTitle = (nodeData: PlainObject): JSX.Element =>
    titleRender({
      homepage,
      appId,
      projectId,
      nodeData,
    });

  const onSelect = (_selectedKeys: React.Key[], item: PlainObject): void => {
    titleClick?.({
      info: item.node[NODE_INFO],
      url: item.node.url,
    });
    setSearchContentDetail({
      info: item.node[NODE_INFO],
      url: item.node.url,
    });
  };

  const onMouseEnter = (info: NodeMouseEventParams): void =>
    titleFocus?.({
      info: (info.node as PlainObject)[NODE_INFO],
      url: (info.node as PlainObject).url,
    });

  const onMouseLeave = (info: NodeMouseEventParams): void =>
    titleBlur?.({
      info: (info.node as PlainObject)[NODE_INFO],
      url: (info.node as PlainObject).url,
    });

  const handleClickIcon = (type: searchType): void => {
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

  const renderInputSuffixIcon = (): JSX.Element => {
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
      <div style={{ marginTop: 10 }}>
        <InstanceList
          searchDisabled
          hideInstanceList
          relatedToMeDisabled
          showHiddenInfoDisabled
          objectId={searchBoardModel.objectId}
          objectList={[searchBoardModel as ModelCmdbObject]}
          disabledDefaultFields
          autoSearch={handleAutoSearch}
        />
      </div>
      {tree.length ? (
        <div className={className(styles.searchWrapper)}>
          <div className={className(styles.SearchTree)}>
            <Tree
              key={forceUpdate}
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
          </div>
          <div className={className(styles.searchContent)}>
            {searchContentDetail && props.searchContent && (
              <BrickAsComponent
                useBrick={props.searchContent.useBrick}
                data={searchContentDetail}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            color: "#8c8c8c",
            textAlign: "center",
            margin: 20,
          }}
        >
          = = Search Empty = =
        </div>
      )}
    </div>
  );
}
