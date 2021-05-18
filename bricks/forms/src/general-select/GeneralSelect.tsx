import React from "react";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { Select } from "antd";
import { ModeOption } from "antd/lib/select";
import {
  FormItemWrapper,
  FormItemWrapperProps,
  GeneralComplexOption,
} from "@next-libs/forms";
import style from "./GeneralSelect.module.css";
import { groupBy } from "lodash";

export interface GeneralInputProps extends FormItemWrapperProps {
  options: GeneralComplexOption[];
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
  suffix?: {
    useBrick: UseBrickConf;
  };
  suffixStyle?: React.CSSProperties;
  suffixBrick?: UseBrickConf;
  suffixBrickStyle?: React.CSSProperties;
  onSearch?: (value: string) => void;
  size?: "small" | "default" | "large";
  tokenSeparators?: string[];
  popoverPositionType: "default" | "parent";
}

export function GeneralSelect(props: GeneralInputProps): React.ReactElement {
  const {
    suffix,
    suffixStyle,
    suffixBrick,
    suffixBrickStyle,
    tokenSeparators,
  } = props;

  React.useEffect(() => {
    if (suffixBrick) {
      // eslint-disable-next-line no-console
      console.log(
        "`suffixBrick` and `suffixBrickStyle` of <forms.general-select> is deprecated, use `suffix` instead"
      );
    }
  }, [suffixBrick]);

  const handleChange = (newValue: any): void => {
    props.onChange?.(newValue);
    props.onChangeV2?.(props.options.find((item) => item.value === newValue));
  };

  const handleSearch = (value: string): void => {
    props.onSearch?.(value);
  };

  const searchProps = props.showSearch
    ? {
        showSearch: true,
        filterOption: (input: string, option: any) => {
          return option.label?.toLowerCase().includes(input.toLowerCase());
        },
      }
    : {
        showSearch: false,
      };

  const getOptions = (options: GeneralComplexOption[]) => {
    return options.map((op) => (
      <Select.Option
        key={op.value}
        value={op.value}
        label={op.label}
        className={style.itemOption}
      >
        <div className={style.option}>
          <span className={style.label}>{op.label}</span>
          {suffix
            ? suffix.useBrick && (
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
        mode={props.mode as ModeOption}
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
      >
        {props.groupBy
          ? getOptsGroups(props.options, props.groupBy)
          : getOptions(props.options)}
      </Select>
    </FormItemWrapper>
  );
}
