import React, { useState } from "react";
import { treeDataType } from "./interfaceType";
import { DataNode } from "rc-tree-select/lib/interface";

function useTreeShuttle() {
  const [sonParMap, setSonParMap] = useState<
    Map<DataNode["key"], DataNode["key"] | null>
  >(new Map()); // 保存子节点key和父节点key的Map，主要用于子级查找父级

  const [flatArray, setFlatArray] = useState<DataNode[]>([]); // 保存展平的树数据，用于重组树形结构

  // 左边的树形选择框
  const [checkListLeft, setCheckListLeft] = useState<Array<DataNode["key"]>>(
    []
  ); // 存储左侧选择框选中的key

  const [isBrightLeft, setIsBrightLeft] = useState<boolean>(false); // 控制左侧按钮是否高亮

  const [readOnlyAllKeyLeft, setReadOnlyAllKeyLeft] = useState<
    Array<DataNode["key"]>
  >([]); // readonly 左边全部的key

  const [dataSourceLeft, setDataSourceLeft] = useState<treeDataType>({
    treeData: [],
  }); // 左侧树形选择框的数据源

  // 右边的树形选择框
  const [checkListRight, setCheckListRight] = useState<Array<DataNode["key"]>>(
    []
  ); // 存储在右侧选择框中的key

  const [dataSourceRight, setDataSourceRight] = useState<treeDataType>({
    treeData: [],
  }); // 右侧树形选择框的数据源

  const [readOnlyAllKeyRight, setReadOnlyAllKeyRight] = useState<
    Array<DataNode["key"]>
  >([]); // 右侧所有的key

  const [isBrightRight, setIsBrightRight] = useState<boolean>(false); // 控制右侧按钮是否高亮

  const [selectedRootKeys, setSelectedRootKeys] = useState<
    Array<DataNode["key"]>
  >([]); // 右侧只读的树形数据，主要用于搜索

  const [allRootKeySet, setAllRootKeySet] = useState<Set<DataNode["key"]>>(
    new Set()
  ); // 右侧只读的树形数据，主要用于搜索

  const [dataSource, setDataSource] = useState<treeDataType["treeData"]>([]); // 初始数据源

  return {
    setReadOnlyAllKeyRight,
    setReadOnlyAllKeyLeft,
    setCheckListRight,
    setIsBrightLeft,
    setDataSourceRight,
    setIsBrightRight,
    setCheckListLeft,
    setSonParMap,
    setFlatArray,
    setDataSourceLeft,
    setSelectedRootKeys,
    setAllRootKeySet,
    dataSource,
    setDataSource,
    checkListLeft,
    checkListRight,
    dataSourceRight,
    dataSourceLeft,
    flatArray,
    sonParMap,
    isBrightLeft,
    isBrightRight,
    readOnlyAllKeyRight,
    readOnlyAllKeyLeft,
    selectedRootKeys,
    allRootKeySet,
  };
}

export default useTreeShuttle;
