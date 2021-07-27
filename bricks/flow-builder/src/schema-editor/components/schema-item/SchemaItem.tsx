import React, { useMemo, useState } from "react";
import { Checkbox, Button, Tag, Tooltip } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { SchemaItemProperty } from "../../interfaces";
import { AddPropertyModal } from "../add-property-modal/AddPropertyModal";
import editorStyles from "../../SchemaEditor.module.css";
import { getGridTemplateColumns, filterTitleList } from "../../processor";
import { titleList } from "../../constants";
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
}

export function SchemaItem({
  style,
  readonly,
  className,
  itemData,
  onCreate,
  onEdit,
  onRemove,
  trackId,
  hideDeleteBtn,
}: SchemaItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [visible, setVisible] = useState(false);
  const [initValue, setInitValue] = useState({} as SchemaItemProperty);
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
    setInitValue({ ...itemData });
    setVisible(true);
  };

  const openCreateModal = (): void => {
    setEdit(false);
    setInitValue({});
    setVisible(true);
  };

  const offsetPadding = useMemo(() => {
    return 20 * (trackId.split("-").length - 1);
  }, [trackId]);

  return (
    <>
      <div style={style} className={className}>
        <div style={{ paddingLeft: offsetPadding }}>
          {itemData.name || "--"}
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
        <div className={styles.description} title={itemData.description}>
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
                onClick={() => handleRemove(trackId)}
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
          onEdit={handleChildEdit}
          onRemove={handleChildRemove}
          onCreate={onCreate}
        />
      ))}
      {!readonly && itemData.type?.includes("object") && (
        <div style={{ paddingLeft: 20 + offsetPadding }}>
          <Button
            className={editorStyles.iconBtn}
            type="link"
            onClick={openCreateModal}
          >
            <PlusCircleOutlined />
            Property
          </Button>
        </div>
      )}
      <AddPropertyModal
        isEdit={isEdit}
        visible={visible}
        trackId={trackId}
        onClose={() => setVisible(false)}
        onSubmit={handleSubmit}
        initValue={initValue}
      />
    </>
  );
}
