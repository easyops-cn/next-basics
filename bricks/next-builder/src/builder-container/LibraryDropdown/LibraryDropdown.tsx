import React, { useState, useRef } from "react";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Dropdown, Button, Menu, Tooltip } from "antd";
import { BrickLibrary } from "../BrickLibrary/BrickLibrary";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

import styles from "./LibraryDropdown.module.css";

export function LibraryDropdown(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const isOpen = useRef(false);

  const onVisibleChange = (v: boolean) => {
    isOpen.current = v;
    setVisible(v);
  };

  const handleClick = () => {
    isOpen.current = !visible;
    setVisible(!visible);
  };

  const onDraggingChange = (isDragging: boolean): void => {
    if(isOpen.current){
      setVisible(!isDragging);
    }
  }

  const content = (
    <Menu>
      <div
        className={styles.libraryContainer}
      >
        <BrickLibrary
          hideToolboxPane={true}
          onDraggingChange={onDraggingChange}
        />
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
      onVisibleChange={onVisibleChange}
      visible={visible}
    >
      <Tooltip 
        title={t(K.BRICK_LIBRARY)}
        placement="bottomRight"
      >
        <Button
          onClick={handleClick}
          type="text"
        >
          <PlusSquareOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
