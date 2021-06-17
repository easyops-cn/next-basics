import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Button, Menu, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { LibraryDropdownMenu } from "./LibraryDropdownMenu";

import shareStyles from "../share.module.css";

export function LibraryDropdown(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const isOpen = useRef(false);

  const handleVisibleChange = React.useCallback((value: boolean) => {
    isOpen.current = value;
    setVisible(value);
  }, []);

  const handleClose = React.useCallback(() => {
    setVisible(false);
  }, []);

  const handleDraggingChange = React.useCallback(
    (isDragging: boolean): void => {
      if (isOpen.current) {
        setVisible(!isDragging);
      }
    },
    []
  );

  const content = (
    <Menu style={{ padding: "2px 0" }}>
      <LibraryDropdownMenu
        onCloseClick={handleClose}
        onDraggingChange={handleDraggingChange}
      />
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
        title={t(K.BRICK_LIBRARY)}
        placement="bottomRight"
        overlayStyle={{
          // Hide tooltip when dropdown is open.
          display: visible ? "none" : undefined,
        }}
      >
        <Button type="primary" size="small" style={{ marginRight: "10px" }}>
          <PlusOutlined />
        </Button>
      </Tooltip>
    </Dropdown>
  );
}
