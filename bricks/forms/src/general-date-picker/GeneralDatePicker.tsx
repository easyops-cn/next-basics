import React, { useMemo } from "react";
import Icon from "@ant-design/icons";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { BrickIcon } from "@next-core/brick-icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { DisabledDateType } from "../interfaces";

interface GeneralDatePickerProps extends FormItemWrapperProps {
  placeholder?: string;
  value?: string;
  showTime?: boolean;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
  onOk?: (value: string) => void;
  format?: string;
  picker?: "date" | "week";
  disabledDate?: DisabledDateType;
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

export function GeneralDatePicker(
  props: GeneralDatePickerProps
): React.ReactElement {
  const { disabledDate } = props;

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

  const handleChange = (date: moment.Moment, dateString: string): void => {
    props.onChange?.(dateString);
  };

  const handleOk = (date: moment.Moment): void => {
    props.onOk?.(date?.format(props.format));
  };

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
    return {
      disabledHours: () => disabledHours,
      disabledMinutes: () => disabledMinutes,
      disabledSeconds: () => disabledSeconds,
    };
  };

  return (
    <FormItemWrapper {...props}>
      {props.picker === "date" ? (
        <DatePicker
          value={
            props.name && props.formElement
              ? undefined
              : props.value && moment(props.value, props.format || "YYYY-MM-DD")
          }
          format={props.format || "YYYY-MM-DD"}
          showTime={props.showTime}
          onChange={handleChange}
          style={props.inputBoxStyle}
          placeholder={props.placeholder}
          onOk={handleOk}
          suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
          picker={props.picker}
          disabledDate={disabledDate && handleDisabledDate}
          disabledTime={disabledDate && handleDisabledTime}
        />
      ) : (
        <DatePicker
          value={
            props.name && props.formElement
              ? undefined
              : props.value && moment(props.value, props.format || "gggg-ww周")
          }
          format={props.format || "gggg-ww周"}
          onChange={handleChange}
          style={props.inputBoxStyle}
          placeholder={props.placeholder}
          suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
          picker={props.picker}
          disabledDate={disabledDate && handleDisabledDate}
          disabledTime={disabledDate && handleDisabledTime}
        />
      )}
    </FormItemWrapper>
  );
}
