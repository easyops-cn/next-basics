import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { DynamicFormInputItem } from "./DynamicFormInputItem";
import {
  RowProps,
  CommonItemProps,
} from "../dynamic-common-item/DynamicCommonItem";

/**
* @id forms.dynamic-form-input-item
* @name forms.dynamic-form-input-item
* @docKind brick
* @description [已废弃]表单项是数组形式的结构，可以动态增加或删除每一行
* @author jo
* @slots
* @history
* 1.x.0:新增构件 `forms.dynamic-form-input-item`
* @memo
* ###注意：
* 该构件仅支持 input 类型，如果需要同时支持 input/select 的类型可使用进阶版 [动态表单项](developers/brick-book/brick/forms.dynamic-form-item)
* > Tips: 另外个表单项的 `required`, `message` 等这些校验属性，下放到每一列的表单子项 `columns.rules` 去配置
### ColumnsProps

*| property    | type                              | required | default | description                                                                                                                       |
*| ----------- | --------------------------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- |
*| name        | `string`                          | ✔️       | -       | 配置该列的 name                                                                                                                   |
*| label       | `string`                          | -        | -       | 配置该列的 label，在一列的头部显示                                                                                                |
*| rules       | `any[]`                           | -        | -       | 配置该列的的校验规则，同 [antd 的 rules](https://3x.ant.design/components/form-cn/#%E6%A0%A1%E9%AA%8C%E8%A7%84%E5%88%99)          |
*| placeholder | `string`                          | -        | -       | 配置该列 placeholder                                                                                                              |
*| type        | `text` \| `checkbox`\| `number`... | -        | -       | 该列表单项的类型，详情可查看 [<input> types](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#%3Cinput%3E_types) |
*| disabled    | `boolean`                         | -        | -       | 该列表单项是否禁止                                                                                                                |
*/
export class DynamicFormInputItemElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项名称
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind `any[]`
   * @required -️
   * @default -
   * @description 动态表单项的初始值，一般跟 `general-form` 搭配使用，则初始值的赋值在 `general-form` 的 `values` 属性上设置，具体格式如 demo 所示，把每一列 `name` 值作为 `key`，`value` 为该列的具体值
   */
  @property({
    attribute: false,
  })
  value: CommonItemProps["value"];

  /**
   * @kind `ColumnsProps`
   * @required true
   * @default -
   * @description 每一列表单项的配置， 详见下表
   */
  @property({
    attribute: false,
  })
  columns: CommonItemProps["columns"];

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
   * @detail `Record<string, any>[]`
   * @description 修改每一列数据时触发，detail 该动态表单项全部的数据
   */
  @event({ type: "item.change" }) changeEvent: EventEmitter<
    Record<string, any>[]
  >;
  private _handleChange = (data: RowProps[]) => {
    this.changeEvent.emit(data);
  };
  /**
   * @description 增加一行时触发
   */
  @event({ type: "item.add" }) addEvent: EventEmitter;
  private _handleAdd = () => {
    this.addEvent.emit();
  };
  /**
   * @detail `Record<string, any>`
   * @description 删除某一行时触发，detail 为该行的数据
   */
  @event({ type: "item.remove" }) removeEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleRemove = (data: RowProps) => {
    this.removeEvent.emit(data);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DynamicFormInputItem
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            value={this.value}
            required={this.required}
            message={this.message}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            columns={this.columns}
            onChange={this._handleChange}
            onAdd={this._handleAdd}
            onRemove={this._handleRemove}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "forms.dynamic-form-input-item",
  DynamicFormInputItemElement
);
