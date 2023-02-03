import React, { useEffect, useMemo, useRef, useState } from "react";
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
import { debounce, groupBy, isNil, isEqual, keyBy } from "lodash";
import { GeneralOption } from "@next-libs/forms/dist/types/interfaces";
import { maxTagCountType } from "./index";
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
  onChange?: (value: any, options: GeneralComplexOption[]) => void;
  onChangeV2?: (value: any) => void;
  onOptionDataChange?: (
    data: GeneralComplexOption | GeneralComplexOption[]
  ) => void;
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
  useBackend?: UseBackendConf & {
    onValueChangeArgs?: any[] | ((...args: any[]) => any[]);
  };
  onDebounceSearch?: (value: string) => void;
  debounceSearchDelay?: number;
  size?: "small" | "middle" | "large";
  tokenSeparators?: string[];
  popoverPositionType?: "default" | "parent";
  filterByLabelAndValue?: boolean;
  dropdownStyle?: React.CSSProperties;
  bordered?: boolean;
  maxTagCount?: maxTagCountType;
  defaultActiveFirstOption?: boolean;
}

// TODO(alex): 需要去掉`providers-of-cmdb.cmdb-object-api-list`，这里判断是为了开发者中心构件demo显示需要。
const isSearchable = (value: UseBackendConf): value is UseBackendConf => {
  return typeof value?.provider === "string";
};

export function GeneralSelectLegacy(
  props: GeneralSelectProps,
  ref: any
): React.ReactElement {
  const {
    suffix,
    suffixStyle,
    suffixBrick,
    suffixBrickStyle,
    tokenSeparators,
    hiddenCheckedValueSuffix,
    emptyProps,
    showSearch,
    filterByLabelAndValue,
    onOptionDataChange,
    defaultActiveFirstOption = false,
  } = props;
  const [checkedValue, setCheckedValue] = useState(props.value);
  const [options, setOptions] = useState<GeneralComplexOption[]>(props.options);
  const [loading, setLoading] = useState(false);
  const shouldTriggerOnValueChangeArgs = useRef(true);
  const curOptionData = useRef<GeneralComplexOption | GeneralComplexOption[]>();
  const request = useProvider({ cache: false });
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

  useEffect(() => {
    if (props.mode === "multiple") {
      const optionDataMap = keyBy(options, "value");
      const preOptionDataMap = keyBy(curOptionData.current, "value");

      const newOptionsData = []
        .concat(checkedValue ?? [])
        .map((v) => optionDataMap[v] || preOptionDataMap[v]);

      if (!isEqual(curOptionData.current, newOptionsData)) {
        curOptionData.current = newOptionsData;
        onOptionDataChange?.(newOptionsData);
      }
      return;
    } else {
      const newOptionData = options?.find((v) => v.value === checkedValue);
      const preOptionData = curOptionData.current;

      /**
       * 1、value变了会触发一次
       * 2、value相同，但optionData更新了也会触发一次
       */
      if (
        checkedValue !== preOptionData?.value ||
        (!isNil(checkedValue) &&
          !isNil(newOptionData) &&
          !isEqual(preOptionData, newOptionData))
      ) {
        curOptionData.current = newOptionData;
        onOptionDataChange?.(newOptionData);
      }
    }
  }, [checkedValue, options]);

  const handleChange = (newValue: any): void => {
    shouldTriggerOnValueChangeArgs.current = false;
    props.onChange?.(newValue, options);
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
    () =>
      (value = "", type: "valueChange" | "search") => {
        if (isSearchable(props.useBackend)) {
          const {
            provider,
            args,
            onValueChangeArgs,
            transform = (data) => data,
          } = props.useBackend;
          (async () => {
            try {
              setLoading(true);
              const actualArgs = applyArgs(
                type === "search" ? args : onValueChangeArgs,
                value
              );
              const result = await request.query(provider, actualArgs);
              if (isNil(result)) return;
              const transformedData = transform(result);
              const actualData = formatOptions(
                transformedData as unknown as GeneralOption[],
                props.fields as any
              );
              setOptions(actualData);
            } catch (e) {
              handleHttpError(e);
            } finally {
              setLoading(false);
            }
          })();
        } else {
          props?.useBackend?.provider &&
            // eslint-disable-next-line no-console
            console.error(
              `Please use "contract api" instead of "${props?.useBackend?.provider}".`
            );
        }
      },
    [props.useBackend, props.fields, props.value]
  );

  useEffect(() => {
    props?.useBackend?.onValueChangeArgs &&
      shouldTriggerOnValueChangeArgs.current &&
      !(Array.isArray(props.value)
        ? props.value.length === 0
        : isNil(props.value)) &&
      handleSearchQuery(props.value, "valueChange");
    shouldTriggerOnValueChangeArgs.current = true;
  }, [props.value, props.fields, props.useBackend]);

  const handleDebounceBackendSearch = useMemo(() => {
    return debounce(handleSearchQuery, props.debounceSearchDelay || 300);
  }, [props.debounceSearchDelay, handleSearchQuery]);

  const handleSearch = (value: string): void => {
    props.onSearch?.(value);
    handleDebounceSearch?.(value);
    handleDebounceBackendSearch(value, "search");
  };

  const searchProps = useMemo(() => {
    const filterOption = isSearchable(props.useBackend)
      ? false
      : (input: string, option: any) => {
          return filterSearch(input, option, filterByLabelAndValue);
        };
    return showSearch
      ? {
          showSearch: true,
          filterOption,
        }
      : {
          showSearch: false,
        };
  }, [filterByLabelAndValue, showSearch, props.useBackend]);

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
    <Select
      ref={ref}
      className={(suffix || suffixBrick) && style.suffixBrickSelect}
      {...searchProps}
      value={checkedValue}
      size={props.size}
      maxTagCount={props.maxTagCount}
      disabled={props.disabled}
      defaultActiveFirstOption={defaultActiveFirstOption}
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
      dropdownStyle={{ padding: "2px", ...props.dropdownStyle }}
      notFoundContent={<EasyopsEmpty {...emptyProps} />}
      loading={loading}
      bordered={props.bordered}
      onFocus={() => {
        props.onFocus?.();
        handleSearchQuery("", "search");
      }}
    >
      {props.groupBy
        ? getOptsGroups(options, props.groupBy)
        : getOptions(options)}
    </Select>
  );
}

export const RefGeneralSelectLegacy = React.forwardRef(GeneralSelectLegacy);

export function GeneralSelect(props: GeneralSelectProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <RefGeneralSelectLegacy {...props} />
    </FormItemWrapper>
  );
}
