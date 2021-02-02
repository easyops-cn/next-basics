import React from "react";
import { InputNumber, Spin } from "antd";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { handleChange } from "../../processor";
import { InputNumberProps } from "antd/lib/input-number";

export interface LegacyBrickInputNumberProps {
  configProps?: InputNumberProps;
  onChange: Function;
  value?: number;
}

export function LegacyBrickInputNumber(
  props: LegacyBrickInputNumberProps
): React.ReactElement {
  const { configProps, onChange, value } = props;

  return (
    <InputNumber
      {...configProps}
      value={value}
      onChange={e => handleChange(e, onChange)}
    />
  );
}

export const BrickInputNumber = WrapperFormItem(LegacyBrickInputNumber);
