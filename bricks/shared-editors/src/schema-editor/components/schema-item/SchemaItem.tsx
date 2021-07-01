import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { SchemaItemProperty } from "../../SchemaEditor";
import classNames from "classnames";
import { AddPropertyModal } from "../add-property-modal/AddPropertyModal";
import styles from "../../SchemaEditor.module.css";
import { getGridTemplateColumns } from "../../processor";
import { titleList } from "../../constants";

export interface SchemaItemProps extends SchemaItemProperty {
  className?: string;
  style?: React.CSSProperties;
  fields?: SchemaItemProperty[];
  trackId?: string;
  onEdit?: (data: SchemaItemProperty, trackId: string) => void;
  onRemove?: (trackId: string) => void;
  onCreate?: (data: SchemaItemProperty, trackId: string) => void;
}

export function SchemaItem({
  style,
  name,
  description,
  type,
  required,
  className,
  fields,
  onCreate,
  onEdit,
  onRemove,
  trackId,
}: SchemaItemProps): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [inintValue, setInitValue] = useState<Partial<SchemaItemProperty>>({});
  const [isEdit, setEdit] = useState(false);

  const handleSubmit = (
    data: SchemaItemProperty,
    trackId: string,
    isEdit: boolean
  ): void => {
    isEdit ? onEdit?.(data, trackId) : onCreate(data, trackId);
  };

  const handleRemove = (trackId: string): void => {
    onRemove(trackId);
  };

  const handleChildEdit = (data: SchemaItemProperty, trackId: string): void => {
    onEdit?.(data, trackId);
  };

  const handleChildRemove = (trackId: string): void => {
    onRemove(trackId);
  };

  const openEditModal = (): void => {
    setEdit(true);
    setInitValue({ name, type, required, description });
    setVisible(true);
  };

  const openCreateModal = (): void => {
    setEdit(false);
    setInitValue({});
    setVisible(true);
  };

  return (
    <>
      <div style={style} className={className}>
        <div>{name}</div>
        <div>
          <Checkbox checked={required} disabled />
        </div>
        <div>{type}</div>
        <div>{description}</div>
        <div>
          <Button
            type="link"
            className={styles.iconBtn}
            style={{ marginRight: 8 }}
            onClick={openEditModal}
          >
            <SettingOutlined />
          </Button>
          <Button
            type="link"
            className={styles.deleteBtn}
            onClick={() => handleRemove(trackId)}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
      <div style={{ left: "15px", position: "relative" }}>
        {fields?.map((item, index) => (
          <SchemaItem
            className={styles.schemaItem}
            style={{ gridTemplateColumns: getGridTemplateColumns(titleList) }}
            key={index}
            trackId={`${trackId}-${index}`}
            name={item.name}
            required={item.required}
            description={item.description}
            type={item.type}
            fields={item.fields}
            onEdit={handleChildEdit}
            onRemove={handleChildRemove}
            onCreate={onCreate}
          />
        ))}
        {["object", "array"].includes(type) && (
          <div onClick={openCreateModal}>
            <Button className={styles.iconBtn} type="link">
              <PlusCircleOutlined />
              Property
            </Button>
          </div>
        )}
      </div>
      <AddPropertyModal
        isEdit={isEdit}
        visible={visible}
        trackId={trackId}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
        initValue={inintValue}
      />
    </>
  );
}
