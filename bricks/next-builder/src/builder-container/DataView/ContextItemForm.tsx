import React, { useMemo, useState, useEffect } from "react";
import { Input, Radio, Form, AutoComplete, FormItemProps } from "antd";
import {
  computeItemToSubmit,
  ContextItemFormValue,
  fieldCodeEditorConfigMap,
  ContextType,
} from "./utils";
import {
  ContextConf,
  SelectorProviderResolveConf,
  UseProviderResolveConf,
} from "@next-core/brick-types";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { FormInstance } from "antd/lib/form";
import { RadioChangeEvent } from "antd/lib/radio";
import { useBuilderUIContext } from "../BuilderUIContext";
import { ContractAutoComplete } from "../../shared/components/contract-auto-complete/ContractAutoComplete";

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
  const [errorFields, setErrorFields] = useState<
    Record<string, { help: string }>
  >({});

  const getFormItemProps = (
    name: string,
    text: string | boolean = true
  ): FormItemProps => {
    let label = name;
    if (typeof text === "string") {
      label = text;
    } else if (text) {
      label = name[0].toUpperCase() + name.substr(1);
    }
    return {
      name,
      label,
      validateStatus: errorFields[name] ? "error" : "success",
      help: errorFields[name]?.help,
    };
  };

  const typeOptions = useMemo(() => {
    return [
      { label: "Value", value: ContextType.VALUE },
      { label: "Provider", value: ContextType.RESOLVE },
      { label: "FlowApi", value: ContextType.FLOW_API },
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
      : (data.resolve as UseProviderResolveConf).useProvider?.includes("@")
      ? ContextType.FLOW_API
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
    if ("error" in computedValue) {
      setErrorFields(computedValue.errorFields);
      return;
    }
    setErrorFields({});
    onContextItemUpdate?.(computedValue);
  };

  const handleCodeChange = (field: string): void => {
    if (errorFields[field]) {
      delete errorFields[field];
      setErrorFields({ ...errorFields });
    }
  };

  const getCodeEditorItem = (
    field: string,
    realField?: string
  ): React.ReactNode => {
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
        onChange={() => handleCodeChange(realField ?? field)}
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
      <Form.Item {...getFormItemProps("type")}>
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
        <Form.Item {...getFormItemProps("value")}>
          {getCodeEditorItem("value")}
        </Form.Item>
      ) : (
        <>
          {contextType === ContextType.SELECTOR_RESOLVE ? (
            <Form.Item
              {...getFormItemProps("provider")}
              rules={[{ required: true, message: "Provider is required!" }]}
            >
              <Input />
            </Form.Item>
          ) : contextType === ContextType.FLOW_API ? (
            <Form.Item
              label="flowApi"
              name="flowApi"
              rules={[{ required: true, message: "Please select a provider!" }]}
            >
              <ContractAutoComplete />
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
          <Form.Item {...getFormItemProps("args")}>
            {getCodeEditorItem("args")}
          </Form.Item>
          <Form.Item {...getFormItemProps("transform")}>
            {getCodeEditorItem("transform")}
          </Form.Item>
          <Form.Item {...getFormItemProps("onReject", false)}>
            {getCodeEditorItem("onReject")}
          </Form.Item>
          <Form.Item {...getFormItemProps("resolveIf", "If of resolve")}>
            {getCodeEditorItem("if", "resolveIf")}
          </Form.Item>
          <Form.Item
            {...getFormItemProps("value", "Fallback value")}
            tooltip="The value of context will fallback to this value when the if of resolve is false."
          >
            {getCodeEditorItem("value")}
          </Form.Item>
        </>
      )}
      <Form.Item {...getFormItemProps("if")}>
        {getCodeEditorItem("if")}
      </Form.Item>
      <Form.Item {...getFormItemProps("onChange", false)}>
        {getCodeEditorItem("onChange")}
      </Form.Item>
    </Form>
  );
}
