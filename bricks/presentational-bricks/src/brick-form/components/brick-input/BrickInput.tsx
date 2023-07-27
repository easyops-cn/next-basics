import React from "react";
import { Input } from "antd";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { InputProps } from "antd/lib/input";
import { handleChange } from "../../processor";
export enum LegacyBrickInputType {
  Input = "Input",
  Password = "Password",
  TextArea = "TextArea"
}

export interface LegacyBrickInputProps {
  configProps?: InputProps;
  type?: LegacyBrickInputType;
  onChange: Function;
  value?: string;
}

export function LegacyBrickInput({
  configProps,
  onChange,
  value,
  type = LegacyBrickInputType.Input
}: LegacyBrickInputProps): React.ReactElement {
  const renderComp = (Component: any) => (
    <Component
      {...configProps}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(e, onChange)
      }
    />
  );

  const map = {
    [LegacyBrickInputType.Input]: Input,
    [LegacyBrickInputType.Password]: Input.Password,
    [LegacyBrickInputType.TextArea]: Input.TextArea
  };

  return renderComp(map[type]);
}

export const BrickInput = WrapperFormItem(LegacyBrickInput);
