import React, { useMemo, useState, useEffect } from "react";
import { Input, Radio, Form, AutoComplete } from "antd";
import {
  computeItemToSubmit,
  ContextItemFormValue,
  fieldCodeEditorConfigMap,
  ContextType,
} from "./utils";
import {
  ContextConf,
  SelectorProviderResolveConf,
} from "@next-core/brick-types";
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
  const [contextType, setContextType] = useState(ContextType.VALUE);

  const typeOptions = useMemo(() => {
    return [
      { label: "Value", value: ContextType.VALUE },
      { label: "Provider", value: ContextType.RESOLVE },
      ...((data?.resolve as SelectorProviderResolveConf)?.provider
        ? [
            {
              label: "Provider Selector",
              value: ContextType.SELECTOR_RESOLVE,
            },
          ]
        : []),
    ];
  }, [data]);

  useEffect(() => {
    const isValue = !data?.resolve;
    const type = isValue
      ? ContextType.VALUE
      : (data.resolve as SelectorProviderResolveConf).provider
      ? ContextType.SELECTOR_RESOLVE
      : ContextType.RESOLVE;
    setContextType(type);
  }, [data]);

  const onTypeChange = (event: RadioChangeEvent) => {
    setContextType(event.target.value);
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
      {contextType === ContextType.VALUE ? (
        <Form.Item name="value">{getCodeEditorItem("value")}</Form.Item>
      ) : (
        <>
          {contextType === ContextType.SELECTOR_RESOLVE ? (
            <Form.Item
              name="provider"
              label="Provider"
              rules={[{ required: true, message: "Provider is required!" }]}
            >
              <Input />
            </Form.Item>
          ) : (
            <Form.Item
              label="useProvider"
              name="useProvider"
              rules={[{ required: true, message: "Please select a provider!" }]}
            >
              <AutoComplete options={providerOptions} onSearch={onSearch} />
            </Form.Item>
          )}
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
      <Form.Item label="onChange" name="onChange">
        {getCodeEditorItem("onChange")}
      </Form.Item>
    </Form>
  );
}
