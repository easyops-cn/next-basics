// istanbul ignore file: working in progress
import React, { useCallback, useMemo } from "react";
import classNames from "classnames";
import { looseCheckIfByTransform } from "@next-core/brick-kit";
import { GeneralIcon } from "@next-libs/basic-components";
import { WorkbenchTreeAction } from "./interfaces";
import { useWorkbenchActionsContext } from "./WorkbenchActionsContext";

import styles from "./WorkbenchMiniActionBar.module.css";

export interface WorkbenchSubActionBarProps {
  data?: unknown;
  className?: string;
}

export function WorkbenchMiniActionBar({
  data,
  className,
}: WorkbenchSubActionBarProps): React.ReactElement {
  const { actions } = useWorkbenchActionsContext();
  const enabledActions = useMemo(
    () => actions?.filter((item) => looseCheckIfByTransform(item, data)),
    [actions, data]
  );

  if (!enabledActions?.length) {
    return null;
  }

  return (
    <div className={classNames(styles.actionsBar, className)}>
      {enabledActions.map((item) => (
        <WorkbenchSubAction key={item.action} action={item} data={data} />
      ))}
    </div>
  );
}

interface WorkbenchSubActionProps {
  action: WorkbenchTreeAction;
  data?: unknown;
}

function WorkbenchSubAction({
  action,
  data,
}: WorkbenchSubActionProps): React.ReactElement {
  const { onActionClick } = useWorkbenchActionsContext();

  const handleActionClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      onActionClick?.({
        action: action.action,
        data: data,
      });
    },
    [action.action, data, onActionClick]
  );

  const preventMouseEvent = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <a
      className={styles.action}
      key={action.action}
      title={action.title}
      role="button"
      onClick={handleActionClick}
      onContextMenu={preventMouseEvent}
      onMouseDown={preventMouseEvent}
    >
      <GeneralIcon icon={action.icon} />
    </a>
  );
}
