// @ts-nocheck
import React, { FC, useState, useMemo, useEffect } from "react";
import shareStyle from "./share.module.css";
import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { useTreeContext } from "./useTreeContext";
import { createNewTreeData, getRootKeys, searchTree } from "./tool";

import { DataNode } from "rc-tree-select/lib/interface";
import { treeDataType } from "./interfaceType";
import { K, NS_PRESENTATIONAL_BRICKS } from "../../i18n/constants";
import i18next from "i18next";
export interface TreeShuttleBoxRightPropsType {
  showSearch?: boolean;
  titles?: string[];
  defaultExpandAll?: boolean;
  shownumItem?: boolean;
}

const TreeShuttleBoxRight: FC<TreeShuttleBoxRightPropsType> = ({
  showSearch,
  titles,
  shownumItem,
}) => {
  const {
    dataSourceRight,
    checkListRight,
    readOnlyAllKeyRight,
    setDataSourceRight,
    flatArray,
    selectedRootKeys,
    sonParMap,
    setCheckListRight,
    setIsBrightLeft,
    allRootKeySet,
  } = useTreeContext();
  const [indeterminate, setIndeterminate] = useState<boolean>(false); // 控制半选
  const [checkAll, setCheckAll] = useState<boolean>(false); // 控制全选
  const [searchText, setSearchText] = useState<string>(""); // 用于搜索title
  const [finVal, setFinVal] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };
  const handleSearchTree = (value: string) => {
    value = value.trim();
    // 通过选中根节点创建一颗新的树
    let rightTreeData: DataNode[] = createNewTreeData(
      selectedRootKeys,
      sonParMap,
      flatArray
    );
    if (value) {
      rightTreeData = searchTree(value, rightTreeData);
    }
    setDataSourceRight({
      treeData: rightTreeData,
    } as treeDataType);
    setSearchText(value);
  };
  const handleSelectNode = (keyArr: any) => {
    setCheckListRight(keyArr);
    // 处理 to Right 高亮
    setIsBrightLeft(!!keyArr.length);
  };
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckListRight(readOnlyAllKeyRight);
      setIsBrightLeft(true);
    } else {
      setCheckListRight([]);
      setIsBrightLeft(false);
    }
  };
  const handleExpand = (e: any) => {
    setFinVal(e);
  };
  useEffect(() => {
    if (checkListRight.length === 0) {
      setIndeterminate(false);
      setCheckAll(false);
    } else if (readOnlyAllKeyRight.length === checkListRight.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else {
      setCheckAll(false);
      setIndeterminate(true);
    }
  }, [checkListRight]);
  useEffect(() => {
    if (readOnlyAllKeyRight.length !== 0) {
      setFinVal(readOnlyAllKeyRight);
    }
  }, [dataSourceRight]);
  return (
    <div className={shareStyle.CustomTransferBox}>
      <div className={shareStyle.CustomTransferHead}>
        <div className={shareStyle.CustomTransferHeadLeft}>
          {useMemo(
            () => (
              <Checkbox
                data-testid="rightCheckbox"
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={handleCheckBoxChange}
              />
            ),
            [indeterminate, checkAll, readOnlyAllKeyRight]
          )}
          {useMemo(
            () =>
              shownumItem ? (
                <p className={shareStyle.selectCount}>
                  {i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.COUNT_ITEMS}`, {
                    count: `${
                      getRootKeys(checkListRight, allRootKeySet).length
                    }/${selectedRootKeys.length}` as any,
                  })}
                </p>
              ) : null,
            [selectedRootKeys, checkListRight, allRootKeySet]
          )}
        </div>
        <div className={shareStyle.CustomTransferHeadRight}>{titles[1]}</div>
      </div>
      <div className={shareStyle.CustomTransferBody}>
        {showSearch && (
          <Search
            data-testid="rightSearch"
            placeholder={i18next.t(
              `${NS_PRESENTATIONAL_BRICKS}:${K.PLEASE_ENTER_THE_SEARCH_CONTENT}`
            )}
            value={searchText}
            onSearch={handleSearchTree}
            onChange={handleSearchChange}
            allowClear
            enterButton
          />
        )}
        <div className={shareStyle.CustomTransferTree}>
          {dataSourceRight.treeData.length > 0 && (
            <Tree
              data-testid="rightTree"
              height={300}
              selectable={false}
              checkable
              checkedKeys={checkListRight}
              onCheck={handleSelectNode}
              onExpand={handleExpand}
              treeData={dataSourceRight.treeData}
              expandedKeys={finVal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { TreeShuttleBoxRight };
