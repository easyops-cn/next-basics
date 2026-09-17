import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { TableTransfer } from "./TableTransfer";
import type { ColumnsType } from "antd/es/table/interface";

export interface TableTransferElementProps {
  dataSource?: any[];
  columns?: ColumnsType<Record<string, any>>;
  targetKeys?: string[];
  selectedKeys?: string[];
  disabled?: boolean;
  dragSortable?: boolean;
  sortTitle?: string;
  maxSelected?: number;
  listStyle?: React.CSSProperties;
  titles?: string[];
  searchPlaceholder?: string;
}

/**
 * @id presentational-bricks.table-transfer
 * @author annzhang
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.table-transfer`
 * @docKind brick
 * @noInheritDoc
 */

export class TableTransferElement extends UpdatingElement implements TableTransferElementProps {
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
   * @default
   * @required true
   * @description 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外，必须有key字段作为唯一标识
   * @description.en Data source; the data in it will be rendered in the left column, except for those specified in targetKeys. A key field is required as a unique identifier
   */
  @property({ attribute: false }) dataSource: any[];
  /**
   * @default
   * @required true
   * @description 表格column配置
   * @description.en Table column configuration
   */
  @property({ attribute: false }) columns: ColumnsType<Record<string, any>>;
  /**
   * @default
   * @required false
   * @description 显示在右栏数据的 key 集合
   * @description.en Set of keys of the data displayed in the right column
   */
  @property({ attribute: false }) targetKeys: string[];
  /**
   * @default false
   * @required false
   * @description 是否支持右栏表格拖拽排序
   * @description.en Whether the right column table supports drag sorting
   */
  /**
   * @default
   * @required false
   * @description 设置哪些项被选中
   * @description.en Set which items are selected
   */
  @property({ attribute: false }) selectedKeys: string[];
  /**
   * @default `false`
   * @required false
   * @description 是否禁用
   * @description.en Whether to disable
   */
  @property({ type: Boolean }) disabled: boolean;
  @property({ type: Boolean }) dragSortable: boolean;
  /**
   * @default `sort`
   * @required false
   * @description 支持右栏表格排序时，排序列的title
   * @description.en Title of the sort column when the right column table sorting is supported
   */
  @property({ attribute: false }) sortTitle: string;
  /**
   * @detail
   * @description 选项转移时发出的事件，detail是右栏表格key数组
   * @description.en Event emitted when items are transferred; detail is the array of keys of the right column table
   */
  /**
   * @default
   * @required false
   * @description 最大可选数量，当 dataSource 个数大于该值时，不显示全勾选框
   * @description.en Maximum selectable count; when the number of dataSource items is greater than this value, the select-all checkbox is not displayed
   */
  @property({ attribute: false }) maxSelected: number;
  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 两个穿梭框的自定义样式，常用来设置宽高
   * @description.en Custom style of the two Transfer boxes, commonly used to set the width and height
   */
  @property({ attribute: false })
  listStyle: React.CSSProperties;
  /**
   * @kind [string, string]
   * @required false
   * @default -
   * @description 标题集合，顺序从左至右
   * @description.en Set of titles, ordered from left to right
   * @group advanced
   */
  @property({ attribute: false })
  titles: string[];
  /**
   * @default
   * @required false
   * @description 搜索框placeholder
   * @description.en Search box placeholder
   */
  @property({ attribute: false })
  searchPlaceholder: string;
  /**
   * @kind string[]
   * @description 当选项发生转移时发出的事件，event.detail是	右侧框数据的 key 集合
   * @description.en Event emitted when items are transferred; event.detail is the set of keys of the data in the right box
   */
  @event({ type: "table.transfer.change" })
  tableTransferChangeEvent: EventEmitter<string[]>;
  change = (keys: string[]) => {
    this.tableTransferChangeEvent.emit(keys);
  };
  /**
   * @kind string[]
   * @description 右栏表格拖拽排序发出的事件，event.detail是右栏表格排序后的key数组
   * @description.en Event emitted when the right column table is drag-sorted; event.detail is the array of keys of the right column table after sorting
   */
  @event({ type: "sort.change" }) sortChangeEvent: EventEmitter<string[]>;
  sortChange = (keys: string[]) => {
    this.sortChangeEvent.emit(keys);
  };

  /**
   * @kind {direction: "left" | "right", value: any}
   * @description 搜索框发出的事件，event.detail是搜索框的值
   * @description.en Event emitted by the search box; event.detail is the value of the search box
   */
  @event({ type: "search.change" }) searchChangeEvent: EventEmitter<{
    direction: "left" | "right";
    value: any;
  }>;
  onSearch = (direction: "left" | "right", value: string) => {
    this.searchChangeEvent.emit({ direction, value });
  };
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <TableTransfer
            dataSource={this.dataSource}
            columns={this.columns}
            targetKeys={this.targetKeys}
            change={this.change}
            sortChange={this.sortChange}
            dragSortable={this.dragSortable}
            sortTitle={this.sortTitle}
            selectedKeys={this.selectedKeys}
            disabled={this.disabled}
            maxSelected={this.maxSelected}
            listStyle={this.listStyle}
            titles={this.titles}
            onSearch={this.onSearch}
            searchPlaceholder={this.searchPlaceholder}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.table-transfer",
  TableTransferElement
);
