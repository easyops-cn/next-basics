import React from "react";
import classNames from "classnames";
import { MenuIcon } from "@next-core/brick-types";
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

declare const ButtonTypes: [
  "default",
  "primary",
  "ghost",
  "dashed",
  "link",
  "text",
  "icon"
];
declare type ButtonType = typeof ButtonTypes[number];

interface AdminButtonProps {
  buttons: CustomButton[];
  handleClick: (eventName: string, button: CustomButton) => void;
  dropdownBtnText?: string;
  dropdownBtnIcon?: MenuIcon | string;
  isMoreButton?: boolean;
  moreBtnIcon?: MenuIcon | string;
  moreButtonShape?: "circle" | "rectangle" | "no" | "icon";
  moreButtonType?: ButtonType;
  alignment?: "start" | "center" | "end" | "stretch";
  dropdownPlacement?: DropdownPlacement;
  dropdownBtnType?: "default" | "link";
  onDropdownVisibleChange: (visible: boolean) => void;
}

const AvailableButtonTypeSet = new Set([
  "primary",
  "ghost",
  "dashed",
  "link",
  "text",
  "default",
  "danger",
]);

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

  onDropdownVisibleChange = (visible: boolean) => {
    this.props.onDropdownVisibleChange(visible);
  };

  render() {
    const {
      buttons: buttonConfigs,
      handleClick,
      dropdownPlacement,
      isMoreButton,
      moreButtonShape,
      moreBtnIcon,
      moreButtonType,
      dropdownBtnIcon,
      dropdownBtnText,
      alignment,
      dropdownBtnType,
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
          disabled,
          disabledTooltip,
          tooltipPlacement,
          danger,
          testId,
          ...restProps
        } = button;
        const buttonComponent = (
          <Button
            className={classNames({
              [style.iconButton]: buttonType === "icon",
            })}
            icon={
              icon &&
              typeof icon === "string" && (
                <LegacyIcon type={icon} data-icon={icon} />
              )
            }
            onClick={() => {
              handleClick(eventName, button);
            }}
            style={{ color: disabled ? "" : color }}
            type={
              AvailableButtonTypeSet.has(buttonType) ? buttonType : undefined
            }
            shape={buttonShape}
            size={buttonSize}
            disabled={disabled}
            danger={danger}
            data-testid={testId}
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
            title={disabled ? disabledTooltip : tooltip}
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
            const {
              isDivider,
              icon,
              text,
              buttonUrl,
              buttonHref,
              urlTarget,
              disabled,
              disabledTooltip,
              tooltip,
              tooltipPlacement,
              eventName,
              color,
              danger,
              testId,
            } = button;

            if (isDivider) {
              return <Menu.Divider key={idx} />;
            }

            const wrapIcon = (
              <span className={style.dropdownBtnIconContainer}>
                {icon &&
                  (typeof icon === "string" ? (
                    <LegacyIcon
                      type={icon}
                      className={style.menuIcon}
                      data-icon={icon}
                    />
                  ) : (
                    <GeneralIcon icon={icon} />
                  ))}
                {text}
              </span>
            );
            const textNode = (
              <>
                {wrapIcon}
                {(buttonUrl || buttonHref) && (
                  <Link
                    href={buttonHref}
                    to={buttonUrl}
                    target={urlTarget}
                    disabled={disabled}
                    className={style.dropdownBtnLink}
                  ></Link>
                )}
              </>
            );
            const tooltipNode = (
              <Tooltip
                title={disabled ? disabledTooltip : tooltip}
                placement={tooltipPlacement}
              >
                <div
                  className={classNames(style.dropdownBtn, {
                    [style.dropdownBtnNormal]: !disabled,
                  })}
                >
                  {textNode}
                </div>
              </Tooltip>
            );
            return (
              <Menu.Item
                className={style.dropdownMenuItem}
                key={eventName}
                style={{ color: disabled ? "" : color }}
                disabled={disabled}
                danger={disabled ? undefined : danger}
                data-button={button}
                data-testid={testId}
              >
                {tooltipNode}
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
          onVisibleChange={this.onDropdownVisibleChange}
        >
          {isMoreButton ? (
            <Button
              type={moreButtonType}
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
              data-testid="dropdown-trigger"
            >
              {moreBtnIcon && typeof moreBtnIcon === "object" && (
                <GeneralIcon icon={moreBtnIcon} />
              )}
              {!moreBtnIcon && <EllipsisOutlined />}
            </Button>
          ) : dropdownBtnType === "link" ? (
            <Button
              type="link"
              className={style.dropdownBtnContainer}
              data-testid="dropdown-trigger"
            >
              {dropdownBtnText || "管理"}
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
              data-testid="dropdown-trigger"
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
