import React, { useContext, useEffect, useMemo, useState } from "react";
import { Checkbox, Button, Tag, Tooltip, Badge } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { SchemaItemProperty } from "../../interfaces";
import editorStyles from "../../SchemaEditor.module.css";
import {
  getGridTemplateColumns,
  filterTitleList,
  isModelDefinition,
  calcModelDefinition,
  getModelRefData,
  allowExpandFields,
} from "../../processor";
import { titleList, EditorContext, rootTraceId } from "../../constants";
import styles from "./SchemaItem.module.css";
import { K, NS_FLOW_BUILDER } from "../../../i18n/constants";
import { useTranslation } from "react-i18next";
import { isArray, isEmpty } from "lodash";
import { UseBrickConf } from "@next-core/brick-types";
import { BrickAsComponent } from "@next-core/brick-kit";

export interface SchemaItemProps {
  className?: string;
  style?: React.CSSProperties;
  traceId: string;
  onEdit?: (data: SchemaItemProperty, traceId: string) => void;
  onRemove?: (traceId: string) => void;
  onCreate?: (data: SchemaItemProperty, traceId: string) => void;
  itemData: SchemaItemProperty;
  hideDeleteBtn?: boolean;
  readonly?: boolean;
  hiddenRootNode?: boolean;
  hiddenRootNodeRequired?: boolean;
  disabledModelType?: boolean;
  isModelDefinitionRow?: boolean;
  parentsModel?: string[];
  titleBrick?: {
    useBrick: UseBrickConf;
  };
  hiddenFieldRequired?: boolean;
}

export function SchemaItem({
  style,
  readonly,
  className,
  itemData,
  traceId,
  hideDeleteBtn,
  hiddenRootNode,
  hiddenRootNodeRequired,
  hiddenFieldRequired,
  disabledModelType,
  isModelDefinitionRow,
  parentsModel = [],
  titleBrick,
}: SchemaItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const editorContext = useContext(EditorContext);
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(false);
  const {
    modelDefinitionList = [],
    onModal,
    onRemove,
    showModelDefinition,
    hideModelDefinition,
  } = editorContext;

  useEffect(() => {
    if (!isEmpty(itemData.fields)) setExpand(true);
  }, [itemData.fields]);

  const openEditModal = (): void => {
    onModal?.({ ...itemData }, true, traceId);
  };

  const openCreateModal = (): void => {
    onModal?.(
      { fieldPath: itemData.fieldPath } as SchemaItemProperty,
      false,
      traceId
    );
  };

  const displayName = useMemo(
    () => itemData.name || itemData.ref,
    [itemData.name, itemData.ref]
  );

  const offsetPadding = useMemo(() => {
    return 20 * (traceId.split("-").length - 1);
  }, [traceId]);

  const modelDefinition = useMemo(() => {
    return modelDefinitionList.find(
      (item) => item.name === calcModelDefinition(itemData)
    );
  }, [modelDefinitionList, itemData]);

  const isSelfRef = useMemo(
    () =>
      isModelDefinition(itemData) &&
      parentsModel.includes(calcModelDefinition(itemData)),
    [itemData, parentsModel]
  );

  const handleExpand = (): void => {
    setExpand(true);
    if (itemData.ref) {
      showModelDefinition(
        getModelRefData(itemData.ref, modelDefinition, modelDefinitionList),
        traceId
      );
    } else {
      showModelDefinition(modelDefinition, traceId);
    }
  };

  const handleFold = (): void => {
    setExpand(false);
    hideModelDefinition(traceId);
  };

  const handleClick = (): void => {
    expand ? handleFold() : handleExpand();
  };

  return (
    <div
      className={classNames({ [styles.highlight]: modelDefinition && expand })}
    >
      <div
        style={style}
        className={className}
        hidden={traceId === rootTraceId && hiddenRootNode}
      >
        <div
          title={displayName}
          className={classNames(styles.textEllipsis, {
            [styles.modelDefinitionText]: isModelDefinitionRow,
          })}
          style={{
            paddingLeft: offsetPadding,
            ...(hover ? { color: "var(--color-brand)" } : {}),
          }}
        >
          {modelDefinition && !isSelfRef ? (
            <span onClick={handleClick} style={{ cursor: "pointer" }}>
              {expand ? (
                <DownOutlined className={styles.caret} />
              ) : (
                <RightOutlined className={styles.caret} />
              )}
              {displayName}
            </span>
          ) : (
            displayName
          )}
          {titleBrick?.useBrick && (
            <BrickAsComponent useBrick={titleBrick.useBrick} data={itemData} />
          )}
        </div>
        {!hiddenFieldRequired && (
          <div>
            {!(traceId === rootTraceId && hiddenRootNodeRequired) && (
              <Checkbox checked={itemData.required} disabled />
            )}
          </div>
        )}
        <div className={styles.type}>
          <Tooltip
            title={
              itemData.type ? t(K.SCHEMA_ITEM_NORMAL) : t(K.SCHEMA_ITEM_REF)
            }
          >
            <Tag
              className={classNames({
                [styles.typeTag]: itemData.type,
                [styles.refTag]: itemData.ref,
                [styles.modelDefinitionTag]: isModelDefinitionRow,
              })}
            >
              {itemData.type || itemData.ref}
            </Tag>
          </Tooltip>
          {isArray(itemData.enum) && itemData.enum.length > 0 && (
            <Tooltip
              title={`${itemData.enum.map((item) => `"${item}"`).join(" , ")}`}
            >
              <Tag
                className={classNames({
                  [styles.modelDefinitionTag]: isModelDefinitionRow,
                })}
                color="cyan"
              >
                enum
              </Tag>
            </Tooltip>
          )}
          {!readonly && modelDefinition?.updated && (
            <Tooltip title={t(K.MODEL_DEFINITION_UPDATE_MESSAGE)}>
              <Badge color="orange" />
            </Tooltip>
          )}
        </div>
        <div
          className={classNames(styles.textEllipsis, {
            [styles.modelDefinitionText]: isModelDefinitionRow,
          })}
          title={itemData.description}
        >
          {itemData.description}
        </div>
        {!readonly && (
          <div hidden={isModelDefinitionRow}>
            <Button
              type="link"
              className={editorStyles.iconBtn}
              style={{ marginRight: 8 }}
              onClick={openEditModal}
            >
              <SettingOutlined />
            </Button>
            {!hideDeleteBtn && (
              <Button
                type="link"
                className={editorStyles.deleteBtn}
                onClick={() => onRemove?.(traceId)}
              >
                <DeleteOutlined />
              </Button>
            )}
          </div>
        )}
      </div>
      {itemData.fields?.map((item, index) => (
        <SchemaItem
          parentsModel={
            isModelDefinition(itemData)
              ? [...parentsModel, calcModelDefinition(itemData)]
              : [...parentsModel]
          }
          className={editorStyles.schemaItem}
          isModelDefinitionRow={isModelDefinitionRow || !!modelDefinition}
          readonly={readonly}
          style={{
            gridTemplateColumns: getGridTemplateColumns(
              filterTitleList(titleList, readonly, hiddenFieldRequired)
            ),
          }}
          key={index}
          traceId={`${traceId}-${index}`}
          itemData={item}
          disabledModelType={disabledModelType}
          titleBrick={titleBrick}
          hiddenFieldRequired={hiddenFieldRequired}
        />
      ))}
      {!readonly && allowExpandFields(itemData.type) && (
        <div
          style={{ paddingLeft: 20 + offsetPadding }}
          hidden={isModelDefinitionRow}
        >
          <Button
            className={editorStyles.iconBtn}
            type="link"
            title={t(K.ADD_FIELD_PARAMS_TIPS, { name: displayName })}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={openCreateModal}
          >
            <PlusCircleOutlined />
            {t(K.FIELD_PARAMS)}
          </Button>
        </div>
      )}
    </div>
  );
}
