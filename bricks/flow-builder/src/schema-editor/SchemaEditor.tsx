/* istanbul ignore file */
//  Ignore tests temporarily, watting for production confirmation
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { get, set } from "lodash";
import { SchemaItem } from "./components/schema-item/SchemaItem";
import { AddPropertyModal } from "./components/add-property-modal/AddPropertyModal";
import { titleList } from "./constants";
import { SchemaItemProperty, SchemaRootNodeProperty } from "./interfaces";
import {
  getGridTemplateColumns,
  calcItemPosition,
  isTypeChange,
  processFormInitvalue,
  processFormData,
  filterTitleList,
} from "./processor";
import styles from "./SchemaEditor.module.css";
export interface SchemaEditorProps extends FormItemWrapperProps {
  value: SchemaRootNodeProperty;
  readonly?: boolean;
  onChange?: (data: SchemaRootNodeProperty) => void;
  hiddenRootNode?: boolean;
}

export const SchemaEditorWrapper = forwardRef<
  HTMLDivElement,
  SchemaEditorProps
>(function LegacySchemaEditor(props, ref): React.ReactElement {
  const { hiddenRootNode } = props;
  const [visible, setVisible] = useState(false);
  const [property, setProperty] = useState<SchemaItemProperty>(
    processFormInitvalue({ name: props.name, ...props.value })
  );

  useEffect(() => {
    setProperty(processFormInitvalue({ name: props.name, ...props.value }));
  }, [props.name, props.value]);

  useEffect(() => {
    // trigger to update formdata on first rendered
    props.onChange?.(processFormData(property));
  }, []);

  const processedTitleList = useMemo(
    () => filterTitleList(titleList, props.readonly),
    [props.readonly]
  );

  const gridTemplateColumns = useMemo(
    () => getGridTemplateColumns(processedTitleList),
    [processedTitleList]
  );

  const handleAdd = (data: SchemaItemProperty, traceId?: string): void => {
    const mutableProps = { ...property };

    if (traceId === "root") {
      mutableProps.fields = mutableProps.fields || [];
      mutableProps.fields.push(data);
    } else {
      const path = calcItemPosition(traceId);

      const find: SchemaItemProperty = get(mutableProps, path);
      find.fields = find.fields || [];
      find.fields.push(data);
    }

    setProperty(mutableProps);
    props.onChange?.(processFormData(mutableProps));
  };

  const handleEdit = (data: SchemaItemProperty, traceId: string): void => {
    let mutableProps = { ...property };

    if (traceId === "root") {
      mutableProps = {
        ...data,
        fields: isTypeChange(data, mutableProps) ? [] : mutableProps.fields,
      };
    } else {
      const path = calcItemPosition(traceId);
      const find = get(mutableProps, path);
      set(mutableProps, path, {
        ...data,
        ...(isTypeChange(data, find) ? {} : { fields: find.fields }),
      });
    }

    setProperty(mutableProps);
    props.onChange?.(processFormData(mutableProps));
  };

  const handleRemove = (traceId: string): void => {
    const mutableProps = { ...property };

    const path = calcItemPosition(traceId);

    const parents = get(mutableProps, path.slice(0, -1));
    parents.splice(Number(path.pop()), 1);
    setProperty(mutableProps);
    props.onChange?.(processFormData(mutableProps));
  };

  return (
    <>
      <div className={styles.editor} ref={ref}>
        <div className={styles.title} style={{ gridTemplateColumns }}>
          {processedTitleList.map((item, index) => (
            <span key={index}>{item.title}</span>
          ))}
        </div>
        <div className={styles.content}>
          <SchemaItem
            className={styles.schemaItem}
            style={{ gridTemplateColumns: gridTemplateColumns }}
            itemData={property}
            readonly={props.readonly}
            trackId="root"
            hideDeleteBtn={true}
            hiddenRootNode={hiddenRootNode}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onCreate={handleAdd}
          />
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
