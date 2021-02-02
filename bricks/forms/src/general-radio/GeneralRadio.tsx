import React from "react";
import { Radio } from "antd";
import { RadioChangeEvent, RadioGroupButtonStyle } from "antd/lib/radio";
import {
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralOption,
} from "@next-libs/forms";
import { GeneralIcon } from "@next-libs/basic-components";

export interface GeneralRadioProps extends FormItemWrapperProps {
  type?: "button" | "default";
  options: GeneralOption[];
  value?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  buttonStyle?: RadioGroupButtonStyle;
}

export function GeneralRadio(props: GeneralRadioProps): React.ReactElement {
  const { options, disabled } = props;

  const handleChange = (e: RadioChangeEvent): void => {
    const value = e.target.value;
    props.onChange?.(value);
  };

  const renderRadio = (
    Component: any,
    options: GeneralOption[]
  ): React.ReactNode => {
    return options.map((item: any) => {
      return (
        <Component value={item.value} key={item.value} disabled={item.disabled}>
          {Component === Radio.Button && item.icon ? (
            <GeneralIcon icon={item.icon}></GeneralIcon>
          ) : (
            item.label
          )}
        </Component>
      );
    });
  };

  return (
    <FormItemWrapper {...props}>
      <Radio.Group
        value={props.name && props.formElement ? undefined : props.value}
        onChange={handleChange}
        disabled={disabled}
        buttonStyle={props.buttonStyle}
      >
        {props.type === "button"
          ? renderRadio(Radio.Button, options)
          : renderRadio(Radio, options)}
      </Radio.Group>
    </FormItemWrapper>
  );
}
