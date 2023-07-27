import React from "react";
import { TimePicker } from "antd";
import { TimePickerProps } from "antd/lib/time-picker";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { handleChange } from "../../processor";

export interface LegacyBrickTimePickerProps {
  configProps?: TimePickerProps;
  onChange: Function;
}

export function LegacyBrickTimePicker({
  configProps,
  onChange
}: LegacyBrickTimePickerProps): React.ReactElement {
  return (
    <TimePicker {...configProps} onChange={e => handleChange(e, onChange)} />
  );
}
export const BrickTimePicker = WrapperFormItem(LegacyBrickTimePicker);
