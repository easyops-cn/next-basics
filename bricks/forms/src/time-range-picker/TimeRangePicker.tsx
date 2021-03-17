import React from "react";
import { uniqueId, isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import Icon from "@ant-design/icons";
import { TimePicker, Input, DatePicker } from "antd";
import { BrickIcon } from "@next-core/brick-icons";
import { RangeValue } from "rc-picker/lib/interface";
import moment from "moment";
import { NS_FORMS, K } from "../i18n/constants";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

export interface TimeRange {
  startTime: string;
  endTime: string;
}

const INIT_TIME_RANGE: TimeRange = {
  startTime: "00:00:00",
  endTime: "23:59:59",
};

export type RangeType = "time" | "date" | "dateTime";

interface TimeRangePickerProps extends FormItemWrapperProps {
  value?: TimeRange;
  format: string;
  rangeType?: RangeType;
  onChange?: (range: TimeRange) => void;
}

type RealTimeRangePickerProps = Omit<
  TimeRangePickerProps,
  keyof FormItemWrapperProps
>;

export function RealTimeRangePicker(
  props: RealTimeRangePickerProps,
  ref: any
): React.ReactElement {
  const rangeType = props.rangeType ?? "time";
  const today = rangeType === "time" ? "" : moment().format("YYYY-MM-DD ");
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
    if (!props.value && props.onChange) {
      props.onChange(INIT_TIME_RANGE);
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
    <Input.Group compact>
      <TimePicker
        {...{ id: uniqueId("start-time-") }}
        onChange={onStartTimeChange}
        value={!isEmpty(props.value?.startTime) ? startTime : undefined}
        format={props.format}
      ></TimePicker>
      <Input disabled value="~" style={{ width: 32 }} />
      <TimePicker
        {...{ id: uniqueId("end-time-") }}
        onChange={onEndTimeChange}
        value={!isEmpty(props.value?.endTime) ? endTime : undefined}
        format={props.format}
      ></TimePicker>
    </Input.Group>
  );

  const rangeChange = (
    dates: RangeValue<moment.Moment>,
    dateStrings: [string, string]
  ) => {
    setStartTime(dates?.[0]);
    setEndTime(dates?.[1]);
    props.onChange?.({
      startTime: dates?.[0].format(props.format),
      endTime: dates?.[1].format(props.format),
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
    setPrevStartTime(dates?.[0].clone());
    setPrevEndTime(dates?.[1].clone());
    props.onChange?.({
      startTime: dates?.[0].format(props.format),
      endTime: dates?.[1].format(props.format),
    });
  };

  const dateRange = (
    <DatePicker.RangePicker
      style={{ width: 400 }}
      showTime={rangeType === "dateTime"}
      value={
        !isEmpty(props.value?.startTime) || !isEmpty(props.value?.endTime)
          ? [startTime, endTime]
          : []
      }
      format={props.format}
      onChange={rangeChange}
      onOpenChange={onOpenChange}
      onOk={rangeOk}
      separator={"~"}
      suffixIcon={<Icon component={() => <BrickIcon icon="calendar" />} />}
    />
  );
  const range = rangeType === "time" ? timeRange : dateRange;

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
      />
    </FormItemWrapper>
  );
}
