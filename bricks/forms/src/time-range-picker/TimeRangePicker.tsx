import React from "react";
import { uniqueId, isEmpty, difference } from "lodash";
import { useTranslation } from "react-i18next";
import Icon from "@ant-design/icons";
import { TimePicker, Input, DatePicker } from "antd";
import { BrickIcon } from "@next-core/brick-icons";
import { RangeValue } from "rc-picker/lib/interface";
import moment from "moment";
import { NS_FORMS, K } from "../i18n/constants";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import styles from "./TimeRangePicker.module.css";
import i18n from "i18next";

export interface TimeRange {
  startTime: string;
  endTime: string;
}

const INIT_TIME_RANGE: TimeRange = {
  startTime: "00:00:00",
  endTime: "23:59:59",
};
export enum presetRangeType {
  Today = "今天",
  ThisWeek = "本周",
  ThisMonth = "本月",
  ThisQuarter = "本季度",
  ThisYear = "今年",
}
export type RangeType =
  | "time"
  | "date"
  | "dateTime"
  | "hmTime"
  | "week"
  | "month"
  | "quarter"
  | "year";

interface TimeRangePickerProps extends FormItemWrapperProps {
  value?: TimeRange;
  format: string;
  rangeType?: RangeType;
  onChange?: (range: TimeRange) => void;
  emitChangeOnInit?: boolean;
  selectNearDays?: number;
  presetRanges?: presetRangeType[];
}

type RealTimeRangePickerProps = Omit<
  TimeRangePickerProps,
  keyof FormItemWrapperProps
>;
presetRangeType.Today;

const presetRangeMap = {
  [presetRangeType.Today]: {
    [i18n.t(`${NS_FORMS}:${K.TODAY}`)]: [moment().startOf("day"), moment()],
  },
  [presetRangeType.ThisWeek]: {
    [i18n.t(`${NS_FORMS}:${K.THIS_WEEK}`)]: [
      moment().startOf("week"),
      moment().endOf("week"),
    ],
  },
  [presetRangeType.ThisMonth]: {
    [i18n.t(`${NS_FORMS}:${K.THIS_MONTH}`)]: [
      moment().startOf("month"),
      moment().endOf("month"),
    ],
  },
  [presetRangeType.ThisQuarter]: {
    [i18n.t(`${NS_FORMS}:${K.THIS_QUARTER}`)]: [
      moment().startOf("quarter"),
      moment().endOf("quarter"),
    ],
  },
  [presetRangeType.ThisYear]: {
    [i18n.t(`${NS_FORMS}:${K.THIS_YEAR}`)]: [
      moment().startOf("year"),
      moment().endOf("year"),
    ],
  },
};
const rangeRules = {
  date: [] as presetRangeType[],
  dateTime: [] as presetRangeType[],
  week: [presetRangeType.Today],
  month: [presetRangeType.Today, presetRangeType.ThisWeek],
  quarter: [
    presetRangeType.Today,
    presetRangeType.ThisWeek,
    presetRangeType.ThisMonth,
  ],
  year: [
    presetRangeType.Today,
    presetRangeType.ThisWeek,
    presetRangeType.ThisMonth,
    presetRangeType.ThisQuarter,
  ],
};

export function RealTimeRangePicker(
  props: RealTimeRangePickerProps,
  ref: any
): React.ReactElement {
  const times = ["time", "hmTime"];
  const rangeType = props.rangeType ?? "time";
  const today = times.includes(rangeType) ? "" : moment().format("YYYY-MM-DD ");
  const initRange = {
    startTime: today + INIT_TIME_RANGE.startTime,
    endTime: today + INIT_TIME_RANGE.endTime,
  };

  const { t } = useTranslation(NS_FORMS);
  const initValue =
    !isEmpty(props.value?.startTime) || !isEmpty(props.value?.endTime)
      ? props.value
      : initRange;

  const [startTime, setStartTime] = React.useState(
    moment(initValue.startTime, props.format)
  );
  const [prevStartTime, setPrevStartTime] = React.useState(startTime?.clone());
  const [endTime, setEndTime] = React.useState(
    moment(initValue.endTime, props.format)
  );
  const [prevEndTime, setPrevEndTime] = React.useState(endTime?.clone());

  const onStartTimeChange = (time: moment.Moment, timeString: string) => {
    setStartTime(time);
    props.onChange?.({
      startTime: timeString,
      endTime: endTime?.format(props.format),
    });
  };

  const onEndTimeChange = (time: moment.Moment, timeString: string) => {
    setEndTime(time);
    props.onChange?.({
      endTime: timeString,
      startTime: startTime?.format(props.format),
    });
  };

  React.useEffect(() => {
    if (props.emitChangeOnInit && !props.value && props.onChange) {
      times.includes(rangeType)
        ? props.onChange(INIT_TIME_RANGE)
        : props.onChange(initRange);
    }
  }, []);

  React.useEffect(() => {
    if (props.value?.startTime) {
      const start = moment(props.value.startTime, props.format);
      setStartTime(start);
      setPrevStartTime(start);
    }
    if (props.value?.endTime) {
      const end = moment(props.value.endTime, props.format);
      setEndTime(end);
      setPrevEndTime(end);
    }
  }, [props.value]);

  const timeRange = (
    <Input.Group compact className={styles.timeRange}>
      <TimePicker
        {...{ id: uniqueId("start-time-") }}
        onChange={onStartTimeChange}
        value={!isEmpty(props.value?.startTime) ? startTime : undefined}
        format={props.format}
      />
      <Input disabled className={styles.timeRangeSplit} value="~" />
      <TimePicker
        {...{ id: uniqueId("end-time-") }}
        onChange={onEndTimeChange}
        value={!isEmpty(props.value?.endTime) ? endTime : undefined}
        format={props.format}
      />
    </Input.Group>
  );
  const presetRange = React.useMemo(() => {
    const rangeResult = {};
    if (!props.selectNearDays && !times.includes(rangeType)) {
      const compliantRanges = difference(
        props.presetRanges,
        (rangeRules as any)[rangeType]
      );
      for (const i of compliantRanges) {
        Object.assign(rangeResult, presetRangeMap[i]);
      }
    }
    return rangeResult;
  }, [rangeType, props.selectNearDays, props.presetRanges]);
  const rangeChange = (
    dates: RangeValue<moment.Moment>,
    dateStrings: [string, string]
  ) => {
    setStartTime(dates?.[0]);
    setEndTime(dates?.[1]);
    props.onChange?.({
      startTime: dates?.[0].format(props.format || "YYYY-MM-DD"), //week,month,quarter,year 的format为""，比如rangeType为quarter，直接返回2022-Q3的这种格式的数据，目前看起来还不是平台通用的，还是先默认转换成"YYYY-MM-DD"
      endTime: dates?.[1].format(props.format || "YYYY-MM-DD"),
    });
  };

  const needConfirm = React.useRef(false);
  const onOpenChange = (open: boolean) => {
    if (!open && needConfirm.current) {
      setStartTime(prevStartTime);
      setEndTime(prevEndTime);
    } else {
      needConfirm.current = true;
    }
  };

  const rangeOk = (selectedTime: RangeValue<moment.Moment>) => {
    needConfirm.current = false;
    const dates = selectedTime;
    setPrevStartTime(dates?.[0]?.clone());
    setPrevEndTime(dates?.[1]?.clone());
    props.onChange?.({
      startTime: dates?.[0]?.format(props.format),
      endTime: dates?.[1]?.format(props.format),
    });
  };

  const disabledDate = (current: moment.Moment) => {
    if (!props.selectNearDays) {
      return false;
    }
    const tooSelectNearDays =
      current <= moment().subtract(props.selectNearDays, "days") ||
      current > moment().endOf("day");
    return !!tooSelectNearDays;
  };

  const dateRange = (
    <DatePicker.RangePicker
      style={{ width: 400 }}
      showTime={rangeType === "dateTime"}
      picker={rangeType as any}
      value={
        !isEmpty(props.value?.startTime) || !isEmpty(props.value?.endTime)
          ? [startTime, endTime]
          : []
      }
      ranges={presetRange as any}
      format={props.format}
      onChange={rangeChange}
      onOpenChange={onOpenChange}
      onOk={rangeOk}
      disabledDate={disabledDate}
      separator={"~"}
      suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
    />
  );
  const range = times.includes(rangeType) ? timeRange : dateRange;

  return <div ref={ref}>{range}</div>;
}

export const RefTimeRangePicker = React.forwardRef(RealTimeRangePicker);

export function TimeRangePicker(
  props: TimeRangePickerProps
): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefTimeRangePicker
        format={props.format}
        value={props.value}
        rangeType={props.rangeType}
        onChange={props.onChange}
        emitChangeOnInit={props.emitChangeOnInit}
        selectNearDays={props.selectNearDays}
        presetRanges={props.presetRanges}
      />
    </FormItemWrapper>
  );
}
