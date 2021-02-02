import React, { useEffect, forwardRef, useRef } from "react";
import { BrickAsComponent } from "@next-core/brick-kit";

import { ControlConfig } from ".";

export interface AbstractFormControlProps {
  control?: ControlConfig;
  value?: any;
  controlValue?: any;
  onChange?(value: any): void;
  onControlValueChange?(value: any): void;
}

export const AbstractFormControl = forwardRef<
  HTMLElement, // antd 3.x 的自定义表单控件需要支持 ref，升到 4.x 以后可移除
  AbstractFormControlProps
>(function AbstractFormControl(props, ref): React.ReactElement {
  const {
    control,
    value,
    controlValue,
    onChange,
    onControlValueChange,
  } = props;
  const valueRef = useRef();

  useEffect(() => {
    if (controlValue !== valueRef.current) {
      valueRef.current = controlValue;

      onChange?.(controlValue);
    }
  }, [controlValue]);

  useEffect(() => {
    if (value !== valueRef.current) {
      valueRef.current = value;

      onControlValueChange?.(value);
    }
  }, [value]);

  return (
    <>
      <slot id="controlSlot" name="control" ref={ref} />
      {control && <BrickAsComponent useBrick={control.useBrick} />}
    </>
  );
});
