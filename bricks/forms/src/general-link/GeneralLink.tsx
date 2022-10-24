import React from "react";
import { Tooltip } from "antd";
import { Link, LinkProps, GeneralIcon } from "@next-libs/basic-components";
import cssStyle from "./style.module.css";
import { isEmpty } from "lodash";
import { MenuIcon } from "@next-core/brick-types";
import classNames from "classnames";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";

export interface GeneralLinkProps
  extends Pick<LinkProps, "replace" | "target">,
    FormItemWrapperProps {
  label?: string;
  value?: string;
  text?: string;
  url?: string;
  href?: string;
  disabled?: boolean;
  tooltip?: string;
  handleClick?: () => void;
  notToJumpWhenEmpty?: boolean;
  icon?: MenuIcon;
  type?: "link" | "text";
  iconAlign?: "left" | "right";
  hideExternalIcon?: boolean;
  underLine?: boolean;
  labelColor?: string;
}

export function GeneralLink(props: GeneralLinkProps): React.ReactElement {
  const {
    text,
    url,
    href,
    tooltip,
    type,
    iconAlign = "left",
    ...linkProps
  } = props;

  const icon = props.icon ? (
    <GeneralIcon
      icon={props.icon}
      style={{
        ...(props.disabled && { color: "var(--color-disabled-text)" }),
        ...(text
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
      {text}
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
      link = (
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
  return (
    <FormItemWrapper {...props}>
      {tooltip ? <Tooltip title={tooltip}>{link}</Tooltip> : link}
    </FormItemWrapper>
  );
}
