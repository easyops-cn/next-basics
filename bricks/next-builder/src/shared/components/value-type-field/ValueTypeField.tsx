import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Input, InputNumber, Switch, DatePicker } from "antd";
import { CodeEditorItem } from "@next-libs/code-editor-components";
import { NS_NEXT_BUILDER, K } from "../../../i18n/constants";
import moment from "moment";
import { TypeFieldItem } from "../../../interface";

export interface ValueTypeFieldProps {
  field?: TypeFieldItem;
  value?: any;
  onChange?: (data: any) => void;
}

export function ValueTypeField(props: ValueTypeFieldProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { onChange, value, field, timeFormat } = props;

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

  const formatDateValue = useCallback(
    (value: string): moment.Moment => {
      if (value) {
        return moment(value, timeFormat);
      }
    },
    [timeFormat]
  );

  switch (field.type) {
    case "string":
      return <Input onChange={(e) => onChange(e.target.value)} value={value} />;
    case "number":
      return <InputNumber onChange={onChange} value={value} />;
    case "boolean":
      return <Switch onChange={onChange} checked={value} />;
    case "date":
    case "datetime":
      return (
        <DatePicker
          showTime={field.type === "datetime"}
          onChange={(_, dateString) => onChange(dateString)}
          format={field.timeFormat}
          value={formatDateValue(value)}
        />
      );
    default:
      return getCodeEditorItem();
  }
}
