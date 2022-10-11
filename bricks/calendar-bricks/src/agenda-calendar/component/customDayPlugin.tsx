import React from "react";
import { sliceEvents, createPlugin, ViewProps } from "@fullcalendar/react";
import {
  customDayViewContext,
  viewTypeEnum,
} from "../component/agendaCalendarContext";
const TIME_ZONE = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
];

const ONE_DAY_MS_DENOMINATOR = 864000;
class CustomView extends React.Component {
  static contextType = customDayViewContext;
  render() {
    this.context.setViewType(viewTypeEnum.CUSTOM_DAY);
    const segs = sliceEvents(this.props as any, false);
    const currentTime = (
      this.props as ViewProps
    ).dateProfile.currentRange.start.getTime();
    return (
      <>
        <div
          style={{
            overflow: "scroll",
          }}
        >
          <div className="customDayContainer">
            <div className="customTimeZoneContainerDiv">
              {TIME_ZONE.map((i, index) => (
                <div
                  className="customTimeZoneDiv"
                  key={index}
                  style={index === 23 ? { borderRight: "1px solid" } : {}}
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="customDayEventsContainerDiv">
              {segs.map((i, index) => {
                const endTime = i.range.end.getTime();
                const startTime = i.range.start.getTime();
                const widthPercent = `${
                  (endTime - startTime) / ONE_DAY_MS_DENOMINATOR
                }%`;
                const marginLeftPercent = `${
                  (startTime - currentTime) / ONE_DAY_MS_DENOMINATOR
                }%`;
                return (
                  <div
                    title={i.def.title}
                    key={`${index}${currentTime}`}
                    className="customDayEventsDiv"
                    onClick={() =>
                      this.context.eventClick(
                        (
                          this.props as ViewProps
                        ).dateProfile.currentRange.start.toLocaleString(),
                        i
                      )
                    }
                    style={{
                      width: widthPercent,
                      marginLeft: marginLeftPercent,
                      background: i.ui.backgroundColor,
                    }}
                  >
                    {i.def.title}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default createPlugin({
  views: {
    customDay: {
      buttonText: "日",
      duration: { days: 1 },
      component: CustomView,
    },
  },
});
