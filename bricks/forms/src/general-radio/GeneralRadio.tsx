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
import { BrickAsComponent } from "@next-core/brick-kit";
import { UseBrickConf } from "@next-core/brick-types";

interface CustomOptions {
  url: string;
  description?: string;
  title: string;
  backgroundColor?: string;
  value: string;
  [propName: string]: any;
}
export interface GeneralRadioProps extends FormItemWrapperProps {
  type?: RadioType;
  options: GeneralOption[] | CustomOptions[];
  value?: any;
  disabled?: boolean;
  onChange?: (value: any) => void;
  buttonStyle?: RadioGroupButtonStyle;
  size?: "large" | "middle" | "small";
  uiType?: UiType;
  useBrick?: UseBrickConf;
  customStyle?: React.CSSProperties;
}

declare type SrcIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

interface IconRadioGroupProps {
  options: GeneralOption[];
  type: "icon" | "icon-circle" | "icon-square" | "custom";
  disabled?: boolean;
  name?: string;
  value?: any;
  useBrick?: UseBrickConf;
  onChange?: (value: any) => void;
  customStyle?: React.CSSProperties;
}

function IconRadioGroup(props: IconRadioGroupProps): React.ReactElement {
  const { options, name, disabled, onChange, type, customStyle } = props;
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
          style={customStyle}
          className={classNames({
            [styles.disabledIconRadio]: disabled || item.disabled,
            [styles.iconRadio]: type === "icon",
            [styles.customRadio]: type === "custom",
            [styles.specialIconRadio]:
              type === "icon-circle" || type === "icon-square",
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
            {type === "icon" ? (
              <div className={styles.content}>
                {item.icon && (
                  <GeneralIcon
                    style={{
                      fontSize: "32px",
                    }}
                    size={32}
                    icon={item.icon}
                  />
                )}
                <div>{item.label}</div>
              </div>
            ) : type === "custom" ? (
              <div className={styles.customContent}>
                <BrickAsComponent
                  useBrick={props.useBrick}
                  data={item}
                ></BrickAsComponent>
              </div>
            ) : (
              <div
                className={classNames({
                  [styles.iconContent]:
                    type === "icon-circle" || type === "icon-square",
                })}
              >
                {item.icon && (
                  <div
                    className={classNames({
                      [styles.circleIcon]: type === "icon-circle",
                      [styles.squareIcon]: type === "icon-square",
                    })}
                  >
                    <GeneralIcon icon={item.icon} size={46} />
                  </div>
                )}
                <span title={item.label}>{item.label}</span>
              </div>
            )}
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
      const icon = item.icon;

      let defaultIcon: JSX.Element = null;
      if (Component === Radio && icon) {
        if ("imgSrc" in icon) {
          const mergedIcon: SrcIcon = {
            imgSrc: icon.imgSrc,
            imgStyle: {
              marginRight: "8px",
              verticalAlign: "-0.42em",
              ...icon.imgStyle,
            },
          };
          defaultIcon = <GeneralIcon icon={mergedIcon} size={22} />;
        } else {
          defaultIcon = (
            <GeneralIcon
              icon={icon}
              style={{
                fontSize: "22px",
                marginRight: "8px",
                verticalAlign: "-0.25em",
              }}
              size={22}
            />
          );
        }
      }

      let buttonIcon: JSX.Element = null;
      if (Component === Radio.Button && icon) {
        if ("imgSrc" in icon) {
          const mergedIcon = {
            imgSrc: icon.imgSrc,
            imgStyle: {
              verticalAlign: "-0.125em",
              ...icon.imgStyle,
            },
          };
          buttonIcon = <GeneralIcon icon={mergedIcon} size={14} />;
        } else {
          buttonIcon = <GeneralIcon icon={icon} size={14} />;
        }
      }

      return (
        <Tooltip key={item.value} title={item.tooltip}>
          <Component value={item.value} disabled={item.disabled}>
            {Component === Radio.Button && icon ? (
              <>
                {buttonIcon}
                {item.label && (
                  <span style={{ paddingLeft: "5px" }}>{item.label}</span>
                )}
              </>
            ) : (
              <>
                {defaultIcon}
                {item.label}
              </>
            )}
          </Component>
        </Tooltip>
      );
    });
  };
  return (
    <div className={uiType === "dashboard" ? styles.dashboardRadio : ""}>
      <FormItemWrapper {...props}>
        {props.type === "icon" ||
        props.type === "icon-circle" ||
        props.type === "icon-square" ||
        props.type === "custom" ? (
          <IconRadioGroup
            value={props.value}
            onChange={handleChange}
            options={options}
            disabled={disabled}
            name={props.name}
            type={props.type}
            useBrick={props.useBrick}
            customStyle={props.customStyle}
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
