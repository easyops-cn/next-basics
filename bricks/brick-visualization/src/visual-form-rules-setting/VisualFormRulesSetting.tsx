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
      const itemType = (
        FormItemType.find((type) => item?.brick?.includes(type)) ?? "OTHER"
      ).toUpperCase();
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
