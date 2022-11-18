import React, { CSSProperties } from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { GeneralAutoComplete } from "./GeneralAutoComplete";
import { OptionType } from "../interfaces";

/**
 * @id forms.general-auto-complete
 * @name forms.general-auto-complete
 * @docKind brick
 * @description 输入框自动完成功能
 * @author ice
 * @slots
 * @history
 * 1.36.0:新增构件 `forms.general-auto-complete`
 * @memo
 */
export class GeneralAutoCompleteElement extends FormItemElement {
  /**
   * @required true
   * @description 字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required true
   * @description 补全选项列表
   * @group basicFormItem
   */
  @property({ attribute: false })
  options: string[] | OptionType[];

  /**
   * @required false
   * @description 当前值
   * @group basicFormItem
   */
  @property()
  value: string;

  /**
   * @required false
   * @description 占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @required false
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ attribute: false }) declare disabled: boolean;

  /**
   * @required false
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @required false
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @required false
   * @description 输入框样式
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle?: CSSProperties;

  connectedCallback(): void {
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
   * @description 补全输入框变化时触发
   */
  @event({ type: "general.auto-complete.change" })
  changeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.value = value;
    this._render();
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <GeneralAutoComplete
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
            placeholder={this.placeholder}
            required={this.required}
            inputBoxStyle={this.inputBoxStyle}
            message={this.message}
            validator={this.validator}
            pattern={this.pattern}
            notRender={this.notRender}
            options={this.options}
            value={this.value}
            onChange={this._handleChange}
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
  "forms.general-auto-complete",
  GeneralAutoCompleteElement
);
