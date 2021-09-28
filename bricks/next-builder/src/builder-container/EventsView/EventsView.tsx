import React from "react";
import { Trans, useTranslation } from "react-i18next";
import {
  useBuilderData,
  useBuilderDataManager,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { getBricksWithEvents } from "./getBricksWithEvents";
import { BrickWithEventsItem } from "./BrickWithEventsItem";
import { SearchComponent } from "../SearchComponent/SearchComponent";
import { filterBricksWithEvents } from "./filterBricksWithEvents";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

import styles from "./EventsView.module.css";
import sharedStyles from "../../shared/scrollbar.module.css";

export function EventsView(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const { nodes } = useBuilderData();
  const bricksWithEvents = getBricksWithEvents(nodes);
  const [q, setQ] = React.useState<string>(null);
  const hoverNodeUid = useHoverNodeUid();
  const manager = useBuilderDataManager();

  const handleSearch = React.useCallback((value: string): void => {
    setQ(value);
  }, []);

  const filteredBricks = React.useMemo(
    () => filterBricksWithEvents(bricksWithEvents, q),
    [bricksWithEvents, q]
  );

  const handleMouseEnter = (uid: number): void => {
    const prevUid = manager.getHoverNodeUid();
    if (prevUid !== uid) {
      manager.setHoverNodeUid(uid);
    }
  };
  const handleMouseLeave = (uid: number): void => {
    const prevUid = manager.getHoverNodeUid();
    if (prevUid === uid) {
      manager.setHoverNodeUid(undefined);
    }
  };

  return (
    <ToolboxPane
      title={t(K.EVENTS)}
      tooltips={
        <>
          <p>
            <Trans t={t} i18nKey={K.EVENTS_VIEW_TIPS_1} />
          </p>
          <p>
            <Trans t={t} i18nKey={K.EVENTS_VIEW_TIPS_2} />
          </p>
        </>
      }
    >
      <SearchComponent
        placeholder={t(K.SEARCH_BRICKS_WITH_EVENTS)}
        onSearch={handleSearch}
      />
      <div
        className={`${styles.eventsWrapper} ${sharedStyles.customScrollbarContainer}`}
      >
        <ul className={styles.brickList}>
          {filteredBricks.map((brick) => (
            <li
              key={brick.node.$$uid}
              data-testid={`brick-with-events-item-${brick.node.$$uid}`}
              onMouseEnter={() => handleMouseEnter(brick.node.$$uid)}
              onMouseLeave={() => handleMouseLeave(brick.node.$$uid)}
            >
              <BrickWithEventsItem
                {...brick}
                hover={brick.node.$$uid === hoverNodeUid}
              />
            </li>
          ))}
        </ul>
      </div>
    </ToolboxPane>
  );
}
