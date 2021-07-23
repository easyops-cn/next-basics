import React, { useState, useEffect } from "react";
import { omit, debounce, map, uniq } from "lodash";
import {
  BaseColumnsProps,
  BaseRowProps,
  CommonItemProps,
  DynamicCommonItem,
} from "../dynamic-common-item/DynamicCommonItem";
import { Form } from "@ant-design/compatible";
import { Col, Input, Select, InputNumber, Cascader } from "antd";
import { FormItemWrapper } from "@next-libs/forms";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import style from "./DynamicFormItem.module.css";
import { FormItemColumnsProps } from ".";
import {
  CascaderOptionType,
  CascaderExpandTrigger,
  FieldNamesType,
} from "antd/lib/cascader";
export interface RowFormItemProps extends BaseRowProps {
  columns: FormItemColumnsProps[];
}

export function RowFormItem(props: RowFormItemProps): React.ReactElement {
  const { row, form, columns, prefixId, rowIndex } = props;

  const { getFieldDecorator } = form;
  // 后台搜索中
  const [fetching, setFetching] = useState(false);
  const [userList, setUserList] = useState([]);

  const handleChange = (value: any, column: FormItemColumnsProps) => {
    props.onChange?.(value, column.name);
  };
  const customizeFilter = (label: string) => {
    label = label || "label";
    return function (inputValue: string, path: CascaderOptionType[]) {
      const filterValues = inputValue
        .split(" ")
        .filter((item) => item)
        .map((item) => item.toLocaleLowerCase());
      for (let j = 0; j < filterValues.length; j++) {
        if (
          !path.some((option) =>
            (option[label] as string).toLowerCase().includes(filterValues[j])
          )
        ) {
          return false;
        }
      }
      return true;
    };
  };
  const fetchInstanceList = async (objectId: "USER", keyword: string) => {
    return (
      await InstanceApi_postSearch(objectId, {
        page: 1,
        page_size: 20,
        fields: {
          name: true,
        },
        query: {
          $or: map(uniq(["name"]), (v) => ({
            [v]: { $like: `%${keyword}%` },
          })),
        },
      })
    ).list;
  };
  const searchUser = async (value: string) => {
    setFetching(true);
    const data = await fetchInstanceList("USER", value);
    setUserList(data);
    setFetching(false);
  };
  const handleSearchUser = (value: string) => {
    searchUser(value);
  };
  const handleFocus = () => {
    handleSearchUser("");
  };
  const renderComponent = (column: FormItemColumnsProps) => {
    const { inputProps = {}, selectProps = {}, cascaderProps = {} } = column;

    if (column.type === "select") {
      return (
        <Select
          dropdownClassName={style.select}
          style={{ width: "100%" }}
          onChange={(value) => handleChange(value, column)}
          placeholder={selectProps.placeholder}
          disabled={
            selectProps.disabled || selectProps.disabledHandler?.(row, rowIndex)
          }
          mode={selectProps.mode}
          optionFilterProp="children"
          allowClear={selectProps.allowClear}
          maxTagCount={selectProps.maxTagCount}
          showSearch
        >
          {selectProps.options?.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              className={style.option}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (column.type === "userSelect") {
      return (
        <Select
          dropdownClassName={style.select}
          style={{ width: "100%" }}
          onChange={(value) => handleChange(value, column)}
          placeholder={selectProps.placeholder}
          disabled={
            selectProps.disabled || selectProps.disabledHandler?.(row, rowIndex)
          }
          onSearch={debounce((value) => {
            handleSearchUser(value as string);
          }, 500)}
          onFocus={handleFocus}
          loading={fetching}
          mode={selectProps.mode}
          optionFilterProp="children"
          allowClear={selectProps.allowClear}
          showSearch
        >
          {userList.map((d) => (
            <Select.Option value={d.name} key={d.name} className={style.option}>
              {d.name}
            </Select.Option>
          ))}
        </Select>
      );
    } else if (column.type === "cascader") {
      return (
        <Cascader
          style={{ width: "100%" }}
          options={cascaderProps.options}
          onChange={(value) => handleChange(value, column)}
          placeholder={cascaderProps.placeholder}
          disabled={
            cascaderProps.disabled ||
            cascaderProps.disabledHandler?.(row, rowIndex)
          }
          fieldNames={cascaderProps.fieldNames}
          expandTrigger={cascaderProps.expandTrigger}
          allowClear={cascaderProps.allowClear}
          showSearch={
            cascaderProps.showSearch && {
              limit: cascaderProps.limit,
              filter: customizeFilter(cascaderProps?.fieldNames?.label),
            }
          }
        ></Cascader>
      );
    } else if (column.type === "password") {
      return (
        <Input.Password
          onChange={(e) => handleChange(e.target.value, column)}
          {...inputProps}
          autoComplete="new-password"
          disabled={
            inputProps.disabled || inputProps.disabledHandler?.(row, rowIndex)
          }
        />
      );
    } else if (column.type === "inputNumber") {
      return (
        <InputNumber
          style={{ width: "100%" }}
          onChange={(value) => handleChange(value, column)}
          placeholder={inputProps.placeholder}
          disabled={
            inputProps.disabled || inputProps.disabledHandler?.(row, rowIndex)
          }
          max={inputProps.max}
          min={inputProps.min}
          step={inputProps.step}
        />
      );
    } else {
      return (
        <Input
          onChange={(e) => handleChange(e.target.value, column)}
          placeholder={inputProps.placeholder}
          type={inputProps.type}
          disabled={
            inputProps.disabled || inputProps.disabledHandler?.(row, rowIndex)
          }
        />
      );
    }
  };
  return (
    <>
      {columns.map((item, index) => {
        return (
          <Col style={{ flex: item.flex ?? "1", minWidth: 0 }} key={index}>
            <Form.Item>
              {getFieldDecorator(`${prefixId}.${item.name}`, {
                initialValue: row[item.name],
                rules: item.rules,
              })(renderComponent(item))}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
}

export function DynamicFormItem(props: CommonItemProps) {
  return (
    <FormItemWrapper {...omit(props, "name")}>
      <DynamicCommonItem {...props}>
        <RowFormItem />
      </DynamicCommonItem>
    </FormItemWrapper>
  );
}
