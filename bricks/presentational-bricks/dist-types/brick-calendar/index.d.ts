import type { CalendarMode } from "antd/lib/calendar/generateCalendar";
import type { UseBrickConf } from "@next-core/brick-types";

export interface PanelEvent {
  /** 日期 */
  date: moment.Moment;
  /** 显示模式 month/year */
  mode: CalendarMode;
}

export interface BrickCalendarProps {
  value?: moment.Moment;
  mode?: CalendarMode;
  fullscreen?: boolean;
  dateCell?: { useBrick: UseBrickConf };
  monthCell?: { useBrick: UseBrickConf };
  data?: any[];
}

export interface BrickCalendarEvents {
  "presentational.calendar.onSelect": CustomEvent<moment.Moment>;
  "presentational.calendar.onSelect-v2": CustomEvent<{
    date: moment.Moment;
    data: any;
  }>;
  "presentational.calendar.onChange": CustomEvent<moment.Moment>;
  "presentational.calendar.onChange-v2": CustomEvent<{
    date: moment.Moment;
    data: any;
  }>;
  "presentational.calendar.onPanelChange": CustomEvent<PanelEvent>;
}

export interface BrickCalendarEventsMap {
  onPresentationalCalendarOnSelect: "presentational.calendar.onSelect";
  onPresentationalCalendarOnSelectV2: "presentational.calendar.onSelect-v2";
  onPresentationalCalendarOnChange: "presentational.calendar.onChange";
  onPresentationalCalendarOnChangeV2: "presentational.calendar.onChange-v2";
  onPresentationalCalendarOnPanelChange: "presentational.calendar.onPanelChange";
}

export declare class BrickCalendarElement extends HTMLElement {
  value: moment.Moment | undefined;
  mode: CalendarMode | undefined;
  fullscreen: boolean | undefined;
  dateCell: { useBrick: UseBrickConf } | undefined;
  monthCell: { useBrick: UseBrickConf } | undefined;
  data: any[] | undefined;
}
