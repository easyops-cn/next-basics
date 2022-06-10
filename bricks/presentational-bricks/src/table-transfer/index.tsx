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
/**
 * @id presentational-bricks.table-transfer
 * @author annzhang
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.table-transfer`
 * @docKind brick
 * @noInheritDoc
 */
export class TableTransferElement extends UpdatingElement {
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
   */
  @property({ attribute: false }) dataSource: any[];
  /**
   * @default
   * @required true
   * @description 表格column配置
   */
  @property({ attribute: false }) columns: ColumnsType<Record<string, any>>;
  /**
   * @default
   * @required false
   * @description 显示在右栏数据的 key 集合
   */
  @property({ attribute: false }) targetKeys: string[];
  /**
   * @default false
   * @required false
   * @description 是否支持右栏表格拖拽排序
   */
  /**
   * @default
   * @required false
   * @description 设置哪些项被选中
   */
  @property({ attribute: false }) selectedKeys: string[];
  /**
   * @default `false`
   * @required false
   * @description 是否禁用
   */
  @property({ type: Boolean }) disabled: boolean;
  @property({ type: Boolean }) dragSortable: boolean;
  /**
   * @default `sort`
   * @required false
   * @description 支持右栏表格排序时，排序列的title
   */
  @property({ attribute: false }) sortTitle: string;
  /**
   * @detail
   * @description 选项转移时发出的事件，detail是右栏表格key数组
   */
  /**
   * @default
   * @required false
   * @description 最大可选数量，当 dataSource 个数大于该值时，不显示全勾选框
   */
  @property({ attribute: false }) maxSelected: number;
  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 两个穿梭框的自定义样式，常用来设置宽高
   */
  @property({ attribute: false })
  listStyle: React.CSSProperties;
  /**
   * @kind [string, string]
   * @required false
   * @default -
   * @description 标题集合，顺序从左至右
   * @group advanced
   */
  @property({ attribute: false })
  titles: string[];
  @event({ type: "table.transfer.change" })
  tableTransferChangeEvent: EventEmitter<string[]>;
  change = (keys: string[]) => {
    this.tableTransferChangeEvent.emit(keys);
  };
  /**
   * @detail
   * @description 右栏表格拖拽排序发出的事件，event.detail是右栏表格排序后的key数组
   */
  @event({ type: "sort.change" }) sortChangeEvent: EventEmitter<string[]>;
  sortChange = (keys: string[]) => {
    this.sortChangeEvent.emit(keys);
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
