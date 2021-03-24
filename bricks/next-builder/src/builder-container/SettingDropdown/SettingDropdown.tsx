import React, { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu, Tooltip, Switch } from "antd";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { useBuilderDataManager } from "@next-core/editor-bricks-helper";
import { JsonStorage } from "@next-libs/storage";
import { localStorageKeyForShowRelatedNodesBasedOnEvents } from "../constants";
import { useBuilderUIContext } from "../BuilderUIContext";
import { ToolboxTab } from "../interfaces";

import shareStyles from "../share.module.css";

import styles from "./SettingDropdown.module.css";

export function SettingDropdown(): React.ReactElement {
  const { toolboxTab } = useBuilderUIContext();
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const storage = React.useMemo(() => new JsonStorage(localStorage), []);
  const [showRelatedBricks, setShowRelatedBricks] = React.useState(
    storage.getItem(localStorageKeyForShowRelatedNodesBasedOnEvents) ?? false
  );
  const manager = useBuilderDataManager();

  const handleClick = (): void => {
    setVisible(!visible);
  };

  const handleVisibleChange = (value: boolean): void => {
    setVisible(value);
  };

  const handleShowRelatedBricksChange = (value: boolean): void => {
    setShowRelatedBricks(value);
    storage.setItem(localStorageKeyForShowRelatedNodesBasedOnEvents, value);
    if (toolboxTab !== ToolboxTab.EVENTS_VIEW) {
      manager.setShowRelatedNodesBasedOnEvents(value);
    }
  };

  const content = (
    <Menu>
      <div className={styles.settingContainer}>
        <div className={styles.headerContainer}>
          <span>{t(K.SETTINGS)}</span>
        </div>
        <div className={styles.settingItem}>
          <span>{t(K.SHOW_RELATED_NODES_BASED_ON_EVENTS_WHEN_HOVERING)}</span>
          <Switch
            size="small"
            checked={showRelatedBricks}
            onChange={handleShowRelatedBricksChange}
          />
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown
      overlay={content}
      overlayClassName={shareStyles.customAnimation}
      trigger={["click"]}
      placement="bottomLeft"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Tooltip
        title={t(K.SETTINGS)}
        placement="bottomRight"
        overlayStyle={{
          // Hide tooltip when dropdown is open.
          display: visible ? "none" : undefined,
        }}
      >
        <a
          className={shareStyles.tabLink}
          role="button"
          onClick={handleClick}
          data-testid="setting-btn"
        >
          <SettingOutlined />
        </a>
      </Tooltip>
    </Dropdown>
  );
}
