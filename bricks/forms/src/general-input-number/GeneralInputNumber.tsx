import React from "react";
import { InputNumber } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

export interface GeneralInputNumberProps extends FormItemWrapperProps {
  placeholder?: string;
  value?: number | string;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: number | string) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
}

export function GeneralInputNumber(
  props: GeneralInputNumberProps
): React.ReactElement {
  const { step, max, min, precision, readOnly, disabled, ...restProps } = props;

  return (
    <FormItemWrapper {...restProps}>
      <InputNumber
        value={
          props.name && props.formElement ? undefined : (props.value as any)
        }
        placeholder={props.placeholder}
        min={min}
        max={max}
        step={step}
        precision={precision}
        readOnly={readOnly}
        disabled={disabled}
        onChange={props.onChange}
        style={props.inputBoxStyle}
        onBlur={props.onBlur}
        type="number"
      />
    </FormItemWrapper>
  );
}
