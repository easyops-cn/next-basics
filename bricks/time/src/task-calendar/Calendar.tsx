import React, { useEffect, useMemo, useState } from "react";
import { Select, Radio } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import moment, { Moment } from "moment";
import styles from "./Calendar.module.css";
import classNames from "classnames";
import i18next from "i18next";
import { K, NS_TIME } from "../i18n/constants";
import {
  MONTHS,
  WEEKS,
  ModeType,
  getYearRange,
  getDate,
  getCalendarData,
} from "./utils";

const { Option } = Select;

export interface CalendarProps {
  dateFullCellRender: (date: Moment) => React.ReactNode;
  onSelect: (date: Moment) => void;
  onPanelChange: (date: Moment, mode: "month" | "week") => void;
  defaultValue?: Moment;
  panelMode?: ModeType;
}

export function Calendar(props: CalendarProps): React.ReactElement {
  const {
    dateFullCellRender,
    onSelect,
    onPanelChange,
    defaultValue,
    panelMode = "month",
  } = props;
  const [curYear, setCurYear] = useState<number>(moment().year());
  const [curMonth, setCurMonth] = useState<number>(moment().month() + 1);
  const [curDay, setCurDay] = useState<number>(moment().date());
  const [mode, setMode] = useState<ModeType>(panelMode || "month");

  useEffect(() => {
    if (defaultValue) {
      setCurYear(defaultValue.year());
      setCurMonth(defaultValue.month() + 1);
      setCurDay(defaultValue.date());
    }
    setMode(panelMode);
  }, [defaultValue, panelMode]);

  const yearRange = useMemo(() => {
    return getYearRange(curYear);
  }, [curYear]);

  const calendarData = useMemo(() => {
    return getCalendarData(mode, curYear, curMonth, curDay);
  }, [curDay, curMonth, curYear, mode]);

  const handleYearChange = (year: number) => {
    setCurYear(year);
    const newDate = getDate(year, curMonth, curDay);
    setCurDay(newDate.date());
    onPanelChange?.(newDate, mode);
    onSelect?.(newDate);
  };

  const handleMonthChange = (month: number) => {
    setCurMonth(month);
    const newDate = getDate(curYear, month, curDay);
    setCurDay(newDate.date());
    onPanelChange?.(newDate, mode);
    onSelect?.(newDate);
  };

  const handleModeChange = (e) => {
    setMode(e.target.value);
    const newDate = getDate(curYear, curMonth, curDay);
    onPanelChange?.(newDate, e.target.value);
  };

  const handleArrowClick = (type) => {
    let newDate;
    if (type === "pre") {
      newDate = getDate(curYear, curMonth, curDay).subtract(1, "w");
    } else if (type === "next") {
      newDate = getDate(curYear, curMonth, curDay).add(1, "w");
    }
    setCurYear(newDate.year());
    setCurMonth(newDate.month() + 1);
    setCurDay(newDate.date());
    onPanelChange?.(newDate, mode);
    onSelect?.(newDate);
  };

  const handleDateSelect = (date: Moment) => {
    setCurYear(date.year());
    setCurMonth(date.month() + 1);
    setCurDay(date.date());
    onSelect?.(date);
  };

  const renderDateNode = (data: {
    inView: boolean;
    date: Moment;
  }): React.ReactElement => {
    return (
      <td
        className={classNames("ant-picker-cell", {
          "ant-picker-cell-in-view": data.inView,
        })}
        onClick={(e) => handleDateSelect(data.date)}
        key={data.date.format("YYYY-MM-DD")}
      >
        {dateFullCellRender(data.date)}
      </td>
    );
  };

  return (
    <div className={styles.calendar}>
      <div className="ant-picker-calendar ant-picker-calendar-full">
        <div className="ant-picker-calendar-header">
          <Radio.Group
            onChange={handleModeChange}
            value={mode}
            buttonStyle="solid"
          >
            <Radio.Button value="week">
              {i18next.t(`${NS_TIME}:${K.WEEK}`)}
            </Radio.Button>
            <Radio.Button value="month">
              {i18next.t(`${NS_TIME}:${K.MONTH}`)}
            </Radio.Button>
          </Radio.Group>
          <div className={styles.rightControl}>
            {mode === "week" && (
              <div
                className={styles.arrow}
                onClick={(e) => handleArrowClick("pre")}
              >
                <GeneralIcon
                  icon={{
                    lib: "antd",
                    icon: "arrow-left",
                    theme: "outlined",
                    color: "#167be0",
                  }}
                />
              </div>
            )}
            <Select
              dropdownMatchSelectWidth={false}
              onChange={handleYearChange}
              value={curYear}
            >
              {yearRange.map((item) => (
                <Option key={item} value={item}>{`${item}年`}</Option>
              ))}
            </Select>
            <Select
              dropdownMatchSelectWidth={true}
              onChange={handleMonthChange}
              value={curMonth}
            >
              {MONTHS.map((item, index) => (
                <Option key={index + 1} value={index + 1}>
                  {item}
                </Option>
              ))}
            </Select>
            {mode === "week" && (
              <div
                className={styles.arrow}
                onClick={(e) => handleArrowClick("next")}
              >
                <GeneralIcon
                  icon={{
                    lib: "antd",
                    icon: "arrow-right",
                    theme: "outlined",
                    color: "#167be0",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div className="ant-picker-panel">
          <div className="ant-picker-date-panel">
            <div className="ant-picker-body">
              <table className="ant-picker-content">
                <thead>
                  <tr>
                    {WEEKS.map((item) => (
                      <th key={item}>{item}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {calendarData.map((row, index) => {
                    const curRow = row.map((item) => renderDateNode(item));
                    return <tr key={index}>{curRow}</tr>;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
