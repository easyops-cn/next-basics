import React from "react";
import { InputNumber, Input } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
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
  addonAfter?: {
    useBrick: UseBrickConf;
  };
  onChange?: (value: number | string) => void;
  onBlur?: (event?: React.FocusEvent<HTMLInputElement>) => void;
}

export function GeneralInputNumber(
  props: GeneralInputNumberProps
): React.ReactElement {
  const {
    step,
    max,
    min,
    precision,
    readOnly,
    disabled,
    addonAfter,
    ...restProps
  } = props;
  const inputNumber = (
    <InputNumber
      value={props.name && props.formElement ? undefined : (props.value as any)}
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
  );

  return (
    <FormItemWrapper {...restProps}>
      {addonAfter?.useBrick ? (
        <Input.Group compact style={{ display: "flex" }}>
          {inputNumber}
          {
            <span
              className="ant-input-group-addon"
              style={{
                display: "flex",
                width: "auto",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BrickAsComponent
                useBrick={addonAfter.useBrick}
              ></BrickAsComponent>
            </span>
          }
        </Input.Group>
      ) : (
        inputNumber
      )}
    </FormItemWrapper>
  );
}
