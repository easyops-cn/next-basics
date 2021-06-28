import React, { useMemo } from "react";
import { Modal } from "antd";
import { ContextConf } from "@next-core/brick-types";
import { FormInstance } from "antd/lib/form";
import { ContextItemForm } from "./ContextItemForm";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

interface ContextItemFormProps {
  data: ContextConf;
  onContextItemUpdate?: (contextItem: ContextConf) => void;
  settingItemForm: FormInstance;
  visible?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

export function ContextItemFormModal({
  data,
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
      width={640}
      title={isCreate ? t(K.ADD_DATA) : `${t(K.SETTINGS)} - ${data.name}`}
      visible={visible}
      onOk={onOk}
      onCancel={onCancel}
      destroyOnClose
    >
      <ContextItemForm
        data={data}
        onContextItemUpdate={onContextItemUpdate}
        settingItemForm={settingItemForm}
      />
    </Modal>
  );
}
