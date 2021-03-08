import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { CrontabInput } from "./CrontabInput";

/**
 * @id forms.crontab-input
 * @name forms.crontab-input
 * @docKind brick
 * @description 定时器任务表单项
 * @author jo
 * @slots
 * @history
 * 1.28.0:新增 `crontab.change` 事件
 * @memo
 * @noInheritDoc
 */
export class CrontabInputElement extends FormItemElement {
  /**
   * @kind string
   * @required true
   * @default -
   * @description 定时器字段名
   */
  @property()
  name: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 定时器字段说明
   */
  @property({ attribute: false }) label: string;

  /**
   * @kind string
   * @required false
   * @default * * * * *(每分钟)
   * @description 定时器时间，格式为以空格为分隔的五位字符, 按顺序分别代表分钟，小时，天，月，星期。
   */
  @property()
  value: string;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;

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
   * @description 定时器输入变化时触发，`event.detail` 为当前定时器选择的值
   */
  @event({ type: "crontab.change" }) changeEvent: EventEmitter<string>;
  private _handleChange = (value: string): void => {
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <CrontabInput
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            message={this.message}
            validator={this.validator}
            notRender={this.notRender}
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

customElements.define("forms.crontab-input", CrontabInputElement);
