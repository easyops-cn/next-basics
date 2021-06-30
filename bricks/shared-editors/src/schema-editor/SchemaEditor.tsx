import React, { forwardRef, useMemo, useState } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { SchemaItem } from "./components/schema-item/SchemaItem";
import { AddPropertyModal } from "./components/add-property-modal/AddPropertyModal";
import { titleList } from "./constants";
import styles from "./SchemaEditor.module.css";

export type SchemaType = "string" | "number" | "boolean" | "object" | "array";

export interface SchemaItemProperty {
  name: string;
  required?: boolean;
  type: SchemaType;
  description?: string;
}

export interface SchemaEditorProps extends FormItemWrapperProps {
  value: SchemaItemProperty[];
  onChange?: (data: SchemaItemProperty[]) => void;
}

export const SchemaEditorWrapper = forwardRef<
  HTMLDivElement,
  SchemaEditorProps
>(function LegacySchemaEditor(props, ref): React.ReactElement {
  const [visible, setVisible] = useState(false);
  const [propertyList, setPropertyList] = useState<SchemaItemProperty[]>(
    props.value
  );

  const gridTemplateColumns = useMemo(
    () =>
      titleList.reduce((str, item) => (str += (item.width ?? "1fr") + " "), ""),
    []
  );

  const handleClick = (): void => {
    setVisible(true);
  };

  const handleAdd = (data: SchemaItemProperty): void => {
    setPropertyList((list) => [...list, data]);
  };

  const handleEdit = (data: SchemaItemProperty, index: number): void => {
    setPropertyList((list) => {
      list[index] = data;
      return [...list];
    });
  };

  const handleRemove = (index: number): void => {
    setPropertyList((list) => list.filter((_, i) => i !== index));
  };

  return (
    <>
      <div className={styles.editor} ref={ref}>
        <div className={styles.title} style={{ gridTemplateColumns }}>
          {titleList.map((item, index) => (
            <span key={index}>{item.title}</span>
          ))}
        </div>
        <div className={styles.content}>
          {propertyList?.map((item, index) => (
            <SchemaItem
              className={styles.schemaItem}
              style={{ gridTemplateColumns: gridTemplateColumns }}
              key={index}
              name={item.name}
              required={item.required}
              description={item.description}
              type={item.type}
              onEdit={(data) => handleEdit(data, index)}
              onRemove={() => handleRemove(index)}
            />
          ))}
        </div>
        <div>
          <Button className={styles.iconBtn} type="link" onClick={handleClick}>
            <PlusCircleOutlined />
            Property
          </Button>
        </div>
      </div>
      <AddPropertyModal
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleAdd}
      />
    </>
  );
});

export function SchemaEditor(props: SchemaEditorProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <SchemaEditorWrapper {...props} />
    </FormItemWrapper>
  );
}
