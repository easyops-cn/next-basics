import React from "react";
import ReactDOM from "react-dom";
import {
  BrickAsComponent,
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { Calendar } from "antd";
import moment from "moment";
import { CalendarMode } from "antd/lib/calendar/generateCalendar";
import { UseBrickConf } from "@next-core/brick-types";
import { groupBy } from "lodash";

/** panelEvent */
export interface PanelEvent {
  /** 日期 */
  date: moment.Moment;
  /** 显示模式 month/year */
  mode: CalendarMode;
}

/**
 * @id presentational-bricks.calendar
 * @name 日历 calendar
 * @docKind brick
 * @description 按照日历形式展示数据的容器
 * @author Alex
 * @history
 * 1.101.0:新增构件 `presentational-bricks.brick-calendar`
 * @memo
 * ### UseBrickConf
 *
 * | property      | type           | required | default | description                                        |
 * | ------------- | -------------- | -------- | ------- | -------------------------------------------------- |
 * | brick         | string         | ✔️       | -       | 构件名称                                           |
 * | properties    | object         | -        | -       | 构件属性                                           |
 * | events        | BrickEventsMap | -        | -       | 事件                                               |
 * | transform     | string\|object | -        | -       | 属性数据转换                                     ! |
 * | transformFrom | string         | -        | -       | 属性数据转换来自数据源的哪个字段，不填则为整个数据 |
 * @noInheritDoc
 */
export class BrickCalendarElement extends UpdatingElement {
  /**
   * @category property
   * @kind [moment](https://momentjs.com)
   * @required false
   * @default 当前日期
   * @description value  日历默认值.
   */
  @property({ attribute: false })
  value: moment.Moment = moment();

  /**
   * @category property
   * @anchor
   * @kind month/year
   * @required false
   * @default month
   * @description 初始模式.
   */
  @property({ attribute: false })
  mode: CalendarMode = "month";

  /**
   * @category property
   * @kind Boolean
   * @required true
   * @default true
   * @description 是否全屏展示
   */
  @property({
    attribute: false,
  })
  fullscreen = true;

  /**
   * @category property
   * @kind [UseBrickConf](#UseBrickConf)
   * @required -
   * @default -
   * @description 自定义 brick 渲染日期单元格，返回内容会被追加到单元格
   */
  @property({ attribute: false })
  dateCell: { useBrick: UseBrickConf };

  /**
   * @category property
   * @kind [UseBrickConf](#UseBrickConf)
   * @required true
   * @default -
   * @description 自定义 brick 渲染日期单元格，返回内容会被追加到单元格
   */
  @property({ attribute: false })
  monthCell: { useBrick: UseBrickConf };

  private _dateData: Record<string, any> = {};
  private _monthData: Record<string, any> = {};
  /**
   * @kind any[]
   * @required false
   * @default -
   * @description 数据源
   */
  @property({
    __unstable_doNotDecorate: true,
  })
  set data(value: any[]) {
    const formatData = value.map((item) => ({
      ...item,
      _formatDate: {
        date: moment(item.date).format("YYYY-MM-DD"),
        month: moment(item.date).format("YYYY-MM"),
      },
    }));
    this._dateData = groupBy(formatData, "_formatDate.date");
    this._monthData = groupBy(formatData, "_formatDate.month");
  }

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

  getDataByMode(date: moment.Moment, mode: CalendarMode): any[] {
    let data: Record<string, any> = {};
    let formatDate: string;
    switch (mode) {
      case "month":
        data = this._dateData;
        formatDate = date.format("YYYY-MM-DD");
        break;
      case "year":
        data = this._monthData;
        formatDate = date.format("YYYY-MM");
        break;
    }
    return data[formatDate];
  }

  /**
   * @detail [moment](https://momentjs.com)
   * @description 点击选择日期事件
   */
  @event({ type: "presentational.calendar.onSelect" })
  onSelect: EventEmitter<moment.Moment>;
  /**
   * @detail { date: [moment](https://momentjs.com); data: any }
   * @description 点击选择日期事件-v2
   */
  @event({ type: "presentational.calendar.onSelect-v2" })
  onSelectV2: EventEmitter<{ date: moment.Moment; data: any }>;

  handleSelect = (date?: moment.Moment) => {
    const curData = this.getDataByMode(date, this.mode);
    this.value = date;
    this.onSelect.emit(date);
    this.onSelectV2.emit({ date, data: curData });
  };

  /**
   * @detail [moment](https://momentjs.com)
   * @description 日期变化事件
   */
  @event({ type: "presentational.calendar.onChange" })
  onChange: EventEmitter<moment.Moment>;
  /**
   * @detail { date: [moment](https://momentjs.com); data: any }
   * @description 日期变化事件
   */
  @event({ type: "presentational.calendar.onChange-v2" })
  onChangeV2: EventEmitter<{ date: moment.Moment; data: any }>;

  handleChange = (date?: moment.Moment) => {
    const curData = this.getDataByMode(date, this.mode);
    this.value = date;
    this.onChange.emit(date);
    this.onChangeV2.emit({ date, data: curData });
  };

  /**
   * @detail PanelEvent
   * @description 日期面板变化回调
   */
  @event({ type: "presentational.calendar.onPanelChange" })
  onPanelChange: EventEmitter<PanelEvent>;
  handlePanelChange = (date: moment.Moment, mode: CalendarMode) => {
    this.mode = mode;
    this.onPanelChange.emit({ date: date, mode: mode } as PanelEvent);
  };

  getCustomComp = (cell: { useBrick: UseBrickConf }, mode: CalendarMode) => {
    const CustomComp = (date: moment.Moment) => {
      const curData = this.getDataByMode(date, mode);
      if (cell.useBrick) {
        return (
          <BrickAsComponent
            useBrick={cell.useBrick as any}
            data={{
              date,
              data: curData,
            }}
          />
        );
      }
      return null;
    };
    return CustomComp;
  };

  dateCellRender = (date: moment.Moment) => {
    return this.dateCell
      ? this.getCustomComp(this.dateCell, "month")(date)
      : null;
  };

  monthCellRender = (date: moment.Moment) => {
    return this.monthCell
      ? this.getCustomComp(this.monthCell, "year")(date)
      : null;
  };

  // antd design defaultValue实现逻辑有问题，故不加入defaultValue , so,  value 就等于defaultValue
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <Calendar
            value={this.value}
            mode={this.mode}
            fullscreen={!!this.fullscreen}
            dateCellRender={this.dateCellRender}
            monthCellRender={this.monthCellRender}
            onSelect={this.handleSelect}
            onChange={this.handleChange}
            onPanelChange={this.handlePanelChange}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.calendar", BrickCalendarElement);
