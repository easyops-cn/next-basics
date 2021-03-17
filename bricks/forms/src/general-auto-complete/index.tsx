import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  formatOptions,
  FormItemElement,
  GeneralOption,
} from "@next-libs/forms";
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
   * @kind string
   * @required true
   * @default -
   * @description 字段名
   */
  @property({ attribute: false }) name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind string[]
   * @required true
   * @default -
   * @description 补全选项列表
   */
  @property({ attribute: false })
  options: string[] | OptionType[];

  /**
   * @kind string
   * @required false
   * @default -
   * @description 当前值
   */
  @property()
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 占位说明
   */
  @property({ attribute: false }) placeholder: string;

  /**
   * @kind boolean
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
   * @kind `object`
   * @required false
   * @default
   * @description 输入框样式
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: React.CSSProperties;

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
   * @detail `string`
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
