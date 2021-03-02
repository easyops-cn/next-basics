import React from "react";
import { useBuilderData } from "@next-core/editor-bricks-helper";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { getBricksWithEvents } from "./getBricksWithEvents";
import { BrickWithEventsItem } from "./BrickWithEventsItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { filterBricksWithEvents } from "./filterBricksWithEvents";

import styles from "./EventsView.module.css";

export function EventsView(): React.ReactElement {
  const { nodes } = useBuilderData();
  const bricksWithEvents = getBricksWithEvents(nodes);
  const [q, setQ] = React.useState<string>(null);

  const handleSearch = React.useCallback((value: string): void => {
    setQ(value);
  }, []);

  const filteredBricks = React.useMemo(
    () => filterBricksWithEvents(bricksWithEvents, q),
    [bricksWithEvents, q]
  );

  return (
    <ToolboxPane title="Events View">
      <SearchComponent
        placeholder="Search bricks with events"
        onSearch={handleSearch}
      />
      <div className={styles.eventsWrapper}>
        <ul className={styles.brickList}>
          {filteredBricks.map((brick) => (
            <li key={brick.node.$$uid}>
              <BrickWithEventsItem {...brick} />
            </li>
          ))}
        </ul>
      </div>
    </ToolboxPane>
  );
}
