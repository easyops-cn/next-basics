import { Form, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { ListEditor } from "./components/ListEditor/ListEditor";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { LegacyDynamicFormItemV2 } from "../../../forms/src/dynamic-form-item-v2/DynamicFormItemV2";
import { ConditionalFormat } from "../../../form-builder/src/conditional-format/ConditionalFormat";

interface visualFormRulesSettingProps extends FormItemWrapperProps {
  value?: Record<string, any>[];
  formChildren: Record<string, any>[];
}

export type FormItemProps = {
  dataIndex: string;
  title: string;
  [k: string]: any;
};

const FormItemType = ["input", "select", "textArea", "checkbox", "radio"];
const actionTypeOptions: Record<string, any>[] = [
  { value: "show", label: "show" },
  { value: "hide", label: "hide" },
];
const operationOptions: any[] = [
  { value: "equal", label: "等于" },
  { value: "notEqual", label: "不等于" },
  { value: "contain", label: "包含" },
  { value: "notContain", label: "不包含" },
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
      },
      { name: "target", props: { options: targetOptions }, type: "select" },
    ],
    [targetOptions]
  );

  const renderFormItem = (item: FormItemProps): React.ReactElement => {
    return (
      <>
        <Form.Item label="Title" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Conditions" name="conditions">
          <ConditionalFormat
            originOptions={targetOptions}
            operationOptions={operationOptions}
            onChange={() => null}
          />
        </Form.Item>
        <Form.Item label="Actions" name="actions">
          <LegacyDynamicFormItemV2
            columns={actionsColumns}
            dynamicFormStyle={{ width: "360px" }}
          />
        </Form.Item>
      </>
    );
  };

  useEffect(() => {
    setTargetOptions(
      (formChildren ?? []).map((item) => {
        const itemName = JSON.parse(item.properties).name;
        const itemType = (
          FormItemType.find((type) => item.brick.includes(type)) ?? "OTHER"
        ).toUpperCase();
        const optionContent = `${itemType}(${itemName})`;
        return { value: optionContent, label: optionContent };
      })
    );
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
