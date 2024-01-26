/* istanbul ignore file */
//  Ignore tests temporarily, watting for production confirmation
import React, { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import { get, isEmpty, set } from "lodash";
import { SchemaItem } from "./components/schema-item/SchemaItem";
import { AddPropertyModal } from "./components/add-property-modal/AddPropertyModal";
import { ContractContext } from "./ContractContext";
import { titleList, EditorContext, rootTraceId } from "./constants";
import {
  SchemaItemProperty,
  SchemaRootNodeProperty,
  ModelDefinition,
} from "./interfaces";
import {
  getGridTemplateColumns,
  calcItemPosition,
  isTypeChange,
  processFormInitvalue,
  processFormData,
  filterTitleList,
} from "./processor";
import styles from "./SchemaEditor.module.css";
import { UseBrickConf } from "@next-core/brick-types";
export interface SchemaEditorProps extends FormItemWrapperProps {
  value: SchemaRootNodeProperty;
  readonly?: boolean;
  projectId?: string;
  onChange?: (data: SchemaRootNodeProperty) => void;
  hiddenRootNode?: boolean;
  disabledModelType?: boolean;
  enableWrapper?: boolean;
  simpleTypeList?: string[];
  customTypeList?: string[];
  hiddenArrayTypeCheckbox?: boolean;
  rootNodeRequired?: Record<string, boolean>;
  importModelDefinition?: ModelDefinition[];
  hiddenRootNodeRequired?: boolean;
  titleBrick: {
    useBrick: UseBrickConf;
  };
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
  const {
    projectId,
    hiddenRootNode,
    disabledModelType,
    enableWrapper,
    simpleTypeList,
    customTypeList,
    hiddenArrayTypeCheckbox,
    rootNodeRequired,
    hiddenRootNodeRequired,
    importModelDefinition,
    titleBrick,
  } = props;
  const [visible, setVisible] = useState(false);
  const [curItemData, SetCurItemData] = useState<ItemData>({
    initValue: {} as SchemaItemProperty,
    trackId: rootTraceId,
  });
  const [property, setProperty] = useState<SchemaItemProperty>(
    processFormInitvalue({ name: props.name, ...props.value })
  );

  const contractContext = useRef(
    ContractContext.getInstance(
      importModelDefinition,
      property.import,
      customTypeList
    )
  );

  useEffect(() => {
    setProperty(processFormInitvalue({ name: props.name, ...props.value }));
  }, [props.name, props.value]);

  useEffect(() => {
    // trigger to update formdata on first rendered
    props.onChange?.(processFormData(property));

    return () => {
      ContractContext.cleanInstance();
    };
  }, []);

  const processedTitleList = useMemo(
    () => filterTitleList(titleList, props.readonly),
    [props.readonly]
  );

  const gridTemplateColumns = useMemo(
    () => getGridTemplateColumns(processedTitleList),
    [processedTitleList]
  );

  const handleAdd = (
    data: SchemaItemProperty | SchemaItemProperty[],
    traceId?: string,
    emitOnChange = true
  ): void => {
    const mutableProps = { ...property };

    if (traceId === rootTraceId) {
      mutableProps.fields = mutableProps.fields || [];
      mutableProps.fields.push(...[].concat(data));
    } else {
      const path = calcItemPosition(traceId);

      const find: SchemaItemProperty = get(mutableProps, path);
      find.fields = find.fields || [];
      find.fields.push(...[].concat(data));
    }

    setProperty(mutableProps);
    emitOnChange && props.onChange?.(processFormData(mutableProps));
  };

  const handleEdit = (data: SchemaItemProperty, traceId: string): void => {
    let mutableProps = { ...property };

    if (traceId === rootTraceId) {
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

  const showModelDefinition = (
    modelDefinition: ModelDefinition,
    traceId: string
  ): void => {
    // no need emit onChange
    handleAdd(modelDefinition.fields, traceId, false);
  };

  const hideModelDefinition = (traceId: string): void => {
    const mutableProps = { ...property };
    if (traceId === rootTraceId) {
      delete mutableProps.fields;
    } else {
      const path = calcItemPosition(traceId);
      const find = get(mutableProps, path);

      delete find.fields;
    }

    setProperty(mutableProps);
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
        showModelDefinition,
        hideModelDefinition,
        modelDefinitionList: contractContext.current?.getModelDefinition(),
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
            traceId={rootTraceId}
            hideDeleteBtn={true}
            hiddenRootNode={hiddenRootNode}
            hiddenRootNodeRequired={hiddenRootNodeRequired}
            disabledModelType={disabledModelType}
            titleBrick={titleBrick}
            parentsModel={[]}
          />
        </div>
      </div>
      <AddPropertyModal
        {...curItemData}
        projectId={projectId}
        simpleTypeList={simpleTypeList}
        customTypeList={customTypeList}
        enableWrapper={enableWrapper}
        disabledModelType={disabledModelType}
        rootNodeRequired={rootNodeRequired}
        hiddenRootNodeRequired={hiddenRootNodeRequired}
        hiddenArrayTypeCheckbox={hiddenArrayTypeCheckbox}
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
