/* istanbul ignore file */
//  Ignore tests temporarily, watting for production confirmation
import React, { forwardRef, useEffect, useMemo, useState } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { get, set } from "lodash";
import { SchemaItem } from "./components/schema-item/SchemaItem";
import { AddPropertyModal } from "./components/add-property-modal/AddPropertyModal";
import { titleList, EditorContext } from "./constants";
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
  disabledModelType: boolean;
}

interface ItemData {
  isEdit?: boolean;
  initValue?: SchemaItemProperty;
  trackId?: string;
}

export const SchemaEditorWrapper = forwardRef<
  HTMLDivElement,
  SchemaEditorProps
>(function LegacySchemaEditor(props, ref): React.ReactElement {
  const { hiddenRootNode, disabledModelType } = props;
  const rootTrackId = "root";
  const [visible, setVisible] = useState(false);
  const [curItemData, SetCurItemData] = useState<ItemData>({
    initValue: {} as SchemaItemProperty,
    trackId: rootTrackId,
  });
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

    if (traceId === rootTrackId) {
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

  const handleModal = (
    itemData: SchemaItemProperty,
    isEdit: boolean,
    trackId: string
  ): void => {
    SetCurItemData({
      isEdit,
      trackId,
      initValue: itemData,
    });
    setVisible(true);
  };

  const handleSubmit = (
    data: SchemaItemProperty,
    trackId: string,
    isEdit: boolean
  ): void => {
    isEdit ? handleEdit?.(data, trackId) : handleAdd?.(data, trackId);
  };

  return (
    <EditorContext.Provider
      value={{
        onEdit: handleEdit,
        onRemove: handleRemove,
        onCreate: handleAdd,
        onModal: handleModal,
      }}
    >
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
            trackId={rootTrackId}
            hideDeleteBtn={true}
            hiddenRootNode={hiddenRootNode}
            disabledModelType={disabledModelType}
          />
        </div>
      </div>
      <AddPropertyModal
        {...curItemData}
        disabledModelType={disabledModelType}
        visible={visible}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
      />
    </EditorContext.Provider>
  );
});

export function SchemaEditor(props: SchemaEditorProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <SchemaEditorWrapper {...props} />
    </FormItemWrapper>
  );
}
