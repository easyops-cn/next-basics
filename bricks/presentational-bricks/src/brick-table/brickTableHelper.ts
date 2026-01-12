import {
  lt,
  lte,
  gt,
  gte,
  get,
  isEqual,
  forEach,
  includes,
  isUndefined,
  map,
  isNil,
  isEmpty,
  find,
} from "lodash";
import { transformColor } from "@next-libs/basic-components";
import { BrickTableFields, CellStatusProps, CustomColumn } from "./index";
import { SortOrder } from "antd/lib/table/interface";
import { getHistory } from "@next-core/brick-kit";

export const initColumnsSorterAndFilters = (
  columns: CustomColumn[],
  fields?: BrickTableFields,
  sort?: string,
  order?: string | number,
  filters?: Record<string, string[]>
): CustomColumn[] => {
  let initedColumns = columns;

  // 初始化列排序
  if (columns) {
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);

    initedColumns = columns.map((item) => {
      let initedItem = item;

      if (isNil(item.key)) {
        initedItem = { ...initedItem, key: item.dataIndex as string };
      }
      if (item.sorter) {
        initedItem = {
          ...initedItem,
          sortOrder:
            sort === item.key && !isNil(order)
              ? (fields?.ascend ?? "ascend") === order
                ? "ascend"
                : "descend"
              : undefined,
        };
      }
      // 初始化表头过滤值
      if (item.filters) {
        const filteredValue =
          urlSearchParams.get(item.key as string) ??
          get(filters, item.key as string)?.join(",");
        initedItem = {
          ...initedItem,
          ...(!isNil(filteredValue) && !isEmpty(filteredValue)
            ? {
                filtered: true,
                filteredValue: filteredValue
                  .split(",")
                  .map(
                    (v) =>
                      (find(item.filters, (f) => String(f.value) === v)
                        ?.value as React.Key) ?? v
                  ),
              }
            : { filtered: false, filteredValue: [] }),
        };
      }
      return initedItem;
    });
  }

  return initedColumns;
};

export const getModifiedColumns = (
  columns: CustomColumn[],
  hiddenColumns?: Array<string | number>,
  sortable?: boolean
): CustomColumn[] => {
  let modifiedColumns = columns;
  if (columns && hiddenColumns) {
    modifiedColumns = columns.filter((column) => {
      return !hiddenColumns.includes(
        column.key ?? (column.dataIndex as string)
      );
    });
  }
  if (sortable === false) {
    modifiedColumns = map(modifiedColumns, (column) => ({
      ...column,
      sorter: false,
    }));
  }
  return modifiedColumns;
};

export const compareFunMap: Record<string, any> = {
  $eq: isEqual,
  $lt: lt,
  $lte: lte,
  $gt: gt,
  $gte: gte,
  $ne: (value: any, fieldValue: any): boolean => !isEqual(value, fieldValue),
  $isEqual: isEqual,
  $notEqual: (value: any, fieldValue: any): boolean =>
    !isEqual(value, fieldValue),
  $in: includes,
  $nin: (value: any, fieldValue: any): boolean => !includes(value, fieldValue),
  $exists: (value: any, fieldValue: any): boolean =>
    value ? !isUndefined(fieldValue) : isUndefined(fieldValue),
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
