import React, { useEffect, useState } from "react";
import { Radio, Tooltip } from "antd";
import { RadioChangeEvent, RadioGroupButtonStyle } from "antd/lib/radio";
import {
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralOption,
} from "@next-libs/forms";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "./index.module.css";
import { RadioType } from ".";
import { UiType } from "../interfaces";
import classNames from "classnames";

export interface GeneralRadioProps extends FormItemWrapperProps {
  type?: RadioType;
  options: GeneralOption[];
  value?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  buttonStyle?: RadioGroupButtonStyle;
  size?: "large" | "middle" | "small";
  uiType?: UiType;
}

interface IconRadioGroupProps {
  options: GeneralOption[];
  disabled?: boolean;
  name?: string;
  value?: any;
  onChange?: (value: any) => void;
}

function IconRadioGroup(props: IconRadioGroupProps): React.ReactElement {
  const { options, name, disabled, onChange } = props;
  const [value, setValue] = useState(undefined);

  useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const curValue = e.target.value;
    setValue(curValue);
    onChange?.({ target: { value: curValue } });
  };

  return (
    <>
      {options?.map((item: any) => (
        <label
          htmlFor={item.value}
          className={classNames(styles.iconRadio, {
            [styles.disabledIconRadio]: disabled || item.disabled,
          })}
          key={item.value}
        >
          <input
            type="radio"
            value={item.value}
            name={name}
            disabled={disabled || item.disabled}
            id={item.value}
            onChange={handleChange}
            checked={value === item.value}
          />
          <Tooltip title={item.tooltip}>
            <div className={styles.content}>
              {item.icon && (
                <GeneralIcon
                  style={{
                    fontSize: "32px",
                  }}
                  icon={item.icon}
                ></GeneralIcon>
              )}
              <div>{item.label}</div>
            </div>
          </Tooltip>
        </label>
      ))}
    </>
  );
}

export function GeneralRadio(props: GeneralRadioProps): React.ReactElement {
  const { options, disabled, uiType } = props;

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
        <Tooltip key={item.value} title={item.tooltip}>
          <Component value={item.value} disabled={item.disabled}>
            {Component === Radio.Button && item.icon ? (
              <>
                <GeneralIcon icon={item.icon}></GeneralIcon>
                {item.label && (
                  <span style={{ paddingLeft: "5px" }}>{item.label}</span>
                )}
              </>
            ) : (
              item.label
            )}
          </Component>
        </Tooltip>
      );
    });
  };
  return (
    <div className={uiType === "dashboard" ? styles.dashboardRadio : ""}>
      <FormItemWrapper {...props}>
        {props.type === "icon" ? (
          <IconRadioGroup
            value={props.value}
            onChange={handleChange}
            options={options}
            disabled={disabled}
            name={props.name}
          />
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
    </div>
  );
}
