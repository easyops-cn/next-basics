import React from "react";
import { Checkbox } from "antd";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { handleChange } from "../../processor";
import { BrickOptionProps } from "../../interfaces";
import { CheckboxGroupProps } from "antd/lib/checkbox";

export interface LegacyBrickCheckboxProps {
  configProps?: CheckboxGroupProps;
  optionList: BrickOptionProps[];
  onChange: Function;
  value?: string[];
}

export function LegacyBrickCheckbox(
  props: LegacyBrickCheckboxProps
): React.ReactElement {
  const { configProps, onChange, optionList = [], value } = props;

  return (
    <Checkbox.Group
      {...configProps}
      value={value}
      onChange={e => handleChange(e, onChange)}
    >
      {optionList.map(item => (
        <Checkbox key={item.id} value={item.id}>
          {item.text}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
}

export const BrickCheckbox = WrapperFormItem(LegacyBrickCheckbox);
