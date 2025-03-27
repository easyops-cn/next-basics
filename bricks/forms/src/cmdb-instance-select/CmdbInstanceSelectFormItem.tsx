import React, { useEffect, useRef } from "react";
import { isNil } from "lodash";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import {
  CmdbInstanceSelectProps,
  CmdbInstanceSelect,
  ComplexOption,
} from "@next-libs/cmdb-instances";

export interface CmdbInstanceSelectFormItemProps
  extends Omit<CmdbInstanceSelectProps, "optionsChange">,
    FormItemWrapperProps {
  optionsChange: (options: ComplexOption[], name: string) => void;
}

export function CmdbInstanceSelectFormItem(
  props: CmdbInstanceSelectFormItemProps
): React.ReactElement {
  const selectRef = useRef<any>();
  const handleChange = (value: any, option: ComplexOption): void => {
    Promise.resolve().then(() => {
      props.onChange?.(value, option);
    });
  };
  useEffect(() => {
    if (!isNil(props.useBrickVisible)) {
      Promise.resolve().then(() => {
        if (props.useBrickVisible) {
          selectRef.current.focus();
        } else {
          selectRef.current?.blur();
        }
      });
    }
  }, [props.useBrickVisible]);

  return (
    <FormItemWrapper {...props}>
      <CmdbInstanceSelect
        {...props}
        onChange={handleChange}
        optionsChange={(options) => props?.optionsChange(options, props.name)}
        ref={selectRef}
      ></CmdbInstanceSelect>
    </FormItemWrapper>
  );
}
