import React, { CSSProperties } from "react";
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
   * @required true
   * @default -
   * @description 字段名
   * @group basicFormItem
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @required false
   * @default -
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @required true
   * @default -
   * @description 补全选项列表
   * @group basicFormItem
   */
  @property({ attribute: false })
  options: string[] | OptionType[];

  /**
   * @required false
   * @default -
   * @description 当前值
   * @group basicFormItem
   */
  @property()
  value: string;

  /**
   * @required false
   * @default -
   * @description 占位说明
   * @group basicFormItem
   */
  @property({ attribute: false }) declare placeholder: string;

  /**
   * @required false
   * @default -
   * @description 是否禁用
   * @group basicFormItem
   */
  @property({ attribute: false }) declare disabled: boolean;

  /**
   * @required false
   * @default -
   * @description 是否必填项
   * @group basicFormItem
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @required false
   * @default -
   * @description 校验文本信息
   * @group basicFormItem
   */
  @property({ attribute: false }) declare message: Record<string, string>;

  /**
   * @required false
   * @default
   * @description 输入框样式,CSSProperties 包含的属性可[查看](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference#index),需要注意的是该属性中的 key 需要转为小驼峰命名的方式，如设置 background-color 样式其形式为 { backgroundColor: "red"}, 具体原因可 [查看](https://zh-hans.reactjs.org/docs/dom-elements.html#style)
   * @group ui
   */
  @property({
    attribute: false,
  })
  inputBoxStyle: CSSProperties;

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
