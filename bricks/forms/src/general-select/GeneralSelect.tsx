import React, { useState } from "react";
import { UseBrickConf } from "@next-core/brick-types";
import {
  BrickAsComponent,
  EasyopsEmpty,
  EasyopsEmptyProps,
} from "@next-core/brick-kit";
import { Select, Tooltip } from "antd";
import {
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralComplexOption,
} from "@next-libs/forms";
import style from "./GeneralSelect.module.css";
import { debounce, groupBy, isNil } from "lodash";

export interface GeneralSelectProps extends FormItemWrapperProps {
  options: GeneralComplexOption[];
  optionTooltip?: boolean;
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
  onDebounceSearch?: (value: string) => void;
  debounceSearchDelay?: number;
  size?: "small" | "middle" | "large";
  tokenSeparators?: string[];
  popoverPositionType?: "default" | "parent";
}

export function GeneralSelect(props: GeneralSelectProps): React.ReactElement {
  const {
    suffix,
    suffixStyle,
    suffixBrick,
    suffixBrickStyle,
    tokenSeparators,
    hiddenCheckedValueSuffix,
    emptyProps,
  } = props;
  const [checkedValue, setCheckedValue] = useState(props.value);
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

  const handleChange = (newValue: any): void => {
    props.onChange?.(newValue);
    const newValueV2 =
      props.mode === "multiple"
        ? props.options.filter((item) => newValue.includes(item.value))
        : props.options.find((item) => item.value === newValue);
    props.onChangeV2?.(newValueV2);
    setCheckedValue(newValue);
  };

  const handleDebounceSearch = React.useMemo(() => {
    return (
      props.onDebounceSearch &&
      debounce(props.onDebounceSearch, props.debounceSearchDelay ?? 300)
    );
  }, [props.onDebounceSearch, props.debounceSearchDelay]);

  const handleSearch = (value: string): void => {
    props.onSearch?.(value);
    handleDebounceSearch?.(value);
  };

  const searchProps = props.showSearch
    ? {
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label
            ?.toLowerCase()
            .includes(input.trim().toLowerCase());
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
        <Tooltip title={props.optionTooltip ? op.label : ""}>
          <div className={style.option}>
            <span className={style.label}>{op.label}</span>
            {suffix
              ? suffix.useBrick &&
                showSuffix(op) && (
                  <div className={style.suffixContainer} style={suffixStyle}>
                    <BrickAsComponent useBrick={suffix.useBrick} data={op} />
                  </div>
                )
              : suffixBrick && (
                  <div
                    className={style.suffixContainer}
                    style={suffixBrickStyle}
                  >
                    <BrickAsComponent useBrick={suffixBrick} data={op} />
                  </div>
                )}
          </div>
        </Tooltip>
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
        mode={props.mode as "multiple" | "tags"}
        placeholder={props.placeholder}
        onChange={handleChange}
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
      >
        {props.groupBy
          ? getOptsGroups(props.options, props.groupBy)
          : getOptions(props.options)}
      </Select>
    </FormItemWrapper>
  );
}
