import React, { ReactNode, useMemo, useState } from "react";
import { Menu, Dropdown, Tooltip } from "antd";
import { GeneralIcon } from "@next-libs/basic-components";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { MenuIcon } from "@next-core/brick-types";
import { Option } from "../interfaces";
import styles from "./DropdownButton.module.css";
interface DropdownButtonProps {
  options: Option[];
  leftButtonIcon?: MenuIcon | string;
  rightButtonIcon?: MenuIcon | string;
  buttonName?: string;
  disabled?: boolean;
  tooltip?: string;
  onChange?(value: any, item: any): void;
  value?: any;
  textPlacement?: "right" | "left";
  handleClick?(item: any): void;
}

export function DropdownButton(props: DropdownButtonProps): React.ReactElement {
  const { rightButtonIcon, leftButtonIcon, buttonName, options } = props;
  const [value, setValue] = useState(props.value);
  const selectedItem = useMemo(
    () => options.find((option) => option.value === value),
    [value]
  );
  const [visible, setVisible] = useState(false);
  const handleMenuClick = (item: any) => {
    if (props.onChange) {
      props.onChange(item.value, item);
    }
    setVisible(false);
    setValue(item.value);
  };
  const handleButtonClick = (e: any) => {
    if (props.handleClick) {
      props.handleClick(selectedItem);
    }
  };
  const menu = useMemo(
    () => (
      <Menu>
        {options.map((option) => (
          <Menu.Item
            className={option.value === value ? "active" : undefined}
            onClick={(e) => handleMenuClick(option)}
            key={String(option.value)}
          >
            {option.label}
          </Menu.Item>
        ))}
      </Menu>
    ),
    [options, selectedItem]
  );

  const renderIcon = (buttonIcon: MenuIcon | string) => {
    return buttonIcon && typeof buttonIcon === "string" ? (
      <LegacyIcon type={buttonIcon} />
    ) : (
      typeof buttonIcon === "object" && <GeneralIcon icon={buttonIcon} />
    );
  };
  const renderButtons = ([
    leftButton,
    rightButton,
  ]: ReactNode[]): ReactNode[] => {
    return [
      <Tooltip title={props.tooltip} key="leftButton">
        {leftButton}
      </Tooltip>,
      rightButton,
    ];
  };
  const renderRightIcon = (icon: MenuIcon | string) => {
    return (
      <span
        className={styles.RightButtonWrapper}
        data-testid="dropdown-button-trigger"
      >
        {selectedItem && props.textPlacement === "right" && (
          <span className={styles.RightButtonLabel}>{selectedItem.label}</span>
        )}
        {renderIcon(icon)}
      </span>
    );
  };

  return (
    <div>
      <Dropdown.Button
        overlay={menu}
        onClick={handleButtonClick}
        icon={renderRightIcon(
          !rightButtonIcon ? (visible ? "up" : "down") : rightButtonIcon
        )}
        buttonsRender={renderButtons}
        trigger={["click"]}
        visible={visible}
        onVisibleChange={(visible) => {
          setVisible(visible);
        }}
        className={styles.DropdownButtonWrapper}
        disabled={props.disabled}
      >
        <div data-testid="left-button-trigger">
          {renderIcon(leftButtonIcon)}
          {props.textPlacement === "left" && selectedItem && (
            <span className={styles.LeftButtonLabel}>
              {selectedItem.label || selectedItem.value}
            </span>
          )}
          {props.textPlacement !== "left" && (
            <span className={styles.LeftButtonLabel}>{buttonName}</span>
          )}
        </div>
      </Dropdown.Button>
    </div>
  );
}
