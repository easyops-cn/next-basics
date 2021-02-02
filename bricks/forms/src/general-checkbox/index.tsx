import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { formatOptions, FormItemElement } from "@next-libs/forms";
import { GeneralCheckbox } from "./GeneralCheckbox";
import { CheckboxValueType, CheckboxOptionType } from "antd/lib/checkbox/Group";

export interface OptionGroup {
  /**
   * 分组名称
   */
  name: string;
  /**
   * 分组唯一键，必填，不可重复
   */
  key: string;
  /**
   * 分组下的选项
   */
  options: CheckboxOptionType[];
}

/**
* @id forms.general-checkbox
* @name forms.general-checkbox
* @docKind brick
* @description 通用多选框
* @author jo
* @slots
* @history
* 1.145.0:新增属性 `isGroup``optionGroups`，支持选项分组
* @memo

* > Tips: 多选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。
* ```typescript
*interface LabeledValue {
*  label: string;
*  value: string | number;
*  disabled: boolean;
*}
*```
* @noInheritDoc
*/
export class GeneralCheckboxElement extends FormItemElement {
  /**
   * @kind `string`
   * @required true
   * @default -
   * @description 多选框字段名
   */
  @property({ attribute: false }) name: string;
  /**
   * @kind `string`
   * @required false
   * @default -
   * @description 多选框字段说明
   */
  @property({ attribute: false }) placeholder: string;
  /**
   * @kind `boolean`
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;
  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   */
  @property({ attribute: false }) message: Record<string, string>;
  /**
   * @kind `string[]|number[]|LabeledValue[]`
   * @required false
   * @default -
   * @description 多选框选项表
   */
  @property({
    attribute: false,
  })
  options: CheckboxOptionType[];

  /**
   * @kind OptionGroup[]
   * @required true
   * @default -
   * @description 多选框选项分组数据，需要设置 `isGroup` 为 `true` 才生效
   */
  @property({
    attribute: false,
  })
  optionGroups: OptionGroup[];

  /**
   * @required false
   * @default false
   * @description 是否为分组复选框，若为 `true`，则可设置分组数据 `optionGroups`
   */
  @property({
    type: Boolean,
  })
  isGroup: boolean;

  /**
   * @kind `string[]`
   * @required -
   * @default -
   * @description 输入框当前选中始值

   */
  @property({
    attribute: false,
  })
  value: CheckboxValueType[];

  @property({
    type: Number,
  })
  colSpan: number;
  /**
   * @detail `any[]`
   * @description 复选框变化时触发，`event.detail` 为当前选中的值列表
   */
  @event({ type: "general.checkbox.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleChange = (value: CheckboxValueType[]): void => {
    this.value = value;
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };

  formatOptionsGroup = (optionGroups: OptionGroup[]): OptionGroup[] => {
    return optionGroups?.map((v) => ({
      ...v,
      options: formatOptions(v.options),
    }));
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralCheckbox
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            options={formatOptions(this.options)}
            value={this.value}
            colSpan={this.colSpan}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            optionGroups={this.formatOptionsGroup(this.optionGroups)}
            isGroup={this.isGroup}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-checkbox", GeneralCheckboxElement);
