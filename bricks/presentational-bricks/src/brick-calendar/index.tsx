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
  mode: CalendarMode;

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

  /**
   * @detail [moment](https://momentjs.com)
   * @description 点击选择日期事件
   */
  @event({ type: "presentational.calendar.onSelect" })
  onSelect: EventEmitter<moment.Moment>;
  handleSelect = (date?: moment.Moment) => {
    this.value = date;
    this.onSelect.emit(date);
  };

  /**
   * @detail [moment](https://momentjs.com)
   * @description 日期变化事件
   */
  @event({ type: "presentational.calendar.onChange" })
  onChange: EventEmitter<moment.Moment>;
  handleChange = (date?: moment.Moment) => {
    this.value = date;
    this.onChange.emit(date);
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

  getCustomComp = (cell: { useBrick: UseBrickConf }) => {
    return function CustomComp(date: moment.Moment) {
      if (cell.useBrick) {
        return (
          <BrickAsComponent
            useBrick={cell.useBrick as any}
            data={{
              date,
            }}
          />
        );
      }

      return null;
    };
  };

  dateCellRender = (date: moment.Moment) => {
    return this.dateCell ? this.getCustomComp(this.dateCell)(date) : null;
  };

  monthCellRender = (date: moment.Moment) => {
    return this.monthCell ? this.getCustomComp(this.monthCell)(date) : null;
  };

  // antd design defaultValue实现逻辑有问题，故不加入defaultValue , so,  value 就等于defaultValue
  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <Calendar
            value={this.value}
            mode={this.mode || "month"}
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
