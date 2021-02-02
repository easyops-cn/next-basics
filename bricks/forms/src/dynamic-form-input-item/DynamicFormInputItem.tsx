import React from "react";
import { Form } from "@ant-design/compatible";
import { Input, Col } from "antd";
import { omit } from "lodash";
import { FormItemWrapper } from "@next-libs/forms";
import {
  DynamicCommonItem,
  inputSpan,
  BaseColumnsProps,
  BaseRowProps,
  CommonItemProps,
} from "../dynamic-common-item/DynamicCommonItem";

export interface InputColumnsProps extends BaseColumnsProps {
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface RowItemsProps extends BaseRowProps {
  columns: InputColumnsProps[];
}

export function RowInput(props: RowItemsProps): React.ReactElement {
  const { row, form, columns, prefixId } = props;
  const { getFieldDecorator } = form;

  const InputItemSpan = Math.floor(inputSpan / props.columns.length);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const value = e.target.value;
    props.onChange?.(value, key);
  };

  return (
    <>
      {columns.map((item, index) => {
        return (
          <Col span={InputItemSpan} key={index}>
            <Form.Item>
              {getFieldDecorator(`${prefixId}.${item.name}`, {
                initialValue: row[item.name],
                rules: item.rules,
              })(
                <Input
                  onChange={(e) => handleChange(e, item.name)}
                  placeholder={item.placeholder}
                  type={item.type}
                  disabled={item.disabled}
                />
              )}
            </Form.Item>
          </Col>
        );
      })}
    </>
  );
}

export function DynamicFormInputItem(
  props: CommonItemProps
): React.ReactElement {
  return (
    // FormItemWrapper 需要排除掉 name, 动态的表单项的数据通过每个子表单项的name来收集, 否则会使数据收集有问题
    <FormItemWrapper {...omit(props, "name")}>
      <DynamicCommonItem {...props}>
        <RowInput columns={props.columns} />
      </DynamicCommonItem>
    </FormItemWrapper>
  );
}
