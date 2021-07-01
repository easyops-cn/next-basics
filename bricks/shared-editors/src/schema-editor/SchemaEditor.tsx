import React, { forwardRef, useMemo, useState } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { get } from "lodash";
import { SchemaItem } from "./components/schema-item/SchemaItem";
import { AddPropertyModal } from "./components/add-property-modal/AddPropertyModal";
import { titleList } from "./constants";
import { getGridTemplateColumns, calcItemPosition } from "./processor";
import styles from "./SchemaEditor.module.css";

export type SchemaType = "string" | "number" | "boolean" | "object" | "array";

export interface SchemaItemProperty {
  name: string;
  required?: boolean;
  type: SchemaType;
  description?: string;
  fields?: SchemaItemProperty[];
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
    () => getGridTemplateColumns(titleList),
    []
  );

  const handleClick = (): void => {
    setVisible(true);
  };

  const handleAdd = (data: SchemaItemProperty, traceId?: string): void => {
    if (!traceId) {
      const list = [...propertyList, data];
      setPropertyList(list);
      props.onChange?.(list);
    } else {
      const path = calcItemPosition(traceId.split("-"));

      const find: SchemaItemProperty = get(propertyList, path);
      find.fields = find.fields || [];
      find.fields.push(data);
      setPropertyList(propertyList);
      props.onChange?.(propertyList);
    }
  };

  const handleEdit = (data: SchemaItemProperty, traceId: string): void => {
    const path = calcItemPosition(traceId.split("-"));
    const find = get(propertyList, path);
    Object.assign(find, data);
    setPropertyList(propertyList);
    props.onChange?.(propertyList);
  };

  const handleRemove = (traceId: string): void => {
    const path = calcItemPosition(traceId.split("-"));

    if (path.length === 1) {
      const list = propertyList.filter((_, i) => i !== Number(path[0]));
      setPropertyList(list);
      props?.onChange(list);
    } else {
      const parents = get(propertyList, path.slice(0, -1));
      parents.splice(Number(path.pop()), 1);
      setPropertyList(propertyList);
      props?.onChange(propertyList);
    }
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
              trackId={String(index)}
              name={item.name}
              required={item.required}
              description={item.description}
              type={item.type}
              fields={item.fields}
              onEdit={handleEdit}
              onRemove={handleRemove}
              onCreate={handleAdd}
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
        onSubmit={(data) => handleAdd(data)}
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
