import React, { useState } from "react";
import classNames from "classnames";
import { MenuIcon } from "@next-core/brick-types";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { DownOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Tooltip } from "antd";
import { MenuInfo } from "rc-menu/lib/interface";
import { isEmpty } from "lodash";
import { CustomButton, DropdownPlacement } from "./index";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import { useTranslation } from "react-i18next";
import { NS_BASIC_BRICKS, K } from "../i18n/constants";
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
  useButtonDataSource?: boolean;
  moreBtnIcon?: MenuIcon | string;
  moreButtonShape?: "circle" | "rectangle" | "no" | "icon";
  moreButtonType?: ButtonType;
  alignment?: "start" | "center" | "end" | "stretch";
  dropdownPlacement?: DropdownPlacement;
  dropdownBtnType?: "default" | "link";
  onDropdownVisibleChange: (visible: boolean) => void;
  moreButtonStyle?: React.CSSProperties;
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

export function GeneralCustomButtons(
  props: AdminButtonProps
): React.ReactElement {
  const { t } = useTranslation(NS_BASIC_BRICKS);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMenuClick = (info: MenuInfo): void => {
    props.handleClick(
      info.key as string,
      (info.item as React.Component<any>).props["data-button"]
    );
  };

  const onDropdownVisibleChange = (visible: boolean): void => {
    setDropdownVisible(visible);
    props.onDropdownVisibleChange(visible);
  };

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
    moreButtonStyle,
  } = props;
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
            icon && typeof icon === "string" ? (
              <LegacyIcon type={icon} data-icon={icon} />
            ) : (
              icon && typeof icon === "object" && <GeneralIcon icon={icon} />
            )
          }
          onClick={() => {
            handleClick(eventName, button);
          }}
          style={{ color: disabled ? "" : color }}
          // @ts-ignore
          type={AvailableButtonTypeSet.has(buttonType) ? buttonType : undefined}
          shape={buttonShape}
          size={buttonSize}
          disabled={disabled}
          danger={danger}
          data-testid={testId}
          {...restProps}
        >
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
      <Menu onClick={handleMenuClick}>
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
        onVisibleChange={onDropdownVisibleChange}
      >
        {isMoreButton ? (
          <Button
            // @ts-ignore
            type={moreButtonType}
            style={{ ...moreButtonStyle }}
            icon={
              moreBtnIcon && typeof moreBtnIcon === "string" ? (
                <LegacyIcon type={moreBtnIcon} />
              ) : moreBtnIcon && typeof moreBtnIcon === "object" ? (
                <GeneralIcon icon={moreBtnIcon} />
              ) : (
                <GeneralIcon
                  icon={{
                    lib: "easyops",
                    category: "default",
                    icon: "more",
                  }}
                />
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
              },
              {
                [style.dropdown]: dropdownVisible,
              }
            )}
            data-testid="dropdown-trigger"
          ></Button>
        ) : dropdownBtnType === "link" ? (
          <Button
            type="link"
            className={style.dropdownBtnContainer}
            data-testid="dropdown-trigger"
          >
            {dropdownBtnText || t(K.MANAGE)}
          </Button>
        ) : (
          <Button
            className={style.dropdownBtnContainer}
            icon={
              dropdownBtnIcon && typeof dropdownBtnIcon === "string" ? (
                <LegacyIcon type={dropdownBtnIcon} />
              ) : dropdownBtnIcon && typeof dropdownBtnIcon === "object" ? (
                <GeneralIcon icon={dropdownBtnIcon} />
              ) : (
                <SettingOutlined />
              )
            }
            data-testid="dropdown-trigger"
          >
            {dropdownBtnText || t(K.MANAGE)} <DownOutlined />
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
