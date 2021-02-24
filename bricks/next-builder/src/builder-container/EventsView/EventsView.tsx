import React from "react";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { getBricksWithEvents } from "./getBricksWithEvents";
import { BrickWithEventsItem } from "./BrickWithEventsItem";

import styles from "./EventsView.module.css";

export function EventsView(): React.ReactElement {
  const { nodes } = useBuilderData();
  const bricksWithEvents = getBricksWithEvents(nodes);

  return (
    <ToolboxPane title="Events View">
      <div className={styles.eventsView}>
        <div className={styles.eventsWrapper}>
          <ul className={styles.brickList}>
            {bricksWithEvents.map((brick) => (
              <li key={brick.node.$$uid}>
                <BrickWithEventsItem {...brick} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ToolboxPane>
  );
}
