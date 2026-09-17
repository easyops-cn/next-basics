import React from "react";
import ReactDOM from "react-dom";
import { isEmpty, get, isEqual } from "lodash";
import { TransferItem, TransferLocale } from "antd/lib/transfer";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { GeneralTransfer } from "./GeneralTransfer";
import { BrickWrapperConfig } from "../interfaces";


export interface GeneralTransferElementProps {
  dataSource?: any[];
  listStyle?: React.CSSProperties;
  selectedKeys?: string[];
  disabled?: boolean;
  maxSelected?: number;
  showSearch?: boolean;
  wrapperConfig?: BrickWrapperConfig;
  dataDescriptor?: { [k in keyof TransferItem]: string };
  targetKeys?: string[];
  titles?: string[];
  operations?: string[];
  locale?: Partial<TransferLocale>;
}

/**
 * @id presentational-bricks.general-transfer
 * @name presentational-bricks.general-transfer
 * @docKind brick
 * @description 双栏穿梭选择框
 * @description.en Two-column transfer selection box
 * @author ice
 * @slots
 * @history
 * 1.77.0:新增构件 `presentational-bricks.general-transfer`
 * @memo
 * ### DEFAULT_LOCALE
 *
 * ```typescript
 * const DEFAULT_LOCALE = {
 *   searchPlaceholder: "请输入搜索内容",
 *   itemUnit: "项",
 *   itemsUnit: "项",
 * };
 * ```
 * @memo.en
 * ### DEFAULT_LOCALE
 *
 * ```typescript
 * const DEFAULT_LOCALE = {
 *   searchPlaceholder: "Search",
 *   itemUnit: "item",
 *   itemsUnit: "items",
 * };
 * ```
 * @noInheritDoc
 */
export class GeneralTransferElement extends UpdatingElement implements GeneralTransferElementProps {
  /**
   * @kind any[]
   * @required true
   * @default -
   * @description 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外
   * @description.en Data source; the data in it will be rendered in the left column, except those specified in targetKeys
   */
  @property({ attribute: false })
  dataSource: any[];

  /**
   * @kind CSSProperties
   * @required false
   * @default -
   * @description 两个穿梭框的自定义样式，常用来设置宽高
   * @description.en Custom style of the two transfer boxes, commonly used to set width and height
   */
  @property({ attribute: false })
  listStyle: React.CSSProperties;

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 设置哪些项应该被选中
   * @description.en Set which items should be selected
   */
  @property({ attribute: false })
  selectedKeys: string[];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @description.en Whether to disable
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind number
   * @required false
   * @default -
   * @description 最多选择数，当 `dataSource` 个数大于该值时，不显示全勾选框
   * @description.en Maximum number of selections; when the number of `dataSource` items is greater than this value, the select-all checkbox is not shown
   */
  @property({ type: Number })
  maxSelected: number;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否显示搜索框
   * @description.en Whether to show the search box
   */
  @property({ type: Boolean })
  showSearch: boolean;

  /**
   * @default -
   * @required false
   * @description 设置容器空状态时显示`empty`构件属性
   * @description.en Set the `empty` brick property displayed when the container is in the empty state
   * @group advanced
   */
  @property({ attribute: false })
  wrapperConfig: BrickWrapperConfig = {};

  /**
   * @kind { key: string, title: string }
   * @required false
   * @default -
   * @description 当 `dataSource` 中的每一项没有 key 或 title 字段时，须设置该属性。`key` 和 `title` 均须设置
   * @description.en Set this property when each item in `dataSource` has no key or title field. Both `key` and `title` must be set
   * @group advanced
   */
  @property({ attribute: false })
  dataDescriptor: { [k in keyof TransferItem]: string };

  /**
   * @kind string[]
   * @required false
   * @default -
   * @description 显示在右侧框数据的 key 集合
   * @description.en Set of keys of the data displayed in the right box
   * @group advanced
   */
  @property({ attribute: false })
  targetKeys: string[] = [];

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
   * @kind [string, string]
   * @required false
   * @default -
   * @description 操作文案集合，顺序从上至下
   * @description.en Set of operation texts, ordered from top to bottom
   * @group advanced
   */
  @property({ attribute: false })
  operations: string[];

  /**
   * @kind { itemUnit: string, itemsUnit: string, searchPlaceholder: string }
   * @required false
   * @default [DEFAULT_LOCALE](#default_locale)
   * @description 文案
   * @description.en Texts
   * @group advanced
   */
  @property({ attribute: false })
  locale: Partial<TransferLocale>;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 当选项发生转移时，是否需要实时发出 `general.transfer.change` 事件
   * @description.en Whether to emit the `general.transfer.change` event in real time when options are transferred
   * @group advanced
   */
  @property({ attribute: false })
  realTimeNotification = true;

  /**
   * @detail string[]
   * @description 右侧框数据的 key 集合
   * @description.en Set of keys of the data in the right box
   */
  @event({ type: "general.transfer.change" })
  generalTransferChange: EventEmitter<string[]>;

  private realDataSource: TransferItem[];
  private previousTargetKeys: string[] = [];

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

  private getDataSource(): TransferItem[] {
    if (
      this.realDataSource &&
      isEqual(this.targetKeys, this.previousTargetKeys)
    )
      return this.realDataSource;
    this.previousTargetKeys = this.targetKeys;
    let dataSource = [...this.dataSource];
    if (!isEmpty(this.dataDescriptor)) {
      dataSource = dataSource.map((item) => ({
        key: get(item, this.dataDescriptor.key),
        title: get(item, this.dataDescriptor.title),
      }));
    }
    this.realDataSource = dataSource;
    if (this.maxSelected) this.updateDisable();
    return this.realDataSource;
  }

  private updateDisable() {
    if (this.targetKeys.length >= this.maxSelected) {
      this.realDataSource = this.realDataSource.map((item) => {
        if (!this.targetKeys.includes(item.key)) {
          item.disabled = true;
        }
        return item;
      });
    } else {
      this.realDataSource = this.realDataSource.map((item) => {
        item.disabled = false;
        return item;
      });
    }
  }

  /**
   * @description 当 `realTimeNotification` 为 false 时，可以调用该方法来发出事件
   * @description.en When `realTimeNotification` is false, this method can be called to emit the event
   */
  @method()
  notifyChange(): void {
    this.generalTransferChange.emit(this.targetKeys);
  }

  handleChange = (targetKeys: string[]): void => {
    this.targetKeys = targetKeys;
    if (this.realTimeNotification) {
      this.notifyChange();
    }
    if (this.maxSelected) {
      this.updateDisable();
      this._render();
    }
  };

  handleSelectedChange = (
    sourceSelectedKeys: string[],
    targetSelectedKeys: string[]
  ): void => {
    if (this.maxSelected) {
      if (
        sourceSelectedKeys.length + this.targetKeys.length >=
        this.maxSelected
      ) {
        this.realDataSource = this.realDataSource.map((item) => {
          if (
            !sourceSelectedKeys.includes(item.key) &&
            !this.targetKeys.includes(item.key)
          ) {
            item.disabled = true;
          }
          return item;
        });
      } else {
        this.realDataSource = this.realDataSource.map((item) => {
          item.disabled = false;
          return item;
        });
      }
    }
    this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected && this.dataSource) {
      const dataSource = this.getDataSource();
      const showSelectAll = this.maxSelected
        ? this.maxSelected >= dataSource.length
        : true;
      ReactDOM.render(
        <BrickWrapper wrapperConfig={this.wrapperConfig}>
          <GeneralTransfer
            dataSource={dataSource}
            targetKeys={this.targetKeys}
            onChange={this.handleChange}
            onSelectedChange={this.handleSelectedChange}
            maxSelected={this.maxSelected}
            locale={this.locale}
            listStyle={this.listStyle}
            titles={this.titles}
            operations={this.operations}
            selectedKeys={this.selectedKeys}
            disabled={this.disabled}
            showSearch={this.showSearch}
            showSelectAll={showSelectAll}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.general-transfer",
  GeneralTransferElement
);
