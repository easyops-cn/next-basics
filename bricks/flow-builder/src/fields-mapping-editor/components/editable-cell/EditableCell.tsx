import React, { useContext, useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { Form } from "antd";
import { FieldItem } from "../../interfaces";
import { CodeEditorItemWrapper } from "@next-libs/code-editor-components";

interface EditableCellProps {
  title?: string;
  editing?: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: FieldItem;
}

export function EditableCell({
  editing,
  dataIndex,
  record,
  children,
  ...restProps
}: EditableCellProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: record.required,
              message: t(K.FIELDS_MAPPING_REQUIRED_MSG, { name: record.name }),
            },
          ]}
        >
          <CodeEditorItemWrapper
            mode="yaml"
            tabSize={2}
            minLines={5}
            maxLines={12}
            printMargin={false}
            showLineNumbers={false}
            theme="tomorrow"
            enableLiveAutocompletion={true}
          />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
}
