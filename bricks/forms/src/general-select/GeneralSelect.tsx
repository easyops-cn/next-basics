import React, { useEffect, useMemo, useState } from "react";
import { UseBackendConf, UseBrickConf } from "@next-core/brick-types";
import {
  BrickAsComponent,
  EasyopsEmpty,
  EasyopsEmptyProps,
  handleHttpError,
  useProvider,
} from "@next-core/brick-kit";
import { Select } from "antd";
import {
  formatOptions,
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralComplexOption,
} from "@next-libs/forms";
import style from "./GeneralSelect.module.css";
import { debounce, groupBy } from "lodash";
import { GeneralOption } from "@next-libs/forms/dist/types/interfaces";

export const setTooltip = (event: React.MouseEvent) => {
  const target = event?.target as HTMLDivElement;
  if (target?.offsetWidth < target?.scrollWidth) {
    target.setAttribute("title", target.innerText);
  }
};
export const match = (input: string, field: string | number) => {
  return field?.toString()?.toLowerCase()?.includes(input.trim().toLowerCase());
};
export const filterSearch = (
  input: string,
  option: any,
  filterByLabelAndValue?: boolean
) => {
  return (
    match(input, option.label) ||
    (filterByLabelAndValue && match(input, option.value))
  );
};

const applyArgs = (args: any[] | ((query: string) => any[]), query: string) => {
  if (typeof args === "function") {
    return (args as (query: string) => any[]).call(null, query);
  }

  return args;
};

export interface GeneralSelectProps extends FormItemWrapperProps {
  options: GeneralComplexOption[];
  fields?: Partial<GeneralComplexOption>;
  groupBy?: string;
  mode?: string;
  placeholder?: string;
  value?: any;
  inputBoxStyle?: React.CSSProperties;
  dropdownMatchSelectWidth?: boolean;
  onChange?: (value: any) => void;
  onChangeV2?: (value: any) => void;
  allowClear?: boolean;
  showSearch?: boolean;
  disabled?: boolean;
  emptyProps?: EasyopsEmptyProps;
  suffix?: {
    useBrick: UseBrickConf;
  };
  hiddenCheckedValueSuffix?: boolean;
  suffixStyle?: React.CSSProperties;
  suffixBrick?: UseBrickConf;
  suffixBrickStyle?: React.CSSProperties;
  onSearch?: (value: string) => void;
  useBackend?: UseBackendConf;
  onDebounceSearch?: (value: string) => void;
  debounceSearchDelay?: number;
  size?: "small" | "middle" | "large";
  tokenSeparators?: string[];
  popoverPositionType?: "default" | "parent";
  filterByLabelAndValue?: boolean;
}

const isSearchable = (value: UseBackendConf): value is UseBackendConf => {
  return typeof value?.provider === "string" && value?.provider.includes("@");
};

export function GeneralSelect(props: GeneralSelectProps): React.ReactElement {
  const {
    suffix,
    suffixStyle,
    suffixBrick,
    suffixBrickStyle,
    tokenSeparators,
    hiddenCheckedValueSuffix,
    emptyProps,
    filterByLabelAndValue,
  } = props;
  const [checkedValue, setCheckedValue] = useState(props.value);
  const [options, setOptions] = useState<GeneralComplexOption[]>(props.options);
  const [loading, setLoading] = useState(false);
  const request = useProvider();
  React.useEffect(() => {
    if (suffixBrick) {
      // eslint-disable-next-line no-console
      console.log(
        "`suffixBrick` and `suffixBrickStyle` of <forms.general-select> is deprecated, use `suffix` instead"
      );
    }
  }, [suffixBrick]);
  React.useEffect(() => {
    setCheckedValue(props.value);
  }, [props.value]);

  useEffect(() => {
    setOptions(props.options);
  }, [props.options]);

  const handleChange = (newValue: any): void => {
    props.onChange?.(newValue);
    const newValueV2 =
      props.mode === "multiple"
        ? options.filter((item) => newValue.includes(item.value))
        : options.find((item) => item.value === newValue);
    props.onChangeV2?.(newValueV2);
    setCheckedValue(newValue);
  };

  const handleDebounceSearch = React.useMemo(() => {
    return (
      props.onDebounceSearch &&
      debounce(props.onDebounceSearch, props.debounceSearchDelay ?? 300)
    );
  }, [props.onDebounceSearch, props.debounceSearchDelay]);

  const handleSearchQuery = useMemo(
    () => (value: string) => {
      if (isSearchable(props.useBackend)) {
        const { provider, args, transform = (data) => data } = props.useBackend;
        (async () => {
          try {
            setLoading(true);
            const actualArgs = applyArgs(args, value);
            const result = await request.query(provider, actualArgs);
            const transformedData = transform(result);
            const actualData = formatOptions(
              transformedData as unknown as GeneralOption[],
              props.fields as any
            );
            setOptions([...actualData]);
            setLoading(false);
          } catch (e) {
            handleHttpError(e);
          } finally {
            setLoading(false);
          }
        })();
      } else {
        setOptions(props.options);
      }
    },
    [props.useBackend, props.fields]
  );

  const handleDebounceBackendSearch = useMemo(() => {
    return debounce(handleSearchQuery, props.debounceSearchDelay || 300);
  }, [props.debounceSearchDelay, handleSearchQuery]);

  const handleSearch = (value: string): void => {
    props.onSearch?.(value);
    handleDebounceSearch?.(value);
    handleDebounceBackendSearch(value);
  };

  const searchProps = props.showSearch
    ? {
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return filterSearch(input, option, filterByLabelAndValue);
        },
      }
    : {
        showSearch: false,
      };
  const showSuffix = (op: GeneralComplexOption) =>
    hiddenCheckedValueSuffix ? op.value !== checkedValue : true;
  const getOptions = (options: GeneralComplexOption[]) => {
    return options.map((op) => (
      <Select.Option
        key={op.value as string}
        value={op.value as string}
        label={op.label}
        className={style.itemOption}
        disabled={op.disabled}
      >
        <div className={style.option} onMouseEnter={setTooltip}>
          <span className={style.label}>{op.label}</span>
          {suffix
            ? suffix.useBrick &&
              showSuffix(op) && (
                <div className={style.suffixContainer} style={suffixStyle}>
                  <BrickAsComponent useBrick={suffix.useBrick} data={op} />
                </div>
              )
            : suffixBrick && (
                <div className={style.suffixContainer} style={suffixBrickStyle}>
                  <BrickAsComponent useBrick={suffixBrick} data={op} />
                </div>
              )}
        </div>
      </Select.Option>
    ));
  };

  const getOptsGroups = (options: GeneralComplexOption[], category: string) => {
    const optsGroup = Object.entries(groupBy(options, category));

    return optsGroup.map(([label, options]) => (
      <Select.OptGroup key={label} label={label}>
        {getOptions(options)}
      </Select.OptGroup>
    ));
  };

  return (
    <FormItemWrapper {...props}>
      <Select
        className={(suffix || suffixBrick) && style.suffixBrickSelect}
        {...searchProps}
        value={props.name && props.formElement ? undefined : props.value}
        size={props.size}
        disabled={props.disabled}
        defaultActiveFirstOption={false}
        mode={props.mode as "multiple" | "tags"}
        placeholder={props.placeholder}
        onChange={handleChange}
        onMouseEnter={setTooltip}
        dropdownMatchSelectWidth={props.dropdownMatchSelectWidth}
        allowClear={props.allowClear}
        style={props.inputBoxStyle}
        onSearch={handleSearch}
        tokenSeparators={tokenSeparators}
        {...(props.popoverPositionType === "parent"
          ? { getPopupContainer: (triggerNode) => triggerNode.parentElement }
          : {})}
        dropdownStyle={{ padding: "2px" }}
        notFoundContent={<EasyopsEmpty {...emptyProps} />}
        loading={loading}
      >
        {props.groupBy
          ? getOptsGroups(options, props.groupBy)
          : getOptions(options)}
      </Select>
    </FormItemWrapper>
  );
}
