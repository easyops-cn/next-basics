import React, { useEffect, forwardRef, useRef } from "react";
import { BrickAsComponent } from "@next-core/brick-kit";

import { ControlBrickConfig } from "../interfaces";

export interface AbstractFormControlProps {
  controlBrick?: ControlBrickConfig;
  value?: unknown;
  controlValue?: unknown;
  onChange?(value: unknown): void;
  onControlValueChange?(value: unknown): void;
}

export const AbstractFormControl = forwardRef<
  HTMLDivElement, // antd 3.x 的自定义表单控件需要支持 ref，升到 4.x 以后可移除
  AbstractFormControlProps
>(function AbstractFormControl(props, ref): React.ReactElement {
  const { controlBrick, value, controlValue, onChange, onControlValueChange } =
    props;
  const valueRef = useRef();

  useEffect(() => {
    if (controlValue !== valueRef.current) {
      // @ts-ignore
      valueRef.current = controlValue;

      onChange?.(controlValue);
    }
  }, [controlValue, onChange]);

  useEffect(() => {
    if (value !== valueRef.current) {
      // @ts-ignore
      valueRef.current = value;

      onControlValueChange?.(value);
    }
  }, [value]);

  return (
    <div style={{ display: "contents" }} ref={ref}>
      <slot id="controlSlot" name="control" />
      {controlBrick && <BrickAsComponent useBrick={controlBrick.useBrick} />}
    </div>
  );
});
