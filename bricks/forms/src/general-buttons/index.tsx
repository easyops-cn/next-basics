import React from "react";
import ReactDOM from "react-dom";
import { ButtonType } from "antd/lib/button";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralButtons } from "./GeneralButtons";

const BUTTON_TYPES = [
  "default",
  "primary",
  "ghost",
  "dashed",
  "danger",
  "link",
];

/**
 * @id forms.general-buttons
 * @name forms.general-buttons
 * @docKind brick
 * @description 用于general-forms的通用按钮，可以配置submit按钮和cancel按钮
 * @author lynette
 * @slots
 * @history
 * 1.39.0:新增 `submitDisabled` 属性
 * 1.42.0:新增 `submitTooltip` 属性
 * 1.75.0:新增属性 `disableAfterClick`
 * 1.77.0:`cancelType` 的默认值改为 `link`
 * @excludesInherit
 *  name
 *  label
 *  required
 *  placeholder
 *  pattern
 *  message
 *  validator
 *  labelTooltip
 *  trim
 * @memo
 */
export class GeneralButtonsElement extends FormItemElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 提交按钮的文字，不设置则不显示提交按钮
   * @group basic
   */
  @property()
  submitText: string;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 显示取消按钮
   * @group basic
   */
  @property({
    type: Boolean,
  })
  showCancelButton: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 取消按钮的文字，不设置则不显示取消按钮
   * @group basic
   */
  @property()
  cancelText: string;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 点击确定按钮后自动禁用
   * @group advanced
   */
  @property({ type: Boolean })
  disableAfterClick: boolean;
  /**
   * @detail -
   * @description 点击提交按钮触发的事件，tips:点击提交按钮会先自动触发表单的 validate 方法，参考[通用表单](developers/brick-book/brick/forms.general-form)
   */

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 按钮加载动画
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  loading: boolean;

  /**
   * @kind boolean
   * @required false
   * @default `false`
   * @description 禁用提交按钮
   * @group advanced
   */
  @property({
    type: Boolean,
  })
  submitDisabled: boolean;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 提交按钮文字提示
   * @group advanced
   */
  @property()
  submitTooltip: string;

  /**
   * @kind `"default" | "primary" | "ghost" | "dashed" | "danger" | "link"`
   * @required -
   * @default `"primary"`
   * @description 提交按钮的类型
   * @enums "default"|"primary"|"ghost"|"dashed"|"danger"|"link"
   * @group basic
   */
  @property({
    // Ensure `layout` is `FormLayout`.
    converter: {
      fromAttribute(value: string): string {
        if (value && BUTTON_TYPES.includes(value)) {
          return value;
        }
        return "primary";
      },
      toAttribute(value: string): string {
        if (BUTTON_TYPES.includes(value)) {
          return value;
        }
      },
    },
  })
  submitType: ButtonType;

  /**
   * @kind `"default" | "primary" | "ghost" | "dashed" | "danger" | "link"`
   * @default `"link"`
   * @description 取消按钮的类型
   * @enums "default"|"primary"|"ghost"|"dashed"|"danger"|"link"
   * @group advanced
   */
  @property({
    // Ensure `layout` is `FormLayout`.
    converter: {
      fromAttribute(value: string): string {
        if (value && BUTTON_TYPES.includes(value)) {
          return value;
        }
        return "text";
      },
      toAttribute(value: string): string {
        if (BUTTON_TYPES.includes(value)) {
          return value;
        }
      },
    },
  })
  cancelType: ButtonType;

  /**
   * @description 点击提交按钮触发的事件
   * @detail -
   */
  @event({ type: "submit.button.click" }) submitEvent: EventEmitter;
  private _handleSubmitClick = (): void => {
    this.submitEvent.emit();
    if (this.getFormElement()) {
      (this.getFormElement() as any).validate();
    }
    if (this.disableAfterClick) {
      this.submitDisabled = true;
    }
  };
  /**
   * @description 点击取消按钮触发的事件
   * @detail -
   */
  @event({ type: "cancel.button.click" }) cancelEvent: EventEmitter;
  private _handleCancelClick = (): void => {
    this.cancelEvent.emit();
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralButtons
            formElement={this.getFormElement()}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            submitText={this.submitText}
            submitType={this.submitType}
            submitDisabled={this.submitDisabled}
            loading={this.loading}
            submitTooltip={this.submitTooltip}
            cancelText={this.cancelText}
            cancelType={this.cancelType}
            onSubmitClick={this._handleSubmitClick}
            onCancelClick={this._handleCancelClick}
            showCancelButton={this.showCancelButton}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.general-buttons", GeneralButtonsElement);
