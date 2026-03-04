import type { TableProps } from "antd/lib/table";
import type { UseBrickConf } from "@next-core/brick-types";
import type { SortOrder } from "antd/lib/table/interface";
import type { ColumnProps } from "antd/lib/table";

export interface Header {
  /**
   * 表格头部左边内容显示区域
   */
  title:
    | string
    | {
        useBrick?: UseBrickConf;
      };
  /**
   * 表格头部右边内容显示区域
   */
  extra?:
    | string
    | {
        useBrick?: UseBrickConf;
      };
}

export interface CustomColumn extends ColumnProps<Record<string, any>> {
  /**
   * 支持为某列自定义展示构件
   */
  useBrick?: UseBrickConf;
  /**
   * 字段的值展示时的后缀
   */
  valueSuffix?: string;
  /**
   * 支持为某列的表头自定义展示构件，可通过 DATA.title 获取标题文本
   */
  headerBrick?: {
    useBrick: UseBrickConf;
  };

  /**
   * 单元格内元素的垂直对齐方式
   */
  verticalAlign?: "top" | "bottom";
}

export interface RankTableProps {
  header?: Header;
  configProps?: any;
  rowKey?: string;
  scrollConfigs?: TableProps<unknown>["scroll"];
  hiddenColumns?: Array<string | number>;
  showCard?: boolean;
  showHeader?: boolean;
  size?: "default" | "small";
  sortable?: boolean;
  sort?: string;
  order?: SortOrder;
  columns?: CustomColumn[];
  dataSource?: Record<string, any>[];
  headerTitle?:
    | string
    | {
        useBrick?: UseBrickConf;
      };
}

export interface RankTableEvents {
  "sort.update": CustomEvent<{
    sort: string;
    order: string | number;
  }>;
}

export interface RankTableEventsMap {
  onSortUpdate: "sort.update";
}

export declare class RankTableElement extends HTMLElement {
  header: Header | undefined;
  configProps: any | undefined;
  rowKey: string | undefined;
  scrollConfigs: TableProps<unknown>["scroll"] | undefined;
  hiddenColumns: Array<string | number> | undefined;
  showCard: boolean | undefined;
  showHeader: boolean | undefined;
  size: "default" | "small" | undefined;
  sortable: boolean | undefined;
  sort: string | undefined;
  order: SortOrder | undefined;
  columns: CustomColumn[] | undefined;
  dataSource: Record<string, any>[] | undefined;
  headerTitle:
    | string
    | {
        useBrick?: UseBrickConf;
      }
    | undefined;
}
