import React from "react";
import { Switch } from "antd";
import { SwitchProps } from "antd/lib/switch";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";

export interface SwitchMap {
  truthy: any;
  falsy: any;
}

export interface LegacyBrickSwitchProps {
  configProps?: SwitchProps;
  onChange: Function;
  checked?: boolean | string;
  switchMap?: SwitchMap;
}

export function LegacyBrickSwitch({
  configProps,
  onChange,
  checked,
  switchMap
}: LegacyBrickSwitchProps): React.ReactElement {
  const checkValue: boolean = switchMap
    ? switchMap.truthy === checked
      ? true
      : false
    : !!checked;

  const handleOnChange = (checked: boolean, event: Event) => {
    const value = switchMap ? switchMap[checked ? "truthy" : "falsy"] : checked;
    onChange(value);
  };

  return (
    <Switch {...configProps} checked={checkValue} onChange={handleOnChange} />
  );
}

export const BrickSwitch = WrapperFormItem(LegacyBrickSwitch);
