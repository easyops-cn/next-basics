import React from "react";
import { Icon as LegacyIcon } from "@ant-design/compatible";
import { Button, Tooltip } from "antd";
import { ButtonProps } from "antd/lib/button";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./GeneralButton.module.css";
import { TooltipConfig } from ".";
import classNames from "classnames";

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

interface LegacyGeneralButtonProps {
  buttonName: string;
  buttonType?: ButtonType;
  buttonDanger?: boolean;
  buttonIcon?: string;
  buttonShape?: "circle" | "round";
  buttonSize?: "xs" | "small" | "large";
  buttonProps?: ButtonProps & { icon?: string };
  buttonUrl?: string;
  buttonHref?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  disabledTooltip?: string;
  tooltip?: string;
  tooltipConfig?: TooltipConfig;
  target?: string;
  fadedText?: boolean;
  buttonStyle?: React.CSSProperties;
}

export function GeneralButton({
  buttonName,
  buttonType,
  buttonDanger,
  buttonIcon,
  buttonShape,
  buttonSize,
  buttonProps,
  buttonUrl,
  buttonHref,
  onClick,
  disabled,
  loading,
  disabledTooltip,
  tooltip,
  target,
  tooltipConfig,
  fadedText,
  buttonStyle,
}: LegacyGeneralButtonProps): React.ReactElement {
  if (!buttonIcon && buttonProps?.icon) {
    buttonIcon = buttonProps.icon;
  }
  const { placement, arrowPointAtCenter } = tooltipConfig || {};
  const getButtonNode = () => (
    <Button
      className={classNames(styles.iconButton, {
        [styles.fadedText]: fadedText && buttonType === "text",
      })}
      style={{
        ...(buttonSize == "xs"
          ? { height: "22px", lineHeight: "11px", fontSize: "11px" }
          : null),
        ...buttonStyle,
        ...(disabled
          ? {
              pointerEvents: "none",
            }
          : null),
      }}
      shape={buttonShape}
      size={buttonSize !== "xs" ? buttonSize : null}
      onClick={onClick}
      type={buttonType}
      danger={buttonDanger}
      {...buttonProps}
      icon={
        buttonIcon && typeof buttonIcon === "string" ? (
          <LegacyIcon type={buttonIcon} />
        ) : (
          typeof buttonIcon === "object" && <GeneralIcon icon={buttonIcon} />
        )
      }
      disabled={disabled}
      loading={loading}
      data-testid="button"
    >
      {buttonName}
    </Button>
  );

  return (
    <Tooltip
      title={disabled ? disabledTooltip : tooltip}
      placement={placement}
      arrowPointAtCenter={arrowPointAtCenter}
    >
      {buttonUrl || buttonHref ? (
        <Link
          to={buttonUrl}
          target={target}
          href={buttonHref}
          disabled={disabled}
        >
          {getButtonNode()}
        </Link>
      ) : (
        getButtonNode()
      )}
    </Tooltip>
  );
}
