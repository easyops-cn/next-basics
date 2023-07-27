import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

import { GeneralFormItem } from "../general-form-item/GeneralFormItem";
import { ControlBrickConfig } from "../interfaces";

/**
 * @id forms.general-form-item-v2
 * @name forms.general-form-item-v2
 * @docKind brick
 * @description
 * @author william
 * @history
 * 1.271.0: 新增构件 `forms.general-form-item-v2`
 * @excludesInherit
 *  placeholder
 * @memo
 */
export class GeneralFormItemV2Element extends FormItemElement {
  /**
   * @required false
   * @description 表单项的值
   * @group basicFormItem
   */
  @property({ attribute: false }) value: unknown;

  /**
   * @description 表单控件构件配置
   * @group basicFormItem
   */
  @property({ attribute: false }) controlBrick?: ControlBrickConfig;

  /**
   * @description 当表单项的值通过 `forms.general-form` 的 `setInitValue` 方法修改时的事件，`detail` 为修改后的值
   */
  @event({ type: "general-form-item-v2.change" })
  changeEvent: EventEmitter<unknown>;

  private _handleChange = (value: unknown): void => {
    this.value = value;
    this._render();
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralFormItem
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            required={this.required}
            message={this.message}
            pattern={this.pattern}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            controlBrick={this.controlBrick}
            value={this.value}
            onChange={this._handleChange}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-form-item-v2", GeneralFormItemV2Element);
