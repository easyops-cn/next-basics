import React from "react";
import { Radio } from "antd";
import { RadioProps, RadioGroupProps } from "antd/lib/radio/interface";
import { BrickOptionProps } from "../../interfaces";
import { WrapperFormItem } from "../wrapper-form-item/WrapperFormItem";
import { handleChange } from "../../processor";

export interface LegacyBrickRadioProps {
  componentType?: "Button" | "Radio";
  configProps?: RadioProps | RadioGroupProps;
  optionList?: BrickOptionProps[];
  onChange: Function;
  value?: string;
}

export function LegacyBrickRadio({
  componentType = "Radio",
  configProps,
  optionList = [],
  onChange,
  value
}: LegacyBrickRadioProps): React.ReactElement {
  let element: React.ReactElement;
  const onHandleChange = (e: any) => handleChange(e, onChange);

  const renderRadio = (SubComponent: any) => (
    <Radio.Group {...configProps} value={value} onChange={onHandleChange}>
      {optionList.map(item => {
        return (
          <SubComponent value={item.value || item.id} key={item.id}>
            {item.text}
          </SubComponent>
        );
      })}
    </Radio.Group>
  );

  switch (componentType) {
    case "Radio":
      element = renderRadio(Radio);
      break;
    case "Button":
      element = renderRadio(Radio.Button);
      break;
    default:
      element = renderRadio(Radio);
  }
  return element;
}

export const BrickRadio = WrapperFormItem(LegacyBrickRadio);
