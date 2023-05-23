import React, { FC, useState, useMemo, useEffect } from "react";
import shareStyle from "./share.module.css";
import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { useTreeContext } from "./useTreeContext";
import { createNewTreeData, getTreeDataAllKey, searchTree } from "./tool";

import { DataNode } from "rc-tree-select/lib/interface";
import { treeDataType } from "./interfaceType";
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
  defaultExpandAll,
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
  } = useTreeContext();
  const [indeterminate, setIndeterminate] = useState<boolean>(false); // 控制半选
  const [checkAll, setCheckAll] = useState<boolean>(false); // 控制全选
  const [searchText, setSearchText] = useState<string>(""); // 用于搜索title
  const [finVal, setFinVal] = useState([]); // 用于搜索title

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
    if (readOnlyAllKeyRight.length === keyArr.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else if (keyArr.length === 0) {
      setCheckAll(false);
      setIndeterminate(false);
    } else {
      setCheckAll(false);
      setIndeterminate(true);
    }
    setCheckListRight(keyArr);
    // 处理 to Right 高亮
    setIsBrightLeft(!!keyArr.length);
  };
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckAll(true);
      setIndeterminate(false);
      setCheckListRight(readOnlyAllKeyRight);
      setIsBrightLeft(true);
    } else {
      setCheckAll(false);
      setCheckListRight([]);
      setIsBrightLeft(false);
    }
  };
  useEffect(() => {
    if (!checkListRight.length) {
      setIndeterminate(false);
      setCheckAll(false);
    }
  }, [checkListRight]);
  useEffect(() => {
    const { treeData } = dataSourceRight;
    if (treeData.length !== 0) {
      const allKeys = getTreeDataAllKey(treeData);
      setFinVal(allKeys);
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
                  {checkListRight.length}/{readOnlyAllKeyRight.length}项
                </p>
              ) : null,
            [readOnlyAllKeyRight, checkListRight]
          )}
        </div>
        <div className={shareStyle.CustomTransferHeadRight}>{titles[1]}</div>
      </div>
      <div className={shareStyle.CustomTransferBody}>
        {showSearch && (
          <Search
            data-testid="rightSearch"
            placeholder="请输入搜索内容"
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
              treeData={dataSourceRight.treeData}
              defaultExpandAll={defaultExpandAll}
              expandedKeys={finVal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { TreeShuttleBoxRight };
