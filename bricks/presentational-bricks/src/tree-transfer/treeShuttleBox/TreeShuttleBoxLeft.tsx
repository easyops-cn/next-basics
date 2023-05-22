import React, { FC, useMemo, useState, useEffect } from "react";

import shareStyle from "./share.module.css";

import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { traverseTreeData, searchTree } from "./tool";
import { useTreeContext } from "./useTreeContext";
import { cloneDeep } from "lodash";
import { DataNode } from "rc-tree-select/lib/interface";
import { treeDataType } from "./interfaceType";

export interface shuttleLeftProps {
  handleChange?: (value: string[]) => void;
  showSearch?: boolean;
  titles?: string[];
  defaultExpandAll?: boolean;
  shownumItem?: boolean;
}

const TreeShuttleBoxLeft: FC<shuttleLeftProps> = ({
  showSearch,
  defaultExpandAll,
  titles,
  shownumItem,
}) => {
  const {
    checkListLeft,
    dataSourceLeft,
    readOnlyAllKeyLeft,
    setCheckListLeft,
    setIsBrightRight,
    dataSource,
    setDataSourceLeft,
  } = useTreeContext();
  const [indeterminate, setIndeterminate] = useState<boolean>(false); // 控制半选
  const [checkAll, setCheckAll] = useState<boolean>(false); // 控制全选
  const [searchText, setSearchText] = useState<string>(""); // 用于搜索title

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.trim());
  };
  const handleSearchTree = (value: string) => {
    value = value.trim();
    let treeData: DataNode[] = cloneDeep(dataSource);
    if (value) {
      treeData = searchTree(value, cloneDeep(treeData));
    }
    traverseTreeData({
      treeData,
      callback(item) {
        item["disabled"] = checkListLeft.includes(item.key);
      },
    });
    setDataSourceLeft({
      treeData,
    } as treeDataType);
    setSearchText(value);
  };

  const handleSelectNode = (keyArr: any) => {
    if (readOnlyAllKeyLeft.length === keyArr.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else if (keyArr.length === 0) {
      setCheckAll(false);
      setIndeterminate(false);
    } else {
      setCheckAll(false);
      setIndeterminate(true);
    }
    setCheckListLeft(keyArr);
    // 处理 to Right 高亮
    setIsBrightRight(!!keyArr.length);
  };
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckAll(true);
      setIndeterminate(false);
      setCheckListLeft(readOnlyAllKeyLeft);
      setIsBrightRight(true);
    } else {
      setCheckAll(false);
      setCheckListLeft([]);
      setIsBrightRight(false);
    }
  };
  useEffect(() => {
    if (!checkListLeft.length) {
      setIndeterminate(false);
      setCheckAll(false);
    }
  }, [checkListLeft]);
  return (
    <div className={shareStyle.CustomTransferBox}>
      <div className={shareStyle.CustomTransferHead}>
        <div className={shareStyle.CustomTransferHeadLeft}>
          {useMemo(
            () => (
              <Checkbox
                data-testid="leftCheckbox"
                indeterminate={indeterminate}
                checked={checkAll}
                onChange={handleCheckBoxChange}
              />
            ),
            [indeterminate, checkAll, readOnlyAllKeyLeft]
          )}

          {useMemo(
            () =>
              shownumItem ? (
                <p className={shareStyle.selectCount}>
                  {checkListLeft.length}/{readOnlyAllKeyLeft.length}项
                </p>
              ) : null,
            [checkListLeft, readOnlyAllKeyLeft]
          )}
        </div>
        <div className={shareStyle.CustomTransferHeadRight}>{titles[0]}</div>
      </div>
      <div className={shareStyle.CustomTransferBody}>
        {showSearch && (
          <Search
            data-testid="leftSearch"
            placeholder="请输入搜索内容"
            value={searchText}
            onSearch={handleSearchTree}
            onChange={handleSearchChange}
            allowClear
            enterButton
          />
        )}

        <div className={shareStyle.CustomTransferTree}>
          {dataSourceLeft.treeData?.length > 0 && (
            <Tree
              data-testid="leftTree"
              height={300}
              selectable={false}
              checkable
              checkedKeys={checkListLeft}
              onCheck={handleSelectNode}
              treeData={dataSourceLeft.treeData}
              defaultExpandAll={defaultExpandAll}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { TreeShuttleBoxLeft };
