import React from "react";
import classNames from "classnames";
import type { MenuIcon } from "@next-core/brick-types";
import { GeneralIcon } from "@next-libs/basic-components";
import styles from "./WorkbenchAction.module.css";

export interface WorkbenchActionProps {
  icon: MenuIcon;
  active?: boolean;
}

export function WorkbenchAction({
  icon,
  active,
}: WorkbenchActionProps): React.ReactElement {
  return (
    <a
      className={classNames(styles.action, { [styles.active]: active })}
      role="button"
    >
      <GeneralIcon icon={icon} size={24} />
    </a>
  );
}
