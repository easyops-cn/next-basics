import React from "react";
import classNames from "classnames";
import { getRuntime } from "@next-core/brick-kit";
import styles from "./CollapseBar.module.css";
import { ReactComponent as CollapseSvg } from "../../images/collapse.svg";

interface CollapseBarProps {
  collapsed?: boolean;
}

export function CollapseBar(props: CollapseBarProps): React.ReactElement {
  const handleCollapse = (): void => {
    const { menuBar } = getRuntime();
    menuBar.collapse(!menuBar.isCollapsed());
  };

  return (
    <a
      className={classNames(styles.collapseBar, {
        [styles.collapsed]: props.collapsed
      })}
      role="button"
      onClick={handleCollapse}
    >
      <CollapseSvg width={22} height={22} />
    </a>
  );
}
