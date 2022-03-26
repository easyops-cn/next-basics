import React from "react";
import { Badge, Popconfirm } from "antd";
import styles from "./NotifyBadge.module.css";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { handleHttpError } from "@next-core/brick-kit";
import { InstanceApi_postSearch } from "@next-sdk/cmdb-sdk";
import { ContractContext } from "../../ContractContext";

export interface NotifyBadgeProps {
  modelName: string;
  onFinish?(): void;
}

export function NotifyBadge(props: NotifyBadgeProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const { modelName, onFinish } = props;

  const handleConfirm = async (): Promise<void> => {
    try {
      const [modelDetail] = (
        await InstanceApi_postSearch("FLOW_BUILDER_MODEL_CONTRACT", {
          fields: {
            project: true,
            importModelDefinition: true,
            name: true,
            fields: true,
          },
          query: {
            name: {
              $eq: modelName,
            },
          },
        })
      ).list;

      if (modelDetail) {
        const importModelDefinition = modelDetail.importModelDefinition || [];
        importModelDefinition.unshift({
          name: modelDetail.name,
          fields: modelDetail.fields,
        });
        ContractContext.getInstance().updateModelDefinition(
          modelDetail.name,
          importModelDefinition
        );
        onFinish();
      }
    } catch (e) {
      handleHttpError(e);
    }
  };

  return (
    <span className={styles.wrapper}>
      <Popconfirm
        title={t(K.MODEL_DEFINITION_UPDATE_MESSAGE)}
        onConfirm={handleConfirm}
      >
        <Badge color="orange" />
      </Popconfirm>
    </span>
  );
}
