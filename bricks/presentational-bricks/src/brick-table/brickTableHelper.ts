import { eq, lt, lte, gt, gte, get, forEach } from "lodash";
import { transformColor } from "@next-libs/basic-components";
import { CellStatusProps } from "./index";
export const compareFunMap: Record<string, any> = {
  $eq: eq,
  $lt: lt,
  $lte: lte,
  $gt: gt,
  $gte: gte,
  $ne: (value1: any, value2: any): boolean => !eq(value1, value2),
};

export function getCellStyle(
  cellStatus: CellStatusProps,
  item: Record<string, any>,
  value?: any
): Record<string, string> {
  const { dataIndex, mapping: list } = cellStatus;
  const finalValue = dataIndex !== undefined ? get(item, dataIndex) : value;
  const ret = list.find((item) => item.value === finalValue);

  if (!ret) return {};

  return {
    borderLeft: `4px solid ${transformColor(ret.leftBorderColor)}`,
  };
}
export const getKeysOfData = (
  data: Record<string, any>[],
  rowKey: string,
  childrenColumnName: string,
  keys: string[]
): void => {
  if (data) {
    forEach(data, (item) => {
      const children = get(item, childrenColumnName);
      const key = get(item, rowKey);
      keys.push(key);
      if (children?.length) {
        getKeysOfData(children, rowKey, childrenColumnName, keys);
      }
    });
  }
};
export const getRowsOfData = (
  data: Record<string, any>[],
  childrenColumnName: string,
  rows: Record<string, any>[]
): void => {
  if (data) {
    forEach(data, (item) => {
      const children = get(item, childrenColumnName);
      rows.push(item);
      if (children?.length) {
        getRowsOfData(children, childrenColumnName, rows);
      }
    });
  }
};

export function stripEmptyExpandableChildrenByName(
  name: string,
  data: Record<string, any>[] = []
): Record<string, any>[] {
  if (data?.length) {
    data.forEach((value) => {
      if (value[name]?.length) {
        return stripEmptyExpandableChildrenByName(name, value[name]);
      }

      delete value[name];
      return value;
    });
  }
  return data;
}
