import React from "react";
import { DatePicker } from "antd";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { handleChange } from "../../processor";
import {
  DatePickerProps,
  MonthPickerProps,
  RangePickerProps,
  WeekPickerProps
} from "antd/lib/date-picker/interface";

export interface LegacyBrickDatePickerProps {
  componentType?: "DatePicker" | "MonthPicker" | "RangePicker" | "WeekPicker";
  configProps?:
    | DatePickerProps
    | MonthPickerProps
    | RangePickerProps
    | WeekPickerProps;
  onChange: Function;
}

export function LegacyBrickDatePicker({
  componentType = "DatePicker",
  configProps,
  onChange
}: LegacyBrickDatePickerProps): React.ReactElement {
  let element: React.ReactElement;

  const onHandleChange = (e: any) => handleChange(e, onChange);

  switch (componentType) {
    case "MonthPicker":
      element = (
        <DatePicker.MonthPicker
          {...(configProps as MonthPickerProps)}
          onChange={onHandleChange}
        />
      );
      break;
    case "RangePicker":
      element = (
        <DatePicker.RangePicker
          {...(configProps as RangePickerProps)}
          onChange={onHandleChange}
        />
      );
      break;
    case "WeekPicker":
      element = (
        <DatePicker.WeekPicker
          {...(configProps as WeekPickerProps)}
          onChange={onHandleChange}
        />
      );
      break;
    default:
      element = (
        <DatePicker
          {...(configProps as DatePickerProps)}
          onChange={onHandleChange}
        />
      );
  }
  return element;
}

export const BrickDatePicker = WrapperFormItem(LegacyBrickDatePicker);
