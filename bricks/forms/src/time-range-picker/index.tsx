import React from "react";
import ReactDOM from "react-dom";
import i18n from "i18next";
import { ValidationRule } from "@ant-design/compatible/lib/form";

import {
  BrickWrapper,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";

import { TimeRangePicker, TimeRange, RangeType } from "./TimeRangePicker";
import { NS_FORMS, K } from "../i18n/constants";

/**
* @id forms.time-range-picker
* @name forms.time-range-picker
* @docKind brick
* @description 由两个时间选择器组成
* @author ice
* @slots
* @history
* 1.28.0:新增 `time.range.change` 事件
* 1.59.0:新增 `rangeType` 属性
* @memo
* ```typescript
* export interface TimeRange {
*  startTime: string;
*  endTime: string;
*}

*export type RangeType = "time" | "date" | "dateTime";
*```
*/
export class TimeRangePickerElement extends FormItemElement {
  private _defaultFormat = "HH:mm:ss";

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
   * @kind `TimeRange`
   * @required false
   * @default { "startTime": "00:00:00", "endTime": "23:59:59" }
   * @description 初始值
   */
  @property({ attribute: false })
  value: TimeRange;

  /**
   * @kind boolean
   * @required false
   * @default -
   * @description 是否必填项
   */
  @property({ type: Boolean }) required: boolean;

  /**
   * @kind `RangeType`
   * @required false
   * @default "time"
   * @description 时间段类型
   */
  @property()
  rangeType: RangeType;

  unequal = (
    rule: any,
    value: TimeRange,
    callback: (err?: any) => void
  ): void => {
    try {
      if (value.startTime === value.endTime) {
        throw new Error(rule.message);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  startTimeRequired = (
    rule: any,
    value: TimeRange,
    callback: (err?: any) => void
  ): void => {
    try {
      if (!value.startTime && this.required) {
        throw new Error(rule.message);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  endTimeRequired = (
    rule: any,
    value: TimeRange,
    callback: (err?: any) => void
  ): void => {
    try {
      if (!value.endTime && this.required) {
        throw new Error(rule.message);
      }
      callback();
    } catch (err) {
      callback(err);
    }
  };

  private _builtInvalidator: Pick<ValidationRule, "validator" | "message">[] = [
    {
      message: i18n.t(`${NS_FORMS}:${K.START_TIME_REQUIRED}`),
      validator: this.startTimeRequired,
    },
    {
      message: i18n.t(`${NS_FORMS}:${K.END_TIME_REQUIRED}`),
      validator: this.endTimeRequired,
    },
    {
      message: i18n.t(`${NS_FORMS}:${K.START_TIME_END_TIME_CANNOT_EQUAL}`),
      validator: this.unequal,
    },
  ];
  /**
   * @detail `TimeRange`
   * @description 时间段变化时触发，event.detail 为包含起始时间和结束时间的时间段范围
   */
  @event({ type: "time.range.change" }) changeEvent: EventEmitter<TimeRange>;

  private _handleChange = (value: TimeRange): void => {
    this.value = value;
    this.changeEvent.emit(value);
  };

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      let format = this._defaultFormat;
      switch (this.rangeType) {
        case "date":
          format = "YYYY-MM-DD";
          break;
        case "dateTime":
          format = `YYYY-MM-DD ${this._defaultFormat}`;
          break;
      }

      ReactDOM.render(
        <BrickWrapper>
          <TimeRangePicker
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            required={this.required}
            message={this.message}
            validator={
              this.validator
                ? this._builtInvalidator.concat(this.validator)
                : this._builtInvalidator
            }
            notRender={this.notRender}
            value={this.value}
            rangeType={this.rangeType}
            format={format}
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

customElements.define("forms.time-range-picker", TimeRangePickerElement);
