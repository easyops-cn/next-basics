import { FunEntryType, FlatEntryType, treeDataType } from "./interfaceType";
import { cloneDeep } from "lodash";
import { DataNode } from "rc-tree-select/lib/interface";
/**
 * 递归树结构，通过callback回调函数可对每一项数据做额外的操作。
 * @param treeData // 当前树型数据源
 * @param callback // 回调函数，对每一项数据进行额外处理
 * @param parentId // 父节点id
 * @param replaceName // 替换子节点属性名称
 * @returns void
 */
export const traverseTreeData = ({
  treeData = [],
  callback,
  parentId = null,
  replaceName = "children",
}: FunEntryType): void => {
  // 遍历树形数据
  treeData.forEach((item: DataNode) => {
    callback?.(item, parentId);
    if (item[replaceName] && item[replaceName].length > 0) {
      traverseTreeData({
        treeData: item[replaceName],
        callback,
        parentId: item.key,
        replaceName,
      });
    }
  });
};

/**
 * 扁平化树结构
 * @param treeData // 当前树型数据源
 * @param callback // 回调函数，对每一项数据进行额外处理
 * @param replaceName // 替换子节点属性名称
 * @returns void
 */
export const flatTree = ({
  treeData = [],
  callback,
  replaceName = "children",
}: FlatEntryType) => {
  // 扁平化树形数据结构
  let flatArr: DataNode[] = [];
  treeData.forEach((item: DataNode, index) => {
    const copyItem = { ...item };
    if (item[replaceName]) {
      delete copyItem[replaceName];
    }
    callback?.(copyItem, index);
    flatArr.push(copyItem);
    if (item[replaceName] && item[replaceName].length > 0) {
      flatArr = flatArr.concat(
        flatTree({ treeData: item[replaceName], replaceName, callback })
      );
    }
  });
  return flatArr;
};

/**
 * 通过搜索词过滤树结构
 * @param searchValue 搜索词
 * @param treeArr 树型数据源
 * @returnsDataNode[]
 */
export const searchTree = (
  searchValue = "",
  treeArr: DataNode[] = []
): DataNode[] => {
  // 树形数据搜索
  const searTreeArr: DataNode[] = [];
  treeArr?.forEach((treeItem: DataNode) => {
    if ((treeItem.title as string).includes(searchValue)) {
      searTreeArr.push(treeItem);
    } else {
      if (treeItem.children && treeItem.children.length) {
        const chr = searchTree(searchValue, treeItem.children);
        const obj = {
          ...treeItem,
          children: chr,
        };
        if (chr && chr.length) {
          searTreeArr.push(obj);
        }
      }
    }
  });
  return searTreeArr;
};

export const searchAllParents = (
  arr: Array<DataNode["key"]>,
  sonParMap: Map<DataNode["key"], DataNode["key"] | null>
): Array<DataNode["key"]> => {
  const allKey: Array<DataNode["key"]> = [];
  function search(key: DataNode["key"]) {
    allKey.push(key);
    const nextKey = sonParMap.get(key);
    if (nextKey) {
      search(nextKey);
    }
  }
  arr.forEach((key) => {
    search(key);
  });
  return Array.from(new Set(allKey));
};

/**
 * 通过选择的所有根节点向上查找需选中的父节点
 * @param treeData 完整树结构
 * @param selectedRootKeys 已选择根节点
 * @returns
 */
export const getRealCheckListKey = (
  treeData: DataNode[],
  selectedRootKeys: Array<DataNode["key"]>
): Array<DataNode["key"]> => {
  const selectedAllKeys: Array<DataNode["key"]> = selectedRootKeys;
  treeData.forEach((item: DataNode) => {
    if (item.children?.length) {
      getRealCheckListKey(item.children, selectedAllKeys);
      item.children.every((childItem: Record<string, any>) =>
        selectedAllKeys.includes(childItem.key)
      )
        ? selectedAllKeys.push(item.key)
        : null;
    }
  });
  return Array.from(new Set(selectedAllKeys));
};

/**
 * 获取当前树所有根节点，将其塞入Set集合中
 * @param treeData 完整树结构
 * @returns
 */
export const getTreeDataAllRootKeysSet = (
  treeData: DataNode[]
): Set<DataNode["key"]> => {
  const allKeys: Array<DataNode["key"]> = [];
  treeData.forEach((item: DataNode) => {
    if (item.children?.length) {
      allKeys.push(...getTreeDataAllRootKeysSet(item.children));
    } else {
      allKeys.push(item.key);
    }
  });
  return new Set(allKeys);
};

/**
 * 对目标数据过滤出所有跟节点
 * @param selectedKeys 已选中key数组
 * @param allRootKeySet 所有根节点集合
 * @returns
 */
export const getRootKeys = (
  selectedKeys: Array<DataNode["key"]>,
  allRootKeySet: Set<DataNode["key"]>
): Array<DataNode["key"]> => {
  return selectedKeys.filter((item) => allRootKeySet.has(item));
};

/**
 * 将扁平化后的树重组为一颗完整的树
 * @param treeList 扁平化的树
 * @returns
 */
export function arrayToTree(treeList: DataNode[]): treeDataType["treeData"] {
  const res: treeDataType["treeData"] = [];
  // 将parent_id抽离出来便于后期通过id查询对应数据
  const map = treeList.reduce((res, item) => ((res[item.key] = item), res), {});
  for (const item of treeList) {
    if (!item.parentId) {
      res.push(item as any);
      continue;
    }
    // 判断父节点是否存在列表中
    if (item.parentId in map) {
      // 获取父节点数据
      const parent = map[item.parentId];
      // 判断父节点数据是否存在子任务，没有则进行初始化
      parent.children = parent.children || [];
      // 将数据推入父节点中
      parent.children.push(item);
    }
  }
  return res;
}

/**
 * 返回当前树所有节点key
 * @param treeData 树型数据源
 * @returns
 */
export function getTreeDataAllKey(
  treeData: DataNode[]
): Array<DataNode["key"]> {
  const arr: Array<DataNode["key"]> = [];
  treeData.map((i: DataNode) => {
    if (i.children) {
      arr.push(...getTreeDataAllKey(i.children));
    }
    arr.push(i.key);
  });
  return arr;
}

/**
 * 通过选中根节点创建一颗新的树
 * @param selectedRootKeys 选中根节点
 * @param sonParMap // 父子映射表
 * @param flatArray // 扁平后的树
 * @returns
 */
export function createNewTreeData(
  selectedRootKeys: Array<DataNode["key"]>,
  sonParMap: Map<DataNode["key"], DataNode["key"] | null>,
  flatArray: DataNode[]
): treeDataType["treeData"] {
  // 得到子级的key 和 半选状态的 父级的key 用于重组数组
  const rightAllKey = searchAllParents(selectedRootKeys, sonParMap);
  // 得到选中的key 所对应的节点
  const selectNode = flatArray.filter(({ key }) => rightAllKey.includes(key));
  // 重组树形数据结构
  return arrayToTree(cloneDeep(selectNode));
}
