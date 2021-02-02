import React from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Cascader } from "antd";
import {
  CascaderOptionType,
  CascaderExpandTrigger,
  FieldNamesType,
} from "antd/lib/cascader";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import style from "./GeneralCascader.module.css";

export interface GeneralCascaderProps extends FormItemWrapperProps {
  value?: any;
  options: CascaderOptionType[];
  disabled?: boolean;
  allowClear?: boolean;
  expandTrigger?: CascaderExpandTrigger;
  fieldNames?: FieldNamesType;
  notFoundContent?: string;
  placeholder?: string;
  popupPlacement?: string;
  showSearch?: boolean;
  size?: string;
  style?: React.CSSProperties;
  suffixIcon?: string;
  onChange?: (value: string[], selectedOptions: CascaderOptionType[]) => void;
  limit?: number;
}

export function GeneralCascader(
  props: GeneralCascaderProps
): React.ReactElement {
  const filter = (inputValue: string, path: CascaderOptionType[]) => {
    const label = props.fieldNames.label;
    const filterValues = inputValue
      .split(" ")
      .filter((item) => item)
      .map((item) => item.toLocaleLowerCase());
    for (let j = 0; j < filterValues.length; j++) {
      if (
        !path.some((option) =>
          (option[label] as string).toLowerCase().includes(filterValues[j])
        )
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <FormItemWrapper {...props}>
      <Cascader
        popupClassName={style.cascaderOption}
        value={props.name && props.formElement ? undefined : props.value}
        options={props.options}
        allowClear={props.allowClear}
        disabled={props.disabled}
        expandTrigger={props.expandTrigger}
        fieldNames={props.fieldNames}
        notFoundContent={props.notFoundContent}
        placeholder={props.placeholder}
        popupPlacement={props.popupPlacement}
        showSearch={props.showSearch && { limit: props.limit, filter }}
        size={props.size}
        style={props.style}
        suffixIcon={props.suffixIcon && <LegacyIcon type={props.suffixIcon} />}
        onChange={(value, selectedOptions) =>
          props.onChange?.(value, selectedOptions)
        }
      />
    </FormItemWrapper>
  );
}
