import _, { size } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import { cloneDeep, debounce } from "lodash";
import { Tree, Input } from "antd";
import { NodeMouseEventParams } from "rc-tree/lib/contextTypes";
import { StoryboardAssemblyResult } from "../shared/storyboard/interfaces";
import {
  filter,
  buildTree,
  symbolForHightlight,
  NODE_INFO,
  PlainObject,
  SearchConfig,
} from "./utils";
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
  fullWord,
  ingoreCase,
}

export const hightlightColor = "#cbcb62";

export const titleRender = (props: { nodeData: PlainObject }): JSX.Element => {
  const { nodeData } = props;
  const style = {
    color: nodeData[symbolForHightlight as any]
      ? "#cbcb62"
      : nodeData.unlink
      ? "#aaa"
      : null,
  };
  return <span style={style}>{nodeData.title}</span>;
};

export function SearchTree(props: SearchTreeProps): React.ReactElement {
  const {
    treeData,
    searchConfig = {},
    titleClick,
    titleFocus,
    titleBlur,
  } = props;
  const searchTreeRef = useRef<HTMLDivElement>(null);
  const instanceListRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");
  const baseTree = buildTree(treeData?.storyboard);
  const [tree, setTree] = useState(baseTree);
  const [expandedKeys, setExpandedKeys] = useState<Key[]>([]);
  const [forceUpdate, setForceUpdate] = useState<number>(0);
  const [supportKey, setSupportKey] = useState<boolean>(
    searchConfig.supportKey ?? true
  );
  const [supportWordCase, setSupportWordCase] = useState<boolean>(
    searchConfig.supportWordCase ?? false
  );
  const [supportFullWord, setSupportFullWord] = useState<boolean>(
    searchConfig.supportFullWord ?? false
  );
  const [maxHeight, setMaxHeight] = useState<number>(0);

  const [searchContentDetail, setSearchContentDetail] = useState<{
    info: PlainObject;
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
              supportFullWord,
              supportWordCase,
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
    setFilterTree(event.target.value.trim(), {
      supportFullWord,
      supportWordCase,
      supportKey,
    });
  };

  const renderTitle = (nodeData: PlainObject): JSX.Element =>
    titleRender({
      nodeData,
    });

  const onSelect = (_selectedKeys: React.Key[], item: PlainObject): void => {
    titleClick?.({
      info: item.node[NODE_INFO],
    });
    setSearchContentDetail({
      info: item.node[NODE_INFO],
    });
  };

  const onMouseEnter = (info: NodeMouseEventParams): void =>
    titleFocus?.({
      info: (info.node as PlainObject)[NODE_INFO],
    });

  const onMouseLeave = (info: NodeMouseEventParams): void =>
    titleBlur?.({
      info: (info.node as PlainObject)[NODE_INFO],
    });

  const handleClickIcon = (type: searchType): void => {
    switch (type) {
      case searchType.fullWord:
        setSupportFullWord(!supportFullWord);
        setFilterTree(value, {
          supportFullWord: !supportFullWord,
        });
        break;
      case searchType.key:
        setSupportKey(!supportKey);
        setFilterTree(value, {
          supportKey: !supportKey,
        });
        break;
      case searchType.ingoreCase:
        setSupportWordCase(!supportWordCase);
        setFilterTree(value, {
          supportWordCase: !supportWordCase,
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
              color: supportWordCase ? "orange" : "#8c8c8c",
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
              color: supportFullWord ? "orange" : "#8c8c8c",
              category: "default",
              icon: "full-word",
              lib: "easyops",
            }}
            size={20}
            style={{
              marginRight: 5,
            }}
            onClick={() => handleClickIcon(searchType.fullWord)}
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

  const resize = React.useCallback(() => {
    const node = searchTreeRef.current;
    if (!node) {
      return;
    }
    const rect = node.getBoundingClientRect();
    // 屏幕高度 - dom距离顶部距离 - 外层padding - input & instanceList高度
    const maxHeight =
      document.documentElement.clientHeight - rect.top - 40 - 100;
    setMaxHeight(maxHeight);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, [resize]);

  useEffect(() => {
    setTree(buildTree(treeData?.storyboard));
  }, [treeData]);

  return (
    <div ref={searchTreeRef}>
      <Input
        placeholder="输入关键字搜索StoryBoard"
        value={value}
        onChange={handleFilterChange}
        suffix={renderInputSuffixIcon()}
      />
      <div ref={instanceListRef} style={{ marginTop: 10 }}>
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
              height={maxHeight}
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
