import { InfoCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React from "react";
import { useTranslation } from "react-i18next";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./ToolboxPane.module.css";

interface ToolboxPaneProps {
  title: string;
  tooltips?: React.ReactNode;
}

export function ToolboxPane({
  title,
  tooltips,
  children,
}: React.PropsWithChildren<ToolboxPaneProps>): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const getPopupContainer = React.useCallback(
    (triggerNode: HTMLElement) => triggerNode.parentElement,
    []
  );

  return (
    <div className={styles.toolboxPane}>
      <div className={styles.toolboxPaneHeading}>
        <div className={styles.toolboxPaneTitle}>{title}</div>
        {tooltips && (
          <div className={styles.toolboxPaneTooltips}>
            <Popover
              content={tooltips}
              title={t(K.TIPS)}
              getPopupContainer={getPopupContainer}
              overlayStyle={{ maxWidth: 320 }}
            >
              <InfoCircleOutlined />
            </Popover>
          </div>
        )}
      </div>
      <div className={styles.toolboxPaneBody}>{children}</div>
    </div>
  );
}
