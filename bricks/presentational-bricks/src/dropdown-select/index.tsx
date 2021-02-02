import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";

import { DropdownSelect } from "./DropdownSelect";
import { Option } from "../interfaces";

/**
 * @id presentational-bricks.dropdown-select
 * @name presentational-bricks.dropdown-select
 * @docKind brick
 * @description 用于菜单项较多时收纳相关菜单项
 * @author jo
 * @slots
 * @history
 * 1.122.0:新增 `labelFontSize` 属性
 * @memo
 * @noInheritDoc
 */
export class DropdownSelectElement extends UpdatingElement {
  /**
   * @detail {value: any; item: any}
   * @description 选项改变事件
   */
  @event({ type: "select.change", cancelable: true })
  selectChange: EventEmitter<{ value: any; item: any }>;

  /**
   * @required false
   * @default -
   * @description 选项列表，不能与 dataSource + label + optionTitle + optionContent + valuePath 同时使用
   */
  @property({ attribute: false }) options: Option[];
  /**
   * @kind any[]
   * @required false
   * @default []
   * @description 数据源
   */
  @property({ attribute: false }) dataSource: any[];
  /**
   * @kind any
   * @required false
   * @default -
   * @description 选中项的值，跟 `valuePath` 搭配使用，根据指定的字段路径与 value 的值得出当前选中项
   */
  @property({ attribute: false }) value: any[];
  /**
   * @kind string
   * @required false
   * @default 使用 optionTitle 的值
   * @description 选中项显示的 label，支持模板替换，替换上下文为当前项 `item` 使用时需要带上 item 前缀 `#{item.xxx}`
   */
  @property() label?: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description label 的 fontSize
   */
  @property() labelFontSize?: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description placeholder, 当没有当前项选中时显示
   */
  @property() placeholder?: string;
  /**
   * @kind string
   * @required false
   * @default #{item}
   * @description 选项的标题，支持模板替换，使用跟 label 字段一样
   */
  @property() optionTitle?: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 选项的内容，支持模板替换，使用跟 label 字段一样
   */
  @property() optionContent?: string;
  /**
   * @kind string
   * @required false
   * @default item
   * @description 依据当前项 `item`，指定选项值的 path
   */
  @property() valuePath?: string;

  connectedCallback(): void {
    this.style.display = "inline-block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  private _handleChange = (value: any, item: any) => {
    this.value = value;
    this.selectChange.emit({ value, item });
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DropdownSelect
            options={this.options}
            dataSource={this.dataSource}
            value={this.value}
            label={this.label}
            labelFontSize={this.labelFontSize}
            placeholder={this.placeholder}
            optionTitle={this.optionTitle}
            optionContent={this.optionContent}
            valuePath={this.valuePath}
            onChange={this._handleChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.dropdown-select",
  DropdownSelectElement
);
