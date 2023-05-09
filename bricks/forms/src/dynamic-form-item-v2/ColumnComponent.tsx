import React, { useEffect, useMemo, useState } from "react";
import { FormListFieldData } from "antd/lib/form/FormList";
import { Column, SelectProps } from "../interfaces";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { Cascader, Form, Input, InputNumber, Select, Checkbox } from "antd";
import _, { groupBy, isEqual, isNil, partial } from "lodash";
import { getRealValue } from "./util";
import { GeneralComplexOption } from "@next-libs/forms";
import style from "./ColumnComponent.module.css";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";
import { AutoCompleteItem } from "./autoCompleteItem";
interface ColumnComponentProps {
  column: Column;
  field: FormListFieldData;
  rowIndex?: number;
  formValue?: Record<string, any>[];
  hasLabel?: boolean;
  handleInputBlur: (rowIndex: number, name: string, value: string) => void;
}

const getOptions = (
  options: SelectProps["options"],
  suffix: UseBrickConf,
  suffixStyle: React.CSSProperties
): React.ReactNode => {
  return (options as GeneralComplexOption<string | number>[]).map((op) => (
    <Select.Option key={op.value} value={op.value} label={op.label}>
      <div className={style.option}>
        <span className={style.label}>{op.label}</span>
        {suffix && suffix.useBrick && (
          <div className={style.suffixContainer} style={suffixStyle}>
            <BrickAsComponent useBrick={suffix.useBrick} data={op} />
          </div>
        )}
      </div>
    </Select.Option>
  ));
};

const getOptsGroups = (
  options: SelectProps["options"],
  category: string,
  suffix: UseBrickConf,
  suffixStyle: React.CSSProperties
): React.ReactNode => {
  const optsGroup = Object.entries(groupBy(options, category));

  return optsGroup.map(([label, options]) => (
    <Select.OptGroup key={label} label={label}>
      {getOptions(
        options as GeneralComplexOption<string | number>[],
        suffix,
        suffixStyle
      )}
    </Select.OptGroup>
  ));
};

export function ColumnComponent(
  props: ColumnComponentProps
): React.ReactElement {
  const { column, field, rowIndex, hasLabel, formValue, handleInputBlur } =
    props;
  const { label, name } = column;
  const { name: fieldName, ...restField } = field;

  const rowValue = formValue?.[rowIndex];
  const [isReadOnly, setIsReadOnly] = useState(true);
  const labelNode = useMemo(
    () => hasLabel && rowIndex === 0 && <div>{label}</div>,
    [label, rowIndex, hasLabel]
  );

  const disabled = useMemo(
    () => getRealValue(column.props?.disabled, [rowValue, rowIndex]),
    [column.props?.disabled, rowValue, rowIndex]
  );

  const rules = useMemo(
    () =>
      column.rules?.map((rule) => {
        if (typeof rule.validator === "function") {
          return {
            message: rule.message,
            validator: partial(rule.validator, _, _, _, {
              formValue,
              rowValue,
              rowIndex,
            }),
          };
        }
        if (rule.unique) {
          return {
            validator: (rule: any, value: any, cb: any) => {
              if (!isNil(value) && value !== "") {
                const valueList = formValue?.map((row) => row[name]);
                const matchList = valueList?.filter(
                  (v, i) => isEqual(v, value) && i !== rowIndex
                );
                matchList?.length && cb(rule.message);
              }
              cb();
            },
            message: rule.message,
          };
        }
        return rule;
      }),
    [column.rules, formValue, name, rowIndex, rowValue]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReadOnly(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  switch (column.type) {
    case "input": {
      const { placeholder, type, maxLength, allowClear } = column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <Input
            style={{ width: "100%" }}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            maxLength={maxLength}
            allowClear={allowClear}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
              handleInputBlur(rowIndex, name, e?.target?.value)
            }
          />
        </Form.Item>
      );
    }
    case "inputNumber": {
      const { placeholder, min, max, step, precision } = column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder={placeholder}
            min={min}
            max={max}
            step={step}
            precision={precision}
            disabled={disabled}
          />
        </Form.Item>
      );
    }
    case "inputPassword": {
      const { placeholder, visibilityToggle } = column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <Input.Password
            style={{ width: "100%" }}
            placeholder={placeholder}
            disabled={disabled}
            visibilityToggle={visibilityToggle}
            readOnly={isReadOnly}
          />
        </Form.Item>
      );
    }
    case "select": {
      const {
        placeholder,
        allowClear,
        mode,
        showSearch,
        groupBy,
        tokenSeparators,
        maxTagCount,
        popoverPositionType,
        suffix,
        suffixStyle,
      } = column.props || {};
      let { options = [] } = column.props || {};
      const searchProps = showSearch
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

      if (Array.isArray(options[rowIndex])) {
        options = options[rowIndex] as GeneralComplexOption<string | number>[];
      }

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <Select
            className={suffix && style.suffixBrickSelect}
            style={{ width: "100%" }}
            placeholder={placeholder}
            disabled={disabled}
            allowClear={allowClear}
            mode={mode}
            tokenSeparators={tokenSeparators}
            maxTagCount={maxTagCount}
            {...(popoverPositionType === "parent"
              ? {
                  getPopupContainer: (triggerNode) => triggerNode.parentElement,
                }
              : {})}
            {...searchProps}
          >
            {groupBy
              ? getOptsGroups(
                  options as GeneralComplexOption<string | number>[],
                  groupBy,
                  suffix,
                  suffixStyle
                )
              : getOptions(
                  options as GeneralComplexOption<string | number>[],
                  suffix,
                  suffixStyle
                )}
          </Select>
        </Form.Item>
      );
    }
    case "cascader": {
      const {
        placeholder,
        allowClear,
        options,
        expandTrigger,
        popupPlacement,
        showSearch,
        fieldNames,
      } = column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <Cascader
            style={{ width: "100%" }}
            placeholder={placeholder}
            allowClear={allowClear}
            disabled={disabled}
            expandTrigger={expandTrigger}
            popupPlacement={popupPlacement}
            options={options}
            showSearch={showSearch}
            fieldNames={fieldNames}
          />
        </Form.Item>
      );
    }

    case "editor": {
      const {
        placeholder,
        mode,
        minLines = 2,
        maxLines = 2,
        readOnly,
        showLineNumbers,
        showCopyButton,
        showExpandButton = true,
        printMargin = false,
        enableLiveAutocompletion,
        customCompleters,
        theme,
        showGutter,
      } = column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <CodeEditorItem
            placeholder={placeholder}
            mode={mode}
            enableLiveAutocompletion={enableLiveAutocompletion}
            minLines={minLines}
            maxLines={maxLines}
            showGutter={showGutter}
            readOnly={readOnly}
            showLineNumbers={showLineNumbers}
            showCopyButton={showCopyButton}
            showExpandButton={showExpandButton}
            printMargin={printMargin}
            theme={theme}
            customCompleters={customCompleters}
          />
        </Form.Item>
      );
    }

    case "autoComplete": {
      const { placeholder, allowClear, options, isAppendMode } =
        column.props || {};

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <AutoCompleteItem
            options={options}
            disabled={disabled}
            allowClear={allowClear}
            placeholder={placeholder}
            isAppendMode={isAppendMode}
          />
        </Form.Item>
      );
    }

    case "checkbox": {
      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
          valuePropName="checked"
        >
          <Checkbox {...column.props}>{column.props?.text}</Checkbox>
        </Form.Item>
      );
    }

    default: {
      return null;
    }
  }
}
