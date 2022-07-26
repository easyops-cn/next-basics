import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { InputNumber } from "antd";
import React, { useEffect } from "react";

export interface GeneralInputNumberRangeProps extends FormItemWrapperProps {
  value?: {
    min?: string | number;
    max?: string | number;
  };
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: { min?: string | number; max?: string | number }) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
}

export function GeneralInputNumberRange(
  props: GeneralInputNumberRangeProps
): React.ReactElement {
  const {
    step,
    max,
    min,
    readOnly,
    disabled,
    precision,
    placeholder,
    ...restProps
  } = props;

  const value =
    props.name && props.formElement
      ? props.formElement.formUtils.getFieldValue(props.name)
      : props.value;
  const _handleChange = (v: any) => {
    props.onChange(v);
  };

  useEffect(() => {
    // istanbul ignore next
    props.formElement?.formUtils.setFieldsValue({ [props.name]: props.value });
  }, [props.value]);

  return (
    <FormItemWrapper {...restProps}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          ...props.inputBoxStyle,
        }}
      >
        <InputNumber
          value={value?.min as any}
          className="min-input-number"
          min={min}
          max={value?.max && value.max > max ? value.max : (max as any)}
          step={step}
          placeholder={placeholder?.split(";")[0]}
          precision={precision}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(v) => _handleChange({ ...value, min: v })}
          style={{ width: "calc(50% - 24px)" }}
          onBlur={props.onBlur}
        />
        ~
        <InputNumber
          value={value?.max as any}
          className="max-input-number"
          min={value?.min && value.min > min ? value.min : (min as any)}
          max={max}
          step={step}
          placeholder={placeholder?.split(";")[1]}
          precision={precision}
          readOnly={readOnly}
          disabled={disabled}
          onChange={(v) => _handleChange({ ...value, max: v })}
          style={{ width: "calc(50% - 24px)" }}
          onBlur={props.onBlur}
        />
      </div>
    </FormItemWrapper>
  );
}
