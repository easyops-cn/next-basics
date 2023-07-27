import React from "react";
import { TextIcon } from "./interfaces";

export interface WorkbenchTextIconProps {
  icon: TextIcon;
}

import styles from "./WorkbenchTextIcon.module.css";

export function WorkbenchTextIcon({
  icon,
}: WorkbenchTextIconProps): React.ReactElement {
  return (
    <span className={styles.textIcon} style={{ color: icon.color }}>
      {icon.icon}
    </span>
  );
}
