import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "antd";
import { SelectValue } from "antd/lib/select";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { NS_FORMS, K } from "../i18n/constants";
import { OptionType, Option } from "../interfaces";

function filterOptions(value: string, options: OptionType[]): OptionType[] {
  const filteredOptions: OptionType[] = [];

  options.forEach((option) => {
    let filteredChildOptions: Option[];

    if ("options" in option) {
      filteredChildOptions = filterOptions(value, option.options) as Option[];

      if (filteredChildOptions?.length) {
        filteredOptions.push({ ...option, options: filteredChildOptions });
      }
    } else if (option.label?.toLowerCase().includes(value)) {
      filteredOptions.push(option);
    }
  });

  return filteredOptions;
}

interface GeneralAutoCompleteProps extends FormItemWrapperProps {
  value: string;
  options: string[] | OptionType[];
  inputBoxStyle?: React.CSSProperties;
  onChange?: (value: SelectValue) => void;
  placeholder?: string;
}

export function GeneralAutoComplete(
  props: GeneralAutoCompleteProps
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const originalOptions: OptionType[] = useMemo(
    () =>
      typeof props.options?.[0] === "string"
        ? (props.options as string[]).map((option) => ({
            label: option,
            value: option,
          }))
        : (props.options as OptionType[]),
    [props.options]
  );
  const [options, setOptions] = React.useState(originalOptions);

  const onSearch = (v: string) => {
    const q = v.trim().toLowerCase();

    setOptions(filterOptions(q, originalOptions));
  };

  React.useEffect(() => {
    setOptions(originalOptions);
  }, [originalOptions]);

  return (
    <FormItemWrapper {...props}>
      <AutoComplete
        value={props.name && props.formElement ? undefined : props.value}
        options={options}
        style={{ width: 200, ...props.inputBoxStyle }}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onSearch={onSearch}
      />
    </FormItemWrapper>
  );
}
