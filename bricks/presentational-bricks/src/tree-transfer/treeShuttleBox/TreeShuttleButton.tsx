import React, { FC, useMemo, useEffect } from "react";
import shareStyle from "./share.module.css";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { useTreeContext } from "./useTreeContext";
import {
  traverseTreeData,
  getRootKeys,
  getRealCheckListKey,
  createNewTreeData,
  getTreeDataAllKey,
} from "./tool";
import { Button } from "antd";
import { cloneDeep, difference } from "lodash";
import { DataNode } from "rc-tree-select/lib/interface";

export interface TreeShuttleButtonProps {
  handleChange: (value: Array<DataNode["key"]>) => void;
}

const TreeShuttleButton: FC<TreeShuttleButtonProps> = ({ handleChange }) => {
  const {
    checkListLeft,
    checkListRight,
    flatArray,
    sonParMap,
    dataSourceLeft,
    isBrightRight,
    isBrightLeft,
    readOnlyAllKeyLeft,
    readOnlyAllKeyRight,
    selectedRootKeys,
    allRootKeySet,
    setDataSourceRight,
    setIsBrightLeft,
    setSelectedRootKeys,
    setDataSourceLeft,
    setIsBrightRight,
    dataSource,
    setCheckListLeft,
    setCheckListRight,
    setReadOnlyAllKeyRight,
  } = useTreeContext();
  const handleClickToRight = () => {
    if (!checkListLeft.length && !isBrightRight) {
      return;
    }
    // 右树处理
    const selectedRootKeys = getRootKeys(checkListLeft, allRootKeySet);
    setSelectedRootKeys(selectedRootKeys);

    const rightTreeData = createNewTreeData(
      selectedRootKeys,
      sonParMap,
      flatArray
    );
    setDataSourceRight({ treeData: rightTreeData });
    const readOnlyAllKeyRight = getTreeDataAllKey(rightTreeData);
    setReadOnlyAllKeyRight(readOnlyAllKeyRight);
    setCheckListRight([]);

    // 左树处理
    const treeData_ = cloneDeep(dataSourceLeft.treeData);
    traverseTreeData({
      treeData: treeData_,
      callback(item) {
        item["disabled"] = checkListLeft.includes(item.key);
      },
    });
    setDataSourceLeft({
      treeData: treeData_,
    });
    setIsBrightRight(false);
    handleChange(selectedRootKeys);
  };

  const handleClickToLeft = () => {
    if (!checkListRight.length && !isBrightLeft) {
      return;
    }
    // 右树处理
    const rightSelectedRootKeys = getRootKeys(checkListRight, allRootKeySet);
    const newSelectedRootKeys = difference(
      selectedRootKeys,
      rightSelectedRootKeys
    );
    setSelectedRootKeys(newSelectedRootKeys);

    const rightTreeData = createNewTreeData(
      newSelectedRootKeys,
      sonParMap,
      flatArray
    );
    setDataSourceRight({ treeData: rightTreeData });
    const readOnlyAllKeyRight = getTreeDataAllKey(rightTreeData);
    setReadOnlyAllKeyRight(readOnlyAllKeyRight);
    setCheckListRight([]);

    // 左树处理
    const leftTreeData = cloneDeep(dataSource);
    const checkListLeft = getRealCheckListKey(
      leftTreeData,
      cloneDeep(newSelectedRootKeys)
    );
    setCheckListLeft(checkListLeft);
    traverseTreeData({
      treeData: leftTreeData,
      callback(item) {
        item["disabled"] = checkListLeft.includes(item.key);
      },
    });
    setDataSourceLeft({
      treeData: leftTreeData,
    });
    setIsBrightLeft(false);
    handleChange(newSelectedRootKeys);
  };

  useEffect(() => {
    handleClickToRight();
  }, [dataSource]);

  return (
    <div className={shareStyle.CustomTransferButtonBox}>
      {useMemo(
        () => (
          <Button
            data-testid="rightButton"
            className={`${shareStyle.CustomTransferButton}`}
            onClick={handleClickToRight}
            disabled={!isBrightRight}
            type={isBrightRight ? "primary" : "default"}
          >
            <RightOutlined
              className={
                isBrightRight
                  ? shareStyle.iconColorActive
                  : shareStyle.iconColor
              }
            />
          </Button>
        ),
        [isBrightRight, checkListLeft, readOnlyAllKeyLeft, readOnlyAllKeyRight]
      )}
      {useMemo(
        () => (
          <Button
            data-testid="leftButton"
            className={`${shareStyle.CustomTransferButton}`}
            onClick={handleClickToLeft}
            disabled={!isBrightLeft}
            type={isBrightLeft ? "primary" : "default"}
          >
            <LeftOutlined
              className={
                isBrightLeft ? shareStyle.iconColorActive : shareStyle.iconColor
              }
            />
          </Button>
        ),
        [isBrightLeft, checkListRight, readOnlyAllKeyLeft, readOnlyAllKeyRight]
      )}
    </div>
  );
};

export { TreeShuttleButton };
