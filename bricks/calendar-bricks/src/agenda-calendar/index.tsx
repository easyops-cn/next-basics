import React, { createRef } from "react";
import ReactDOM from "react-dom";
import styles from "./index.shadow.less";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  method,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";
import {
  AgendaCalendar,
  agendaDataType,
  customHolidayType,
} from "./AgendaCalendar";
import { viewTypeEnum } from "./component/agendaCalendarContext";

/**
 * @id calendar-bricks.agenda-calendar
 * @author zhendonghuang
 * @history
 * 1.x.0: 新增构件 `calendar-bricks.agenda-calendar`
 * @docKind brick
 * @noInheritDoc
 */
export class AgendaCalendarElement extends UpdatingElement {
  /**
   * @kind boolean
   * @default  false
   * @required false
   * @description 是否隐藏快速切换按钮
   * @group basic
   */
  @property({ attribute: false })
  hideSwitchMonth: boolean;

  /**
   * @kind boolean
   * @default  false
   * @required false
   * @description 隐藏顶部的月份/日期标题
   * @group basic
   */
  @property({ attribute: false })
  hideTitle: boolean;

  /**
   * @kind string
   * @required false
   * @description 日历默认值,只在日历构件初始化的时候使用，后续要展示具体的某一天，可以gotoDate方法来实现。
   * @group basic
   */
  @property({ attribute: false })
  displayDate: string;

  /**
   * @kind string
   * @default  orange
   * @required false
   * @description 日程背景颜色。
   * @group ui
   */
  @property({ attribute: false })
  agendaColor: string;

  /**
   * @kind agendaDataType[]
   * @required false
   * @description 日程数据。
   * @group basic
   */
  @property({ attribute: false })
  agendaData: agendaDataType[];

  /**
   * @kind customHolidayType[]
   * @required false
   * @description 自定义特殊日期。
   * @group basic
   */
  @property({ attribute: false })
  customHolidays: customHolidayType[];

  /**
   * @kind number
   * @required false
   * @description 月/周视图的开始时间，默认为0。
   * @group basic
   */
  @property({ attribute: false })
  firstDay: number;

  /**
   * @kind boolean
   * @default  false
   * @required false
   * @description 日程任务过多时，是否折叠日程
   * @group basic
   */
  @property({ attribute: false })
  agendaCollapsed = false;

  /**
   * @kind boolean
   * @default  true
   * @required false
   * @description 月/周视图是否展示一天的日程任务数
   * @group basic
   */
  @property({ attribute: false })
  showEventCount = true;

  /**
   * @kind boolean
   * @default  false
   * @required false
   * @description 为不同日程随机使用不同颜色
   * @group ui
   */
  @property({ attribute: false })
  agendaRandomColor = false;

  /**
   * @description 在顶部的月份/具体日期标题后面使用子构件，具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @group other
   */
  @property({
    attribute: false,
  })
  afterTitleBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };

  /**
   * @description 在快速切换月、周、日的按钮后面使用子构件，具体查看 [UseBrickConf](/next-docs/docs/api-reference/brick-types.usesinglebrickconf)
   * @group other
   */
  @property({
    attribute: false,
  })
  afterQuickSwitchBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };

  /**
   * @description 选中的日期的时间和这天的日程
   */
  @event({ type: "calendar.onDateSelect" })
  onDateSelect: EventEmitter<{ date: string; data: any }>;

  /**
   * @description 选中的日程
   */
  @event({ type: "calendar.onAgendaSelect" })
  onAgendaSelect: EventEmitter<{ data: any }>;

  /**
   * @description 点击快速切换按钮时，当前的视图类型、快速切换的操作类型（prev/today/next）、切换到的目标日期
   */
  @event({ type: "calendar.onQuickSwitchDate" })
  onQuickSwitchDate: EventEmitter<{
    viewType: string;
    type: string;
    data: any;
  }>;

  /**
   * @param `type: viewTypeEnum`
   * @description 设置当前展示的视图类型，目前有月、周、自定义日三种视图
   */
  @method()
  setViewType(type: viewTypeEnum): void {
    this._calendarRef.current.getApi().changeView(type);
  }

  /**
   * @param `date: string|number`
   * @description 设置要展示的具体时间
   */
  @method()
  gotoDate(date: string | number): void {
    this._calendarRef.current.getApi().gotoDate(date);
  }

  // istanbul ignore next
  private _handleDateSelect = (date: string, data: any) => {
    this.onDateSelect.emit({ date, data });
  };

  // istanbul ignore next
  private _handleQuickSwitchDate = (
    viewType: string,
    type: string,
    data: any
  ) => {
    this.onQuickSwitchDate.emit({ viewType, type, data });
  };

  // istanbul ignore next
  private _handleAgendaSelect = (data: any) => {
    this.onAgendaSelect.emit({ data });
  };

  private _calendarRef = createRef<any>();

  constructor() {
    super();
    const styleElement = document.createElement("style");
    styleElement.type = "text/css";
    styleElement.innerText = styles;
    document.head.appendChild(styleElement);
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

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <AgendaCalendar
            hideSwitchMonth={this.hideSwitchMonth}
            hideTitle={this.hideTitle}
            agendaColor={this.agendaColor || "orange"}
            customHolidays={this.customHolidays}
            onAgendaSelect={this._handleAgendaSelect}
            onDateSelect={this._handleDateSelect}
            onQuickSwitchDate={this._handleQuickSwitchDate}
            agendaData={this.agendaData}
            afterTitleBrick={this.afterTitleBrick}
            afterQuickSwitchBrick={this.afterQuickSwitchBrick}
            ref={this._calendarRef}
            displayDate={this.displayDate}
            firstDay={this.firstDay}
            agendaCollapsed={this.agendaCollapsed}
            showEventCount={this.showEventCount}
            agendaRandomColor={this.agendaRandomColor}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("calendar-bricks.agenda-calendar", AgendaCalendarElement);
