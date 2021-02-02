import React from "react";
import classNames from "classnames";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import {
  DownOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { isEmpty } from "lodash";
import { CustomButton, DropdownPlacement } from "./index";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import style from "./index.module.css";

interface AdminButtonProps {
  buttons: CustomButton[];
  handleClick: (eventName: string, button: CustomButton) => void;
  dropdownBtnText?: string;
  dropdownBtnIcon?: any;
  isMoreButton?: boolean;
  moreBtnIcon?: any;
  moreButtonShape?: "circle" | "rectangle" | "no" | "icon";
  alignment?: "start" | "center" | "end" | "stretch";
  dropdownPlacement?: DropdownPlacement;
}

export class GeneralCustomButtons extends React.Component<AdminButtonProps> {
  constructor(props: AdminButtonProps) {
    super(props);
    this.handleMenuClick = this.handleMenuClick.bind(this);
  }

  handleMenuClick(info: MenuInfo) {
    this.props.handleClick(
      info.key as string,
      (info.item as React.Component<any>).props["data-button"]
    );
  }

  render() {
    const {
      buttons: buttonConfigs,
      handleClick,
      dropdownPlacement,
      isMoreButton,
      moreButtonShape,
      moreBtnIcon,
      dropdownBtnIcon,
      dropdownBtnText,
      alignment,
    } = this.props;
    const propsButtons = buttonConfigs.filter((btn) => !btn.hide);
    const buttons = propsButtons
      .filter((btn) => !btn.isDropdown)
      .map((button) => {
        const {
          icon,
          buttonHref,
          buttonUrl,
          buttonType,
          buttonShape,
          buttonSize,
          urlTarget,
          color,
          eventName,
          text,
          tooltip,
          disabledTooltip,
          tooltipPlacement,
          ...restProps
        } = button;
        const buttonComponent = (
          <Button
            className={style.iconButton}
            icon={
              icon && typeof icon === "string" && <LegacyIcon type={icon} />
            }
            onClick={() => {
              handleClick(eventName, button);
            }}
            style={{ color: color }}
            type={buttonType}
            shape={buttonShape}
            size={buttonSize}
            {...restProps}
          >
            {icon && typeof icon === "object" && <GeneralIcon icon={icon} />}
            {text}
          </Button>
        );

        const child =
          buttonUrl || buttonHref ? (
            <Link href={buttonHref} to={buttonUrl} target={urlTarget}>
              {buttonComponent}
            </Link>
          ) : (
            buttonComponent
          );

        return (
          <Tooltip
            title={restProps.disabled ? disabledTooltip : tooltip}
            placement={tooltipPlacement}
            key={eventName}
          >
            {child}
          </Tooltip>
        );
      });
    let dropdown: React.ReactNode;
    const dropdownButtons = propsButtons.filter((btn) => btn.isDropdown);
    if (!isEmpty(dropdownButtons)) {
      const menu = (
        <Menu onClick={this.handleMenuClick}>
          {dropdownButtons.map((button, idx) => {
            if (button.isDivider) {
              return <Menu.Divider key={idx} />;
            }

            const wrapIcon = (
              <span className={style.dropdownBtnIconContainer}>
                {button.icon &&
                  (typeof button.icon === "string" ? (
                    <LegacyIcon type={button.icon} className={style.menuIcon} />
                  ) : (
                    <GeneralIcon icon={button.icon} />
                  ))}
                {button.text}
              </span>
            );
            const text =
              button.buttonUrl || button.buttonHref ? (
                <Link
                  href={button.buttonHref}
                  to={button.buttonUrl}
                  target={button.urlTarget}
                  disabled={button.disabled}
                >
                  {wrapIcon}
                </Link>
              ) : (
                wrapIcon
              );
            const tooltip = (
              <Tooltip
                title={
                  button.disabled ? button.disabledTooltip : button.tooltip
                }
                placement={button.tooltipPlacement}
              >
                {text}
              </Tooltip>
            );
            return (
              <Menu.Item
                className={classNames({
                  [style.disabledMenuItem]: button.disabled,
                })}
                key={button.eventName}
                style={{ color: button.disabled ? "" : button.color }}
                disabled={button.disabled}
                data-button={button}
              >
                {tooltip}
              </Menu.Item>
            );
          })}
        </Menu>
      );
      dropdown = (
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement={dropdownPlacement ?? "bottomRight"}
        >
          {isMoreButton ? (
            <Button
              icon={
                moreBtnIcon &&
                typeof moreBtnIcon === "string" && (
                  <LegacyIcon type={moreBtnIcon} />
                )
              }
              className={classNames(
                style.moreButton,
                {
                  [style.noShapeButton]: moreButtonShape === "no",
                },
                {
                  [style.circleShapeButton]: moreButtonShape === "circle",
                },
                {
                  [style.moreIconButton]: moreButtonShape === "icon",
                }
              )}
            >
              {moreBtnIcon && typeof moreBtnIcon === "object" && (
                <GeneralIcon icon={moreBtnIcon} />
              )}
              {!moreBtnIcon && <EllipsisOutlined />}
            </Button>
          ) : (
            <Button
              className={style.dropdownBtnContainer}
              icon={
                dropdownBtnIcon && typeof dropdownBtnIcon === "string" ? (
                  <LegacyIcon type={dropdownBtnIcon} />
                ) : dropdownBtnIcon &&
                  typeof dropdownBtnIcon === "object" ? null : (
                  <SettingOutlined />
                )
              }
            >
              {dropdownBtnIcon && typeof dropdownBtnIcon === "object" && (
                <GeneralIcon icon={dropdownBtnIcon} />
              )}
              {dropdownBtnText || "管理"} <DownOutlined />
            </Button>
          )}
        </Dropdown>
      );
    }

    return (
      <div
        className={style.customButtonsContainer}
        style={{ justifyContent: alignment ?? "center" }}
      >
        {buttons}
        {dropdown}
      </div>
    );
  }
}
