import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AutoComplete } from "antd";
import { SelectValue } from "antd/lib/select";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { NS_FORMS, K } from "../i18n/constants";
import { OptionType, Option, OptionGroup } from "../interfaces";
import styles from "./GeneralAutoComplete.module.css";

const match = (input: string, field: string | number): boolean => {
  return field?.toString()?.toLowerCase()?.includes(input);
};

function filterOptions(
  value: string,
  options: OptionType[],
  filterByCaption?: boolean
): OptionType[] {
  const filteredOptions: OptionType[] = [];

  options.forEach((option) => {
    let filteredChildOptions: Option[];

    if ("options" in option) {
      filteredChildOptions = filterOptions(
        value,
        option.options,
        filterByCaption
      ) as Option[];

      if (filteredChildOptions?.length) {
        filteredOptions.push({ ...option, options: filteredChildOptions });
      }
    } else if (
      match(value, option.label) ||
      (filterByCaption && match(value, option.caption))
    ) {
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
  filterByCaption?: boolean;
}

export function GeneralAutoComplete(
  props: GeneralAutoCompleteProps
): React.ReactElement {
  const { t } = useTranslation(NS_FORMS);
  const originalOptions: OptionType[] = useMemo(() => {
    const walkOptions = (options: (OptionType | string)[]): OptionType[] => {
      return options?.map((op) => {
        if (typeof op === "string") {
          return {
            label: op,
            value: op,
          };
        } else if ("options" in op && Array.isArray(op.options)) {
          return { ...op, options: walkOptions(op.options) } as OptionGroup;
        } else {
          return op;
        }
      });
    };

    return walkOptions(props.options);
  }, [props.options]);

  const [options, setOptions] = React.useState(originalOptions);

  const onSearch = (v: string) => {
    const q = v.trim().toLowerCase();

    setOptions(filterOptions(q, originalOptions, props.filterByCaption));
  };

  React.useEffect(() => {
    setOptions(originalOptions);
  }, [originalOptions]);

  const _options = useMemo(() => {
    const walkOptions = (options: OptionType[]): any => {
      return options?.map((op) => {
        if ("options" in op) {
          return { ...op, options: walkOptions(op.options) };
        } else {
          return {
            ...op,
            label: (
              <div className={styles.optionContainer}>
                <span className={styles.label}>{op.label}</span>
                {op.caption && (
                  <span className={styles.caption}>{op.caption}</span>
                )}
              </div>
            ),
          };
        }
      });
    };
    return walkOptions(options);
  }, [options]);

  return (
    <FormItemWrapper {...props}>
      <AutoComplete
        value={props.name && props.formElement ? undefined : props.value}
        options={_options}
        style={{ width: 200, ...props.inputBoxStyle }}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onSearch={onSearch}
        disabled={props.disabled}
      />
    </FormItemWrapper>
  );
}
