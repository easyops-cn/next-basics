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
  yaml,
  removeExtraFields,
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
  const [expandedRowKeys, setExpandedRowKeys] = useState(
    props.dataSource.map((item) => item.key)
  );

  const isEditing = useCallback(
    (record: FieldItem) => record.key === editingKey,
    [editingKey]
  );

  useEffect(() => {
    setDataSource(props.dataSource);
    setExpandedRowKeys(props.dataSource.map((item) => item.key));
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

      const handleEdit = (record: FieldItem, e: React.MouseEvent): void => {
        e.stopPropagation();
        form.setFieldsValue({ value: serializeFieldValue(record.value) });
        setEditingKey(record.key);
      };

      const handleCancel = (e: React.MouseEvent): void => {
        e.stopPropagation();
        setEditingKey("");
      };

      const handleSave = async (
        record: FieldItem,
        e: React.MouseEvent
      ): Promise<void> => {
        try {
          e.stopPropagation();
          const v = (await form.validateFields())?.value;
          const value = record.type === "string" ? v : yaml(v);
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
            onClick={(e) => handleSave(record, e)}
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
          onClick={(e) => handleEdit(record, e)}
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

  const handleExpand = (expanded: boolean, record: FieldItem): void => {
    if (expanded) {
      setExpandedRowKeys((rowKeys) => [...rowKeys, record.key]);
    } else {
      setExpandedRowKeys((rowKeys) =>
        rowKeys.filter((key) => key !== record.key)
      );
    }
  };

  const handleRowClick = (item: FieldItem): void => {
    // istanbul ignore else
    if (editingKey === "" && item.fields) {
      if (expandedRowKeys.includes(item.key)) {
        handleExpand(false, item);
      } else {
        handleExpand(true, item);
      }
    }
  };

  return (
    <Form form={form} component={false}>
      <Table
        columns={columns}
        dataSource={removeExtraFields(dataSource)}
        expandedRowKeys={expandedRowKeys}
        onExpand={handleExpand}
        expandable={{ childrenColumnName: "fields" }}
        onRow={(record) => ({ onClick: () => handleRowClick(record) })}
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
