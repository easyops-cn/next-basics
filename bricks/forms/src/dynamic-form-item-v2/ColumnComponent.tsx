import React, { useMemo } from "react";
import { FormListFieldData } from "antd/lib/form/FormList";
import { Column, ComponentType, SelectProps } from "../interfaces";
import { Cascader, Form, Input, InputNumber, Select } from "antd";
import _, { groupBy, isEqual, isNil, partial } from "lodash";
import { getRealValue } from "./util";

interface ColumnComponentProps {
  column: Column;
  field: FormListFieldData;
  rowIndex?: number;
  formValue?: Record<string, any>[];
  hasLabel?: boolean;
}

const getOptions = (options: SelectProps["options"]): React.ReactNode => {
  return options.map((op) => (
    <Select.Option key={op.value} value={op.value} label={op.label}>
      {op.label}
    </Select.Option>
  ));
};

const getOptsGroups = (
  options: SelectProps["options"],
  category: string
): React.ReactNode => {
  const optsGroup = Object.entries(groupBy(options, category));

  return optsGroup.map(([label, options]) => (
    <Select.OptGroup key={label} label={label}>
      {getOptions(options)}
    </Select.OptGroup>
  ));
};

export function ColumnComponent(
  props: ColumnComponentProps
): React.ReactElement {
  const { column, field, rowIndex, hasLabel, formValue } = props;
  const { label, name } = column;
  const { name: fieldName, ...restField } = field;

  const rowValue = formValue?.[rowIndex];

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
          />
        </Form.Item>
      );
    }
    case "select": {
      const {
        placeholder,
        allowClear,
        mode,
        options = [],
        showSearch,
        groupBy,
        tokenSeparators,
        maxTagCount,
        popoverPositionType,
      } = column.props || {};
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

      return (
        <Form.Item
          {...restField}
          label={labelNode}
          name={[fieldName, name]}
          rules={rules}
        >
          <Select
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
            {groupBy ? getOptsGroups(options, groupBy) : getOptions(options)}
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
    default: {
      return null;
    }
  }
}
