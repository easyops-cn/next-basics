import React from "react";
import { TimePicker } from "antd";
import moment from "moment";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { TimePickerProps } from "antd/lib/time-picker";

interface GeneralTimePickerProps extends FormItemWrapperProps {
  configProps?: Partial<TimePickerProps>;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onOpenChange?: (flag: boolean, value: string) => void;
}

export function GeneralTimePicker(
  props: GeneralTimePickerProps
): React.ReactElement {
  const format = props.configProps?.format ?? "HH:mm:ss";

  const handleChange = (time: moment.Moment, timeString: string): void => {
    props.onChange?.(timeString);
  };

  const handleOpenChange = (flag: boolean): void => {
    props.onOpenChange?.(flag, props.value);
  };

  return (
    <FormItemWrapper {...props}>
      <TimePicker
        {...props.configProps}
        value={
          props.name && props.formElement
            ? undefined
            : props.value && moment(props.value, format)
        }
        onChange={handleChange}
        onOpenChange={handleOpenChange}
      />
    </FormItemWrapper>
  );
}
