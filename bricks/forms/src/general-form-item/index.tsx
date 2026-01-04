import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

import { GeneralFormItem } from "./GeneralFormItem";
import { LAYOUT_ENUMS } from "../general-form";
import { ControlBrickConfig } from "../interfaces";

import styles from "./index.shadow.less";

/**
 * @id forms.general-form-item
 * @name forms.general-form-item
 * @docKind brick
 * @description
 * @author william
 * @slots
 * control:表单控件位置的插槽
 * @history
 * 1.49.0:新增构件 `forms.general-form-item`
 * 1.53.0:新增 `control` 插槽，废弃 `control` 属性
 * @excludesInherit
 *  placeholder
 * @memo
 */
export interface GeneralFormItemElementProps {
  value?: unknown;
}


export class GeneralFormItemElement extends FormItemElement  implements GeneralFormItemElementProps {
  /**
   * @required false
   * @description 表单项的值
   * @group basicFormItem
   */
  @property({ attribute: false }) value: unknown;

  /**
   * @description 表单控件配置（已废弃，请使用 control 插槽）
   * @deprecated
   * @group basicFormItem
   */
  @property({ attribute: false }) control?: ControlBrickConfig;

  private _mountPoint: HTMLElement;

  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: "open" });
    const styleElement = document.createElement("style");
    styleElement.textContent = styles;
    shadowRoot.appendChild(styleElement);
    this._mountPoint = document.createElement("div");
    shadowRoot.appendChild(this._mountPoint);
  }

  connectedCallback(): void {
    const formElement = this.getFormElement();

    if (formElement) {
      const formLayout = formElement.layout;

      LAYOUT_ENUMS.forEach((layout) => {
        if (layout === formLayout) {
          this._mountPoint.classList.add(`ant-legacy-form-${layout}`);
        } else {
          this._mountPoint.classList.remove(`ant-legacy-form-${layout}`);
        }
      });
    }

    super.connectedCallback();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this._mountPoint);
  }
  /**
   * @description 当表单项的值通过 `forms.general-form` 的 `setInitValue` 方法修改时的事件，`detail` 为修改后的值
   */
  @event({ type: "general-form-item.change" })
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
            controlBrick={this.control}
            value={this.value}
            onChange={this._handleChange}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            className="important-formItem"
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("forms.general-form-item", GeneralFormItemElement);
