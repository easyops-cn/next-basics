import { Form, Input } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import { ListEditor } from "./components/ListEditor/ListEditor";
import { FormItemWrapperProps, FormItemWrapper } from "@next-libs/forms";
import { LegacyDynamicFormItemV2 } from "../../../forms/src/dynamic-form-item-v2/DynamicFormItemV2";
import { ConditionalFormat } from "./components/ConditionalFormat/ConditionalFormat";
import { compact } from "lodash";
import { operationOptions } from "./components/constants";
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
  { value: "show", label: "显示" },
  { value: "hide", label: "隐藏" },
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
