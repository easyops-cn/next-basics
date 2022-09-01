import React, { useEffect, useMemo, useState } from "react";
import Icon from "@ant-design/icons";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { BrickIcon } from "@next-core/brick-icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { DisabledDateType } from "../interfaces";
import classNames from "classnames";
import style from "./GeneralDatePicker.module.css";

interface InternalStateDatePickerProps {
  placeholder?: string;
  value?: Moment;
  showTime?: boolean;
  inputBoxStyle?: React.CSSProperties;
  format?: string;
  picker?: "date" | "week";
  disabledDate?: DisabledDateType;
  disabled?: boolean;
  onChange?: (value: Moment | null, dateString: string) => void;
  onOk?: (date: Moment) => void;
}

interface GeneralDatePickerProps
  extends Omit<InternalStateDatePickerProps, "value" | "onChange" | "onOk">,
    FormItemWrapperProps {
  value?: string;
  onChange?: (value: string) => void;
  onOk?: (value: string) => void;
}

interface FieldSetAndRanges {
  fieldSet: Set<number>;
  ranges: [number, number][];
}

const getFieldSetAndRanges = (
  expression: string | number
): FieldSetAndRanges => {
  const fieldSet = new Set<number>();
  const ranges: [number, number][] = [];

  `${expression}`.split(",").forEach((part) => {
    if (part.includes("-")) {
      const range = part.split("-").map((v) => Number(v)) as [number, number];
      ranges.push(range);
    } else if (part.trim() !== "" && !Number.isNaN(Number(part))) {
      fieldSet.add(Number(part));
    }
  });

  return { fieldSet, ranges };
};

const isInFieldSetOrRanges = (
  cur: number,
  fieldSetAndRanges: FieldSetAndRanges
): boolean => {
  const { fieldSet, ranges } = fieldSetAndRanges;
  return fieldSet.size === 0 && ranges.length === 0
    ? true
    : fieldSet.has(cur) ||
        ranges.some(([min, max]) => cur >= min && cur <= max);
};

const isEmptyFieldSetOrRanges = (
  fieldSetAndRanges: FieldSetAndRanges
): boolean => {
  const { fieldSet, ranges } = fieldSetAndRanges;
  return fieldSet.size === 0 && ranges.length === 0;
};

const getFieldsFromFieldSetAndRanges = (
  fieldSetAndRanges: FieldSetAndRanges
): number[] => {
  const { fieldSet, ranges } = fieldSetAndRanges;
  let fields = [...fieldSet];
  ranges.forEach(([min, max]) => {
    fields = fields.concat([...Array(max + 1).keys()].slice(min));
  });
  return [...new Set(fields)];
};

export function InternalStateDatePicker(
  props: InternalStateDatePickerProps
): React.ReactElement {
  const {
    picker,
    format,
    showTime,
    inputBoxStyle,
    disabledDate,
    placeholder,
    disabled,
    onChange,
    onOk,
  } = props;
  const [value, setValue] = useState(props.value);
  const [confirmDisabled, setConfirmDisabled] = useState(false);
  const crontab = useMemo(() => {
    if (!disabledDate) {
      return;
    }
    return [].concat(disabledDate).map((item) => {
      const { second, minute, hour, date, month, weekday, year } = item;
      const hourFieldSetAndRanges = getFieldSetAndRanges(hour);
      const minuteFieldSetAndRanges = getFieldSetAndRanges(minute);
      const secondFieldSetAndRanges = getFieldSetAndRanges(second);
      const yearFieldSetAndRanges = getFieldSetAndRanges(year);
      const monthFieldSetAndRanges = getFieldSetAndRanges(month);
      const dateFieldSetAndRanges = getFieldSetAndRanges(date);
      const weekFieldSetAndRanges = getFieldSetAndRanges(weekday);
      return {
        fields: {
          hour: hourFieldSetAndRanges,
          minute: minuteFieldSetAndRanges,
          second: secondFieldSetAndRanges,
          year: yearFieldSetAndRanges,
          month: monthFieldSetAndRanges,
          date: dateFieldSetAndRanges,
          weekday: weekFieldSetAndRanges,
        },
        isAllDate:
          isEmptyFieldSetOrRanges(yearFieldSetAndRanges) &&
          isEmptyFieldSetOrRanges(monthFieldSetAndRanges) &&
          isEmptyFieldSetOrRanges(dateFieldSetAndRanges) &&
          isEmptyFieldSetOrRanges(weekFieldSetAndRanges),
        isAllTime:
          isEmptyFieldSetOrRanges(hourFieldSetAndRanges) &&
          isEmptyFieldSetOrRanges(minuteFieldSetAndRanges) &&
          isEmptyFieldSetOrRanges(secondFieldSetAndRanges),
      };
    });
  }, [disabledDate]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleDisabledDate = (date: Moment): boolean => {
    const curYear = date.year();
    const curMonth = date.month() + 1;
    const curDate = date.date();
    const curWeekday = date.isoWeekday();
    return crontab.some((cron) => {
      const { isAllDate, isAllTime, fields } = cron;
      //没有限制日期或限制了时分秒，则该日可选
      if (isAllDate || !isAllTime) {
        return false;
      }
      const { year, month, weekday, date } = fields;
      return (
        isInFieldSetOrRanges(curYear, year) &&
        isInFieldSetOrRanges(curMonth, month) &&
        isInFieldSetOrRanges(curWeekday, weekday) &&
        isInFieldSetOrRanges(curDate, date)
      );
    });
  };

  const handleDisabledTime = (date: Moment) => {
    if (!date) return;
    const curYear = date.year();
    const curMonth = date.month() + 1;
    const curDate = date.date();
    const curWeekday = date.isoWeekday();
    const curHour = date.hour();
    const curMinute = date.minute();
    const currentSecond = date.second();
    let disabledHours: number[] = [];
    let disabledMinutes: number[] = [];
    let disabledSeconds: number[] = [];
    let matchCurDate = false;
    crontab.forEach((cron) => {
      const { isAllTime, fields } = cron;
      //时分秒都没输入，则所有时间都可选
      if (isAllTime) return;
      const { hour, minute, second, year, month, weekday, date } = fields;
      const isMatchDate =
        isInFieldSetOrRanges(curYear, year) &&
        isInFieldSetOrRanges(curMonth, month) &&
        isInFieldSetOrRanges(curWeekday, weekday) &&
        isInFieldSetOrRanges(curDate, date);
      matchCurDate =
        matchCurDate ||
        (isMatchDate &&
          isInFieldSetOrRanges(curHour, hour) &&
          isInFieldSetOrRanges(curMinute, minute) &&
          isInFieldSetOrRanges(currentSecond, second));
      if (isMatchDate) {
        const hourFields = isEmptyFieldSetOrRanges(hour)
          ? [...Array(24).keys()]
          : getFieldsFromFieldSetAndRanges(hour);
        const minuteFields = isEmptyFieldSetOrRanges(minute)
          ? [...Array(60).keys()]
          : getFieldsFromFieldSetAndRanges(minute);
        const secondFields = isEmptyFieldSetOrRanges(second)
          ? [...Array(60).keys()]
          : getFieldsFromFieldSetAndRanges(second);
        // 当前在禁止小时里
        if (isInFieldSetOrRanges(curHour, hour)) {
          // 当前在禁止分钟里
          if (isInFieldSetOrRanges(curMinute, minute)) {
            disabledSeconds = disabledSeconds.concat([...secondFields]);
          }
          // 秒全禁用则对应分钟也禁用
          if (secondFields.length === 60) {
            disabledMinutes = disabledMinutes.concat([...minuteFields]);
          }
        }
        // 分全禁用则对应小时也禁用
        if (minuteFields.length === 60 && secondFields.length === 60) {
          disabledHours = disabledHours.concat([...hourFields]);
        }
      }
    });
    setConfirmDisabled(matchCurDate);
    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes,
      disabledSeconds: () => disabledSeconds,
    };
  };

  const isDatePicker = picker === "date";

  const _handleOk = (date: Moment) => {
    setValue(date);
    onChange(date, date?.format(format));
    onOk(date);
  };

  return (
    <DatePicker
      value={value}
      dropdownClassName={classNames({
        [style.confirmDisabled]: confirmDisabled,
      })}
      format={format}
      showTime={isDatePicker ? showTime : undefined}
      onChange={onChange}
      style={inputBoxStyle}
      placeholder={placeholder}
      onOk={isDatePicker ? _handleOk : undefined}
      suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
      picker={picker}
      disabledDate={disabledDate && handleDisabledDate}
      disabledTime={disabledDate && handleDisabledTime}
      disabled={disabled}
      onPanelChange={(value) => {
        setValue(value);
      }}
    />
  );
}

export function GeneralDatePicker(
  props: GeneralDatePickerProps
): React.ReactElement {
  const { name, formElement, value, picker, ...restProps } = props;
  const isDatePicker = picker === "date";
  const format = props.format || (isDatePicker ? "YYYY-MM-DD" : "gggg-ww周");

  const handleChange = (date: moment.Moment, dateString: string): void => {
    props.onChange?.(dateString);
  };

  const handleOk = (date: moment.Moment): void => {
    props.onOk?.(date?.format(props.format));
  };

  return (
    <FormItemWrapper {...props}>
      <InternalStateDatePicker
        {...restProps}
        value={name && formElement ? undefined : value && moment(value, format)}
        format={format}
        onChange={handleChange}
        onOk={isDatePicker ? handleOk : undefined}
        picker={picker}
      />
    </FormItemWrapper>
  );
}
