import React from "react";
import { omit } from "lodash";
import { InputNumber } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

export interface GeneralInputNumberProps extends FormItemWrapperProps {
  placeholder?: string;
  value?: number | string;
  max?: number;
  min?: number;
  step?: number;
  readOnly?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: number | string) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
}

export function GeneralInputNumber(
  props: GeneralInputNumberProps
): React.ReactElement {
  const { step, max, min, readOnly, disabled } = props;

  return (
    <FormItemWrapper {...omit(props, ["min", "max"])}>
      <InputNumber
        value={
          props.name && props.formElement ? undefined : (props.value as any)
        }
        placeholder={props.placeholder}
        min={min}
        max={max}
        step={step}
        readOnly={readOnly}
        disabled={disabled}
        onChange={props.onChange}
        style={props.inputBoxStyle}
        onBlur={props.onBlur}
      />
    </FormItemWrapper>
  );
}
