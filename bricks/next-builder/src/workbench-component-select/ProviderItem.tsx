import { GeneralIcon } from "@next-libs/basic-components";
import { Tooltip, Typography } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { BrickOptionItem } from "../builder-container/interfaces";
import { K, NS_NEXT_BUILDER } from "../i18n/constants";
import { ComponentSelectProps } from "./WorkbenchComponentSelect";
import styles from "./WorkbenchComponentSelect.module.css";

interface ProviderItemProps extends Partial<BrickOptionItem> {
  onActionClick?: ComponentSelectProps["onActionClick"];
}

export function ProviderItem(
  componentData: ProviderItemProps
): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  return (
    <div className={styles.providerItem}>
      <div className={styles.providerName}>
        {componentData.title}
        <Tooltip title={t(K.DOCUMENT)}>
          <GeneralIcon
            icon={{
              lib: "easyops",
              category: "app",
              icon: "next-documents",
              color: "var(--antd-link-color)",
            }}
            style={{ fontSize: 16, cursor: "pointer" }}
            onClick={(e) =>
              componentData.onActionClick?.("document", componentData as any, e)
            }
          />
        </Tooltip>
      </div>
      <div className={styles.providerId}>
        {componentData.id}
        <Typography.Paragraph
          style={{ marginBottom: 0 }}
          copyable={{ text: componentData.id }}
        />
      </div>
    </div>
  );
}
