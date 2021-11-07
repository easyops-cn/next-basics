import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Cascader } from "antd";
import {
  CascaderOptionType,
  CascaderExpandTrigger,
  FieldNamesType,
} from "antd/lib/cascader";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import style from "./GeneralCascader.module.css";
import { getTargetOption } from "./processor";
import { ProcessedOptionData } from "../interfaces";

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
  onLoadingData?: (targetOption: CascaderOptionType[]) => void;
}

export function LegacyGeneralCascader(
  props: GeneralCascaderProps,
  ref: React.Ref<any>
): React.ReactElement {
  const {
    limit,
    allowClear,
    disabled,
    formElement,
    expandTrigger,
    fieldNames,
    notFoundContent,
    placeholder,
    popupPlacement,
    showSearch,
    size,
    suffixIcon,
  } = props;
  const filter = (inputValue: string, path: CascaderOptionType[]): boolean => {
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

  const [options, setOptions] = useState(props.options);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const setChildrenOption = (
    curOptionData: ProcessedOptionData,
    childrenOptions: CascaderOptionType[]
  ): void => {
    const targetOption = getTargetOption(
      fieldNames,
      curOptionData.selectedOptions,
      options
    );
    if (targetOption) {
      targetOption.loading = false;
      targetOption[fieldNames.children] = childrenOptions;
      setOptions([...options]);
    }
  };

  useImperativeHandle(ref, () => ({
    setChildrenOption,
  }));

  const handleLoadingData = (selectedOptions: CascaderOptionType[]): void => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    props.onLoadingData?.(selectedOptions);
  };

  const handlerDisplayRender = (
    label: string[],
    selectedOptions: CascaderOptionType[]
  ): string => {
    /**
     * https://github.com/ant-design/ant-design/issues/27541
     * https://github.com/ant-design/ant-design/issues/6761
     * 对于有动态加载项的特殊处理，编辑模式下值回填的时候找不到 label 值时以 value 值来展示
     */
    if (selectedOptions.some((item) => item.isLeaf === false)) {
      const selectedValues: string[] =
        props.name && formElement
          ? formElement.formUtils.getFieldValue(props.name)
          : props.value;

      return selectedValues
        ?.map(
          (value) =>
            selectedOptions.find((option) => option[fieldNames.value] === value)
              ?.label || value
        )
        ?.join(" / ");
    }

    return label.join(" / ");
  };

  return (
    <FormItemWrapper {...props}>
      <Cascader
        popupClassName={style.cascaderOption}
        value={props.name && formElement ? undefined : props.value}
        options={options}
        allowClear={allowClear}
        disabled={disabled}
        expandTrigger={expandTrigger}
        fieldNames={fieldNames}
        notFoundContent={notFoundContent}
        placeholder={placeholder}
        popupPlacement={popupPlacement}
        showSearch={showSearch && { limit, filter }}
        size={size}
        style={props.style}
        suffixIcon={suffixIcon && <LegacyIcon type={suffixIcon} />}
        onChange={(value, selectedOptions) =>
          props.onChange?.(value, selectedOptions)
        }
        loadData={handleLoadingData}
        displayRender={handlerDisplayRender}
      />
    </FormItemWrapper>
  );
}

export const GeneralCascader = forwardRef(LegacyGeneralCascader);
