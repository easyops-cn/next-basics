import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  FormItemElement,
  formatOptions,
  GeneralOption,
} from "@next-libs/forms";
import { GeneralRadio } from "./GeneralRadio";
import { RadioGroupButtonStyle } from "antd/lib/radio";
import { UiType } from "../interfaces";

export type RadioType = "button" | "default" | "icon" | "icon-circle";

/**
 * @id forms.general-radio
 * @name forms.general-radio
 * @docKind brick
 * @description 通用的单选框
 * @author jo
 * @slots
 * @history
 * 1.0.0: 新增构件 `forms.general-radio`
 * 1.1.0: 构件 type 属性，添加`icon`图标类型样式
 * 1.207.0: `type` 属性新增  `icon-circle` 类型样式
 * @memo
 * > Tips: 单选框与 general-form 结合使用时，通过 value 设置初始值是无效的，需要在 general-form [values](developers/brick-book/brick/forms.general-form) 属性中设置初始值。
 * ```typescript
 *interface LabeledValue {
 *  label: string;
 *  icon?: MenuIcon; // 仅在`buttonStyle` 为 `solid` 时有效，此时 `label` 会无效。
 *  value: string | number;
 *  disabled: boolean;
 *  tooltip?: string
 *}
 *```
 */
export class GeneralRadioElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 下拉框字段名
   * @group basic
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 单选框字段说明
   * @group basic
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string[]|number[]|LabeledValue[]
   * @required true
   * @default -
   * @description 单选框选项表
   * @group basic
   */
  @property({
    attribute: false,
  })
  options: GeneralOption[];

  /**
   * @kind string
   * @required true
   * @default -
   * @description 单选框当前选中始值
   * @group basic
   */
  @property({ attribute: false })
  value: any;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @group basic
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind Record<string,string>
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basic
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind boolean
   * @required false
   * @default  `false`
   * @description 是否禁用
   * @group basic
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @kind RadioType
   * @required false
   * @default `default`
   * @description 	单选框样式类型
   * @group advanced
   */
  @property({
    attribute: false,
  })
  type: RadioType = "default";

  /**
   * @kind "large" | "middle" | "small"
   * @required false
   * @default -
   * @description 	大小，只对按钮样式生效
   * @group advanced
   */
  @property({
    attribute: false,
  })
  size: "large" | "middle" | "small";

  /**
   * @kind RadioGroupButtonStyle
   * @required false
   * @default `solid`
   * @description 	单选框样式
   * @group advanced
   */
  @property({
    attribute: false,
  })
  buttonStyle: RadioGroupButtonStyle = "solid";
  /**
   * @kind UiType
   * @required -️
   * @default default
   * @description Ui样式，可选择 `dashboard` 样式，默认`default`
   */
  @property({
    attribute: false,
  })
  uiType: UiType = "default";
  /**
   * @detail `string | number`
   * @description 单选框变化时被触发，`event.detail` 为选项值
   */
  @event({ type: "general.radio.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;

  private _handleChange = (value: any): void => {
    this.value = value;
    this._render();
    Promise.resolve().then(() => {
      this.changeEvent.emit(value);
    });
  };
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralRadio
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            options={formatOptions(this.options)}
            value={this.value}
            type={this.type}
            size={this.size}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this._handleChange}
            disabled={this.disabled}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            buttonStyle={this.buttonStyle}
            uiType={this.uiType}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-radio", GeneralRadioElement);
