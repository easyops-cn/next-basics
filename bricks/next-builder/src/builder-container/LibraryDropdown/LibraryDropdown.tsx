import React, { useState, useRef } from "react";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu, Tooltip } from "antd";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

import styles from "./LibraryDropdown.module.css";

export function LibraryDropdown(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const isOpen = useRef(false);

  const handleClick = () => {
    isOpen.current = !visible;
    setVisible(!visible);
  };

  const handleClose = () => {
    isOpen.current = false;
    setVisible(false);
  }

  const onDraggingChange = (isDragging: boolean): void => {
    if(isOpen.current){
      setVisible(!isDragging);
    }
  }

  const content = (
    <Menu>
      <div>
        <div
          className={styles.headerContainer}
        >
          <span>{t(K.BRICK_LIBRARY)}</span>
          <Button 
            type="text" 
            onClick={handleClose} 
            data-testid="close-btn"
          >
            <CloseOutlined />
          </Button>
        </div>
        <div
          className={styles.libraryContainer}
        >
          <BrickLibrary
            hideToolboxPane={true}
            onDraggingChange={onDraggingChange}
          />
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown
      overlay={content}
      overlayClassName={
        styles.customAnimation
      }
      trigger={["click"]}
      placement="bottomLeft"
      visible={visible}
    >
      <Tooltip 
        title={t(K.BRICK_LIBRARY)}
        placement="bottomRight"
      >
        <Button
          onClick={handleClick}
          type="primary"
          size="small"
          style={{marginRight: "10px"}}
          data-testid="trigger-btn"
        >
          <PlusOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
