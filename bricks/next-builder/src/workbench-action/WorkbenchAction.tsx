import React from "react";
import classNames from "classnames";
import type { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon, Link } from "@next-libs/basic-components";

import styles from "./WorkbenchAction.module.css";

export interface WorkbenchActionProps {
  icon: MenuIcon;
  to?: string;
  active?: boolean;
}

export function WorkbenchAction({
  icon,
  to,
  active,
}: WorkbenchActionProps): React.ReactElement {
  return (
    <Link
      className={classNames(styles.action, { [styles.active]: active })}
      role="button"
      to={to}
    >
      <GeneralIcon icon={icon} size={24} />
    </Link>
  );
}
