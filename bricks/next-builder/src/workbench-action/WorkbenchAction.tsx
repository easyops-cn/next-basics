import React from "react";
import classNames from "classnames";
import { Tooltip } from "antd";
import type { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon, Link } from "@next-libs/basic-components";

import styles from "./WorkbenchAction.module.css";

export interface WorkbenchActionProps {
  icon: MenuIcon;
  tooltip?: string;
  to?: string;
  active?: boolean;
}

export function WorkbenchAction({
  icon,
  tooltip,
  to,
  active,
}: WorkbenchActionProps): React.ReactElement {
  return (
    <Tooltip title={tooltip} placement="right">
      <Link
        className={classNames(styles.action, { [styles.active]: active })}
        role="button"
        to={to}
        noEmptyHref
      >
        <GeneralIcon icon={icon} size={24} />
      </Link>
    </Tooltip>
  );
}
