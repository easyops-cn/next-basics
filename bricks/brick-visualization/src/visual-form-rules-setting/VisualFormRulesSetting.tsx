import { Form, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { ListEditor } from "./components/ListEditor/ListEditor";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { LegacyDynamicFormItemV2 } from "../../../forms/src/dynamic-form-item-v2/DynamicFormItemV2";
import { ConditionalFormat } from "./components/ConditionalFormat/ConditionalFormat";
import { compact } from "lodash";
interface visualFormRulesSettingProps extends FormItemWrapperProps {
  value?: Record<string, any>[];
  formChildren: Record<string, any>[];
}

export type FormItemProps = {
  dataIndex: string;
  title: string;
  [k: string]: any;
};

const FormItemType = [
  "CHECKBOX",
  "RADIO",
  "EDITOR",
  "SLIDE",
  "SWITCH",
  "DATE",
  "TIME",
  "USER",
  "SELECT",
  "AUTO-COMPLETE",
  "INPUT-NUMBER",
  "INPUT-WITH-UNIT",
  "INPUT",
  "TEXTAREA",
];
const actionTypeOptions: Record<string, any>[] = [
  { value: "show", label: "show" },
  { value: "hide", label: "hide" },
];
export enum OpType {
  Common = "common",
  String = "string",
  Time = "time",
  Number = "number",
  Array = "array",
  Boolean = "boolean",
}

const operationOptions: any[] = [
  { value: "isNull", label: "为空", type: OpType.Common },
  { value: "isNotNull", label: "不为空", type: OpType.Common },
  { value: "equal", label: "等于", type: OpType.Common },
  { value: "notEqual", label: "不等于", type: OpType.Common },
  { value: "contain", label: "包含", type: OpType.String },
  { value: "notContain", label: "不包含", type: OpType.String },
  { value: "startWith", label: "开头是", type: OpType.String },
  { value: "notStartWith", label: "开头不是", type: OpType.String },
  { value: "endWith", label: "结尾是", type: OpType.String },
  { value: "notEndWith", label: "结尾不是", type: OpType.String },
  { value: "in", label: "是其中一个", type: OpType.String },
  { value: "notIn", label: "不是其中一个", type: OpType.String },
  { value: "withinTimeRange", label: "在时间范围内", type: OpType.Time },
  { value: "notWithinTimeRange", label: "不在时间范围内", type: OpType.Time },
  { value: "earlier", label: "早于", type: OpType.Time },
  { value: "notEarlier", label: "晚于", type: OpType.Time },
  { value: "later", label: "早于等于", type: OpType.Time },
  { value: "notLater", label: "晚于等于", type: OpType.Time },
  { value: "larger", label: "大于", type: OpType.Number },
  { value: "smaller", label: "小于", type: OpType.Number },
  { value: "greaterOrEqual", label: "大于等于", type: OpType.Number },
  { value: "lessOrEqual", label: "小于等于", type: OpType.Number },
  { value: "withinNumericalRange", label: "在大小范围内", type: OpType.Number },
  {
    value: "notWithinNumericalRange",
    label: "不在大小范围内",
    type: OpType.Number,
  },
  { value: "containOneOf", label: "包含其中一个", type: OpType.Array },
  { value: "notContainOneOf", label: "不包含其中一个", type: OpType.Array },
  { value: "containAll", label: "同时包含", type: OpType.Array },
  { value: "isTrue", label: "为真", type: OpType.Boolean },
  { value: "isFalse", label: "为假", type: OpType.Boolean },
];

export function VisualFormRulesSetting(
  props: visualFormRulesSettingProps
): React.ReactElement {
  const { formChildren } = props;
  const [targetOptions, setTargetOptions] = useState([]);

  const actionsColumns: any[] = useMemo(
    () => [
      {
        name: "actionType",
        props: { options: actionTypeOptions },
        type: "select",
        flex: 1,
      },
      {
        name: "target",
        props: { options: targetOptions },
        type: "select",
        flex: 2,
      },
    ],
    [targetOptions]
  );

  const renderFormItem = (item: FormItemProps): React.ReactElement => {
    return (
      <>
        <Form.Item label="规则名称" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="当满足以下条件时" name="conditions">
          <ConditionalFormat
            originOptions={targetOptions}
            operationOptions={operationOptions}
            formChildren={(formChildren ?? []).filter(
              (item) => item?.properties
            )}
            onChange={() => null}
          />
        </Form.Item>
        <Form.Item label="执行动作" name="actions">
          <LegacyDynamicFormItemV2
            columns={actionsColumns}
            dynamicFormStyle={{ backgroundColor: "transparent", padding: 0 }}
          />
        </Form.Item>
      </>
    );
  };

  useEffect(() => {
    const origin = (formChildren ?? []).filter((item) => item?.properties);
    const res = origin.map((item) => {
      const itemName = JSON.parse(item.properties)?.name;
      const itemType =
        FormItemType.find((type) =>
          item?.brick?.includes(type.toLowerCase())
        ) ?? "OTHER";
      const optionContent = `${itemType}(${itemName})`;
      return itemName ? { value: optionContent, label: optionContent } : null;
    });
    setTargetOptions(compact(res));
  }, [formChildren]);

  return (
    <FormItemWrapper {...props}>
      <ListEditor
        {...props}
        getDefaultItem={(value: any) => ({
          title: value,
          conditions: {
            groups: [
              {
                conditions: [],
              },
            ],
            op: "and",
          },
          actions: [],
          key: value,
        })}
        renderFormItem={renderFormItem}
      />
    </FormItemWrapper>
  );
}
