import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { InputNumber } from "antd";
import { isEmpty } from "lodash";
import React from "react";

export interface GeneralInputNumberRangeProps extends FormItemWrapperProps {
  value?: NumberRangeValue;
  max?: number;
  min?: number;
  step?: number;
  precision?: number;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: NumberRangeValue) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
}

export interface NumberRangeValue {
  min?: string | number;
  max?: string | number;
}

interface NumberRangeProps {
  value?: NumberRangeValue;
  onChange?: (value: NumberRangeValue) => void;
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
  const NumberRange: React.FC<NumberRangeProps> = ({ value, onChange }) => {
    const minNumber = value?.min;
    const maxNumber = value?.max;
    const triggerChange = (changedValue: {
      min?: number | string;
      max?: number | string;
    }) => {
      const res = { ...value, ...changedValue };
      if (!res.min) delete res.min;
      if (!res.max) delete res.max;
      onChange?.(isEmpty(res) ? null : res);
    };

    const onMinChange = (e: { target: { value: string } }) => {
      let value = parseInt(e?.target.value);
      value = isNaN(value) ? null : value;
      triggerChange({ min: value as number });
    };

    const onMaxChange = (e: { target: { value: string } }) => {
      let value = parseInt(e?.target.value);
      value = isNaN(value) ? null : value;
      triggerChange({ max: value });
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          ...props.inputBoxStyle,
        }}
      >
        <InputNumber
          key="min-input-number"
          value={minNumber as any}
          className="min-input-number"
          min={min as number}
          max={maxNumber < max ? maxNumber : (max as any)}
          step={step}
          placeholder={placeholder?.split(";")[0]}
          precision={precision}
          readOnly={readOnly}
          disabled={disabled}
          onBlur={onMinChange}
          style={{ width: "calc(50% - 24px)" }}
        />
        ~
        <InputNumber
          key="max-input-number"
          value={maxNumber as any}
          className="max-input-number"
          min={min < minNumber ? maxNumber : (min as any)}
          max={max as number}
          step={step}
          placeholder={placeholder?.split(";")[1]}
          precision={precision}
          readOnly={readOnly}
          disabled={disabled}
          onBlur={onMaxChange}
          style={{ width: "calc(50% - 24px)" }}
        />
      </div>
    );
  };
  return (
    <FormItemWrapper {...restProps}>
      <NumberRange value={props.value} onChange={props.onChange} />
    </FormItemWrapper>
  );
}
