import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import { FormItemElement } from "@next-libs/forms";

import { GeneralFormItem } from "./GeneralFormItem";
import styles from "./index.shadow.less";
import { LAYOUT_ENUMS } from "../general-form";

export interface ControlConfig {
  /**作为表单控件展示的构件配置 */
  useBrick: UseBrickConf;
}

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
export class GeneralFormItemElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 表单项字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind `any`
   * @required false
   * @default -
   * @description 表单项的值
   */
  @property({ attribute: false }) value: any;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 表单项字段说明
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind `ControlConfig`
   * @required false
   * @default -
   * @description 表单控件配置（已废弃，请使用 control 插槽）
   * @group advanced
   */
  @property({ attribute: false }) control: ControlConfig;

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
   * @detail `any`
   */
  @event({ type: "general-form-item.change" }) changeEvent: EventEmitter<
    Record<string, any>
  >;
  private _handleChange = (value: any): void => {
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
            required={this.required}
            message={this.message}
            pattern={this.pattern}
            validator={this.validator}
            notRender={this.notRender}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            control={this.control}
            value={this.value}
            onChange={this._handleChange}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this._mountPoint
      );
    }
  }
}

customElements.define("forms.general-form-item", GeneralFormItemElement);
