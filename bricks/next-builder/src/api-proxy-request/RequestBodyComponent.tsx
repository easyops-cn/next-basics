import { Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import {
  CustomActionComponent,
  CustomActionItem,
  CustomActionRef,
} from "./CustomActionComponent";
import styles from "./index.module.css";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { PlusCircleOutlined } from "@ant-design/icons";

interface RequestBodyComponentProps {
  label: string;
  headers: Record<string, string>;
  value: Record<string, string>;
  onChange: (v: any) => void;
  onTypeChange: (type: string) => void;
}

export function RequestBodyComponent(
  props: RequestBodyComponentProps
): React.ReactElement {
  const [mode, setMode] = useState<string>();
  const [json, setJSON] = useState<string>();
  const customActionRef = useRef<CustomActionRef>();
  const handleSelectChange = (mode: string): void => {
    setMode(mode);
    props?.onTypeChange?.(mode);
  };

  const handleCodeEditorChange = (value: string): void => {
    setJSON(value);
    let newValue: any;
    try {
      newValue = value === "" ? {} : JSON.parse(value);
    } catch {
      newValue = false;
    }
    props.onChange({
      body: newValue,
    });
  };

  const handleActionChange = (
    value: Omit<CustomActionItem, "$key">[]
  ): void => {
    props.onChange({
      body: Object.fromEntries(value.map((item) => [item.key, item.value])),
    });
  };

  const handleAddItem = (): void => {
    customActionRef.current.addItem();
  };

  useEffect(() => {
    if (props.headers) {
      const contentType = props.headers?.["content-type"];
      setMode(
        contentType === "application/json"
          ? "JSON"
          : contentType === "multipart/form-data"
          ? "Form Data"
          : "None"
      );
    }
  }, []);

  useEffect(() => {
    if (props.value && mode === "JSON") {
      setJSON(
        typeof props.value === "string"
          ? props.value
          : JSON.stringify(props.value)
      );
    }
  }, []);

  return (
    <div className={styles.requestBodyWrapper}>
      <div className={styles.requestBodyHeader}>
        <div>{props.label}</div>
        <div>
          {mode === "Form Data" && (
            <PlusCircleOutlined onClick={handleAddItem} />
          )}
        </div>
      </div>
      <Select
        style={{
          width: "100%",
        }}
        options={["JSON", "Form Data", "None"].map((item) => ({
          label: item,
          value: item,
        }))}
        size="small"
        value={mode}
        onChange={handleSelectChange}
      />
      <div className={styles.bodyComponentWrapper}>
        {mode === "Form Data" ? (
          <CustomActionComponent
            ref={customActionRef}
            params={typeof props.value === "string" ? {} : props.value}
            value={typeof props.value === "string" ? {} : props.value}
            onChange={handleActionChange}
          />
        ) : mode === "JSON" ? (
          <CodeEditorItem
            mode="json"
            showCopyButton
            showExpandButton
            minLines={3}
            maxLines={10}
            value={json}
            onChange={handleCodeEditorChange}
          />
        ) : null}
      </div>
    </div>
  );
}
