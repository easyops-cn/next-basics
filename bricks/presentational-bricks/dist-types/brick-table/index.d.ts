import type React from "react";
import type { TablePaginationConfig, TableProps } from "antd/lib/table";
import type {
  ExpandableConfig,
  RowSelectionType,
  TableRowSelection,
} from "antd/lib/table/interface";
import type {
  MenuIcon,
  UseBrickConf,
  BrickEventsMap,
} from "@next-core/brick-types";
import type { SizeType } from "antd/lib/config-provider/SizeContext";
import type { ColumnProps } from "antd/lib/table";
import type { BrickWrapperConfig } from "../interfaces/common.js";

export interface BrickTableFields {
  dataSource?: string; // 指定 dataSource 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 list
  total?: string; // 指定 total 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 total
  rowKey?: string; // 指定每一行的 key，不指定则默认为 index
  page?: string; // 指定请求后台 page 参数 path
  pageSize?: string; // 指定请求后台 pageSize 参数 path
  ascend?: string | number; // 指定 ascend 排序对应字段，例如有些后台对应为 1 ，有些对应为 "asc"。这里默认为 "ascend"。
  descend?: string | number; // 指定 descend 排序对应字段，例如有些后台对应为 0 ，有些对应为 "desc"。这里默认为 "descend"。
}

export interface RowDisabledProps {
  field: string;
  value: any;
  operator:
    | "$eq"
    | "$ne"
    | "$lt"
    | "$lte"
    | "$gt"
    | "$gte"
    | "$isEqual"
    | "$notEqual"
    | "$in"
    | "$nin"
    | "$exists";
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
   * 在渲染自定义构件的场景下额外设置单元格的状态样式， `dataIndex` 表示取哪一列的字段值作为判断数据，不填的话默认取当前列的字段，`mapping` 表示判断的条件，条件被成功匹配时用当前的样式。目前仅支持单元格 `leftBorderColor` 属性的设置
   */
  cellStatus?: CellStatusProps;
  /**
   * 设置列的每个单元格样式
   */
  cellStyle?: React.CSSProperties;
  /**
   * [已废弃]支持为某列的标题自定义展示构件，可通过 DATA.title 获取标题文本
   */
  titleUseBrick?: UseBrickConf;
  /**
   * [已废弃]支持为某列自定义展示构件
   */
  component?: CustomColumnComponent;
  /**
   * 单元格内元素的垂直对齐方式
   */
  verticalAlign?: "top" | "bottom";
  /**
   * 每条记录的控制列合并的值的 key
   */
  colSpanKey?: string;
  /**
   * 每条记录的控制行合并的值的 key
   */
  rowSpanKey?: string;
  /**
   * 自定义筛选菜单
   */
  filterDropdownBrick?: {
    useBrick: UseBrickConf;
  };
  /**
   * 自定义筛选图标
   */
  customFilterIcon?: MenuIcon;
}

export interface CellStatusProps {
  dataIndex?: string;
  mapping: Array<{
    leftBorderColor: string;
    value: any;
  }>;
}

export interface CustomColumnComponent {
  /** 构件名称 */
  brick: string | any;
  /** 字段值、列表项和 index 对应所用构件的属性的 key */
  fields?: {
    value?: string;
    item?: string;
    index?: string;
  };
  /** 构件属性 */
  properties?: Record<string, any>;
  /** 事件 */
  events?: BrickEventsMap;
}

export interface TableDragInfo {
  order: "asc" | "desc";
  dragData: Record<string, any>;
  anchorData: Record<string, any>;
}

export interface BrickTableProps {
  showCard?: boolean;
  rowSelection?: false | TableRowSelection<any>;
  rowKey?: string;
  hiddenColumns?: Array<string | number>;
  showSelectInfo?: boolean;
  filters?: Record<string, string[]>;
  configProps?: any;
  sort?: string;
  order?: string | number;
  rowDisabledConfig?: RowDisabledProps | RowDisabledProps[];
  expandable?: ExpandableConfig<Record<string, unknown>> | false;
  expandedRowBrick?: {
    useBrick?: UseBrickConf;
  };
  emptyUseBrick?: {
    useBrick?: UseBrickConf;
  };
  expandIcon?: {
    collapsedIcon: MenuIcon;
    expandedIcon: MenuIcon;
  };
  expandIconAsCell?: boolean;
  expandIconColumnIndex?: number;
  expandRowByClick?: boolean;
  optimizedColumns?: Array<string | number>;
  wrapperConfig?: BrickWrapperConfig;
  stripEmptyExpandableChildren?: boolean;
  defaultExpandAllRows?: boolean;
  expandedRowKeys?: string[];
  selectAllChildren?: boolean;
  defaultSelectAll?: boolean;
  ellipsisInfo?: boolean;
  childrenColumnName?: string;
  sortable?: boolean;
  frontSearch?: boolean;
  frontSearchQuery?: string;
  exactSearch?: boolean;
  frontSearchFilterKeys?: string[];
  page?: number;
  pageSize?: number;
  scrollConfigs?: TableProps<unknown>["scroll"];
  qField?: string;
  tableDraggable?: boolean;
  acceptType?: string;
  zebraPattern?: boolean;
  storeCheckedByUrl?: boolean;
  extraRows?: Record<string, unknown>[];
  draggable?: boolean;
  autoSelectParentWhenAllChildrenSelected?: boolean;
  thTransparent?: boolean;
  showHeader?: boolean;
  pagination?: false | TablePaginationConfig;
  size?: SizeType | "x-small";
  type?: RowSelectionType;
  shouldUpdateUrlParams?: boolean;
  shouldRenderWhenUrlParamsUpdate?: boolean;
  selectedRowKeys?: React.Key[];
  showHeaderExpandAll?: boolean;
  columnKeyBrickMap?: Record<string, { useBrick: UseBrickConf }>;
  columns?: CustomColumn[];
  dataSource?: Record<string, any>[];
  fields?: any;
  processedDataSource?: any;
  processConfigProps?: any;
  processedColumns?: any;
  selectUpdateEventName?: string;
  selectUpdateEventDetailKeys?: string[];
  selectUpdateEventDetailField?: string;
  selectUpdateEventDetailExtra?: any;
}

export interface BrickTableEvents {
  "page.update": CustomEvent<Record<string, number>>;
  "filter.update": CustomEvent<Record<string, number>>;
  "select.update": CustomEvent<Record<string, any>[]>;
  "select.row.keys.update": CustomEvent<string[]>;
  "sort.update": CustomEvent<{
    sort: string;
    order: string | number;
  }>;
  "row.expand": CustomEvent<{
    expanded: boolean;
    record: Record<string, any>;
  }>;
  "expand.rows.change": CustomEvent<{
    expandedRows: React.Key[];
  }>;
  "row.drag": CustomEvent<{
    data: Record<string, any>[];
    info: TableDragInfo;
  }>;
  "column.filters.update": CustomEvent<Record<string, string[]>>;
}

export interface BrickTableEventsMap {
  onPageUpdate: "page.update";
  onFilterUpdate: "filter.update";
  onSelectUpdate: "select.update";
  onSelectRowKeysUpdate: "select.row.keys.update";
  onSortUpdate: "sort.update";
  onRowExpand: "row.expand";
  onExpandRowsChange: "expand.rows.change";
  onRowDrag: "row.drag";
  onColumnFiltersUpdate: "column.filters.update";
}

export declare class BrickTableElement extends HTMLElement {
  showCard: boolean | undefined;
  rowSelection: false | TableRowSelection<any> | undefined;
  rowKey: string | undefined;
  hiddenColumns: Array<string | number> | undefined;
  showSelectInfo: boolean | undefined;
  filters: Record<string, string[]> | undefined;
  configProps: any | undefined;
  sort: string | undefined;
  order: string | number | undefined;
  rowDisabledConfig: RowDisabledProps | RowDisabledProps[] | undefined;
  expandable: ExpandableConfig<Record<string, unknown>> | false | undefined;
  expandedRowBrick:
    | {
        useBrick?: UseBrickConf;
      }
    | undefined;
  emptyUseBrick:
    | {
        useBrick?: UseBrickConf;
      }
    | undefined;
  expandIcon:
    | {
        collapsedIcon: MenuIcon;
        expandedIcon: MenuIcon;
      }
    | undefined;
  expandIconAsCell: boolean | undefined;
  expandIconColumnIndex: number | undefined;
  expandRowByClick: boolean | undefined;
  optimizedColumns: Array<string | number> | undefined;
  wrapperConfig: BrickWrapperConfig | undefined;
  stripEmptyExpandableChildren: boolean | undefined;
  defaultExpandAllRows: boolean | undefined;
  expandedRowKeys: string[] | undefined;
  selectAllChildren: boolean | undefined;
  defaultSelectAll: boolean | undefined;
  ellipsisInfo: boolean | undefined;
  childrenColumnName: string | undefined;
  sortable: boolean | undefined;
  frontSearch: boolean | undefined;
  frontSearchQuery: string | undefined;
  exactSearch: boolean | undefined;
  frontSearchFilterKeys: string[] | undefined;
  page: number | undefined;
  pageSize: number | undefined;
  scrollConfigs: TableProps<unknown>["scroll"] | undefined;
  qField: string | undefined;
  tableDraggable: boolean | undefined;
  acceptType: string | undefined;
  zebraPattern: boolean | undefined;
  storeCheckedByUrl: boolean | undefined;
  extraRows: Record<string, unknown>[] | undefined;
  draggable: boolean;
  autoSelectParentWhenAllChildrenSelected: boolean | undefined;
  thTransparent: boolean | undefined;
  showHeader: boolean | undefined;
  pagination: false | TablePaginationConfig | undefined;
  size: SizeType | "x-small" | undefined;
  type: RowSelectionType | undefined;
  shouldUpdateUrlParams: boolean | undefined;
  shouldRenderWhenUrlParamsUpdate: boolean | undefined;
  selectedRowKeys: React.Key[] | undefined;
  showHeaderExpandAll: boolean | undefined;
  columnKeyBrickMap: Record<string, { useBrick: UseBrickConf }> | undefined;
  columns: CustomColumn[] | undefined;
  dataSource: Record<string, any>[] | undefined;
  fields: any | undefined;
  processedDataSource: any | undefined;
  processConfigProps: any | undefined;
  processedColumns: any | undefined;
  selectUpdateEventName: string | undefined;
  selectUpdateEventDetailKeys: string[] | undefined;
  selectUpdateEventDetailField: string | undefined;
  selectUpdateEventDetailExtra: any | undefined;
  filterSourceData(event: CustomEvent): void;
  expandAll(): void;
}
