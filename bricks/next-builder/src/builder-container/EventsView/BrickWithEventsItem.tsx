import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { BricksWithEvents } from "./getBricksWithEvents";

import styles from "./BrickWithEventsItem.module.css";

export function BrickWithEventsItem({
  node,
  hasEvents,
  isTargetOfEvents,
}: BricksWithEvents): React.ReactElement {
  return (
    <div className={styles.brickWithEventsItem}>
      <span className={styles.nodeAlias}>{node.alias}</span>
      <span className={styles.icons}>
        <span
          className={classNames(styles.icon, {
            [styles.activeIcon]: hasEvents,
          })}
          title={hasEvents ? "Has events" : "Has no events"}
        >
          <FontAwesomeIcon icon="broadcast-tower" />
        </span>
        <span
          className={classNames(styles.icon, {
            [styles.activeIcon]: isTargetOfEvents,
          })}
          title={
            isTargetOfEvents ? "Is target of events" : "Is not target of events"
          }
        >
          <FontAwesomeIcon icon="share" rotation={180} />
        </span>
      </span>
    </div>
  );
}
