import React from "react";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";

import { AbstractFormControl } from "./AbstractFormControl";
import { ControlConfig } from ".";

export interface GeneralFormItemProps extends FormItemWrapperProps {
  control?: ControlConfig;
  value?: any;
  onChange?(value: any): void;
}

export function GeneralFormItem(
  props: GeneralFormItemProps
): React.ReactElement {
  const { control, value } = props;

  return (
    <FormItemWrapper {...props}>
      <AbstractFormControl
        control={control}
        controlValue={value}
        onControlValueChange={props.onChange}
      />
    </FormItemWrapper>
  );
}
