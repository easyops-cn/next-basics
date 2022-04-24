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
  gap?: number;
  isFirst?: boolean;
  isLast?: boolean;
}

export function WorkbenchMiniActionBar({
  data,
  className,
  gap,
  isFirst,
  isLast,
}: WorkbenchSubActionBarProps): React.ReactElement {
  const { actions, actionsHidden } = useWorkbenchActionsContext();
  const enabledActions = useMemo(
    () => actions?.filter((item) => looseCheckIfByTransform(item, data)),
    [actions, data]
  );

  if (actionsHidden || !enabledActions?.length) {
    return null;
  }

  return (
    <div className={classNames(styles.actionsBar, className)} style={{ gap }}>
      {enabledActions.map((item) => (
        <WorkbenchSubAction
          key={item.action}
          action={item}
          data={data}
          isFirst={isFirst}
          isLast={isLast}
        />
      ))}
    </div>
  );
}

interface WorkbenchSubActionProps {
  action: WorkbenchTreeAction;
  data?: unknown;
  isFirst?: boolean;
  isLast?: boolean;
}

function WorkbenchSubAction({
  action,
  data,
  isFirst,
  isLast,
}: WorkbenchSubActionProps): React.ReactElement {
  const { onActionClick } = useWorkbenchActionsContext();

  const disabled =
    (isFirst && action.action === "move-up") ||
    (isLast && action.action === "move-down");

  const handleActionClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      event.stopPropagation();
      disabled ||
        onActionClick?.({
          action: action.action,
          data: data,
        });
    },
    [action.action, data, disabled, onActionClick]
  );

  const preventMouseEvent = useCallback((event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  return (
    <a
      className={classNames(styles.action, { [styles.disabled]: disabled })}
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
