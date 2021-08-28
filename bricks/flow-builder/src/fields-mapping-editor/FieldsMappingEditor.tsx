import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import classNames from "classnames";
import { Table, Tooltip, Typography, Tag, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { Form } from "antd";
import { set } from "lodash";
import {
  calcFieldPath,
  processFieldValue,
  getFieldChildrenMap,
  getFinalFieldsValue,
  removeExtraFields,
  getTagType,
} from "./processor";
import { EditableCell } from "./components/editable-cell/EditableCell";
import styles from "./FieldsMappingEditor.module.css";
import { useTranslation } from "react-i18next";
import { FieldItem, SimplifiedFieldItem } from "./interfaces";
import { NS_FLOW_BUILDER, K } from "../i18n/constants";
export interface FieldsMappingEditorProps {
  dataSource: FieldItem[];
  onChange?: (value: SimplifiedFieldItem[]) => void;
  onRowEdit?: (rowData: FieldItem) => void;
  loading?: boolean;
}

export interface EdiotrRef {
  setRowData: (rowData: FieldItem) => void;
}

export function LegacyFieldsMappingEditor(
  props: FieldsMappingEditorProps,
  ref: React.Ref<EdiotrRef>
): React.ReactElement {
  const { onChange, loading, onRowEdit } = props;
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState(props.dataSource);
  const fieldChildrenMap = useRef(getFieldChildrenMap(props.dataSource));
  const [expandedRowKeys, setExpandedRowKeys] = useState(
    props.dataSource.map((item) => item.key)
  );

  const setRowData = (rowData: FieldItem): void => {
    const mutableDataSource = [...dataSource];
    const path = calcFieldPath(rowData.key);
    const newValue = processFieldValue(
      rowData,
      rowData.value,
      dataSource,
      fieldChildrenMap.current
    );

    set(mutableDataSource, path, newValue);

    setDataSource(mutableDataSource);
    onChange?.(getFinalFieldsValue(mutableDataSource));
  };

  useImperativeHandle(ref, () => ({
    setRowData,
  }));

  useEffect(() => {
    setDataSource(props.dataSource);
    setExpandedRowKeys(props.dataSource.map((item) => item.key));
    fieldChildrenMap.current = getFieldChildrenMap(props.dataSource);
  }, [props.dataSource]);

  const renderNameItem = useCallback(
    (text: string, record: FieldItem): React.ReactElement => {
      return (
        <>
          <Tooltip title={record.description}>
            <div className={styles.fieldName}>{text}</div>
          </Tooltip>
          <Tag
            className={classNames(
              styles.typeTag,
              styles[getTagType(record.type)]
            )}
            style={{ marginLeft: 8 }}
          >
            {record.type}
          </Tag>
        </>
      );
    },
    []
  );

  const renderOprationItem = useCallback(
    (_: string, record: FieldItem) => {
      const handleEdit = (record: FieldItem, e: React.MouseEvent): void => {
        e.stopPropagation();
        onRowEdit?.(record);
      };

      return (
        <Button
          type="link"
          test-id="edit-btn"
          onClick={(e) => handleEdit(record, e)}
        >
          <EditOutlined />
        </Button>
      );
    },
    [onRowEdit]
  );

  const renderSourceItem = useCallback(
    (text: string) => {
      return {
        cel: t(K.CEL),
        const: t(K.CONST),
        fieldsMapping: t(K.FIELDS_MAPPING),
      }[text];
    },
    [t]
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: renderNameItem,
    },
    {
      title: "Source",
      dataIndex: "source",
      width: 100,
      render: renderSourceItem,
    },
    {
      title: "value",
      dataIndex: "value",
      width: 300,
      ellipsis: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: renderOprationItem,
      width: 100,
    },
  ];

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
    if (item.fields) {
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

export const FieldsMappingEditor = forwardRef(LegacyFieldsMappingEditor);
