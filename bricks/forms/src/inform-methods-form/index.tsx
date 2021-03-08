import React from "react";
import ReactDOM from "react-dom";

import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

import { InformMethodsForm } from "./InformMethodsForm";

/**
 * @id forms.inform-methods-form
 * @name forms.inform-methods-form
 * @docKind brick
 * @description 选择通知方式
 * @author cyril
 * @slots
 * @history
 * @memo
 * @noInheritDoc
 */
export class InformMethodsFormElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;

  connectedCallback(): void {
    this.style.display = "block";
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <InformMethodsForm
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            message={this.message}
            validator={this.validator}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            notRender={this.notRender}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.inform-methods-form", InformMethodsFormElement);
