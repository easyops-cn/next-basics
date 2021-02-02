import React from "react";
import { Switch } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

interface GeneralSwitchProps extends FormItemWrapperProps {
  value: boolean;
  size?: "default" | "small";
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}

interface RealSwitchProps {
  value?: boolean;
  size?: "default" | "small";
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}

export const RealSwitch = (
  props: RealSwitchProps,
  ref: any
): React.ReactElement => {
  const [value, setValue] = React.useState(!!props.value);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    props.onChange?.(checked);
  };

  React.useEffect(() => {
    setValue(!!props.value);
  }, [props.value]);

  return (
    <Switch
      ref={ref}
      checked={value}
      size={props.size}
      onChange={handleChange}
      disabled={props.disabled}
    />
  );
};

export const RefSwitch = React.forwardRef(RealSwitch);

export function GeneralSwitch(props: GeneralSwitchProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefSwitch
        value={props.name && props.formElement ? undefined : props.value}
        size={props.size}
        onChange={props.onChange}
        disabled={props.disabled}
      />
    </FormItemWrapper>
  );
}
