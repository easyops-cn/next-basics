import React from "react";
import Icon from "@ant-design/icons";
import { DatePicker } from "antd";
import moment from "moment";
import { BrickIcon } from "@next-core/brick-icons";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

interface GeneralDatePickerProps extends FormItemWrapperProps {
  placeholder?: string;
  value?: string;
  showTime?: boolean;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: string) => void;
  onOk?: (value: string) => void;
  format?: string;
  picker?: "date" | "week";
}

export function GeneralDatePicker(
  props: GeneralDatePickerProps
): React.ReactElement {
  const handleChange = (date: moment.Moment, dateString: string): void => {
    props.onChange?.(dateString);
  };

  const handleOk = (date: moment.Moment): void => {
    props.onOk?.(date?.format(props.format));
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
        />
      )}
    </FormItemWrapper>
  );
}
