import React from "react";

import styles from "./ToolboxPane.module.css";

interface ToolboxPaneProps {
  title: string;
}

export function ToolboxPane({
  title,
  children,
}: React.PropsWithChildren<ToolboxPaneProps>): React.ReactElement {
  return (
    <div className={styles.toolboxPane}>
      <div className={styles.toolboxPaneHeading}>
        <div className={styles.toolboxPaneTitle}>{title}</div>
      </div>
      <div className={styles.toolboxPaneBody}>{children}</div>
    </div>
  );
}
