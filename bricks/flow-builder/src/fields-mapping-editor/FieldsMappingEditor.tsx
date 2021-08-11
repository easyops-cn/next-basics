import React, { useEffect, useState, useCallback, useRef } from "react";
import { Table, Tooltip, Typography, Tag } from "antd";
import { Form } from "antd";
import { set } from "lodash";
import {
  calcFieldPath,
  processFieldValue,
  getFieldChildrenMap,
  serializeFieldValue,
  getFinalFieldsValue,
} from "./processor";
import { EditableCell } from "./components/editable-cell/EditableCell";
import styles from "./FieldsMappingEditor.module.css";
import { useTranslation } from "react-i18next";
import { FieldItem, SimplifiedFieldItem } from "./interfaces";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
export interface FieldsMappingEditorProps {
  dataSource: FieldItem[];
  onChange?: (value: SimplifiedFieldItem[]) => void;
  loading?: boolean;
}

export function FieldsMappingEditor(
  props: FieldsMappingEditorProps
): React.ReactElement {
  const { onChange, loading } = props;
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(props.dataSource);
  const fieldChildrenMap = useRef(getFieldChildrenMap(props.dataSource));
  const [editingKey, setEditingKey] = useState("");

  const isEditing = useCallback(
    (record: FieldItem) => record.key === editingKey,
    [editingKey]
  );

  useEffect(() => {
    setDataSource(props.dataSource);
    fieldChildrenMap.current = getFieldChildrenMap(props.dataSource);
  }, [props.dataSource]);

  const renderNameItem = useCallback(
    (text: string, record: FieldItem): React.ReactElement => {
      return <Tooltip title={record.description}>{text}</Tooltip>;
    },
    []
  );

  const renderOprationItem = useCallback(
    (_: string, record: FieldItem) => {
      const editable = isEditing(record);

      const handleEdit = (record: FieldItem): void => {
        form.setFieldsValue({ value: serializeFieldValue(record.value) });
        setEditingKey(record.key);
      };

      const handleCancel = (): void => {
        setEditingKey("");
      };

      const handleSave = async (record: FieldItem): Promise<void> => {
        try {
          const value = (await form.validateFields())?.value;
          const mutableDataSource = [...dataSource];
          const path = calcFieldPath(record.key);
          const newValue = processFieldValue(
            record,
            value,
            dataSource,
            fieldChildrenMap.current
          );
          set(mutableDataSource, path, newValue);

          setDataSource(mutableDataSource);
          setEditingKey("");
          onChange?.(getFinalFieldsValue(mutableDataSource));
          // eslint-disable-next-line no-empty
        } catch (error) {}
      };

      return editable ? (
        <span>
          <Typography.Link
            test-id="save-btn"
            style={{ marginRight: 8 }}
            onClick={() => handleSave(record)}
          >
            {t(K.SAVE)}
          </Typography.Link>
          <Typography.Link test-id="cancel-btn" onClick={handleCancel}>
            {t(K.CANCEL)}
          </Typography.Link>
        </span>
      ) : (
        <Typography.Link
          test-id="edit-btn"
          disabled={editingKey !== ""}
          onClick={() => handleEdit(record)}
        >
          {" "}
          {t(K.EDIT)}{" "}
        </Typography.Link>
      );
    },
    [dataSource, editingKey, form, isEditing, onChange, t]
  );

  const rendertypeItem = useCallback((text: string) => {
    return <Tag className={styles.typeTag}>{text}</Tag>;
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: renderNameItem,
      ellipsis: true,
    },
    { title: "Type", dataIndex: "type", width: 100, render: rendertypeItem },
    {
      title: "value",
      dataIndex: "value",
      width: 300,
      editable: true,
      ellipsis: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: renderOprationItem,
      width: 150,
    },
  ].map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record: FieldItem) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{ childrenColumnName: "fields" }}
        pagination={false}
        loading={loading}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
      ></Table>
    </Form>
  );
}
