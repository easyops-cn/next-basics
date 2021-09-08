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
   * @detail {value: any}
   * @description 多选选项选中事件
   */
  @event({ type: "multiple.select.change", cancelable: true })
  multipleSelectChange: EventEmitter<{ value: any }>;

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

  /**
   * @kind string[]
   * @required false
   * @default []
   * @description 多选的选中项
   */

  @property({ attribute: false }) selectedKeys?: string[] = [];
  /**
   * @kind string[]
   * @required false
   * @default []
   * @description 多选的默认选中项
   */
  @property({ attribute: false }) defaultSelectedKeys?: string[] = [];

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否支持多选，支持多选时，单选的value属性失效
   */
  @property({ type: Boolean }) multipleSelect?: boolean;

  /**
   * @kind MenuIcon
   * @required false
   * @default -
   * @description 按钮 icon，支持[icon 图标库](developers/icon)，可直接复制图标图标的配置（antd、fa 及 easyops 三种库都支持），也可只取 icon 字段的值（仅支持 antd 库）。配置{ "lib": "antd", "icon": "edit" }与 "edit"等价
   * @group basic
   */
  @property({
    attribute: false,
  })
  buttonIcon: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 多选时，当前label仅支持显示从构件外部传入,multipleLabel属性仅在dropdownButtonType为multiple时生效
   */
  @property() multipleLabel?: string;

  /**
   * @kind "default" | "shape"
   * @required false
   * @default "default"
   * @description 设置下拉选择器按钮样式
   */
  @property()
  dropdownButtonType: "default" | "shape";

  connectedCallback(): void {
    this.style.display = "inline-block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }
  // istanbul ignore next
  private _handleChange = (value: any, item: any) => {
    this.value = value;
    this.selectChange.emit({ value, item });
  };
  // istanbul ignore next
  private _multipleSelectChange = (value: any) => {
    this.selectedKeys = value;
    this.multipleSelectChange.emit({ value });
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
            selectedKeys={this.selectedKeys}
            defaultSelectedKeys={this.defaultSelectedKeys}
            multipleSelect={this.multipleSelect}
            onSelect={this._multipleSelectChange}
            buttonIcon={this.buttonIcon}
            multipleLabel={this.multipleLabel}
            dropdownButtonType={this.dropdownButtonType}
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
