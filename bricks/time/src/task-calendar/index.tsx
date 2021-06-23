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
} from "../interfaces";
import { TaskCalendar } from "./TaskCalendar";

/**
 * @id time.task-calendar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `time.task-calendar`
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
  briefData: BriefData[];

  /**
   * @kind TaskData[]
   * @required false
   * @default -
   * @description 任务列表信息，会在日期左下角显示原点，在底部展示任务列表
   */
  @property({
    attribute: false,
  })
  taskData: TaskData[];

  /**
   * @kind ImportantData[]
   * @required false
   * @default -
   * @description 重要事项信息，会改变日期背景颜色，在底部展示重要事项
   */
  @property({
    attribute: false,
  })
  importantData: ImportantData[];

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
   * @detail { date: string; data?: Record<string, any>}
   * @description 点击选择日期事件 date为选择的日期，data为该日期上的数据
   */
  @event({ type: "calendar.onSelect" })
  calendarOnSelect: EventEmitter<{ date: string; data?: Record<string, any> }>;
  private _handleSelect = (detail: {
    date: string;
    data?: Record<string, any>;
  }): void => {
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
            briefData={this.briefData}
            taskData={this.taskData}
            importantData={this.importantData}
            taskSettings={this.taskSettings}
            importanceSettings={this.importanceSettings}
            onDateSelect={this._handleSelect}
            onPickerPanelChange={this._handlePanelChange}
            value={this.value}
            defaultSelectedDate={this.defaultSelectedDate}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("time.task-calendar", TaskCalendarElement);
