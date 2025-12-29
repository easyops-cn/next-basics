// @ts-nocheck
import React, { FC, useMemo, useState, useEffect } from "react";

import shareStyle from "./share.module.css";

import { Checkbox, Input, Tree } from "antd";
const { Search } = Input;
import { traverseTreeData, searchTree, getRootKeys } from "./tool";
import { useTreeContext } from "./useTreeContext";
import { cloneDeep } from "lodash";
import { DataNode } from "rc-tree-select/lib/interface";
import { treeDataType } from "./interfaceType";
import i18next from "i18next";
import { K, NS_PRESENTATIONAL_BRICKS } from "../../i18n/constants";

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
    setCheckListLeft(keyArr);
    // 处理 to Right 高亮
    setIsBrightRight(!!keyArr.length);
  };
  const handleCheckBoxChange = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setCheckListLeft(readOnlyAllKeyLeft);
      setIsBrightRight(true);
    } else {
      setCheckListLeft([]);
      setIsBrightRight(false);
    }
  };
  const handleExpand = (e: any) => {
    setFinVal(e);
  };
  useEffect(() => {
    if (checkListLeft.length === 0) {
      setIndeterminate(false);
      setCheckAll(false);
    } else if (readOnlyAllKeyLeft.length === checkListLeft.length) {
      setCheckAll(true);
      setIndeterminate(false);
    } else {
      setCheckAll(false);
      setIndeterminate(true);
    }
  }, [checkListLeft]);

  useEffect(() => {
    if (defaultExpandAll) {
      setFinVal(readOnlyAllKeyLeft);
    } else {
      setFinVal([]);
    }
  }, [dataSource, defaultExpandAll]);

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
                  {i18next.t(`${NS_PRESENTATIONAL_BRICKS}:${K.COUNT_ITEMS}`, {
                    count: `${
                      getRootKeys(checkListLeft, allRootKeySet).length
                    }/${[...allRootKeySet].length}` as any,
                  })}
                </p>
              ) : null,
            [checkListLeft, allRootKeySet]
          )}
        </div>
        <div className={shareStyle.CustomTransferHeadRight}>{titles[0]}</div>
      </div>
      <div className={shareStyle.CustomTransferBody}>
        {showSearch && (
          <Search
            data-testid="leftSearch"
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
          {dataSourceLeft.treeData?.length > 0 && (
            <Tree
              data-testid="leftTree"
              height={300}
              selectable={false}
              checkable
              checkedKeys={checkListLeft}
              onCheck={handleSelectNode}
              onExpand={handleExpand}
              treeData={dataSourceLeft.treeData}
              expandedKeys={finVal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export { TreeShuttleBoxLeft };
