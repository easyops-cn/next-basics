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
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { FormInstance } from "antd/lib/form";
import { RadioChangeEvent } from "antd/lib/radio";
import { useBuilderUIContext } from "../BuilderUIContext";

export interface ContextItemFormProps {
  data: ContextConf;
  onContextItemUpdate?: (contextItem: ContextConf) => void;
  settingItemForm: FormInstance;
}

export function ContextItemForm({
  data,
  onContextItemUpdate,
  settingItemForm,
}: ContextItemFormProps): React.ReactElement {
  const { providerList, highlightTokens, onClickHighlightToken } =
    useBuilderUIContext();
  const originalProviderList = useMemo(
    () =>
      (providerList ?? []).map((provider) => ({
        label: provider,
        value: provider,
      })),
    [providerList]
  );
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

  const onTypeChange = (event: RadioChangeEvent): void => {
    setContextType(event.target.value);
  };

  const onSearch = (v: string): void => {
    const q = v.trim().toLowerCase();
    setProviderOptions(
      originalProviderList.filter((opt) => opt.label.includes(q))
    );
  };

  useEffect(() => {
    setProviderOptions(originalProviderList);
  }, [originalProviderList]);

  const onSettingFormFinish = (values: ContextItemFormValue): void => {
    const computedValue = computeItemToSubmit(values);
    onContextItemUpdate?.(computedValue);
  };

  const getCodeEditorItem = (field: string): React.ReactNode => {
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
        highlightTokens={highlightTokens}
        onClickHighlightToken={onClickHighlightToken}
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
        <Form.Item label="Value" name="value">
          {getCodeEditorItem("value")}
        </Form.Item>
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
          <Form.Item label="onReject" name="onReject">
            {getCodeEditorItem("onReject")}
          </Form.Item>
          <Form.Item label="If of resolve" name="resolveIf">
            {getCodeEditorItem("if")}
          </Form.Item>
          <Form.Item
            label="Fallback value"
            name="value"
            tooltip="The value of context will fallback to this value when the if of resolve is false."
          >
            {getCodeEditorItem("value")}
          </Form.Item>
        </>
      )}
      <Form.Item label="If" name="if">
        {getCodeEditorItem("if")}
      </Form.Item>
      <Form.Item label="onChange" name="onChange">
        {getCodeEditorItem("onChange")}
      </Form.Item>
    </Form>
  );
}
