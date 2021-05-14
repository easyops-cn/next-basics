import { getRuntime } from "@next-core/brick-kit";
import { flatten, omit } from "lodash";

/**
 * 展平配置
 */
export interface FlattenConfig {
  /**
   * 对应层级子列表的 key
   */
  childrenKey: string;
  /**
   * 展平后，父级在子级的 key
   */
  parentInChildKey: string;
}

export interface FlattenTreeDataListAndCalcRowSpanOptions {
  /**
   * 展平配置列表，按照由父到子的顺序一一对应
   */
  flattenConfigs: FlattenConfig[];
  /**
   * 展平后，是否省略父级里的子列表
   */
  omitChildrenInParent?: boolean;
}

/**
 * 将树形数据列表按照 `options.flattenConfigs` 进行展平，并生成相应的行合并数据
 * @param treeDataList 树形数据列表
 * @param options 函数选项
 * @param depth 当前展平的深度，用于确定 `options.flattenConfigs` 中的当前层级的展平配置
 * @returns 展平后的列表，除了按照 `options.flattenConfigs` 进行展平外，还会生成相应层级以 `options.flattenConfigs[].parentInChildKey + "RowSpan"` 为 key 的行合并数据
 */
export function flattenTreeDataListAndCalcRowSpan(
  treeDataList: Record<string, unknown>[],
  options: FlattenTreeDataListAndCalcRowSpanOptions,
  depth = 0
): Record<string, unknown>[] {
  const { flattenConfigs, omitChildrenInParent } = options;
  const flattenConfig = flattenConfigs[depth];
  const { childrenKey, parentInChildKey } = flattenConfig;

  return flatten(
    treeDataList.map((treeData) => {
      let children = treeData[childrenKey] as Record<string, unknown>[];
      const parent = omitChildrenInParent
        ? omit(treeData, [childrenKey])
        : treeData;

      if (depth < flattenConfigs.length - 2) {
        children = flattenTreeDataListAndCalcRowSpan(
          children,
          options,
          depth + 1
        );
      }

      return children.map((child, index) => ({
        ...child,
        [parentInChildKey]: parent,
        [`${parentInChildKey}RowSpan`]: index === 0 ? children.length : 0,
      }));
    })
  );
}

getRuntime().registerCustomProcessor(
  "presentationalBricks.flattenTreeDataListAndCalcRowSpan",
  flattenTreeDataListAndCalcRowSpan
);
