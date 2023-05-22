import React, { ReactNode, FC, useEffect } from "react";
import {
  TreeShuttleBoxLeft,
  TreeShuttleBoxRight,
  TreeShuttleButton,
  TreeShuttleBoxRightPropsType,
  shuttleLeftProps,
  TreeShuttleButtonProps,
} from "./index";
import { TreeProvider } from "./useTreeContext";
import useTreeShuttle from "./useTreeShuttle";
import {
  flatTree,
  getRealCheckListKey,
  getRootKeys,
  getTreeDataAllKey,
  getTreeDataAllRootKeysSet,
  traverseTreeData,
} from "./tool";

import { cloneDeep } from "lodash";
import { DataNode } from "rc-tree-select/lib/interface";
import { treeDataType } from "./interfaceType";
interface TreeShuttleBoxType {
  ({
    children,
    selectedKeys,
    treeData,
    replaceFields,
  }: {
    children: ReactNode;
    selectedKeys?: Array<string>;
    treeData?: DataNode[];
    replaceFields: { key: string; title: string };
  }): JSX.Element;
  TreeShuttleBoxLeft: FC<shuttleLeftProps>;
  TreeShuttleBoxRight: FC<TreeShuttleBoxRightPropsType>;
  TreeShuttleButton: FC<TreeShuttleButtonProps>;
}

const TreeShuttleBox: TreeShuttleBoxType = ({
  children,
  selectedKeys = [],
  treeData = [],
  replaceFields,
}) => {
  const {
    setAllRootKeySet,
    setDataSource,
    setSelectedRootKeys,
    setDataSourceLeft,
    setFlatArray,
    setSonParMap,
    setCheckListLeft,
    setIsBrightRight,
    setReadOnlyAllKeyLeft,
    ...rest
  } = useTreeShuttle();
  useEffect(() => {
    // 遍历树形数据设置parentId
    const sonParMap: Map<DataNode["key"], DataNode["key"] | null> = new Map();
    traverseTreeData({
      treeData,
      callback(item, parentId) {
        item.key = item[replaceFields.key];
        item.title = item[replaceFields.title];
        item.parentId = parentId;
        sonParMap.set(item.key, item.parentId);
      },
    });
    setSonParMap(sonParMap);
    setDataSource(cloneDeep(treeData) as treeDataType["treeData"]);
    const _treeData = cloneDeep(treeData);
    const allRootKeySet: Set<DataNode["key"]> =
      getTreeDataAllRootKeysSet(_treeData);
    setAllRootKeySet(allRootKeySet);
    const selectedRootKeys = getRootKeys(selectedKeys, allRootKeySet);
    setSelectedRootKeys(selectedRootKeys);

    setDataSourceLeft({ treeData: _treeData } as treeDataType);

    // 将树扁平化
    // 将所以树形数据拉平，为后续组装右侧的树形树形使用
    const flatArray = flatTree({
      treeData: cloneDeep(treeData),
    } as treeDataType);
    setFlatArray(flatArray);

    // 左侧选中项
    const checkListLeft = getRealCheckListKey(
      treeData,
      cloneDeep(selectedRootKeys)
    );
    setCheckListLeft(checkListLeft);

    const readOnlyAllKeyLeft = getTreeDataAllKey(treeData);
    setReadOnlyAllKeyLeft(readOnlyAllKeyLeft);
    setIsBrightRight(true);
  }, [treeData, replaceFields, selectedKeys]);
  return (
    <TreeProvider
      value={{
        setAllRootKeySet,
        setDataSource,
        setSelectedRootKeys,
        setDataSourceLeft,
        setFlatArray,
        setSonParMap,
        setCheckListLeft,
        setIsBrightRight,
        ...rest,
      }}
    >
      {children}
    </TreeProvider>
  );
};
TreeShuttleBox.TreeShuttleBoxLeft = TreeShuttleBoxLeft;
TreeShuttleBox.TreeShuttleBoxRight = TreeShuttleBoxRight;
TreeShuttleBox.TreeShuttleButton = TreeShuttleButton;

export default TreeShuttleBox;
