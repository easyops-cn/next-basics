import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  getHistory,
  UpdatingElement,
  property,
  event,
  EventEmitter,
} from "@next-core/brick-kit";

import { RangeType } from "@next-libs/datetime-components";
import { RangeText } from "@next-libs/datetime-components";

import { DatetimeSelector, ResolutionProps } from "./DatetimeSelector";
import { transformToTimestamp, formatTimeRange } from "./processor";
import { ButtonSize } from "antd/lib/button";

export interface DatetimeSelectorElementProps {
  from?: string;
  to?: string;
  customTimeRange?: RangeText[];
  placement?: TooltipPlacement;
  resolution?: ResolutionProps;
  size?: ButtonSize;
  selectNearDays?: number;
  format?: string;
  rangeDays?: number;
}

export type TooltipPlacement =
  | "top"
  | "left"
  | "right"
  | "bottom"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight"
  | "leftTop"
  | "leftBottom"
  | "rightTop"
  | "rightBottom";
/**
 * @id presentational-bricks.datetime-selector
 * @name presentational-bricks.datetime-selector
 * @docKind brick
 * @description 常用于时间的过滤，支持快速选择时间区间和自定义，例如图表或表格的时间过滤
 * @description.en Commonly used for time filtering; supports quick selection of a time range and customization, for example, time filtering for charts or tables
 * @author jo
 * @slots
 * @history
 * 1.63.0:新属性 `placement`
 * 1.80.0:新增事件 `datetime.selected.v2, datetime.selected.v3`
 * 1.105.0:新增属性 `resolution`
 * @memo
 *
 * > Tips: 第一个示例 demo 由于 shouldUpdateUrlParams=true 会更新 url 中的参数，会导致第二个示例时间选择器也会跟着变化， 而第二个示例 shouldUpdateUrlParams=false, 不会改变 url 所以第一示例不受它的影响，特作此说明。
 *
 * ```typescript
 * from to 书写规范如下：
 * now-15m 近 15 分钟
 * now-30m 近 30 分钟
 * now-1h 近 1 小时
 * now-12h 近 12 小时
 * now-24h 近 24 小时
 * now/d 今天(今天0时到现在的时间)
 * now-7d 近 7 天
 * now-30d 近 30 天
 * now-6M 近 6 月
 * now/y 今年(今年第一天开始到今天的时间)
 * now-1y 近 1 年
 * ```
 *
 * > Tips: 对于时间段范围的时间，组件封装了 parseDatetimeRange 的解析函数，统一转化为时间戳处理，不必额外再写转换函数, [github链接](https://github.com/easyops-cn/next-libs/blob/207fe7ee3ac010ab860c23cd062216c8ca612f0c/libs/datetime-components/src/processor/parseDatetimeRange.ts#L3)
 *
 * @memo.en
 *
 * > Tips: The first example demo has shouldUpdateUrlParams=true, which updates the parameters in the url and causes the time selector of the second example to change as well, while the second example has shouldUpdateUrlParams=false and does not change the url, so the first example is not affected by it. This note is made for clarification.
 *
 * ```typescript
 * The writing rules for from and to are as follows:
 * now-15m last 15 minutes
 * now-30m last 30 minutes
 * now-1h last 1 hour
 * now-12h last 12 hours
 * now-24h last 24 hours
 * now/d today (from 00:00 today to now)
 * now-7d last 7 days
 * now-30d last 30 days
 * now-6M last 6 months
 * now/y this year (from the first day of this year to now)
 * now-1y last 1 year
 * ```
 *
 * > Tips: For the time range, the component wraps the parseDatetimeRange parsing function to uniformly convert it into a timestamp for processing, so there is no need to write an additional conversion function, [github link](https://github.com/easyops-cn/next-libs/blob/207fe7ee3ac010ab860c23cd062216c8ca612f0c/libs/datetime-components/src/processor/parseDatetimeRange.ts#L3)
 *
 * @noInheritDoc
 */
export class DatetimeSelectorElement
  extends UpdatingElement
  implements DatetimeSelectorElementProps
{
  /**
   * @detail { type: "dateRange"; value: "now/d" } | { type: "specifiedDate"; value: { from: number; to: number }}
   * @description [已废弃]选择时间
   * @description.en [Deprecated] Select time
   */
  @event({ type: "datetime.selected" })
  datetimeSelectedEvent: EventEmitter<
    | { type: "dateRange"; value: "now/d" }
    | { type: "specifiedDate"; value: { from: number; to: number } }
  >;

  /**
   * @detail { from: number; to: number }
   * @description 选择当前时间戳，与 `datetime.selected` 不同的是会把时间统一转换成时间戳的形式输出
   * @description.en Select the current timestamp; unlike `datetime.selected`, the time is uniformly converted into a timestamp for output
   */
  @event({ type: "datetime.selected.v2" })
  datetimeSelectedV2Event: EventEmitter<{ from: number; to: number }>;

  /**
   * @detail { from: number; to: number } | { from: string }
   * @description 选择当前时间，与 `datetime.selected` 不同的是虽然还是区分时间戳和时间段两种类型，但是调整了输出字段格式, 这样更利于某些监控场景的使用和编排
   * @description.en Select the current time; unlike `datetime.selected`, although it still distinguishes between the two types of timestamp and time range, the output field format is adjusted, which is more convenient for the use and orchestration of some monitoring scenarios
   */
  @event({ type: "datetime.selected.v3" })
  datetimeSelectedV3Event: EventEmitter<
    { from: number; to: number } | { from: string }
  >;

  /**
   * @required true
   * @default "now-1d"
   * @description 默认起始时间，支持任意时间范围,相关规则请按下列规则书写（"now-1h", "now-1d", "now/d", "now-7d", "now-30d")  [正则表达式](https://github.com/easyops-cn/next-libs/blob/207fe7ee3ac010ab860c23cd062216c8ca612f0c/libs/datetime-components/src/processor/parseDatetimeRange.ts#L18)  注意当通过 \${query.from=now/d} 赋默认值给 form 属性时，由于 [placeholder 占位符语法](https://admin.easyops.local/next-docs/docs/brick-next/evaluate-placeholders) 不支持 `/` 的特殊字符解析，所以该值需要用字符串的形式来书写（如 demo 所示）。
   * @description.en Default start time. Any time range is supported; write the related rules according to the following rules ("now-1h", "now-1d", "now/d", "now-7d", "now-30d")  [regular expression](https://github.com/easyops-cn/next-libs/blob/207fe7ee3ac010ab860c23cd062216c8ca612f0c/libs/datetime-components/src/processor/parseDatetimeRange.ts#L18)  Note that when a default value is assigned to the form property through \${query.from=now/d}, since the [placeholder syntax](https://admin.easyops.local/next-docs/docs/brick-next/evaluate-placeholders) does not support parsing the special character `/`, the value needs to be written in the form of a string (as shown in the demo).
   * @group basic
   */
  @property()
  from: string;

  /**
   * @required false
   * @description 默认结束时间, 相关规则请参照from属性
   * @description.en Default end time; for related rules, refer to the from property
   * @group basic
   */
  @property()
  to: string;

  /**
   * @required false
   * @default true
   * @description 是否更新 url 参数并刷新页面
   * @description.en Whether to update the url parameters and refresh the page
   * @group basic
   */
  @property({
    attribute: false,
  })
  shouldUpdateUrlParams = true;

  /**
   * @kind "default" | "custom"
   * @required false
   * @default "default"
   * @description 时间选择器支持两种类型，一种是默认的，固定显示常用的几种时间范围，一种是自定义的，可根据需求定制特定时间范围
   * @description.en The time selector supports two types: one is the default type, which displays several commonly used time ranges in a fixed way; the other is the custom type, which can customize a specific time range as needed
   * @group basic
   */
  @property({
    attribute: false,
  })
  type = "default" as RangeType;

  /**
   * @kind {range: string, text: string}
   * @required false
   * @description 当 type 为 custom 时，配置定制的时间范围，目前暂支持如下时间点，当 type 为 default 时，该配置项无效
   * @description.en When type is custom, configure the customized time range; currently the following time points are supported. When type is default, this configuration item is invalid
   * @group basic
   */
  @property({
    attribute: false,
  })
  customTimeRange: RangeText[];

  /**
   * @required false
   * @default "bottom"
   * @description 弹出位置
   * @description.en Popup position
   * @group other
   */
  @property()
  placement: TooltipPlacement;

  /**
   * @kind "ms" | "s"
   * @required false
   * @default "ms"
   * @description 指定时间戳的单位，目前支持秒和毫秒，默认为毫秒，切换为秒时，url 和事件传出的时间戳都会调整成以秒为单位
   * @description.en Specify the unit of the timestamp; seconds and milliseconds are currently supported, and the default is milliseconds. When switched to seconds, the timestamps in the url and emitted by events will be adjusted to be in seconds
   * @group other
   */
  @property({
    attribute: false,
  })
  resolution: ResolutionProps = "ms";

  /**
   * @kind "default" | "large" | "small"
   * @required false
   * @description 打开选择器的按钮的大小
   * @description.en Size of the button that opens the selector
   * @group other
   */
  @property()
  size: ButtonSize;

  /**
   * @kind number
   * @required false
   * @description 限制选择近n天
   * @description.en Limit the selection to the last n days
   * @group other
   */
  @property()
  selectNearDays: number;

  /**
   * @kind string
   * @required false
   * @description 自定义日期显示格式，例如 "YYYY-MM-DD HH:mm:ss"
   * @description.en Custom date display format, for example "YYYY-MM-DD HH:mm:ss"
   * @group other
   */
  @property()
  format: string;

  /**
   * @kind number
   * @required false
   * @description 限制选择范围天数
   * @description.en Limit the number of days in the selectable range
   * @group other
   */
  @property()
  rangeDays: number;

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

  private datetimeSelected = (dateRange: any): void => {
    this.datetimeSelectedEvent.emit(dateRange);
    this.datetimeSelectedV2Event.emit(
      transformToTimestamp(dateRange, this.resolution)
    );
    this.datetimeSelectedV3Event.emit(formatTimeRange(dateRange));

    if (this.shouldUpdateUrlParams) {
      const history = getHistory();
      const urlSearchParams = new URLSearchParams(history.location.search);
      if (dateRange.type === "dateRange") {
        urlSearchParams.delete("to");
        urlSearchParams.set("from", dateRange.value);
        history.replace(`?${urlSearchParams}`);
      } else {
        urlSearchParams.set("from", dateRange.value.from);
        urlSearchParams.set("to", dateRange.value.to);
        history.replace(`?${urlSearchParams}`);
      }
    }
  };

  protected _render(): void {
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DatetimeSelector
            type={this.type}
            customTimeRange={this.customTimeRange}
            from={this.from}
            to={this.to}
            datetimeSelected={this.datetimeSelected}
            placement={this.placement}
            resolution={this.resolution}
            size={this.size}
            selectNearDays={this.selectNearDays}
            rangeDays={this.rangeDays}
            format={this.format}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.datetime-selector",
  DatetimeSelectorElement
);
