import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  getHistory,
  property,
  UpdatingElement,
} from "@next-core/brick-kit";
import { RankTable } from "./RankTable";
import { ColumnProps, TableProps } from "antd/lib/table";
import { cloneDeep, find, get, isEmpty, isNil, map } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";

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
 * @id presentational-bricks.trend-table
 * @author alexchen
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.trend-table`
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      this._initConfigProps();
      ReactDOM.render(
        <BrickWrapper>
          <RankTable
            header={this.header}
            dataSource={this._dataSource}
            columns={this._columns}
            configProps={this.configProps}
            showCard={this.showCard}
            rowKey={this.rowKey}
            scroll={this.scrollConfigs}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.rank-table", RankTableElement);
