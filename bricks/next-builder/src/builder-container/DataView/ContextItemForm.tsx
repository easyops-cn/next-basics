import React, { useMemo, useState, useEffect } from "react";
import { Input, Radio, Form, AutoComplete } from "antd";
import {
  typeOptions,
  safeDumpFields,
  computeItemToSubmit,
  ContextItemFormValue,
  fieldCodeEditorConfigMap,
} from "./utils";
import { ContextConf } from "@next-core/brick-types";
import { CodeEditorItem } from "@next-libs/editor-components";
import { BrickOptionItem } from "../interfaces";
import { FormInstance } from "antd/lib/form";
import { RadioChangeEvent } from "antd/lib/radio";
import { searchList } from "../utils/utils";

export interface ContextItemFormProps {
  data: ContextConf;
  brickList?: BrickOptionItem[];
  onContextItemUpdate?: (contextItem: ContextConf) => void;
  settingItemForm: FormInstance;
}

export function ContextItemForm({
  data,
  brickList,
  onContextItemUpdate,
  settingItemForm,
}: ContextItemFormProps): React.ReactElement {
  const originalProviderList = useMemo(() => {
    const list = brickList
      .filter((v) => v.type === "provider")
      .map((v) => ({ label: v.name, value: v.name }));
    return list;
  }, [brickList]);
  const [providerOptions, setProviderOptions] = useState(originalProviderList);
  const [itemIsValue, setItemIsValue] = useState<boolean>(true);

  useEffect(() => {
    const isValue = !data?.resolve;
    setItemIsValue(isValue);
    settingItemForm.resetFields();
    if (isValue) {
      const formValue = {
        name: data?.name,
        type: "value",
        ...safeDumpFields({ value: data?.value }),
      };
      settingItemForm.setFieldsValue(formValue);
    } else {
      const formValue = {
        name: data?.name,
        type: "resolve",
        useProvider: data.resolve.useProvider,
        ...safeDumpFields({
          args: data.resolve.args,
          if: data.resolve.if,
          transform: data.resolve.transform,
        }),
      };
      settingItemForm.setFieldsValue(formValue);
    }
  }, [data]);

  const onTypeChange = (event: RadioChangeEvent) => {
    setItemIsValue(event.target.value === "value");
  };

  const onSearch = (v: string) => {
    const q = v.trim().toLowerCase();
    setProviderOptions(searchList(originalProviderList, q, "label"));
  };

  useEffect(() => {
    setProviderOptions(originalProviderList);
  }, [originalProviderList]);

  const onSettingFormFinish = (values: ContextItemFormValue): void => {
    const computedValue = computeItemToSubmit(values);
    onContextItemUpdate?.(computedValue);
  };

  const getCodeEditorItem = (field: string) => {
    return (
      <CodeEditorItem
        tabSize={2}
        minLines={5}
        maxLines={12}
        printMargin={false}
        showLineNumbers={true}
        theme="tomorrow"
        enableLiveAutocompletion={true}
        mode="brick_next_yaml"
        schemaRef={fieldCodeEditorConfigMap[field].schemaRef}
      ></CodeEditorItem>
    );
  };

  return (
    <Form
      layout="vertical"
      name="settingItemForm"
      form={settingItemForm}
      onFinish={onSettingFormFinish}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[{ required: true, message: "Name is required!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="type" label="Type">
        <Radio.Group
          options={typeOptions}
          optionType="button"
          onChange={onTypeChange}
        >
          {typeOptions.map((v) => (
            <Radio.Button value={v.value} key={v.value}>
              {v.label}
            </Radio.Button>
          ))}
        </Radio.Group>
      </Form.Item>
      {itemIsValue ? (
        <Form.Item name="value">{getCodeEditorItem("value")}</Form.Item>
      ) : (
        <>
          <Form.Item
            label="useProvider"
            name="useProvider"
            rules={[{ required: true, message: "Please select a provider!" }]}
          >
            <AutoComplete options={providerOptions} onSearch={onSearch} />
          </Form.Item>
          <Form.Item label="Args" name="args">
            {getCodeEditorItem("args")}
          </Form.Item>
          <Form.Item label="Transform" name="transform">
            {getCodeEditorItem("transform")}
          </Form.Item>
          <Form.Item label="If" name="if">
            {getCodeEditorItem("if")}
          </Form.Item>
        </>
      )}
    </Form>
  );
}
