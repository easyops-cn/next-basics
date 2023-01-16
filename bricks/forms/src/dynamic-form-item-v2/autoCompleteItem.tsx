import { AutoComplete } from "antd";
import React, { useMemo } from "react";
import { OptionType, Option } from "../interfaces";

interface AutoCompleteProps {
  options: string[] | OptionType[];
  disabled?: boolean;
  allowClear?: boolean;
  placeholder?: React.ReactNode;
  isAppendMode?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

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

export function AutoCompleteItem(props: AutoCompleteProps): React.ReactElement {
  const { disabled, allowClear, placeholder, isAppendMode, value, onChange } =
    props;

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

  const handleAppendChange = (e: string) => {
    if (e) {
      if (
        e === value ||
        value === undefined ||
        Math.abs(e?.length - value?.length) >= 1
      ) {
        onChange(e);
      } else {
        onChange((value ?? "").concat(e));
      }
    } else {
      onChange("");
    }
  };

  return (
    <AutoComplete
      options={options}
      disabled={disabled}
      allowClear={allowClear}
      placeholder={placeholder}
      value={value}
      onSelect={
        isAppendMode ? (e) => value && e && onChange(value.concat(e)) : null
      }
      onSearch={isAppendMode ? null : onSearch}
      onChange={isAppendMode ? handleAppendChange : onChange}
    />
  );
}
