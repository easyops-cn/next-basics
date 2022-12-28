import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  event,
  EventEmitter,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { RankTable } from "./RankTable";
import { ColumnProps, TablePaginationConfig, TableProps } from "antd/lib/table";
import { cloneDeep, get, isNil, map } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";
import { SorterResult, SortOrder } from "antd/lib/table/interface";

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

export type UseBrick = {
  useBrick?: UseBrickConf;
};

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
/**
 * @id presentational-bricks.rank-table
 * @author alexchen
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.rank-table`
 * @docKind brick
 * @noInheritDoc
 * @memo
 * ## dataSource 表格数据源
 * | property      | type           | required | default | description                                        |
 * | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
 * | dataSource            | any                                                                              | -        | -        | 数据源，通过 useResolves 从后台接口获取或者直接在 storyboard 中配置           |
 *
 * ## columns 表格列配置
 * | property      | type           | required | default | description                                        |
 * | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
 * | columns               | CustomColumn[]      | -        | -        | 扩展自 ant-design 的 Column 相关配置项,具体查阅：[https://ant.design/components/table-cn/#Column](https://ant.design/components/table-cn/#Column)                                                                                                                         |
 *
 * ### CustomColumn
 * | property             | type                  | required | default | description                                                    |
 * | -------------------- | --------------------- | -------- | ------- | -------------------------------------------------------------- |
 * | valueSuffix          | string                | -        | -       | 字段的值展示时的后缀                                           |
 * | useBrick             | UseBrickConf          | -        | -       | 支持为某列自定义展示构件                                       |
 * | titleUseBrick        | UseBrickConf          | -        | -       | 支持为某列的标题自定义展示构件，可通过 DATA.title 获取标题文本 |
 * | verticalAlign | `top` &#124; `bottom` | - | - | 单元格内元素的垂直对齐方式 |
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
 */
export class RankTableElement extends UpdatingElement {
  private _dataSource: Record<string, any>[];
  private _columns: CustomColumn[];

  /**
   * @kind Header
   * @required false
   * @default -
   * @description 表格表头，如不填将不会显示表头
   */
  @property({
    attribute: false,
  })
  header: Header;
  /**
   * @kind CustomColumn[]
   * @required false
   * @default -
   * @description 扩展自 ant-design 的 Column 相关配置项,具体查阅：<a href="https://ant.design/components/table-cn/#Column" target="_blank">https://ant.design/components/table-cn/#Column</a>
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

  private _fields: {
    dataSource?: string; // 指定 dataSource 从哪里来，默认为列表接口返回格式是{list:[],page:1,pageSize:10,total:20}，即默认取自 list
  } = {
    dataSource: "list",
  };

  /**
   * @kind any
   * @required false
   * @default -
   * @description 数据源，通过 useResolves 从后台接口获取或者直接在 storyboard 中配置
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set dataSource(value: Record<string, any>[]) {
    this._dataSource = cloneDeep(
      this._fields.dataSource ? get(value, this._fields.dataSource) : value
    );
    this._render();
  }

  /**
   * @kind object
   * @required false
   * @default -
   * @description ant-design 的 Table 相关配置项,具体查阅：[https://ant.design/components/table-cn/#Table](https://ant.design/components/table-cn/#Table)，其中分页配置和行选择配值在构件中设置了常用的默认配置，也可自行覆盖，具体描述见下表
   * @group advanced
   */
  @property({
    attribute: false,
  })
  configProps: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 指定每一行的 key，不指定则默认为索引 index。强烈建议设置该属性，否则在某些情况下可能行为不如预期。
   */
  @property()
  rowKey: string;

  /**
   * @kind {
   *   x?: string | number | true;
   *   y?: number | string;
   * } & {
   *   scrollToFirstRowOnChange?: boolean;
   * }
   * @required false
   * @default { x: true }
   * @description 表格是否可滚动，也可以指定滚动区域的宽、高，配置项。详见 https://ant.design/components/table-cn/#scroll
   * @group advanced
   */
  @property({
    attribute: false,
  })
  scrollConfigs: TableProps<unknown>["scroll"] = { x: true };

  /**
   * @kind Header
   * @required false
   * @default -
   * @description 表格头部左边内容显示区域,如果设置了`header`，会覆盖设置其`title`参数
   */
  @property({
    attribute: false,
    __unstable_doNotDecorate: true,
  })
  set headerTitle(
    title:
      | string
      | {
          useBrick?: UseBrickConf;
        }
  ) {
    this.header = { ...this.header, title: title };
  }

  /**
   * @kind (string|number)[]
   * @required false
   * @default -
   * @description 隐藏相应列（输入对应的 dataIndex 或者 key 即可）
   */
  @property({
    attribute: false,
  })
  hiddenColumns: Array<string | number>;

  connectedCallback(): void {
    // Don't override user's style settings.
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
   * @kind boolean
   * @required false
   * @default true
   * @description 是否显示外层卡片
   */
  @property({
    attribute: false,
  })
  showCard = true;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否展示表头
   */
  @property({
    attribute: false,
  })
  showHeader = true;

  /**
   * @kind "default"|"small"
   * @required false
   * @default default
   * @enums "default"|"small"
   * @description 根据容器的不同调整样式
   */
  @property({ attribute: false })
  size: "default" | "small" = "default";

  /**
   * @detail {sort:string;order:string|number}
   * @description 排序变化，detail 中的 sort 为对应排序列的 key/dataIndex，order 为升序/降序
   */
  @event({ type: "sort.update", cancelable: true }) sortUpdate: EventEmitter<{
    sort: string;
    order: string | number;
  }>;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否支持排序。默认开启，当对应列的sorter设置成true时则可排序。sortable为false时则排序都不生效。
   */
  @property({
    attribute: false,
  })
  sortable = true;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 被排序列的 dataIndex。通常来自于 url 参数，可以设置成 ${QUERY.sort}。
   */
  @property()
  sort: string;

  /**
   * @kind  descend' | 'ascend' | null
   * @required false
   * @default -
   * @description 升序/降序，可以设置成 ${QUERY.order}。
   */
  @property({
    attribute: false,
  })
  order: SortOrder;

  private _handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, string[]>,
    sorter: SorterResult<Record<string, any>>
  ): void => {
    // 排序
    if (sorter.columnKey !== this.sort || sorter.order !== this.order) {
      if (sorter.columnKey && sorter.order) {
        this.sort = sorter.columnKey as string;
        this.order = sorter.order;
      } else {
        this.sort = null;
        this.order = null;
      }
      this.sortUpdate.emit({
        sort: this.sort,
        order: this.order,
      });
    }
  };

  // istanbul ignore next
  private _initConfigProps = () => {
    // 初始化列排序
    if (this._columns) {
      this._columns = this._columns.map((item) => {
        if (isNil(item.key)) {
          item.key = item.dataIndex as string;
        }
        return item;
      });
    }
  };

  getModifyColumns(): CustomColumn[] {
    let columns = this._columns;
    if (this._columns && this.hiddenColumns) {
      columns = this._columns.filter((column) => {
        return !this.hiddenColumns.includes(
          (column.dataIndex as string) ?? column.key
        );
      });
    }
    // 初始化列排序
    if (columns?.length) {
      if (this.sortable) {
        columns = columns.map((item) => {
          if (isNil(item.key)) {
            item.key = item.dataIndex as string;
          }
          if (item.sorter) {
            item.sortOrder =
              this.sort === item.key && !isNil(this.order) ? this.order : null;
          }
          return item;
        });
      } else {
        columns = map(columns, (item) => {
          item.sorter = false;
          return item;
        });
      }
    }
    return columns;
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      this._initConfigProps();
      ReactDOM.render(
        <BrickWrapper>
          <RankTable
            header={this.header}
            dataSource={this._dataSource}
            columns={this.getModifyColumns()}
            configProps={this.configProps}
            showCard={this.showCard}
            rowKey={this.rowKey}
            scroll={this.scrollConfigs}
            size={this.size}
            onChange={this._handleOnChange}
            showHeader={this.showHeader}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.rank-table", RankTableElement);
