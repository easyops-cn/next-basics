import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { BrickWithEvents } from "./getBricksWithEvents";

import styles from "./BrickWithEventsItem.module.css";
import { useBuilderUIContext } from "../BuilderUIContext";

export function BrickWithEventsItem({
  node,
  hasEvents,
  isTargetOfEvents,
  hover,
}: BrickWithEvents & { hover?: boolean }): React.ReactElement {
  const { eventStreamNodeId, setEventStreamNodeId } = useBuilderUIContext();
  const handleNodeClick = React.useCallback(() => {
    setEventStreamNodeId(eventStreamNodeId === node.id ? null : node.id);
  }, [node, setEventStreamNodeId, eventStreamNodeId]);

  return (
    <a
      className={classNames(styles.brickWithEventsItem, {
        [styles.active]: eventStreamNodeId === node.id,
        [styles.nodeHover]: hover,
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
