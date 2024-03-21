import React, { useCallback, useEffect, useMemo, useState } from "react";
import Icon, { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";
import moment, { Moment } from "moment";
import { BrickIcon } from "@next-core/brick-icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { DisabledDateType, PickerMode } from "../interfaces";
import classNames from "classnames";
import style from "./GeneralDatePicker.module.css";

interface InternalStateDatePickerProps {
  placeholder?: string;
  value?: Moment;
  showTime?: boolean;
  inputBoxStyle?: React.CSSProperties;
  format?: string;
  picker?: PickerMode;
  disabledDate?: DisabledDateType;
  useFastSelectBtn?: boolean;
  disabledFutureDate?: boolean;
  disabled?: boolean;
  onChange?: (value: Moment | null, dateString: string) => void;
  onOk?: (date: Moment) => void;
  disabledBeforeDate?: string;
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
type PickerModeMap = {
  [K in PickerMode]: string[];
};

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
    disabledFutureDate,
    useFastSelectBtn,
    placeholder,
    disabled,
    onChange,
    onOk,
    disabledBeforeDate,
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

  const handleDisabledFutureDate = (date: Moment): boolean => {
    return date && date > moment();
  };

  const handledisabledBeforeDate = (date: Moment): boolean => {
    return date && date < moment(disabledBeforeDate);
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
  const isQuarterPicker = picker === "quarter";

  const PickerBtn = useCallback(() => {
    const strMap: PickerModeMap = {
      date: ["上日", "今日", "下日"],
      week: ["上周", "本周", "下周"],
      month: ["上月", "本月", "下月"],
      quarter: ["上季度", "本季度", "下季度"],
      year: ["上年", "今年", "下年"],
    };
    const strs = strMap[picker];
    const currentDate = value || moment();
    const handlePreTime = () => {
      let preDate: moment.Moment;
      switch (picker) {
        case "date":
          preDate = currentDate.clone().subtract(1, "days");
          break;
        case "week":
          preDate = currentDate.clone().subtract(1, "weeks");
          break;
        case "month":
          preDate = currentDate.clone().subtract(1, "months");
          break;
        case "quarter":
          preDate = currentDate.clone().subtract(1, "quarters");
          break;
        case "year":
          preDate = currentDate.clone().subtract(1, "years");
          break;
        default:
          preDate = currentDate;
          break;
      }
      setValue(preDate);
    };
    const handleCurTime = () => {
      let curDate: moment.Moment;
      switch (picker) {
        case "date":
          curDate = moment();
          break;
        case "week":
          curDate = moment().startOf("week");
          break;
        case "month":
          curDate = moment();
          break;
        case "quarter":
          curDate = moment().startOf("quarter");
          break;
        case "year":
          curDate = moment();
          break;
        default:
          curDate = currentDate;
          break;
      }
      setValue(curDate);
    };
    const handleNextTime = () => {
      let nextDate: moment.Moment;
      switch (picker) {
        case "date":
          nextDate = currentDate.clone().add(1, "days");
          break;
        case "week":
          nextDate = currentDate.clone().add(1, "weeks");
          break;
        case "month":
          nextDate = currentDate.clone().add(1, "months");
          break;
        case "quarter":
          nextDate = currentDate.clone().add(1, "quarters");
          break;
        case "year":
          nextDate = currentDate.clone().add(1, "years");
          break;
        default:
          nextDate = currentDate;
          break;
      }
      setValue(nextDate);
    };

    return (
      <div className={style.pickerBtnWrap}>
        <div className={style.pre} onClick={() => handlePreTime()}>
          <LeftOutlined />
          <span>{strs[0]}</span>
        </div>
        <div className={style.current} onClick={() => handleCurTime()}>
          {strs[1]}
        </div>
        <div
          className={classNames({
            [style.next]: true,
            [style.nextDisabled]:
              disabledFutureDate &&
              handleDisabledFutureDate(
                currentDate.clone().add(1, picker === "date" ? "days" : picker)
              ),
          })}
          onClick={() => handleNextTime()}
        >
          <span>{strs[2]}</span>
          <RightOutlined />
        </div>
      </div>
    );
  }, [value, picker, disabledFutureDate]);

  return (
    <div className={style.pickerWrap}>
      <DatePicker
        value={value}
        dropdownClassName={classNames({
          [style.quarterPicker]: isQuarterPicker,
          [style.confirmDisabled]: confirmDisabled,
        })}
        format={format}
        showTime={isDatePicker ? showTime : undefined}
        onChange={onChange}
        style={inputBoxStyle}
        placeholder={placeholder}
        onOk={onOk}
        suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
        picker={picker}
        disabledDate={
          (disabledFutureDate && handleDisabledFutureDate) ||
          (disabledDate && handleDisabledDate) ||
          (disabledBeforeDate && handledisabledBeforeDate)
        }
        disabledTime={disabledDate && handleDisabledTime}
        disabled={disabled}
      />
      {useFastSelectBtn && <PickerBtn />}
    </div>
  );
}

export function GeneralDatePicker(
  props: GeneralDatePickerProps
): React.ReactElement {
  const { name, formElement, value, picker, disabledBeforeDate, ...restProps } =
    props;
  const PickerFormatMap = {
    date: "YYYY-MM-DD",
    week: "gggg-ww周",
    month: "YYYY-MM月",
    quarter: "YYYY-第Q季度",
    year: "YYYY",
  };
  const isDatePicker = picker === "date";
  const format = props.format || PickerFormatMap[picker];

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
        disabledBeforeDate={disabledBeforeDate}
      />
    </FormItemWrapper>
  );
}
