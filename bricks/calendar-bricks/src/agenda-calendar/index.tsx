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

/**
 * @id calendar-bricks.agenda-calendar
 * @author bot
 * @history
 * 1.x.0: 新增构件 `calendar-bricks.agenda-calendar`
 * @docKind brick
 * @noInheritDoc
 */
export class AgendaCalendarElement extends UpdatingElement {
  @property({ attribute: false })
  hideSwitchMonth: boolean;

  @property({ attribute: false })
  hideTitle: boolean;

  @property({ attribute: false })
  displayDate: string;

  @property({ attribute: false })
  agendaColor: string;

  @property({ attribute: false })
  agendaData: agendaDataType[];

  @property({ attribute: false })
  customHolidays: customHolidayType[];

  afterTitleBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };
  afterQuickSwitchBrick?: {
    useBrick: UseBrickConf;
    data: unknown;
  };

  @event({ type: "calendar.onDateSelect" })
  onDateSelect: EventEmitter<{ date: string; data: any }>;

  @event({ type: "calendar.onAgendaSelect" })
  onAgendaSelect: EventEmitter<{ date: string; data: any }>;

  private _handleDateSelect = (date: string, data: any) => {
    this.onDateSelect.emit({ date, data });
  };

  private _handleAgendaSelect = (date: string, data: any) => {
    this.onAgendaSelect.emit({ date, data });
  };
  private _calendarRef = createRef<any>();

  @method()
  setViewType(type: "dayGridMonth" | "dayGridWeek"): void {
    //日视图暂时不支持
    this._calendarRef.current.getApi().changeView(type);
  }

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
            agendaData={this.agendaData}
            afterTitleBrick={this.afterTitleBrick}
            afterQuickSwitchBrick={this.afterQuickSwitchBrick}
            ref={this._calendarRef}
            displayDate={this.displayDate}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("calendar-bricks.agenda-calendar", AgendaCalendarElement);
