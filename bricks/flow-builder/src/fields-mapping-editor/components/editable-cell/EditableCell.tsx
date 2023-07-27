import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { Popover, Typography } from "antd";
import { FieldItem } from "../../interfaces";
import { simpleTypes } from "../../constants";
import { serializeFieldValue } from "../../processor";
import { CodeDisplay } from "@next-libs/code-display-components";
import { CodeEditorFormItem } from "../CodeEditor/CodeEditorFormItem";
import styles from "./EditableCell.module.css";
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
  record = {} as FieldItem,
  children,
  ...restProps
}: EditableCellProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const childrenNode = useMemo(() => {
    if (dataIndex === "value") {
      if (
        !simpleTypes.includes(record.type) &&
        ![undefined, ""].includes(record.value as string)
      ) {
        return (
          <div className={styles.popoverContainer}>
            <Popover
              getPopupContainer={(triggerNode) => triggerNode}
              content={
                <CodeDisplay
                  value={serializeFieldValue(record.value) as string}
                  language="yaml"
                  showLineNumber={true}
                  maxLines={Infinity}
                  minLines={5}
                />
              }
            >
              <Typography.Link>查看</Typography.Link>
            </Popover>
          </div>
        );
      } else {
        return (
          <div className={styles.cellWrapper} title={record.value as string}>
            {typeof record.value === "boolean"
              ? String(record.value)
              : record.value}
          </div>
        );
      }
    } else {
      return children;
    }
  }, [children, dataIndex, record.type, record.value]);

  return (
    <td {...restProps}>
      {editing ? (
        <CodeEditorFormItem
          name={dataIndex}
          mode={simpleTypes.includes(record.type) ? "text" : "yaml"}
          placeholder={t(K.EDITOR_PLACEHOLDER)}
        />
      ) : (
        childrenNode
      )}
    </td>
  );
}
