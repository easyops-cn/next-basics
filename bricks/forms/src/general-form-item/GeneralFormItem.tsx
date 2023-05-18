import React from "react";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";

import {
  AbstractFormControl,
  AbstractFormControlProps,
} from "./AbstractFormControl";

export interface GeneralFormItemProps
  extends FormItemWrapperProps,
    Pick<AbstractFormControlProps, "controlBrick" | "value"> {
  onChange?(value: unknown): void;
}

export function GeneralFormItem(
  props: GeneralFormItemProps
): React.ReactElement {
  const { controlBrick, value } = props;

  return (
    <FormItemWrapper {...props}>
      <AbstractFormControl
        controlBrick={controlBrick}
        controlValue={value}
        onControlValueChange={props.onChange}
      />
    </FormItemWrapper>
  );
}
