import React from "react";
import { Radio } from "antd";
import { RadioChangeEvent, RadioGroupButtonStyle } from "antd/lib/radio";
import {
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralOption,
} from "@next-libs/forms";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "./index.module.css";
import { RadioType } from ".";

export interface GeneralRadioProps extends FormItemWrapperProps {
  type?: RadioType;
  options: GeneralOption[];
  value?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  buttonStyle?: RadioGroupButtonStyle;
  size?: "large" | "middle" | "small";
}

export function GeneralRadio(props: GeneralRadioProps): React.ReactElement {
  const { options, disabled } = props;

  const handleChange = (
    e: RadioChangeEvent | React.ChangeEvent<HTMLInputElement>
  ): void => {
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
      {props.type === "icon" ? (
        <>
          {options.map((item: any) => (
            <label
              htmlFor={item.value}
              className={disabled ? styles.disabledIconRadio : styles.iconRadio}
              key={item.value}
            >
              <input
                type="radio"
                value={item.value}
                name={props.name}
                disabled={disabled}
                id={item.value}
                onChange={handleChange}
                checked={props.value === item.value}
              />
              <div className={styles.content}>
                {item.icon && (
                  <GeneralIcon
                    style={{
                      fontSize: "32px",
                    }}
                    icon={item.icon}
                  ></GeneralIcon>
                )}
                <div className={styles.text}>{item.label}</div>
              </div>
            </label>
          ))}
        </>
      ) : (
        <Radio.Group
          value={props.name && props.formElement ? undefined : props.value}
          onChange={handleChange}
          disabled={disabled}
          buttonStyle={props.buttonStyle}
          size={props.size}
        >
          {props.type === "button"
            ? renderRadio(Radio.Button, options)
            : renderRadio(Radio, options)}
        </Radio.Group>
      )}
    </FormItemWrapper>
  );
}
