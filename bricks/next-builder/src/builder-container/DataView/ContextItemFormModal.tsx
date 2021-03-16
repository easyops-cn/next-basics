import React, { useMemo } from "react";
import { Modal } from "antd";
import { ContextConf } from "@next-core/brick-types";
import { BrickOptionItem } from "../interfaces";
import { FormInstance } from "antd/lib/form";
import { ContextItemForm } from "./ContextItemForm";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

interface ContextItemFormProps {
  data: ContextConf;
  brickList?: BrickOptionItem[];
  onContextItemUpdate?: (contextItem: ContextConf) => void;
  settingItemForm: FormInstance;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export function ContextItemFormModal({
  data,
  brickList,
  onContextItemUpdate,
  settingItemForm,
  visible,
  onOk,
  onCancel,
}: ContextItemFormProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const isCreate = useMemo(() => !data, [data]);
  return (
    <Modal
      title={isCreate ? t(K.ADD_DATA) : `${t(K.SETTING)} - ${data.name}`}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <ContextItemForm
        data={data}
        brickList={brickList}
        onContextItemUpdate={onContextItemUpdate}
        settingItemForm={settingItemForm}
      />
    </Modal>
  );
}
