import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { BricksWithEvents } from "./getBricksWithEvents";

import styles from "./BrickWithEventsItem.module.css";
import { useBuilderUIContext } from "../BuilderUIContext";

export function BrickWithEventsItem({
  node,
  hasEvents,
  isTargetOfEvents,
}: BricksWithEvents): React.ReactElement {
  const {
    eventStreamActiveNodeUid,
    setEventStreamActiveNodeUid,
  } = useBuilderUIContext();
  const handleNodeClick = React.useCallback(() => {
    setEventStreamActiveNodeUid(node.$$uid);
  }, [node, setEventStreamActiveNodeUid]);

  return (
    <a
      className={classNames(styles.brickWithEventsItem, {
        [styles.active]: eventStreamActiveNodeUid === node.$$uid,
      })}
      role="button"
      onClick={handleNodeClick}
    >
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
    </a>
  );
}
