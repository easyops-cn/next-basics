import React, { useState, useRef } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu, Tooltip } from "antd";
import { AdvancedBrickLibrary } from "../AdvancedBrickLibrary/AdvancedBrickLibrary";
import { LibraryMenu } from "../LibraryMenu/LibraryMenu";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { libCategoryList, LIB_ALL_CATEGORY } from "../constants";

import styles from "./LibraryDropdown.module.css";
import shareStyles from "../share.module.css";

export function LibraryDropdown(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const libraryRef = useRef<any>();
  const isOpen = useRef(false);

  const handleClick = React.useCallback(() => {
    isOpen.current = !visible;
    setVisible(!visible);
  }, [visible]);

  const handleClose = React.useCallback(() => {
    isOpen.current = false;
    setVisible(false);
  }, []);

  const onDraggingChange = React.useCallback((isDragging: boolean): void => {
    if (isOpen.current) {
      setVisible(!isDragging);
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    libraryRef.current?.handleSearchWithGroup("", category);
  };

  const content = (
    <Menu style={{ padding: "2px 0" }}>
      <div className={styles.wrapper}>
        <Button
          type="text"
          onClick={handleClose}
          data-testid="close-btn"
          className={styles.closeBtn}
        >
          <CloseOutlined />
        </Button>
        <div className={styles.libraryContainer}>
          <LibraryMenu
            menuItems={libCategoryList}
            onItemClick={handleCategoryChange}
            defaultSelectedKeys={[LIB_ALL_CATEGORY]}
          />
          <AdvancedBrickLibrary
            ref={libraryRef}
            onDraggingChange={onDraggingChange}
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
    >
      <Tooltip
        title={t(K.BRICK_LIBRARY)}
        placement="bottomRight"
        overlayStyle={{
          // Hide tooltip when dropdown is open.
          display: visible ? "none" : undefined,
        }}
      >
        <Button
          onClick={handleClick}
          type="primary"
          size="small"
          style={{ marginRight: "10px" }}
          data-testid="trigger-btn"
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
