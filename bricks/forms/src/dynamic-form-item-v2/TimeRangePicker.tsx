import { DatePicker } from "antd";
import { isEmpty } from "lodash";
import React from "react";
import moment from "moment";

type PickerType = "date" | "week" | "month" | "quarter" | "year";
type OtherPickerType = "dateTime" | "hmTime" | "time";
export type RangeType = PickerType | OtherPickerType;

export interface TimeRange {
  startTime: string;
  endTime: string;
}

export interface TimeRangePickerItemProps {
  rangeType?: RangeType;
  value?: TimeRange;
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: [string, string];
  width?: string;
  onChange?: (value: TimeRange) => void;
}

export function TimeRangePickerItem(
  props: TimeRangePickerItemProps
): React.ReactElement {
  // @ts-ignore
  const {
    value,
    rangeType,
    onChange,
    disabled,
    allowClear,
    placeholder,
    width,
  } = props;

  let format = "";
  switch (rangeType) {
    case "date":
      format = "YYYY-MM-DD";
      break;
    case "dateTime":
      format = `YYYY-MM-DD HH:mm:ss`;
      break;
    case "time":
      format = `HH:mm:ss`;
      break;
    case "hmTime":
      format = `HH:mm`;
      break;
    case "week": //week,month,quarter,year 不设置format，使用ant.design RangePicker的默认format
      format = "";
      break;
    case "month":
      format = "";
      break;
    case "quarter":
      format = "";
      break;
    case "year":
      format = "";
      break;
  }

  const dateValue = (!isEmpty(value?.startTime) || !isEmpty(value?.endTime))
    ? [
        value?.startTime ? moment(value?.startTime, format) : null,
        value?.endTime ? moment(value?.endTime, format) : null,
      ]
    : [];

  return (
    <DatePicker.RangePicker
      style={{ width: width ?? "100%" }}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder}
      separator={"~"}
      format={format}
      showTime={rangeType === "dateTime"}
      picker={
        rangeType === "dateTime"
          ? "date"
          : rangeType === "hmTime"
          ? "time"
          : rangeType
      }
      // @ts-ignore
      value={dateValue}
      onChange={(value) => {
        if (!value) {
          onChange?.(undefined);
          return;
        }
        const [start, end] = value;
        onChange?.({
          startTime: start?.format(format),
          endTime: end?.format(format),
        });
      }}
    />
  );
}
