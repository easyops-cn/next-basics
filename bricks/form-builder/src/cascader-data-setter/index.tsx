import React from "react";
import ReactDOM from "react-dom";
import { CascaderDataSetterAdapter } from "./CascaderDataSetter";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

export interface FieldCascaderProps {
  options: {
    label: string;
    value: string;
    key?: string;
    children?: FieldCascaderProps["options"];
  }[];
}

/**
 * @id form-builder.cascader-data-setter
 * @author frankshi
 * @history
 * 1.x.0: 新增构件 `form-builder.cascader-data-setter`
 * @docKind brick
 * @noInheritDoc
 */
export class CascaderDataSetterElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 字段说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 初始值
   * @group basicFormItem
   */
  @property({ attribute: false }) value: FieldCascaderProps["options"];

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @kind `Record<string,string>`
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @kind boolean
   * @required false
   * @default false
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ type: Boolean })
  disabled: boolean;

  /**
   * @detail `{label: string, value: string, [key: string]: any}`
   * @description 选项改变时触发
   */
  @event({ type: "forms.cascader-data.change" })
  changeEvent: EventEmitter;
  handleChange = (value: FieldCascaderProps["options"]): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <CascaderDataSetterAdapter
            value={this.value}
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
            onChange={this.handleChange}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
            disabled={this.disabled}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "form-builder.cascader-data-setter",
  CascaderDataSetterElement
);
