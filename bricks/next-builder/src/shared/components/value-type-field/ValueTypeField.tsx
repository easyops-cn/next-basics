import React from "react";
import { useTranslation } from "react-i18next";
import { Input, InputNumber, Switch } from "antd";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import { TypeFieldItem } from "../../../interface";

export interface ValueTypeFieldProps {
  field?: TypeFieldItem;
  value?: any;
  onChange?: (data: any) => void;
}

export function ValueTypeField(props: ValueTypeFieldProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { onChange, value, field } = props;

  const getCodeEditorItem = (): React.ReactElement => {
    return (
      <CodeEditorItem
        tabSize={2}
        minLines={5}
        maxLines={12}
        printMargin={false}
        showLineNumbers={true}
        theme="monokai"
        enableLiveAutocompletion={true}
        mode="yaml"
        value={value}
        onChange={onChange}
      ></CodeEditorItem>
    );
  };

  switch (field.type) {
    case "string":
      return <Input onChange={(e) => onChange(e.target.value)} value={value} />;
    case "number":
      return <InputNumber onChange={onChange} value={value} />;
    case "boolean":
      return <Switch onChange={onChange} checked={value} />;
    default:
      return getCodeEditorItem();
  }
}
