import React from "react";
import { MenuIcon } from "@next-core/brick-types";
import { Link, GeneralIcon } from "@next-libs/basic-components";
import styles from "./GeneralLabel.module.css";
import { isNil } from "lodash";

interface GeneralLabelProps {
  prefixIcon?: MenuIcon;
  suffixIcon?: MenuIcon;
  text?: string;
  url?: string;
  href?: string;
  handleClick?: () => void;
}

export function GeneralLabel(props: GeneralLabelProps): React.ReactElement {
  const iconNode = (icon: MenuIcon) => {
    return (
      <>
        {icon && (
          <span>
            <GeneralIcon icon={icon} />
          </span>
        )}
      </>
    );
  };

  const labelNode = (
    <span className={styles.labelWrapper} onClick={props.handleClick}>
      {iconNode(props.prefixIcon)}
      {props.text}
      {iconNode(props.suffixIcon)}
    </span>
  );

  const link = (
    <Link to={props.url} href={props.href}>
      {labelNode}
    </Link>
  );

  return (
    <>
      {isNil(props.url) && isNil(props.href) ? <>{labelNode}</> : <>{link}</>}
    </>
  );
}
