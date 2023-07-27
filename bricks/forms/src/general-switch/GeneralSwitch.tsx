import React from "react";
import { Switch } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";

interface GeneralSwitchProps extends FormItemWrapperProps {
  value: boolean;
  size?: "default" | "small";
  onChange?: (v: boolean) => void;
  disabled?: boolean;
  checkedIcon?: MenuIcon;
  unCheckedIcon?: MenuIcon;
  checkedText?: string;
  unCheckedText?: string;
}

export function GeneralSwitch(props: GeneralSwitchProps): React.ReactElement {
  const {
    value,
    size,
    onChange,
    disabled,
    checkedIcon,
    unCheckedIcon,
    checkedText,
    unCheckedText,
  } = props;

  return (
    <FormItemWrapper {...props} valuePropName="checked">
      <Switch
        checked={props.name && props.formElement ? undefined : value}
        size={size}
        onChange={onChange}
        disabled={disabled}
        data-testid="switch"
        checkedChildren={
          <>
            {checkedIcon && <GeneralIcon icon={checkedIcon} />}
            {checkedText}
          </>
        }
        unCheckedChildren={
          <>
            {unCheckedIcon && <GeneralIcon icon={unCheckedIcon} />}
            {unCheckedText}
          </>
        }
      />
    </FormItemWrapper>
  );
}
