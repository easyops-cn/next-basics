import React, {
  useRef,
  useState,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef,
} from "react";
import { useTranslation } from "react-i18next";
import { Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { BrickAsComponent } from "@next-core/brick-kit";
import FullCalendar, { EventRenderRange } from "@fullcalendar/react";
import { UseBrickConf } from "@next-core/brick-types";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import customDayViewPlugin from "./component/customDayPlugin";
import {
  customDayViewContext,
  viewTypeEnum,
} from "./component/agendaCalendarContext";
import moment from "moment";
const weekNameMap = {
  "0": "周日",
  "1": "周一",
  "2": "周二",
  "3": "周三",
  "4": "周四",
  "5": "周五",
  "6": "周六",
};
const ONE_DAY_MS = 86400000;
export interface agendaDataType {
  start: string;
  end: string;
  id: string; //必填
  title?: string;
  taskData?: any;
  backgroundColor?: string;
}
export interface customHolidayType {
  start: string;
  end: string;
  name: string;
}
export interface calendarProps {
  hideSwitchMonth?: boolean;
  hideTitle?: boolean;
  displayDate?: string;
  agendaColor?: string;
  agendaData?: agendaDataType[];
  customHolidays?: customHolidayType[];
  firstDay?: number;
  agendaCollapsed?: boolean;
  showEventCount?: boolean;
  agendaRandomColor?: boolean;
  onDateSelect(date: string, data: any): void;
  onAgendaSelect(data: any): void;
  onQuickSwitchDate(viewType: string, type: string, data: any): void;
  afterTitleBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  afterQuickSwitchBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
}

export const lightThemeColor = [
  "#4F70EF",
  "#02C3D5",
  "#A74DFC",
  "#FFCA36",
  "#FE5C2F",
  "#1B63DB",
  "#FD5DB7",
  "#21C935",
  "#634EE1",
  "#FEA800",
];

export function CalendarRender(props: calendarProps, ref: any) {
  const { afterTitleBrick, afterQuickSwitchBrick, agendaData } = props;
  const fullCalendarRef = useRef<any>();
  const fullCalendarContainerRef = useRef<any>();
  const calendarApiRef = useRef<any>();
  const [holidayWidth, setHolidayWidth] = useState<number>(100);
  const [headerTitle, setHeaderTitle] = useState<string>();
  const [viewType, setViewType] = useState<viewTypeEnum>(
    viewTypeEnum.DAY_GRID_MONTH
  );

  useImperativeHandle(ref, () => fullCalendarRef.current);

  useEffect(() => {
    calendarApiRef.current = fullCalendarRef.current.getApi();
    setHeaderTitle(
      `${calendarApiRef.current?.getDate().getFullYear()}年${
        calendarApiRef.current?.getDate().getMonth() + 1
      }月`
    );
    // istanbul ignore next
    const resizer = new ResizeObserver(() => {
      const cardRectData =
        fullCalendarContainerRef.current?.getBoundingClientRect();
      const holidayWidth = cardRectData.width / 7;
      calendarApiRef.current.updateSize();
      setHolidayWidth(holidayWidth - 80);
    });
    resizer.observe(fullCalendarContainerRef.current);
    return () => {
      resizer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (calendarApiRef.current) {
      const currentDate = calendarApiRef.current.getDate() as Date;
      setHeaderTitle(
        `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${
          viewType === viewTypeEnum.CUSTOM_DAY
            ? currentDate.getDate() + "日"
            : ""
        }`
      );
    }
  }, [viewType]);
  const eventSource = useMemo(() => {
    let index = 0;
    return props.agendaData?.map((i) => {
      let bgColor = i.backgroundColor;
      if (!bgColor) {
        if (props.agendaRandomColor) {
          if (index === 10) {
            index = 0; //使用的随机颜色的数量为10个，当第10个颜色被分配完时，重新从第一个颜色开始分配。
          }
          bgColor = lightThemeColor[index];
          index += 1;
        } else {
          bgColor = props.agendaColor;
        }
      }
      return {
        ...i,
        backgroundColor: bgColor,
      };
    });
  }, [props.agendaData, props.agendaRandomColor]);

  const handleCustomDayEventClick = (date: string, e: EventRenderRange) => {
    props.onAgendaSelect({
      id: e.def.publicId,
      start: e.instance.range.start.toISOString(),
      end: e.instance.range.end.toISOString(),
      backgroundColor: e.def.ui.backgroundColor,
      title: e.def.title,
      ...e.def.extendedProps,
    });
  };
  const handleQuickSwitch = (type: string) => {
    if (type === "today") {
      calendarApiRef.current.today();
    } else if (type === "prev") {
      calendarApiRef.current.prev();
    } else {
      calendarApiRef.current.next();
    }
    const currentDate = calendarApiRef.current.getDate() as Date;
    props.onQuickSwitchDate(viewType, type, currentDate.toLocaleString());
    setHeaderTitle(
      `${currentDate.getFullYear()}年${currentDate.getMonth() + 1}月${
        viewType === viewTypeEnum.CUSTOM_DAY ? currentDate.getDate() + "日" : ""
      }`
    );
  };

  return (
    <>
      {fullCalendarContainerRef.current && (
        <div className={"customHeader"}>
          <div className="headerStartContainer">
            {!props.hideTitle && (
              <div className="headerTitle">{headerTitle}</div>
            )}
            {afterTitleBrick && afterTitleBrick.useBrick && (
              <BrickAsComponent
                useBrick={afterTitleBrick.useBrick}
                data={afterTitleBrick.data}
              ></BrickAsComponent>
            )}
          </div>

          <div className="headerEndContainer">
            {!props.hideSwitchMonth && (
              <Button.Group>
                <Button
                  icon={<LeftOutlined />}
                  onClick={() => {
                    handleQuickSwitch("prev");
                  }}
                ></Button>
                <Button
                  onClick={() => {
                    handleQuickSwitch("today");
                  }}
                >
                  今天
                </Button>
                <Button
                  icon={<RightOutlined />}
                  onClick={() => {
                    handleQuickSwitch("next");
                  }}
                ></Button>
              </Button.Group>
            )}
            {afterQuickSwitchBrick && afterQuickSwitchBrick.useBrick && (
              <BrickAsComponent
                useBrick={afterQuickSwitchBrick.useBrick}
                data={afterQuickSwitchBrick.data}
              ></BrickAsComponent>
            )}
          </div>
        </div>
      )}
      <customDayViewContext.Provider
        value={{
          eventClick: handleCustomDayEventClick,
          setViewType: (type: viewTypeEnum) => {
            setViewType(type);
          },
        }}
      >
        <div
          ref={fullCalendarContainerRef}
          className={
            viewType === viewTypeEnum.CUSTOM_DAY ? "customContainer" : ""
          }
        >
          {
            <FullCalendar
              ref={fullCalendarRef}
              handleWindowResize={true}
              dayPopoverFormat={{
                month: "numeric",
                year: "numeric",
                day: "numeric",
              }}
              moreLinkContent={
                // istanbul ignore next
                (e) => {
                  return `还有${e.num}项`;
                }
              }
              events={eventSource as any}
              initialView={viewTypeEnum.DAY_GRID_MONTH}
              firstDay={props.firstDay}
              dayHeaderContent={(e) => {
                return <div>{(weekNameMap as any)[e.dow]}</div>;
              }}
              plugins={[dayGridPlugin, interactionPlugin, customDayViewPlugin]}
              // selectable={true}//控制月，周视图的日期是否可选。暂时不需要
              initialDate={props.displayDate}
              dayMaxEvents={props.agendaCollapsed}
              eventContent={(e) => {
                return (
                  <div
                    title={e.event.title}
                    className="eventCell"
                    style={{ background: e.backgroundColor }}
                  >
                    {e.event.title}
                  </div>
                );
              }}
              dayCellContent={(e) => {
                setViewType(e.view.type as viewTypeEnum);
                const currentDate = e.date.getTime();
                const showedHoliday = props.customHolidays?.filter((i: any) => {
                  const start = parseInt(moment(i.start).format("x"));
                  const end = parseInt(moment(i.end).format("x"));
                  if (start === currentDate && end === currentDate) {
                    return true;
                  } else {
                    if (start - currentDate >= ONE_DAY_MS) {
                      return false;
                    } else if (end - currentDate <= 0) {
                      return false;
                    } else {
                      return true;
                    }
                  }
                });
                let eventCount = 0;
                if (props.showEventCount) {
                  props.agendaData.map((i) => {
                    const start = parseInt(moment(i.start).format("x"));
                    const end = parseInt(moment(i.end).format("x"));
                    if (
                      (start === currentDate && end === currentDate) ||
                      !(
                        start - currentDate >= ONE_DAY_MS ||
                        end - currentDate <= 0
                      )
                    ) {
                      eventCount += 1;
                    }
                  });
                }
                return (
                  <div
                    style={{
                      visibility: "hidden",
                    }}
                    className={"dayTopContainer"}
                  >
                    <div className="dayTopFlexDiv">
                      <div>
                        {e.isToday ? (
                          <span className="todaySpan">{e.date.getDate()}</span>
                        ) : (
                          e.date.getDate()
                        )}
                        日
                      </div>
                      {!!eventCount && (
                        <div className="eventCountDiv">{`${eventCount}项`}</div>
                      )}
                    </div>
                    {!!showedHoliday?.length && (
                      <div
                        className="holidayContainer"
                        style={{
                          width: holidayWidth,
                        }}
                      >
                        <Tooltip
                          title={showedHoliday
                            .map((i: any) => i.name?.trim())
                            .join(" ")}
                          placement="topLeft"
                        >
                          {showedHoliday
                            .map((i: any) => i.name?.trim())
                            .join(" ")}
                        </Tooltip>
                      </div>
                    )}
                  </div>
                );
              }}
              eventClick={
                // istanbul ignore next
                (e) => {
                  props.onAgendaSelect({
                    id: e.event._def.publicId,
                    start: e.event._instance.range.start.toISOString(),
                    end: e.event._instance.range.end.toISOString(),
                    backgroundColor: e.event._def.ui.backgroundColor,
                    title: e.event._def.title,
                    ...e.event._def.extendedProps,
                  });
                }
              }
              dateClick={
                // istanbul ignore next
                (e) => {
                  const currentDaysAgenda = props.agendaData?.filter(
                    (i: any) => {
                      const start = Date.parse(i.start);
                      const end = Date.parse(i.end);
                      if (start - e.date.getTime() >= ONE_DAY_MS) {
                        return false;
                      } else if (end - e.date.getTime() <= 0) {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  );
                  props.onDateSelect(
                    e.date.toLocaleString(),
                    currentDaysAgenda
                  );
                }
              }
            ></FullCalendar>
          }
        </div>
      </customDayViewContext.Provider>
    </>
  );
}

export const AgendaCalendar = forwardRef(CalendarRender);
