import React from "react";
import { Tooltip } from "antd";
import { Link, LinkProps, GeneralIcon } from "@next-libs/basic-components";
import cssStyle from "./style.module.css";
import { isEmpty } from "lodash";
import { MenuIcon } from "@next-core/brick-types";

export interface BrickLinkProps extends Pick<LinkProps, "replace" | "target"> {
  native?: boolean;
  label?: string;
  url?: string;
  href?: string;
  disabled?: boolean;
  tooltip?: string;
  handleClick?: () => void;
  notToJumpWhenEmpty?: boolean;
  icon?: MenuIcon;
}

export function BrickLink(props: BrickLinkProps): React.ReactElement {
  const { native = false, label, url, href, tooltip, ...linkProps } = props;
  if (native) {
    // eslint-disable-next-line no-console
    console.warn(
      "presentational-bricks.brick-link `native` is deprecated, Please use `href` instead"
    );
  }

  const icon = props.icon ? (
    <GeneralIcon icon={props.icon} style={{ marginRight: 6 }} />
  ) : null;

  let link;

  if (props.disabled) {
    link = (
      <span className={cssStyle.disabledLink}>
        {icon}
        {label}
      </span>
    );
  } else {
    if (props.notToJumpWhenEmpty && isEmpty(url)) {
      link = (
        <a onClick={props.handleClick}>
          {icon}
          {label}
        </a>
      );
    } else {
      link = native ? (
        <a href={url} {...linkProps} onClick={props.handleClick}>
          {icon}
          {label}
        </a>
      ) : (
        <Link to={url} href={href} {...linkProps} onClick={props.handleClick}>
          {icon}
          {label}
        </Link>
      );
    }

    if (props.target === "_blank") {
      link = (
        <>
          {link}
          <span className={cssStyle.externalIcon}>
            <GeneralIcon icon={{ lib: "fa", icon: "external-link-alt" }} />
          </span>
        </>
      );
    }
  }

  return tooltip ? <Tooltip title={tooltip}>{link}</Tooltip> : link;
}
