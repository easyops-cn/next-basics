import React, { useContext, useEffect, useMemo, useState } from "react";
import { Checkbox, Button, Tag, Tooltip } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  RightOutlined,
  DownOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { NotifyBadge } from "../notify-badge/NotifyBadge";
import { SchemaItemProperty } from "../../interfaces";
import editorStyles from "../../SchemaEditor.module.css";
import {
  getGridTemplateColumns,
  filterTitleList,
  isModelDefinition,
  calcModelDefinition,
} from "../../processor";
import { titleList, EditorContext } from "../../constants";
import styles from "./SchemaItem.module.css";
import { K, NS_FLOW_BUILDER } from "../../../i18n/constants";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

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
  disabledModelType?: boolean;
  isModelDefinitionRow?: boolean;
  parentsModel?: string[];
}

export function SchemaItem({
  style,
  readonly,
  className,
  itemData,
  traceId,
  hideDeleteBtn,
  hiddenRootNode,
  disabledModelType,
  isModelDefinitionRow,
  parentsModel,
}: SchemaItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const editorContext = useContext(EditorContext);
  const [hover, setHover] = useState(false);
  const [expand, setExpand] = useState(false);
  const {
    modelDefinitionList,
    onModal,
    onRemove,
    showModelDefinition,
    hideModelDefinition,
    updateModelDefinition,
  } = editorContext;

  useEffect(() => {
    setExpand(!isEmpty(itemData.fields));
  }, [itemData.fields]);

  const openEditModal = (): void => {
    onModal?.({ ...itemData }, true, traceId);
  };

  const openCreateModal = (): void => {
    onModal?.({} as SchemaItemProperty, false, traceId);
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

  const isSefRef = useMemo(
    () =>
      isModelDefinition(itemData) &&
      parentsModel.includes(calcModelDefinition(itemData)),
    [itemData, parentsModel]
  );

  const handleExpand = (): void => {
    setExpand(true);
    if (itemData.ref) {
      const [, field] = itemData.ref.split(".");
      showModelDefinition(
        field === "*"
          ? modelDefinition
          : {
              name: itemData.ref,
              fields: modelDefinition.fields.filter(
                (item) => item.name === field
              ),
            },
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
        hidden={traceId === "root" && hiddenRootNode}
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
          {modelDefinition && !isSefRef ? (
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
        </div>
        <div>
          <Checkbox checked={itemData.required} disabled />
        </div>
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
          {!readonly && modelDefinition?.updated && (
            <NotifyBadge
              onFinish={updateModelDefinition}
              modelName={calcModelDefinition(itemData)}
            />
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
              filterTitleList(titleList, readonly)
            ),
          }}
          key={index}
          traceId={`${traceId}-${index}`}
          itemData={item}
          disabledModelType={disabledModelType}
        />
      ))}
      {!readonly && itemData.type?.includes("object") && (
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
