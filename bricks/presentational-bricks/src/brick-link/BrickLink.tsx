import React from "react";
import { Tooltip } from "antd";
import { Link, LinkProps, GeneralIcon } from "@next-libs/basic-components";
import cssStyle from "./style.module.css";
import { isEmpty } from "lodash";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";

export interface BrickLinkProps extends Pick<LinkProps, "replace" | "target"> {
  native?: boolean;
  label?: string;
  url?: string;
  href?: string;
  disabled?: boolean;
  tooltip?: string;
  tooltipProps?: Record<string, any>;
  handleClick?: () => void;
  notToJumpWhenEmpty?: boolean;
  icon?: MenuIcon;
  type?: "link" | "text";
  iconAlign?: "left" | "right";
  hideExternalIcon?: boolean;
  underLine?: boolean;
  labelColor?: string;
}

export function BrickLink(props: BrickLinkProps): React.ReactElement {
  const {
    native = false,
    label,
    url,
    href,
    tooltip,
    tooltipProps,
    type,
    iconAlign = "left",
    ...linkProps
  } = props;
  if (native) {
    // eslint-disable-next-line no-console
    console.warn(
      "presentational-bricks.brick-link `native` is deprecated, Please use `href` instead"
    );
  }

  const icon = props.icon ? (
    <GeneralIcon
      icon={props.icon}
      style={{
        ...(props.disabled && { color: "var(--color-disabled-text)" }),
        ...(label
          ? iconAlign === "left"
            ? { marginRight: 6 }
            : { marginLeft: 6 }
          : {}),
      }}
    />
  ) : null;

  let link;
  const labelEle = (
    <span
      className={props.underLine ? cssStyle.underLine : null}
      style={{
        borderBottomColor: props.labelColor,
        ...(props.labelColor ? { color: props.labelColor } : {}),
      }}
    >
      {label}
    </span>
  );
  const linkContent =
    iconAlign === "left" ? (
      <>
        {icon}
        {labelEle}
      </>
    ) : (
      <>
        {labelEle}
        {icon}
      </>
    );

  if (props.disabled) {
    link = <span className={cssStyle.disabledLink}>{linkContent}</span>;
  } else {
    const commonProps = {
      onClick: props.handleClick,
      className: classNames({
        [cssStyle.textLink]: type === "text",
      }),
    };
    if (props.notToJumpWhenEmpty && isEmpty(url)) {
      link = <a {...commonProps}>{linkContent}</a>;
    } else {
      link = native ? (
        <a href={url} {...linkProps} {...commonProps}>
          {linkContent}
        </a>
      ) : (
        <Link to={url} href={href} {...linkProps} {...commonProps}>
          {linkContent}
        </Link>
      );
    }

    if (props.target === "_blank" && !props.hideExternalIcon) {
      link = (
        <span>
          {link}
          <span className={cssStyle.externalIcon}>
            <GeneralIcon icon={{ lib: "fa", icon: "external-link-alt" }} />
          </span>
        </span>
      );
    }
  }

  return tooltip ? (
    <Tooltip {...tooltipProps} title={tooltip}>
      {link}
    </Tooltip>
  ) : (
    link
  );
}
