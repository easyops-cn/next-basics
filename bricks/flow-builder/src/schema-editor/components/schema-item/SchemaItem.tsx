import React, { useContext, useMemo, useState } from "react";
import { Checkbox, Button, Tag, Tooltip } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { SchemaItemProperty } from "../../interfaces";
import editorStyles from "../../SchemaEditor.module.css";
import { getGridTemplateColumns, filterTitleList } from "../../processor";
import { titleList, EditorContext } from "../../constants";
import styles from "./SchemaItem.module.css";
import { K, NS_FLOW_BUILDER } from "../../../i18n/constants";
import { useTranslation } from "react-i18next";

export interface SchemaItemProps {
  className?: string;
  style?: React.CSSProperties;
  trackId: string;
  onEdit?: (data: SchemaItemProperty, trackId: string) => void;
  onRemove?: (trackId: string) => void;
  onCreate?: (data: SchemaItemProperty, trackId: string) => void;
  itemData: SchemaItemProperty;
  hideDeleteBtn?: boolean;
  readonly?: boolean;
  hiddenRootNode?: boolean;
  disabledModelType?: boolean;
}

export function SchemaItem({
  style,
  readonly,
  className,
  itemData,
  trackId,
  hideDeleteBtn,
  hiddenRootNode,
  disabledModelType,
}: SchemaItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const editorContext = useContext(EditorContext);
  const [hover, setHover] = useState(false);

  const openEditModal = (): void => {
    editorContext.onModal({ ...itemData }, true, trackId);
  };

  const openCreateModal = (): void => {
    editorContext.onModal({} as SchemaItemProperty, false, trackId);
  };

  const displayName = useMemo(
    () => itemData.name || itemData.ref,
    [itemData.name, itemData.ref]
  );

  const offsetPadding = useMemo(() => {
    return 20 * (trackId.split("-").length - 1);
  }, [trackId]);

  return (
    <div>
      <div
        style={style}
        className={className}
        hidden={trackId === "root" && hiddenRootNode}
      >
        <div
          title={displayName}
          className={styles.textEllipsis}
          style={{
            paddingLeft: offsetPadding,
            ...(hover ? { color: "var(--color-brand)" } : {}),
          }}
        >
          {displayName}
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
              })}
            >
              {itemData.type || itemData.ref}
            </Tag>
          </Tooltip>
        </div>
        <div className={styles.textEllipsis} title={itemData.description}>
          {itemData.description}
        </div>
        {!readonly && (
          <div>
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
                onClick={() => editorContext.onRemove?.(trackId)}
              >
                <DeleteOutlined />
              </Button>
            )}
          </div>
        )}
      </div>
      {itemData.fields?.map((item, index) => (
        <SchemaItem
          className={editorStyles.schemaItem}
          readonly={readonly}
          style={{
            gridTemplateColumns: getGridTemplateColumns(
              filterTitleList(titleList, readonly)
            ),
          }}
          key={index}
          trackId={`${trackId}-${index}`}
          itemData={item}
          disabledModelType={disabledModelType}
        />
      ))}
      {!readonly && itemData.type?.includes("object") && (
        <div style={{ paddingLeft: 20 + offsetPadding }}>
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
