import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
  method,
} from "@next-core/brick-kit";
import { NS_PRESENTATIONAL_BRICKS, K } from "../i18n/constants";
import i18n from "i18next";
import paginationStyle from "../general-pagination/index.module.css";
import { BrickTable } from "./BrickTable";
import {
  get,
  map,
  set,
  isEmpty,
  merge,
  isNil,
  forEach,
  cloneDeep,
  isArray,
  uniq,
  pullAll,
  every,
  find,
  pull,
  filter,
  flatten,
  keyBy,
} from "lodash";
import { TablePaginationConfig, TableProps } from "antd/lib/table";
import {
  TableRowSelection,
  SorterResult,
  RowSelectionType,
} from "antd/lib/table/interface";
import {
  compareFunMap,
  getKeysOfData,
  getRowsOfData,
  stripEmptyExpandableChildrenByName,
} from "./brickTableHelper";
import { getHistory } from "@next-core/brick-kit";
import { BrickEventsMap, UseBrickConf } from "@next-core/brick-types";
import { SortOrder } from "antd/lib/table/interface";
import { ColumnProps } from "antd/lib/table";
import { DataIndex } from "rc-table/lib/interface";
import { MenuIcon } from "@next-core/brick-types";
import { BrickWrapperConfig } from "../interfaces";
import { SizeType } from "antd/lib/config-provider/SizeContext";
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

export interface CustomColumnComponent {
  brick: string | any;
  fields?: {
    value?: string;
    item?: string;
    index?: string;
  };
  properties?: Record<string, any>;
  events?: BrickEventsMap;
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
}

export interface CellStatusProps {
  dataIndex?: string;
  mapping: Array<{
    leftBorderColor: string;
    value: any;
  }>;
}

/**
 * @id presentational-bricks.brick-table
 * @name presentational-bricks.brick-table
 * @docKind brick
 * @description 当需要对数据进行排序、搜索、分页、自定义操作等复杂行为时
 * @groupI18N
 * {
 *    "basic": {"en": "Basic", "zh": "常用"},
 *    "paginationAndFilter": {"en": "Pagination/Order/Filter", "zh": "分页/排序及搜索"},
 *    "expand": {"en": "Expand/Collapse", "zh": "展开/折叠"},
 *    "ui": {"en": "UI", "zh": "外观"},
 *    "rowSelection": {"en": "RowSelection", "zh": "行选择配置(rowSelection)"},
 *    "other": {"en": "其他", "zh": "other"}
 * }
 * @author lynette
 * @slots
 * @history
 * 1.230.0:新增属性 `exactSearch` 在开启前端搜索的情况下可以配置精确搜索
 * 1.168.0:新增属性 `optimizedColumns`
 * 1.153.0:`columns` 属性新增 `headerBrick`、废弃 `titleUseBrick`
 * 1.145.0:新增`stripEmptyExpandableChildren`属性
 * 1.143.0:新增属性 `selectedRowKeys`
 * 1.111.0:新增属性 `sortable`
 * 1.105.0:新增属性 `zebraPattern` ，`columns` 属性新增 `titleUseBrick`
 * 1.102.0:新增属性`hiddenColumns`
 * 1.94.0:新增属性`tableDraggable`，预废弃属性 `draggable`
 * 1.92.0:新增属性 `filters`
 * 1.72.0:新增属性 `draggable`，新增事件`row.drag`
 * 1.70.0:新增 `qField` 属性
 * 1.68.0:新增属性 `childrenColumnName`、`selectAllChildren`
 * 1.67.0:新增 `rowKey` 属性
 * 1.63.0:新增行展开功能，新增属性`expandedRowBrick`,`expandedRowBrick`,`expandIconAsCell`,`expandIconColumnIndex`,`expandRowByClick`,`defaultExpandAllRows`,`expandedRowKeys`，新增事件`row.expand`,`expand.rows.change`
 * 1.60.0:新增 `cellStatus` 属性
 * 1.59.0:新增 `rowDisabledConfig` 属性
 * 1.57.1:新增 `shouldUpdateUrlParams` 属性和 `sort.update` 事件
 * @memo
 * > Tips: 在 react 中，boolean 类型的值是合法的子元素，但是不会被渲染出来。如果希望 boolean 值在表格单元格中展示成 `true`|`false`，可以使用平台管道进行转换，例如`@{someProperties|string}`。更多场景下可以结合 [基本数值映射构件](developers/brick-book/brick/presentational-bricks.brick-value-mapping) 把 boolean 类型的值转换成有意义的文本进行展示。
 * ### CustomColumn
 * | property             | type                  | required | default | description                                                    |
 * | -------------------- | --------------------- | -------- | ------- | -------------------------------------------------------------- |
 * | ~~component~~ | ~~CustomColumnComponent~~ | -        | -       | ~~ Deprecated。支持为某列自定义展示构件 ~~                          |
 * | valueSuffix          | string                | -        | -       | 字段的值展示时的后缀                                          |
 * | useBrick             | UseBrickConf          | -        | -       | 支持为某列自定义展示构件, 具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)                                  |
 * | titleUseBrick        | UseBrickConf          | -        | -       | 支持为某列的标题自定义展示构件，可通过 DATA.title 获取标题文本,具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf) |
 * | filters | {text:string,value:any}[] | - | - | 表头的筛选菜单项 |
 * | verticalAlign | top \| bottom | - | - | 单元格内元素的垂直对齐方式 |
 * | colSpanKey | string | - | - | 每条记录的控制列合并的值的 key |
 * | rowSpanKey | string | - | - | 每条记录的控制行合并的值的 key。如果希望将树形列表展平，并计算行合并的值，可以使用 flattenTreeDataListAndCalcRowSpan 自定义加工函数 |
 *
 * ### UseBrickConf
 *
 * | property      | type           | required | default | description                                        |
 * | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
 * | brick         | string         | ✔️       | -       | 构件名称                                           |
 * | properties    | object         | -        | -       | 构件属性                                           |
 * | events        | BrickEventsMap | -        | -       | 事件                                               |
 * | transform     | string\|object | -        | -       | 属性数据转换                                       |
 * | transformFrom | string         | -        | -       | 属性数据转换来自数据源的哪个字段，不填则为整个数据 |
 *
 * `<presentational-bricks.brick-table>` 为某列自定义展示构件传递的数据源为：
 *
 * | field       | type   | description |
 * | ----------- | ------ | ----------- |
 * | cellData    | any    | 单元格数据  |
 * | rowData     | any    | 整行数据    |
 * | columnIndex | number | 列序号      |
 *
 * `<presentational-bricks.brick-table>` 为自定义行展开的构件传递的数据源为：
 *
 * | field    | type   | description |
 * | -------- | ------ | ----------- |
 * | rowData  | any    | 整行数据    |
 * | rowIndex | number | 行序号      |
 *
 * ### <del>CustomColumnComponent</del>
 *
 * <details>
 * <summary>展开</summary>
 *
 * | property   | type                                         | required | default | description                                     |
 * | ---------- | -------------------------------------------- | -------- | ------- | ----------------------------------------------- |
 * | brick      | string                                       | ✔️       | -       | 构件名称                                        |
 * | fields     | {value: string; item: string; index: string} | ✔️       | -       | 字段值、列表项和 index 对应所用构件的属性的 key |
 * | properties | object                                       | -        | -       | 构件属性                                        |
 * | events     | BrickEventsMap                               | -        | -       | 事件                                            |
 *
 * </details>
 *
 * ### fields
 * | property   | type   | required | default  | description                                                                                              |
 * | ---------- | ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
 * | fields                | fieldsType                                                                           | -        | -        | 设置相关字段取自哪里，具体描述见下表      |
 *
 * ### fieldsType
 * | property   | type   | required | default  | description                                                                                              |
 * | ---------- | ------ | -------- | -------- | -------------------------------------------------------------------------------------------------------- |
 * | dataSource | string | -        | list     | 指定 dataSource 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 list |
 * | total      | string | -        | total    | 指定 total 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 total     |
 * | page       | string | -        | page     | 指定下表中 "page.update" 事件 detail 的 pagePath                                                         |
 * | pageSize   | string | -        | pageSize | 指定下表 "filter.update" 事件 detail 的 pageSizePath                                                     |
 * | ascend     | string | -        | ascend   | 指定 ascend 升序排序对应字段，例如有些后台对应为 1 ，有些对应为 "asc"。这里默认为 "ascend"               |
 * | descend    | string | -        | descend  | 指定 descend 降序排序对应字段，例如有些后台对应为 0 ，有些对应为 "desc"。这里默认为 "descend"            |
 *
 * ### pagination 默认配置
 *
 * 如果不希望分页，只需在 storyboard 中如下设置即可：
 *
 * ```
 * {
 *   "configProps": {
 *     "pagination": false
 *   }
 * }
 * ```
 *
 * 如果希望覆盖默认配置，只需在 storyboard 中覆盖对应项即可，相关配置项具体查阅：[pagination](https://ant.design/components/pagination-cn/#API)
 *
 * ```
 * {
 *   "configProps": {
 *     "pagination": {
 *       "pageSizeOptions": ["10","100","1000"]
 *     }
 *   }
 * }
 * ```
 *
 * | property        | type     | required | default            | description                           |
 * | --------------- | -------- | -------- | ------------------ | ------------------------------------- |
 * | current         | string   | -        | -                  | 页码，从 page properties 获取         |
 * | pageSize        | string   | -        | -                  | 每页条数，从 pageSize properties 获取 |
 * | total           | object   | -        | -                  | 总数，从 dataSource.total 获取        |
 * | showSizeChanger | boolean  | -        | true               | 展示页码变化器                        |
 * | pageSizeOptions | array    | -        | ["10", "20", "50"] | 每页条数选项                          |
 * | showTotal       | function | -        | -                  | 渲染成"共 xx 条"                      |
 *
 *
 * ### rowSelection 默认配置
 *
 * 行选择默认为 false，即如果不在 storyboard 中配置就不显示。如果要开启只需在 storyboard 中如下设置即可，这时 brick-table 会默认配置 onChange 事件：
 *
 * ```
 * {
 *   "configProps": {
 *     "rowSelection": true
 *   }
 * }
 * ```
 *
 * 如果希望覆盖或者扩展默认配置，只需在 storyboard 中覆盖对应项即可，相关配置项具体查阅：[rowSelection](https://ant.design/components/table-cn/#rowSelection)
 *
 * ```
 * {
 *   "configProps": {
 *     "rowSelection": {
 *       "columnWidth": "88px"
 *     }
 *   }
 * }
 * ```
 *
 * | property | type     | required | default | description                       |
 * | -------- | -------- | -------- | ------- | --------------------------------- |
 * | onChange | function | -        | -       | 选择行，会抛出事件"select.update" |
 *
 * ### 排序
 *
 * 如果某一列希望排序，则可以设对应列 `sorter:true`，例如：
 *
 * ```
 * {
 *   "columns": [
 *     {
 *       "title": "主机",
 *       "key": "hostname",
 *       "dataIndex": "hostname",
 *       "sorter": true
 *     }
 *   ]
 * }
 * ```
 *
 * ## flattenTreeDataListAndCalcRowSpan 自定义加工函数
 *
 * 将树形数据列表按照 `options.flattenConfigs` 进行展平，并生成相应的行合并数据
 *
 * ### Params
 *
 * | param        | type                                       | required | default | description                                                              |
 * | ------------ | ------------------------------------------ | -------- | ------- | ------------------------------------------------------------------------ |
 * | treeDataList | `Record<string, unknown>[]`                | ✔️       | -       | 树形数据列表                                                             |
 * | options      | `FlattenTreeDataListAndCalcRowSpanOptions` | ✔️       | -       | 函数选项                                                                 |
 * | depth        | `number`                                   | -        | 0       | 当前展平的深度，用于确定 `options.flattenConfigs` 中的当前层级的展平配置 |
 *
 * ### Returns
 *
 * | type                        | description                                                                                                                                                |
 * | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | `Record<string, unknown>[]` | 展平后的列表，除了按照 `options.flattenConfigs` 进行展平外，还会生成相应层级以 `options.flattenConfigs[].parentInChildKey + "RowSpan"` 为 key 的行合并数据 |
 *
 * ### FlattenTreeDataListAndCalcRowSpanOptions
 *
 * | property             | type              | required | default | description                              |
 * | -------------------- | ----------------- | -------- | ------- | ---------------------------------------- |
 * | flattenConfigs       | `FlattenConfig[]` | ✔️       | -       | 展平配置列表，按照由父到子的顺序一一对应 |
 * | omitChildrenInParent | `boolean`         | -        | -       | 展平后，是否省略父级里的子列表           |
 *
 * ### FlattenConfig
 *
 * | property         | type     | required | default | description              |
 * | ---------------- | -------- | -------- | ------- | ------------------------ |
 * | childrenKey      | `string` | ✔️       | -       | 对应层级子列表的 key     |
 * | parentInChildKey | `string` | ✔️       | -       | 展平后，父级在子级的 key |
 *
 *
 * @noInheritDoc
 */
export class BrickTableElement extends UpdatingElement {
  /**
   * @detail {[pagePath]: xxx}
   * @description 页码变化,pagePath 可在 fields.page 中设置，默认为 page
   */
  @event({ type: "page.update" }) pageUpdate: EventEmitter<
    Record<string, number>
  >;

  /**
   * @detail {[pagePath]:1,[pageSizePath]:xxx}
   * @description 每页条数变化 ,pagePath 可在 fields.page 中设置,pageSizePath 可在 fields.pageSize 中设置，默认为 pageSize
   */
  @event({ type: "filter.update" }) filterUpdate: EventEmitter<
    Record<string, number>
  >;

  /**
   * @detail Record<string,any>[]
   * @description 勾选框变化，detail 中为所选的行数据
   */
  @event({ type: "select.update" }) selectUpdate: EventEmitter<
    Record<string, any>[]
  >;

  /**
   * @detail {sort:string;order:string|number}
   * @description 排序变化，detail 中的 sort 为对应排序列的 key/dataIndex，order 为升序/降序
   */
  @event({ type: "sort.update", cancelable: true }) sortUpdate: EventEmitter<{
    sort: string;
    order: string | number;
  }>;

  /**
   * @detail {expanded:boolean;record:Record<string,any>}
   * @description 点击展开图标时触发的事件，事件详情中`expanded`为是否展开，`record`被点击的行信息
   */
  @event({ type: "row.expand" }) rowExpand: EventEmitter<{
    expanded: boolean;
    record: Record<string, any>;
  }>;

  /**
   * @detail {expandedRows:string[]| number[]}
   * @description 展开的行变化时触发的事件，事件详情为当前展开的所有行的`rowKey`集合
   */
  @event({ type: "expand.rows.change" }) expandRowsChange: EventEmitter<{
    expandedRows: React.Key[];
  }>;

  /**
   * @detail {data:Record<string,any>[]}
   * @description 表格行拖拽结束发生的事件，事件详情为拖拽后重新排序的所有行数据
   */
  @event({ type: "row.drag" }) rowDrag: EventEmitter<{
    data: Record<string, any>[];
  }>;

  /**
   * @kind CustomColumn[]
   * @required false
   * @default -
   * @description 扩展自 ant-design 的 Column 相关配置项,具体查阅：[Column](https://ant.design/components/table-cn/#Column)
   * @group basic
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set columns(value: CustomColumn[]) {
    this._columns = value;
    this._render();
  }
  get columns(): CustomColumn[] {
    return this._columns;
  }

  /**
   * @kind any
   * @required false
   * @default -
   * @description 数据源，通过 useResolves 从后台接口获取或者直接在 storyboard 中配置
   * @group basic
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set dataSource(value: Record<string, any>[]) {
    this._isInSelect = false;
    this._originalDataSource = value;
    this._dataSource = cloneDeep(
      this._fields.dataSource ? get(value, this._fields.dataSource) : value
    );
    // 前端搜索需要保留一个干净的数据
    this._pureSource = cloneDeep(this._dataSource);
    if (this.stripEmptyExpandableChildren) {
      const columnName =
        this.configProps?.expandable?.childrenColumnName || "children";
      stripEmptyExpandableChildrenByName(columnName, this._dataSource);
    }
    this._total = get(value, this._fields.total);
    this.page = get(value, "page") ?? this.page ?? 1;
    this.pageSize =
      get(value, "page_size") ?? get(value, "pageSize") ?? this.pageSize ?? 10;
    this._render();
  }

  /**
   * @kind string
   * @required false
   * @default -
   * @description 指定每一行的 key，不指定则默认为索引 index。强烈建议设置该属性，否则在某些情况下可能行为不如预期。
   * @group basic
   */
  @property()
  rowKey: string;

  /**
   * @kind (string|number)[]
   * @required false
   * @default -
   * @description 隐藏相应列（输入对应的 dataIndex 或者 key 即可）
   * @group basic
   */
  @property({
    attribute: false,
  })
  hiddenColumns: Array<string | number>;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示已选择信息和清除按钮。仅在设置了`configProps.rowSelection`时有效。默认不显示
   * @group rowSelection
   */
  @property({
    attribute: false,
  })
  showSelectInfo = false;

  // 表头过滤的 filters
  /**
   * @kind Record<string,string[]>
   * @required false
   * @default -
   * @description 表头过滤的过滤项，key 为 column 的 dataIndex，value 为过滤值集合。
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  filters: Record<string, string[]>;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示外层卡片
   * @group ui
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind object
   * @required false
   * @default -
   * @description ant-design 的 Table 相关配置项,具体查阅：[Table](https://ant.design/components/table-cn/#Table)，其中分页配置和行选择配值在构件中设置了常用的默认配置，也可自行覆盖，具体描述见下表
   * @group other
   */
  @property({
    attribute: false,
  })
  configProps: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 被排序列的 dataIndex。通常来自于 url 参数，可以设置成 ${QUERY.sort}。
   * @group paginationAndFilter
   */
  @property()
  sort: string;

  /**
   * @kind string | number
   * @required false
   * @default -
   * @description 升序/降序，可以设置成 ${QUERY.order}。
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  order: string | number;

  /**
   * @kind RowDisabledProps | RowDisabledProps[]
   * @required false
   * @default -
   * @description 配置每一行是否禁用，其中 `field` 表示数据源中的字段路径， `value` 表示与其字段比较的值， `operator` 表示两者比较的方法，结果为 `true` 时会禁用当前行, 需要注意的是该配置需要在 `rowSelection: true` 的前提下使用，并且设置 `rowKey` 属性赋予每行唯一的 key，防止顺序变化时造成的错误勾选（如上 demo 所示）
   * @group rowSelection
   */
  @property({
    attribute: false,
  })
  rowDisabledConfig: RowDisabledProps | RowDisabledProps[];

  // start -- 行展开相关属性
  /**
   * @kind {useBrick:UseBrickConf}
   * @required false
   * @default -
   * @description 自定义行展开的构件
   * @group expand
   */
  @property({
    attribute: false,
  })
  expandedRowBrick: {
    useBrick?: UseBrickConf;
  };

  /**
   * @kind { collapsedIcon: MenuIcon,expandedIcon: MenuIcon}
   * @required false
   * @default {collapsedIcon:{lib:'antd',icon:'down',theme:'outlined'},expandedIcon:{lib:'antd',icon:'right',theme:'outlined'}}
   * @description 自定义展开图标。
   * @group expand
   */
  @property({
    attribute: false,
  })
  expandIcon: {
    collapsedIcon: MenuIcon;
    expandedIcon: MenuIcon;
  };

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 展开的图标是否为一个单元格，默认显示在第一列；设置为 false 的时候，可以通过`expandIconColumnIndex`属性设置展开的图标在哪一列
   * @group expand
   */
  @property({
    attribute: false,
  })
  expandIconAsCell = true;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 展开的图标显示在哪一列，如果没有 rowSelection，默认显示在第一列，否则显示在选择框后面。当`expandIconAsCell`为 false 时，该属性生效。
   * @group expand
   */
  @property({
    type: Number,
  })
  expandIconColumnIndex: number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 通过点击行来展开子行
   * @group expand
   */
  @property({
    type: Boolean,
  })
  expandRowByClick: boolean;

  /**
   * @kind (string|number)[]
   * @required false
   * @default -
   * @description 优化渲染的列（输入对应的 dataIndex），针对配置了 useBrick 的列。当前 antd 在更新 state 的时候，会全量渲染单元格，如果确定某一列在后续操作中不需要重新渲染，例如仅作为展示的单元格，可通过该属性设置以优化性能。注意，在树形表格中，当某一列内包含展开/收起按钮，则不应该设置该列。
   * @group basic
   */
  @property({
    attribute: false,
  })
  optimizedColumns: Array<string | number>;

  /**
   * @default -
   * @required false
   * @description 设置容器空状态时显示`empty`构件属性
   * @group ui
   */
  @property({ attribute: false })
  wrapperConfig: BrickWrapperConfig = {};

  /**
   * @required false
   * @default false
   * @description 树形数据展示时是否需要去除空数组
   * @group expand
   */
  @property({
    attribute: false,
  })
  stripEmptyExpandableChildren = false;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 初始时，是否展开所有行
   * @group expand
   */
  @property({
    type: Boolean,
  })
  defaultExpandAllRows: boolean;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 展开的行的 rowKey
   * @group expand
   */
  @property({
    attribute: false,
  })
  expandedRowKeys: string[];

  // end -- 行展开相关属性

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 表格树形数据展示的时候，行选择父节点的时候是否同步勾选/取消勾选所有子节点，并且被同步勾选的子节点不能单独取消。注意，该属性必须设置 `rowKey` 属性。
   * @group expand
   */
  @property({
    type: Boolean,
  })
  selectAllChildren: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否默认选择所有行。注意，该属性必须设置 `rowKey` 属性。
   * @group expand
   */
  @property({
    type: Boolean,
  })
  defaultSelectAll: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示省略信息
   * @group basic
   */
  @property({ type: Boolean })
  ellipsisInfo: boolean;

  private _disabledChildrenKeys: React.Key[] = [];

  /**
   * @kind string
   * @required false
   * @default children
   * @description 指定树形结构的列名
   * @group expand
   */
  @property({
    attribute: false,
  })
  childrenColumnName = "children";

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否支持排序。默认开启，当对应列的sorter设置成true时则可排序。sortable为false时则排序都不生效。
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  sortable = true;

  /**
   * @kind object
   * @required false
   * @default -
   * @description 设置相关字段取自哪里，具体描述见下表
   * @group basic
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set fields(value: any) {
    this._fields = { ...this._fields, ...value };
    this._render();
  }

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否前端进行搜索，配合`presentational-bricks.brick-input`使用
   * @group paginationAndFilter
   */
  @property({
    type: Boolean,
  })
  frontSearch: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 前端搜索参数
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  frontSearchQuery = "";

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否精确搜索
   * @group paginationAndFilter
   */
  @property({
    type: Boolean,
  })
  exactSearch: boolean;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 进行前端搜索的字段，支持嵌套的写法如["name","value.a"]，不配置的时候默认为对所有 columns 的 dataIndex[]进行前端搜索
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  frontSearchFilterKeys: string[];

  /**
   * @kind number
   * @required false
   * @default -
   * @description 页码。后台搜索的时候一般不需要配置，列表接口返回格式通常为{list:[],page:1,pageSize:10,total:20}，即默认取自 page；前台搜索的时候，一般配置成 "${query.page=1|number}"
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  page: number;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 页码条数。后台搜索的时候一般不需要配置，列表接口返回格式通常为{list:[],page:1,pageSize:10,total:20}，即默认取自 pageSize/page_size；前台搜索的时候，一般配置成 "${query.pageSize=10|number}"
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  pageSize: number;

  /**
   * @kind {
   *   x?: string | number | true;
   *   y?: number | string;
   * } & {
   *   scrollToFirstRowOnChange?: boolean;
   * }
   * @required false
   * @default { x: true }
   * @description 表格是否可滚动，也可以指定滚动区域的宽、高，配置项。详见 [scroll](https://ant.design/components/table-cn/#scroll)
   * @group other
   */
  @property({
    attribute: false,
  })
  scrollConfigs: TableProps<unknown>["scroll"] = { x: true };

  /**
   * @kind string
   * @required false
   * @default "q"
   * @description 把过滤条件更新到 url 时的字段名
   * @group paginationAndFilter
   */
  @property({ attribute: false })
  qField = "q";

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 表格行是否可拖拽，注意，树形数据的表格不支持该功能
   * @group basic
   */
  @property({
    type: Boolean,
  })
  tableDraggable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否展示斑马纹
   * @group ui
   */
  @property({
    type: Boolean,
  })
  zebraPattern: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 翻页时是否记住之前选中的项。注意，选中项的rowKey将保存在url中，如果不设置rowKey，该设置不生效。如果选择太多可能会造成url过长，请谨慎使用
   * @group other
   */
  @property({ type: Boolean })
  storeCheckedByUrl: boolean;

  /**
   * @kind Record<string, unknown>[]
   * @required false
   * @default -
   * @description 额外的行，通常为跨页勾选时，不在当前页的行
   * @group advanced
   */
  @property({ attribute: false })
  extraRows: Record<string, unknown>[] = [];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description [已废弃]请用 tableDraggable 代替
   * @group other
   */
  @property({
    __deprecated_and_for_compatibility_only: true,
  })
  draggable: boolean;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 当所有子节点选中时，自动选中父节点
   * @group expand
   */
  @property({ type: Boolean })
  autoSelectParentWhenAllChildrenSelected: boolean;

  /**
   * @kind boolean
   * @required -
   * @default -
   * @description 表格表头是否透明
   * @group ui
   */
  @property({ attribute: false })
  thTransparent: boolean;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示表头
   * @group ui
   */
  @property({
    attribute: false,
  })
  showHeader = true;

  /**
   * @kind false | TablePaginationConfig
   * @required false
   * @default -
   * @description 是否显示分页
   * @group paginationAndFilter
   */
  @property({
    attribute: false,
  })
  pagination: false | TablePaginationConfig;

  /**
   * @kind SizeType
   * @required false
   * @default -
   * @description 表格大小（antd原生size）
   * @group ui
   */
  @property({
    attribute: false,
  })
  size: SizeType;

  /**
   * @kind RowSelectionType
   * @required false
   * @default -
   * @description 选框类型（单选/多选）
   * @group rowSelection
   */
  @property({
    attribute: false,
  })
  type: RowSelectionType;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否更新 url 参数。设置为否之后，如果是后台进行分页/排序等功能，则需要结合事件进行编排。如果是前台进行分页/排序，则不需要。
   * @group other
   */
  @property({
    attribute: false,
  })
  shouldUpdateUrlParams = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 更新 url 参数时是否触发页面重新渲染。仅在`shouldUpdateUrlParams`为true时有效。
   * @group other
   */
  @property({
    attribute: false,
  })
  shouldRenderWhenUrlParamsUpdate = true;

  // 对外获取内部 _dataSource 的值
  // istanbul ignore next
  get processedDataSource() {
    return this._dataSource;
  }

  // 对外获取内部 _finalConfigProps 的值
  // istanbul ignore next
  get processConfigProps() {
    return this._finalConfigProps;
  }

  // 对外获取内部 _columns 的值
  // istanbul ignore next
  get processedColumns() {
    return this.getModifyColumns();
  }

  private _originalDataSource: Record<string, any>[];
  private _dataSource: Record<string, any>[];
  private _pureSource: Record<string, any>[];
  private _columns: CustomColumn[];
  private _finalConfigProps: any = {}; //处理过的配置，主要处理分页和rowSelect
  private _error: any;

  private _total: number;

  private _selectUpdateEventName = "";
  private _selectUpdateEventDetailKeys: string[] = [];
  private _selectUpdateEventDetailField = "";
  private _selectUpdateEventDetailExtra: any = {};

  private _fields: {
    dataSource?: string; // 指定 dataSource 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 list
    total?: string; // 指定 total 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 total
    rowKey?: string | number; // 指定每一行的 key，不指定则默认为 index
    page?: string; // 指定请求后台 page 参数 path
    pageSize?: string; // 指定请求后台 pageSize 参数 path
    ascend?: string | number; // 指定 ascend 排序对应字段，例如有些后台对应为 1 ，有些对应为 "asc"。这里默认为 "ascend"。
    descend?: string | number; // 指定 descend 排序对应字段，例如有些后台对应为 0 ，有些对应为 "desc"。这里默认为 "descend"。
  } = {
    page: "page",
    pageSize: "pageSize",
    dataSource: "list",
    total: "total",
    ascend: "ascend",
    descend: "descend",
  };

  /**
   * @default []
   * @required false
   * @description 指定选中项的 key 数组
   * @group rowSelection
   */
  @property({
    attribute: false,
  })
  selectedRowKeys: React.Key[] = [];

  private _selected = false;
  private _selectedRow: Record<string, unknown>;
  private _selectedRows: Record<string, any>[] = [];
  private _allChildren: Record<string, any>[] = [];
  private _isInSelect = false;
  connectedCallback(): void {
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  /**
   * @description 搜索过滤
   */
  @method()
  filterSourceData(event: CustomEvent): void {
    const q = this.exactSearch
      ? event.detail.q.trim()
      : event.detail.q.trim().toLowerCase();
    if (this.shouldUpdateUrlParams) {
      const history = getHistory();
      const urlSearchParams = new URLSearchParams(history.location.search);
      urlSearchParams.set("page", "1");
      if (q) {
        urlSearchParams.set(this.qField, q);
        history.push(`?${urlSearchParams}`, { notify: !this.frontSearch });
      } else {
        urlSearchParams.delete(this.qField);
        history.push(`?${urlSearchParams}`, { notify: !this.frontSearch });
      }
      this.page = 1;
    }
    this.frontSearchQuery = q;
  }

  handleFrontendDataChange(
    data: Record<string, any>[] = [],
    columns: CustomColumn[] = []
  ): Record<string, any>[] {
    if (this.shouldUpdateUrlParams) {
      const history = getHistory();
      const urlSearchParams = new URLSearchParams(history.location.search);
      this.frontSearchQuery = urlSearchParams.get(this.qField);
    }
    let tempDataSource: Record<string, any>[] = [];
    tempDataSource = this.handleFrontendFilterSource(
      data,
      this.frontSearchQuery || "",
      columns
    );
    const order = isNil(this.order)
      ? null
      : this._fields.ascend === this.order
      ? "ascend"
      : "descend";
    tempDataSource = this.handleFrontendSorter(tempDataSource, {
      columnKey: this.sort,
      order,
    });
    tempDataSource = this.handleFrontendFilters(tempDataSource);
    this._total = tempDataSource.length;
    return tempDataSource;
  }

  // 前端过滤
  handleFrontendFilterSource(
    data: Record<string, any>[],
    q: string,
    columns: CustomColumn[],
    filterKeys?: DataIndex[]
  ): Record<string, any>[] {
    if (!q) {
      return data;
    }

    const dataSource: Record<string, any>[] = [];

    if (!filterKeys) {
      filterKeys =
        this.frontSearchFilterKeys || columns.map((column) => column.dataIndex);
    }

    data.forEach((item) => {
      const children = item[this.childrenColumnName];

      if (children) {
        const filteredChildren = this.handleFrontendFilterSource(
          children,
          q,
          columns,
          filterKeys
        );

        if (filteredChildren.length > 0) {
          dataSource.push({
            ...item,
            [this.childrenColumnName]: filteredChildren,
          });
          return;
        }
      }

      const valid = filterKeys.some((key) => {
        const value = get(item, key);
        if (isNil(value)) {
          return false;
        }
        if (this.exactSearch) {
          return value === q;
        }
        return JSON.stringify(value).toLowerCase().includes(q);
      });

      if (valid) {
        dataSource.push(item);
      }
    });
    return dataSource;
  }

  private _findParentByChildKeyValue = (
    value: string,
    rowKey: string,
    list: Record<string, unknown>[],
    parent?: Record<string, unknown>
  ): Record<string, unknown> => {
    let matchedParent: Record<string, unknown>;

    list.some((item) => {
      if (item[rowKey] === value) {
        matchedParent = parent;
      } else {
        const children = item[this.childrenColumnName] as Record<
          string,
          unknown
        >[];

        if (children) {
          matchedParent = this._findParentByChildKeyValue(
            value,
            rowKey,
            children,
            item
          );
        }
      }

      return matchedParent ? true : false;
    });

    return matchedParent;
  };

  // istanbul ignore next
  private _handleRowSelectChange = (
    selectedRowKeys: string[],
    selectedRows: any[]
  ): void => {
    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    const rowKeyRowMap = keyBy(selectedRows, rowKey);
    if (this._selected) {
      const _selectedRowKeys = [...selectedRowKeys];
      this._allChildren.forEach((child) => {
        const rowKeyValue = child[rowKey];
        _selectedRowKeys.push(rowKeyValue);
        rowKeyRowMap[rowKeyValue] = child;
      });
      if (this.autoSelectParentWhenAllChildrenSelected && this._selectedRow) {
        const selectedRowKeySet = new Set(selectedRowKeys);
        const parent = this._findParentByChildKeyValue(
          this._selectedRow[rowKey] as string,
          rowKey,
          this._dataSource
        );

        if (
          parent &&
          (parent[this.childrenColumnName] as Record<string, unknown>[]).every(
            (item) => selectedRowKeySet.has(item[rowKey] as string)
          )
        ) {
          const rowKeyValue = parent[rowKey] as string;
          _selectedRowKeys.push(rowKeyValue);
          rowKeyRowMap[rowKeyValue] = parent;
        }
      }
      this.selectedRowKeys = uniq(_selectedRowKeys);
    } else {
      let parent: Record<string, unknown>;

      if (this.autoSelectParentWhenAllChildrenSelected && this._selectedRow) {
        parent = this._findParentByChildKeyValue(
          this._selectedRow[rowKey] as string,
          rowKey,
          this._dataSource
        );
      }
      this.selectedRowKeys = pullAll(
        selectedRowKeys,
        map(this._allChildren.concat(parent), rowKey)
      );
    }
    this._selectedRow = undefined;
    const extraRowKeyRowMap = keyBy(this.extraRows, rowKey);
    this._selectedRows = this.selectedRowKeys.map(
      (key) => rowKeyRowMap[key] || extraRowKeyRowMap[key]
    );

    let detail = null;
    const data = isEmpty(this._selectUpdateEventDetailField)
      ? this._selectedRows
      : map(this._selectedRows, (row) =>
          get(row, this._selectUpdateEventDetailField)
        );
    detail =
      isEmpty(this._selectUpdateEventDetailKeys) || isEmpty(data)
        ? data
        : set({}, this._selectUpdateEventDetailKeys, data);
    if (!isEmpty(detail)) {
      detail = merge(detail, this._selectUpdateEventDetailExtra);
    }
    if (!this._selectUpdateEventName) {
      this.selectUpdate.emit(detail);
    } else {
      this.dispatchEvent(
        new CustomEvent(this._selectUpdateEventName, { detail })
      );
    }
  };

  // istanbul ignore next
  private _getSelectedRowsWithChildren = (
    row: Record<string, any>
  ): Record<string, any>[] => {
    const result: Record<string, any>[] = [];
    if (
      !isEmpty(row[this.childrenColumnName]) &&
      isArray(row[this.childrenColumnName])
    ) {
      forEach(row[this.childrenColumnName], (item) => {
        result.push(item);
        result.push(...this._getSelectedRowsWithChildren(item));
      });
    }
    return result;
  };

  // istanbul ignore next
  private _handleOnSelect = (
    row: Record<string, any>,
    checked: boolean,
    selectedRows: Record<string, any>[]
  ): void => {
    this._selected = checked;
    this._selectedRow = row;
    this._isInSelect = true;
    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    const allChildren = this.selectAllChildren
      ? this._getSelectedRowsWithChildren(row)
      : [];

    this._allChildren = allChildren;
    if (!this.autoSelectParentWhenAllChildrenSelected) {
      if (checked) {
        this._disabledChildrenKeys = uniq([
          ...this._disabledChildrenKeys,
          ...map(allChildren, rowKey),
        ]);
      } else {
        this._disabledChildrenKeys = pullAll(this._disabledChildrenKeys, [
          ...map(allChildren, rowKey),
        ]);
      }
    }
    if (this.storeCheckedByUrl && !!rowKey) {
      this._updateUrlChecked([row[rowKey]], checked);
    }
  };

  // istanbul ignore next
  private _handleSelectAll = (
    selected: boolean,
    selectedRows: Record<string, any>[],
    changeRows: Record<string, any>[]
  ): void => {
    this._selected = selected;
    this._isInSelect = true;
    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    if (this.selectAllChildren) {
      const allParentKeys = map(this._dataSource, rowKey);
      const changedParentRows = changeRows.filter((v) =>
        allParentKeys.includes(v[rowKey])
      );
      const toChangedChildrenKeys = flatten(
        map(changedParentRows, (r) =>
          map(this._getSelectedRowsWithChildren(r), (cr) => cr[rowKey])
        )
      );
      const allChildren = flatten(
        map(changedParentRows, (r) =>
          map(this._getSelectedRowsWithChildren(r), (cr) => cr)
        )
      );
      this._allChildren = allChildren;

      if (!this.autoSelectParentWhenAllChildrenSelected) {
        if (selected) {
          this._disabledChildrenKeys = uniq(
            this._disabledChildrenKeys.concat(toChangedChildrenKeys)
          );
        } else {
          // disabled children in changeRows should be removed
          this._disabledChildrenKeys = this._disabledChildrenKeys.filter(
            (v) => !toChangedChildrenKeys.includes(v)
          );
        }
      }
    }
    if (this.storeCheckedByUrl && !!rowKey) {
      this._updateUrlChecked(map(changeRows, rowKey), selected);
    }
  };

  private _getCheckedFromUrl = () => {
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    const checked = urlSearchParams.get("checked");
    return isEmpty(checked) ? [] : checked.split(",");
  };

  private _updateUrlChecked = (options: any[], checked) => {
    const history = getHistory();
    let checkedOptions: string[] = this._getCheckedFromUrl();
    if (checked) {
      checkedOptions = [...checkedOptions, ...options];
    } else {
      pull(checkedOptions, ...options);
    }
    if (this.shouldUpdateUrlParams) {
      history.pushQuery(
        { checked: checkedOptions.join(",") },
        { notify: false }
      );
    }
  };
  private _handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, string[]>,
    sorter: SorterResult<Record<string, any>>
  ): void => {
    const history = getHistory();
    const urlSearchParams = new URLSearchParams(history.location.search);
    // 分页
    if (!isEmpty(pagination)) {
      if (pagination.pageSize !== this.pageSize) {
        pagination.current = 1;
        urlSearchParams.set("page", "1");
        urlSearchParams.set("pageSize", pagination.pageSize.toString());
        this.filterUpdate.emit({
          [this._fields.pageSize]: pagination.pageSize,
          [this._fields.page]: 1,
        });
        this.page = 1;
        this.pageSize = pagination.pageSize;
      } else if (pagination.current !== this.page) {
        const newPage = pagination.current || 1;
        urlSearchParams.set("page", newPage.toString());
        this.pageUpdate.emit({
          [this._fields.page]: newPage, // 可配置的 path
        });
        this.page = newPage;
      }
    }
    this.filters = filters;
    // 过滤
    if (!isEmpty(filters)) {
      forEach(filters, (value: any, key) => {
        isNil(value) || value.length === 0
          ? urlSearchParams.delete(key)
          : urlSearchParams.set(key, value);
      });
    }
    // 排序
    if (
      sorter.columnKey !== this.sort ||
      this._fields[sorter.order] !== this.order
    ) {
      if (sorter.columnKey && sorter.order) {
        urlSearchParams.set("sort", sorter.columnKey as string);
        urlSearchParams.set("order", this._fields[sorter.order].toString());
        this.sort = sorter.columnKey as string;
        this.order = this._fields[sorter.order];
      } else {
        urlSearchParams.delete("sort");
        urlSearchParams.delete("order");
        this.sort = null;
        this.order = null;
      }
      this.sortUpdate.emit({
        sort: this.sort,
        order: this.order,
      });
    }
    if (this.frontSearch) {
      if (this.shouldUpdateUrlParams) {
        history.push(`?${urlSearchParams}`, { notify: false });
      }
      this.frontendSearch(pagination, filters, sorter);
    } else {
      if (this.shouldUpdateUrlParams) {
        history.push(`?${urlSearchParams}`, {
          notify: !!this.shouldRenderWhenUrlParamsUpdate,
        });
      }
    }
  };

  // istanbul ignore next
  private renderSelectInfo = () => {
    // eslint-disable-next-line react/display-name
    return (
      <span style={{ marginLeft: 20 }}>
        <span>
          {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.CHOSEN_OPTIONS}`, {
            count: this.selectedRowKeys.length,
          })}
        </span>
        <a
          role="button"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            this.selectedRowKeys = [];
            this._selectedRows = [];
            this._disabledChildrenKeys = [];
            this._allChildren = [];
            if (!this._selectUpdateEventName) {
              this.selectUpdate.emit([]);
            } else {
              this.dispatchEvent(
                new CustomEvent(this._selectUpdateEventName, { detail: [] })
              );
            }
          }}
        >
          {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.CLEAR}`)}
        </a>
      </span>
    );
  };

  // 对前端搜索数据进行排序
  private handleFrontendSorter(
    dataSource: Record<string, any>[],
    sorter: Partial<SorterResult<Record<string, any>>>
  ): Record<string, any>[] {
    const tempDataSource: Record<string, any>[] = dataSource || [];
    const { columnKey, order } = sorter;

    if (!columnKey || !order) {
      return dataSource;
    }

    let direction: 1 | -1;

    if (order === "descend") {
      direction = -1;
    } else if (order === "ascend") {
      direction = 1;
    }

    if (direction !== undefined) {
      tempDataSource.sort((a, b) => {
        const aValue = get(a, columnKey);
        const bValue = get(b, columnKey);

        if (isNil(aValue)) {
          if (!isNil(bValue)) {
            return 1;
          }
        } else {
          if (isNil(bValue)) {
            return -1;
          }
        }

        if (aValue == bValue) {
          return 0;
        }

        if (aValue > bValue) {
          return direction;
        }

        return -direction;
      });
      tempDataSource.forEach((item) => {
        const children = item[this.childrenColumnName];

        if (children) {
          this.handleFrontendSorter(children, sorter);
        }
      });
    }

    return tempDataSource;
  }

  // 对前端搜索数据进行表头筛选项过滤
  private handleFrontendFilters(
    dataSource: Record<string, any>[]
  ): Record<string, any>[] {
    let tempDataSource: Record<string, any>[] = dataSource || [];
    const filtersArray = map(this.filters, (item, k) => ({
      key: k,
      value: item,
    })).filter((item) => !isNil(item.value) && item.value.length !== 0);
    tempDataSource = tempDataSource.filter((item) => {
      return every(filtersArray, (filter) => {
        return filter.value?.includes(get(item, filter.key)) ?? true;
      });
    });
    return tempDataSource;
  }

  // istanbul ignore next
  private frontendSearch(
    pagination: TablePaginationConfig,
    filters: Record<string, string[]>,
    sorter: SorterResult<Record<string, any>>
  ): void {
    this.sort = isNil(sorter.order) ? null : (sorter.columnKey as string);
    this.order = isNil(sorter.order) ? null : this._fields[sorter.order];
  }

  // 点击展开图标时触发的事件
  // istanbul ignore next
  private _handleOnExpand = (
    expanded: boolean,
    record: Record<string, any>
  ): void => {
    if (this.expandedRowKeys) {
      const rowKey =
        this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
      const pullKeys: string[] = [get(record, rowKey)];
      const recordChildren = get(record, this.childrenColumnName);
      if (!isEmpty(recordChildren)) {
        const keysToPull = map(
          filter(recordChildren, (c) =>
            isEmpty(get(c, this.childrenColumnName))
          ),
          rowKey
        );
        pullKeys.push(...keysToPull);
      }
      this.expandedRowKeys = expanded
        ? [...this.expandedRowKeys, ...pullKeys]
        : pull(this.expandedRowKeys, ...pullKeys);
      this._render();
    }
    this.rowExpand.emit({
      expanded,
      record,
    });
  };

  // 展开的行变化时触发的事件
  // istanbul ignore next
  private _handleOnExpandedRowsChange = (expandedRows: React.Key[]): void => {
    this.expandRowsChange.emit({
      expandedRows,
    });
  };

  // 拖拽排序后触发的事件
  // istanbul ignore next
  private _handleOnDrag = (data: Record<string, any>[]): void => {
    this.rowDrag.emit({
      data,
    });
  };

  /**
   * @description 展开所有行
   */
  @method()
  expandAll() {
    const allKeys: string[] = [];
    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    getKeysOfData(this._dataSource, rowKey, this.childrenColumnName, allKeys);
    this.expandedRowKeys = allKeys;
  }

  getModifyColumns(): CustomColumn[] {
    let columns = this._columns;
    if (this._columns && this.hiddenColumns) {
      columns = this._columns.filter((column) => {
        return !this.hiddenColumns.includes(
          (column.dataIndex as string) ?? column.key
        );
      });
    }
    if (this.sortable === false) {
      columns = map(columns, (column) => {
        column.sorter = false;
        return column;
      });
    }
    return columns;
  }

  protected _render(): void {
    if (this.isConnected) {
      if (this.draggable) {
        // eslint-disable-next-line no-console
        console.warn(
          "`draggable` of `<presentational-bricks.brick-table>` is deprecated, use `tableDraggable` instead."
        );
      }
      // 前端搜索的参数处理
      if (this.frontSearch) {
        this._dataSource = this.handleFrontendDataChange(
          this._pureSource,
          this._columns
        );
      }

      this._initConfigProps();
      ReactDOM.render(
        <BrickWrapper wrapperConfig={this.wrapperConfig}>
          <BrickTable
            dataSource={this._dataSource}
            columns={this.getModifyColumns()}
            configProps={this._finalConfigProps}
            error={this._error}
            onChange={this._handleOnChange}
            showCard={this.showCard}
            showHeader={this.showHeader}
            expandedRowBrick={this.expandedRowBrick}
            expandIconAsCell={this.expandIconAsCell}
            expandIconColumnIndex={this.expandIconColumnIndex}
            expandRowByClick={this.expandRowByClick}
            defaultExpandAllRows={this.defaultExpandAllRows}
            onExpand={this._handleOnExpand}
            onExpandedRowsChange={this._handleOnExpandedRowsChange}
            expandedRowKeys={this.expandedRowKeys}
            rowKey={this.rowKey ?? (this._fields.rowKey as string)}
            childrenColumnName={this.childrenColumnName}
            tableDraggable={this.tableDraggable || this.draggable}
            onDrag={this._handleOnDrag}
            zebraPattern={this.zebraPattern}
            expandIcon={this.expandIcon}
            scroll={this.scrollConfigs}
            optimizedColumns={this.optimizedColumns}
            ellipsisInfo={this.ellipsisInfo}
            thTransparent={this.thTransparent}
          />
        </BrickWrapper>,
        this
      );
    }
  }

  // istanbul ignore next
  private _getAllRows = (): Record<string, any>[] => {
    const allRows: Record<string, any>[] = [];
    getRowsOfData(this._dataSource, this.childrenColumnName, allRows);
    return allRows;
  };

  // istanbul ignore next
  private _handleDefaultSelectAll = () => {
    this._isInSelect = true;
    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    this._selectedRows = this._getAllRows();
    this.selectedRowKeys = map(this._selectedRows, rowKey);
    return this.selectedRowKeys;
  };

  private _initConfigProps = () => {
    // 默认分页配置
    const defaultPagination: TablePaginationConfig = {
      current: this.page,
      pageSize: this.pageSize,
      total: this._total,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "50"],
      // eslint-disable-next-line react/display-name
      showTotal: (totals) => (
        <>
          <span className={paginationStyle.totalText}>
            {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.PAGINATION_TOTAL_TEXT}`)}{" "}
            <strong className={paginationStyle.total}>{totals}</strong>{" "}
            {i18n.t(`${NS_PRESENTATIONAL_BRICKS}:${K.PAGINATION_TOTAL_UNIT}`)}
          </span>
          {this.configProps?.rowSelection &&
            this.showSelectInfo &&
            this.selectedRowKeys.length !== 0 &&
            this.renderSelectInfo()}
        </>
      ),
    };

    const rowKey =
      this.rowKey ?? this._fields.rowKey ?? this.configProps?.rowKey;
    let rowDisabledConfig: RowDisabledProps[];

    if (this.rowDisabledConfig) {
      rowDisabledConfig = Array.isArray(this.rowDisabledConfig)
        ? this.rowDisabledConfig
        : [this.rowDisabledConfig];
    }

    // 当 rowSelection 为 true 或者有相关配置的时候的默认行选择配置
    const defaultRowSelection: TableRowSelection<any> = {
      ...(rowKey
        ? {
            selectedRowKeys: this._isInSelect
              ? this.selectedRowKeys
              : this.storeCheckedByUrl
              ? this._getCheckedFromUrl()
              : this.defaultSelectAll
              ? this._handleDefaultSelectAll()
              : this.selectedRowKeys,
            onSelect: this._handleOnSelect,
            onSelectAll: this._handleSelectAll,
            onChange: this._handleRowSelectChange,
            preserveSelectedRowKeys: true,
          }
        : {
            // 当用户没有设置rowKey时的兼容处理
            onChange: this._handleRowSelectChange,
            preserveSelectedRowKeys: true,
          }),
      getCheckboxProps: (record: any) => {
        if (
          !isEmpty(this._disabledChildrenKeys) &&
          this._disabledChildrenKeys.includes(get(record, rowKey))
        ) {
          return {
            disabled: true,
          };
        }
        if (!rowDisabledConfig) return {};

        return {
          disabled: rowDisabledConfig.some((config) => {
            const { field, value, operator } = config;
            const fun = compareFunMap[operator];

            return fun?.(value, get(record, field));
          }),
        };
      },
    };
    if (this.configProps) {
      this._finalConfigProps = cloneDeep(this.configProps);
      if (this.configProps.pagination !== false) {
        this._finalConfigProps.pagination = {
          ...defaultPagination,
          ...this.pagination,
          ...this.configProps.pagination,
        };
        if (
          (this.configProps.pagination === undefined ||
            this.configProps.pagination === null) &&
          this.pagination === false
        ) {
          this._finalConfigProps.pagination = false;
        }
      }
      if (!this.configProps.size) {
        this._finalConfigProps.size = this.size;
      }
      if (this.configProps.rowSelection) {
        if (this.configProps.rowSelection === true) {
          this._finalConfigProps.rowSelection = {
            ...defaultRowSelection,
            type: this.type ?? "checkbox",
          };
        } else {
          this._finalConfigProps.rowSelection = {
            ...defaultRowSelection,
            type: this.type ?? "checkbox",
            ...this.configProps.rowSelection,
            ...(defaultRowSelection.selectedRowKeys
              ? { selectedRowKeys: defaultRowSelection.selectedRowKeys }
              : {}),
          };
        }
      } else {
        if (this.type) {
          this._finalConfigProps.rowSelection = {
            ...defaultRowSelection,
            type: this.type,
          };
        }
      }
    } else {
      this._finalConfigProps = {};
      this._finalConfigProps.pagination =
        this.pagination !== false ? defaultPagination : false;
      this._finalConfigProps.size = this.size;
      this._finalConfigProps.rowSelection = this.type && {
        ...defaultRowSelection,
        type: this.type,
      };
    }

    // 初始化列排序
    if (this._columns) {
      this._columns = this._columns.map((item) => {
        if (isNil(item.key)) {
          item.key = item.dataIndex as string;
        }
        if (item.sorter) {
          item.sortOrder = (this.sort === item.key &&
            !isNil(this.order) &&
            (this._fields.ascend === this.order
              ? "ascend"
              : "descend")) as SortOrder;
        }
        // 初始化表头过滤值
        if (item.filters) {
          const history = getHistory();
          const urlSearchParams = new URLSearchParams(history.location.search);
          const filteredValue =
            urlSearchParams.get(item.key as string) ??
            get(this.filters, item.key)?.join(",");
          if (!isNil(filteredValue) && !isEmpty(filteredValue)) {
            item.filtered = true;
            item.filteredValue = filteredValue
              .split(",")
              .map(
                (v) =>
                  find(item.filters, (f) => String(f.value) === v)?.value ?? v
              );
          } else {
            item.filtered = false;
            item.filteredValue = [];
          }
        }
        return item;
      });
    }
  };

  _test_only_getOriginalDataSource(): Record<string, any>[] {
    return this._originalDataSource;
  }

  updateData(event: CustomEvent): void {
    this._dataSource = event.detail;
    this._error = null;
    this._render();
  }

  updateError(event: CustomEvent): void {
    this._error = event.detail;
    this._render();
  }

  set selectUpdateEventName(value: string) {
    this._selectUpdateEventName = value;
  }

  set selectUpdateEventDetailKeys(value: string[]) {
    this._selectUpdateEventDetailKeys = value;
  }

  set selectUpdateEventDetailField(value: string) {
    this._selectUpdateEventDetailField = value;
  }

  set selectUpdateEventDetailExtra(value: any) {
    this._selectUpdateEventDetailExtra = value;
  }
}

customElements.define("presentational-bricks.brick-table", BrickTableElement);
