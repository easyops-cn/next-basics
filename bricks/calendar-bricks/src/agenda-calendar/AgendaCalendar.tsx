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
import FullCalendar from "@fullcalendar/react";
import { UseBrickConf } from "@next-core/brick-types";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

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
  onDateSelect(date: string, data: any): void;
  onAgendaSelect(date: string, data: any): void;
  afterTitleBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
  afterQuickSwitchBrick?: {
    useBrick: UseBrickConf;
    data?: any;
  };
}

export function CalendarRender(props: calendarProps, ref: any) {
  const { afterTitleBrick, afterQuickSwitchBrick, agendaData } = props;
  const fullCalendarRef = useRef<any>();
  const fullCalendarContainerRef = useRef<any>();
  const calendarApiRef = useRef<any>();
  const [holidayWidth, setHolidayWidth] = useState<number>(100);
  const [headerTitle, setHeaderTitle] = useState<string>();
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

  const eventSource = useMemo(() => {
    return props.agendaData?.map((i) => ({
      ...i,
      backgroundColor: i.backgroundColor || props.agendaColor,
      allDay: "true",
    }));
  }, [props.agendaData]);
  const handleQuickSwitch = (type: string) => {
    if (type === "today") {
      calendarApiRef.current.today();
    } else if (type === "prev") {
      calendarApiRef.current.prev();
    } else {
      calendarApiRef.current.next();
    }
    setHeaderTitle(
      `${calendarApiRef.current.getDate().getFullYear()}年${
        calendarApiRef.current.getDate().getMonth() + 1
      }月`
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
      <div ref={fullCalendarContainerRef}>
        {
          <FullCalendar
            ref={fullCalendarRef}
            events={eventSource as any}
            initialView="dayGridMonth"
            dayHeaderContent={(e) => {
              return <div>{(weekNameMap as any)[e.dow]}</div>;
            }}
            plugins={[dayGridPlugin, interactionPlugin]}
            // selectable={true}
            initialDate={props.displayDate}
            dayMaxEvents={true}
            eventContent={(e) => {
              return (
                <div title={e.event.title} className="eventCell">
                  {e.event.title}
                </div>
              );
            }}
            dayCellContent={(e) => {
              const currentDate = e.date.getTime();
              const showedHoliday = props.customHolidays?.filter((i: any) => {
                const start = Date.parse(i.start);
                const end = Date.parse(i.end);
                if (start - currentDate >= ONE_DAY_MS) {
                  return false;
                } else if (end - currentDate <= 0) {
                  return false;
                } else {
                  return true;
                }
              });
              return (
                <div
                  style={{
                    visibility: "hidden",
                  }}
                  className={"dayTopContainer"}
                >
                  <div style={{ float: "right", color: "rgb(51,51,51)" }}>
                    {e.isToday ? (
                      <span className="todaySpan">{e.date.getDate()}</span>
                    ) : (
                      e.date.getDate()
                    )}
                    日
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
                props.onAgendaSelect(
                  e.view.calendar.getDate().toLocaleString(),
                  agendaData?.find((i) => i.id === e.event.id)
                );
              }
            }
            dateClick={
              // istanbul ignore next
              (e) => {
                const currentDaysAgenda = props.agendaData?.filter((i: any) => {
                  const start = Date.parse(i.start);
                  const end = Date.parse(i.end);
                  if (start - e.date.getTime() >= ONE_DAY_MS) {
                    return false;
                  } else if (end - e.date.getTime() <= 0) {
                    return false;
                  } else {
                    return true;
                  }
                });
                props.onDateSelect(e.date.toLocaleString(), currentDaysAgenda);
              }
            }
          ></FullCalendar>
        }
      </div>
    </>
  );
}

export const AgendaCalendar = forwardRef(CalendarRender);
