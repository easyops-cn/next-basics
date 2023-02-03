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
  disabled?: boolean;
  isAppendMode?: boolean;
}

export function GeneralAutoComplete(
  props: GeneralAutoCompleteProps
): React.ReactElement {
  const {
    value,
    onChange,
    isAppendMode,
    name,
    placeholder,
    formElement,
    inputBoxStyle,
    disabled,
  } = props;
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
  const [nodeId, setNodeId] = React.useState("");
  const [node, setNode] = React.useState<HTMLInputElement>();

  const onSearch = (v: string) => {
    const q = v.trim().toLowerCase();

    setOptions(filterOptions(q, originalOptions));
  };

  React.useEffect(() => {
    setOptions(originalOptions);
  }, [originalOptions]);

  React.useEffect(() => {
    setNode(document.getElementById(nodeId) as HTMLInputElement);
  }, [nodeId]);

  const handleAppendChange = (e: string) => {
    if (e) {
      if (e === value || !value || Math.abs(e?.length - value?.length) >= 1) {
        onChange(e);
      } else {
        onChange(value.concat(e));
      }
    } else {
      onChange("");
    }
  };

  const handleAppendSelect = (e: string) => {
    if (!value || !e) return;
    onChange(
      value
        .slice(0, node?.selectionStart ?? value.length)
        .concat(e)
        .concat(value.slice(node?.selectionStart ?? value.length))
    );
  };

  return (
    <FormItemWrapper {...props}>
      <AutoComplete
        value={name && formElement ? undefined : value}
        options={options}
        style={{ width: 200, ...inputBoxStyle }}
        placeholder={placeholder}
        onChange={isAppendMode ? handleAppendChange : onChange}
        onSearch={isAppendMode ? null : onSearch}
        disabled={disabled}
        onSelect={isAppendMode ? handleAppendSelect : null}
        onFocus={(e) => setNodeId(e.target.id)}
      />
    </FormItemWrapper>
  );
}
