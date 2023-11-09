import React from "react";
import { MenuIcon } from "@next-core/brick-types";
import cssStyle from "./BasicIcon.module.css";
import { GeneralIcon } from "@next-libs/basic-components";
import classNames from "classnames";

export type ImgIcon = {
  imgSrc?: string;
  imgStyle?: React.CSSProperties;
};

export interface BasicIconProps {
  icon?: MenuIcon | ImgIcon;
  size?: string;
  renderBg?: boolean;
  showWhenHover?: boolean;
  iconStyle?: React.CSSProperties;
  bg?: string;
  bgSize?: string;
  bgBorderRadius?: string;
  itemClick?: () => void;
}

export function BasicIcon(props: BasicIconProps): React.ReactElement {
  const {
    icon,
    size = "24px",
    renderBg,
    bgSize = "46px",
    bg = "var(--theme-gray-color)",
    bgBorderRadius = "50%",
    iconStyle,
    showWhenHover,
    itemClick,
  } = props;

  return icon ? (
    icon.imgSrc ? (
      <img
        src={icon.imgSrc}
        height={size}
        width={size}
        style={icon.imgStyle}
        className={classNames({ [cssStyle.iconControl]: showWhenHover })}
        onClick={itemClick}
      />
    ) : (
      <div
        style={{ fontSize: size, lineHeight: size, width: "min-content" }}
        className={classNames({ [cssStyle.iconControl]: showWhenHover })}
        onClick={itemClick}
      >
        {renderBg ? (
          <div
            style={{
              height: bgSize,
              width: bgSize,
              background: bg,
              borderRadius: bgBorderRadius,
            }}
            className={cssStyle.iconWrapper}
          >
            <GeneralIcon style={iconStyle} icon={icon} />
          </div>
        ) : (
          <GeneralIcon style={iconStyle} icon={icon} />
        )}
      </div>
    )
  ) : (
    <></>
  );
}
