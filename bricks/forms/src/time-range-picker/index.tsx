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

import {
  TimeRangePicker,
  TimeRange,
  RangeType,
  presetRangeType,
} from "./TimeRangePicker";
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
* 1.202.7 新增 `emitChangeOnInit`属性
* @excludesInherit
*  placeholder
*  pattern
* @memo
* ```typescript
* export interface TimeRange {
*  startTime: string;
*  endTime: string;
*}

*export type RangeType = "time" | "date" | "dateTime" | "hmTime" | "week" | "month" | "quarter" | "year";

*export enum presetRangeType {
*  Today = "今天",
*  ThisWeek = "本周",
*  ThisMonth = "本月",
*  ThisQuarter = "本季度",
*  ThisYear = "今年",
*}
*```
*/
export class TimeRangePickerElement extends FormItemElement {
  private _defaultFormat = "HH:mm:ss";

  /**
   * @group basicFormItem
   * @required true
   * @description 字段名
   */
  @property({ attribute: false }) declare name: string;

  /**
   * @group basicFormItem
   * @required false
   * @description 字段说明
   */
  @property({ attribute: false }) declare label: string;

  /**
   * @group basicFormItem
   * @required false
   * @default { "startTime": "00:00:00", "endTime": "23:59:59" }
   * @description 初始值
   */
  @property({ attribute: false })
  value: TimeRange;

  /**
   * @group basicFormItem
   * @required false
   * @description 是否必填项
   */
  @property({ type: Boolean }) declare required: boolean;

  /**
   * @group basicFormItem
   * @required false
   * @default "time"
   * @description 时间段类型
   */
  @property()
  rangeType: RangeType;

  /**
   * @group basicFormItem
   * @required false
   * @description 只有rangeType在`date` 和 `dateTime`下， 才支持只选择最近n天(当前时间向前n天)
   */
  @property()
  selectNearDays: number;

  /**
   * @group basicFormItem
   * @required false
   * @default  true
   * @description 是否在初始化完成后额外触发一次`time.range.change`, 这里因为历史原因之前默认行为就是在初始化后会触发该事件，这里为了兼容之前的行为，默认值只能设置为 true。
   */
  @property({ attribute: false })
  emitChangeOnInit = true;

  /**
   * @group other
   * @required false
   * @default  []
   * @description 预设时间范围快捷选择；设置了属性selectNearDays时，属性presetRanges不生效；属性rangeType为week时，presetRanges的值只能为本周、本月、本季度、今年，属性rangeType为month、quarter、year时，以此类推
   */
  @property({ attribute: false })
  presetRanges: presetRangeType[] = [];

  /**
   * @description 开始时间结束时间是否允许相等
   */
  @property({ type: Boolean })
  allowEqual: boolean;

  unequal = (
    rule: any,
    value: TimeRange,
    callback: (err?: any) => void
  ): void => {
    if (this.allowEqual) {
      callback();
      return;
    }
    try {
      if (
        value.startTime &&
        value.endTime &&
        value.startTime === value.endTime
      ) {
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
        case "hmTime":
          format = `HH:mm`;
          break;
        case "week": //week,month,quarter,year 不设置format，使用ant.design RangePicker的默认format
          format = "";
          break;
        case "month":
          format = "";
          break;
        case "quarter":
          format = "";
          break;
        case "year":
          format = "";
          break;
      }

      ReactDOM.render(
        <BrickWrapper>
          <TimeRangePicker
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            labelTooltip={this.labelTooltip}
            labelColor={this.labelColor}
            labelBold={this.labelBold}
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
            emitChangeOnInit={this.emitChangeOnInit}
            selectNearDays={this.selectNearDays}
            presetRanges={this.presetRanges}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("forms.time-range-picker", TimeRangePickerElement);
