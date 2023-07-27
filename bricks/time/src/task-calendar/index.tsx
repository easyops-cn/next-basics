import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import {
  BriefData,
  ImportantData,
  TaskData,
  ImportanceSettings,
  TaskSettings,
  DateDetail,
} from "../interfaces";
import { TaskCalendar } from "./TaskCalendar";
import { ModeType } from "./utils";

/**
 * @id time.task-calendar
 * @author nlicroshan
 * @history
 * 1.0.0: 新增构件 `time.task-calendar`
 * @docKind brick
 * @noInheritDoc
 */
export class TaskCalendarElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 今天的日期
   */
  @property({
    attribute: false,
  })
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 默认选中的日期
   */
  @property({
    attribute: false,
  })
  defaultSelectedDate: string;

  /**
   * @kind BriefData[]
   * @required false
   * @default -
   * @description 在日期左上角显示的简要信息
   */
  @property({
    attribute: false,
  })
  briefList: BriefData[];

  /**
   * @kind TaskData[]
   * @required false
   * @default -
   * @description 任务列表信息，会在日期左下角显示原点，在底部展示任务列表
   */
  @property({
    attribute: false,
  })
  taskList: TaskData[];

  /**
   * @kind ImportantData[]
   * @required false
   * @default -
   * @description 重要事项信息，会改变日期背景颜色，在底部展示重要事项
   */
  @property({
    attribute: false,
  })
  importantList: ImportantData[];

  /**
   * @kind TaskSettings
   * @required false
   * @default -
   * @description 任务列表显示设置
   */
  @property({
    attribute: false,
  })
  taskSettings: TaskSettings;

  /**
   * @kind ImportanceSettings
   * @required false
   * @default -
   * @description 重要事项显示设置
   */
  @property({
    attribute: false,
  })
  importanceSettings: ImportanceSettings;

  /**
   * @kind string | number
   * @required false
   * @default 50px
   * @description 日历单元格高度
   */
  @property({
    attribute: false,
  })
  dateCellHeight: React.CSSProperties["height"];

  /**
   * @kind object
   * @required false
   * @default -
   * @description footer样式
   */
  @property({
    attribute: false,
  })
  footerStyle: React.CSSProperties;

  /**
   * @kind boolean
   * @required false
   * @default true
   * @description 是否在显示农历文字
   */
  @property({
    attribute: false,
  })
  showLunarInfo = true;

  /**
   * @kind ModeType
   * @required false
   * @default month
   * @description 视图模式
   */
  @property({
    attribute: false,
  })
  mode: ModeType;

  /**
   * @detail DateDetail
   * @description 点击选择日期事件 date为选择的日期，data为该日期上的数据
   */
  @event({ type: "calendar.onSelect" })
  calendarOnSelect: EventEmitter<DateDetail>;
  private _handleSelect = (detail: DateDetail): void => {
    this.calendarOnSelect.emit(detail);
  };

  /**
   * @detail {mode: string; date: string}
   * @description 日期面板变化事件 date为当前面板的日期，mode为面板类型
   */
  @event({ type: "calendar.onPanelChange" })
  calendarOnPanelChange: EventEmitter<{ mode: string; date: string }>;
  private _handlePanelChange = (detail: {
    mode: string;
    date: string;
  }): void => {
    this.calendarOnPanelChange.emit(detail);
  };

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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <TaskCalendar
            briefList={this.briefList}
            taskList={this.taskList}
            importantList={this.importantList}
            taskSettings={this.taskSettings}
            importanceSettings={this.importanceSettings}
            onDateSelect={this._handleSelect}
            onPickerPanelChange={this._handlePanelChange}
            value={this.value}
            defaultSelectedDate={this.defaultSelectedDate}
            footerStyle={this.footerStyle}
            dateCellHeight={this.dateCellHeight}
            showLunarInfo={this.showLunarInfo}
            mode={this.mode}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("time.task-calendar", TaskCalendarElement);
