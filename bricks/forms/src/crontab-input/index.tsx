import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { CrontabInput, CrontabType } from "./CrontabInput";

export interface CrontabInputElementProps {
  name?: string;
  value?: string;
  label?: string;
  required?: boolean;
  disabledSet?: CrontabType[];
}


/**
 * @id forms.crontab-input
 * @name forms.crontab-input
 * @docKind brick
 * @description 定时器任务表单项
 * @description.en Crontab task form item
 * @author jo
 * @slots
 * @history
 * 1.28.0:新增 `crontab.change` 事件
 * @excludesInherit
 *  placeholder
 *  pattern
 * @memo
 */

export class CrontabInputElement extends FormItemElement  implements CrontabInputElementProps {
  /* =========================== Group: basic =========================== */

  /**
   * @kind string
   * @required true
   * @default -
   * @description 定时器字段名
   * @description.en Field name of the crontab
   * @group basic
   */
  @property()
  declare name: string;

  /**
   * @kind string
   * @required false
   * @default * * * * *(每分钟)
   * @group basic
   * @description 定时器时间，格式为以空格为分隔的五位字符, 按顺序分别代表分钟，小时，天，月，星期。
   * @description.en Crontab time, in the format of five space-separated characters that in order represent the minute, hour, day, month and day of week.
   */
  @property()
  value: string;

  /* =========================== Group: formLabel =========================== */

  /**
   * @kind string
   * @required false
   * @default -
   * @group formLabel
   * @description 定时器字段说明
   * @description.en Field description of the crontab
   */
  @property({ attribute: false }) declare label: string;

  /* =========================== Group: formValidation =========================== */

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   * @description.en Whether it is required
   * @group formValidation
   */
  @property({ type: Boolean }) declare required: boolean;

  /* =========================== Group: ui =========================== */

  /**
   * @kind CrontabType[]
   * @required false
   * @default []
   * @group ui
   * @description 需要disabled的的输入框 "minute" | "hour" | "date" | "month" | "dow"
   * @description.en Input boxes that need to be disabled: "minute" | "hour" | "date" | "month" | "dow"
   */
  @property({ attribute: false })
  disabledSet: CrontabType[] = [];

  /* =========================== events =========================== */

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
   * @description.en Triggered when the crontab input changes; `event.detail` is the value currently selected in the crontab
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
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            disabledSet={this.disabledSet}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.crontab-input", CrontabInputElement);
