import React, { useState } from "react";
import { Checkbox, Button } from "antd";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { SchemaItemProperty } from "../../SchemaEditor";
import classNames from "classnames";
import { AddPropertyModal } from "../add-property-modal/AddPropertyModal";
import styles from "../../SchemaEditor.module.css";

export interface SchemaItemProps extends SchemaItemProperty {
  className?: string;
  style?: React.CSSProperties;
  onEdit?: (data: SchemaItemProperty) => void;
  onRemove?: () => void;
}

export function SchemaItem({
  style,
  name,
  description,
  type,
  required,
  className,
  onEdit,
  onRemove,
}: SchemaItemProps): React.ReactElement {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (data: SchemaItemProperty): void => {
    onEdit?.(data);
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
            onClick={() => setVisible(true)}
          >
            <SettingOutlined />
          </Button>
          <Button
            type="link"
            className={styles.deleteBtn}
            onClick={() => onRemove?.()}
          >
            <DeleteOutlined />
          </Button>
        </div>
      </div>
      <AddPropertyModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
        initValue={{ name, description, type, required }}
      />
    </>
  );
}
