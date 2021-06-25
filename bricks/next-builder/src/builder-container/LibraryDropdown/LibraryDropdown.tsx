import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu } from "antd";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import { LibraryDropdownMenu } from "./LibraryDropdownMenu";
import { LayerType, LibraryMenuItem } from "../interfaces";

import shareStyles from "../share.module.css";
export interface LibraryDropdownProps {
  type?: LayerType;
  onVisbleChange?: (visible: boolean) => void;
  menuItems?: LibraryMenuItem[];
}

export function LibraryDropdown({
  type,
  onVisbleChange,
  children,
  menuItems,
}: React.PropsWithChildren<LibraryDropdownProps>): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const isOpen = useRef(false);

  const handleVisibleChange = React.useCallback(
    (value: boolean) => {
      isOpen.current = value;
      setVisible(value);
      onVisbleChange?.(value);
    },
    [onVisbleChange]
  );

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
        menuItems={menuItems}
        onCloseClick={handleClose}
        onDraggingChange={handleDraggingChange}
        type={type}
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
      {children}
    </Dropdown>
  );
}
