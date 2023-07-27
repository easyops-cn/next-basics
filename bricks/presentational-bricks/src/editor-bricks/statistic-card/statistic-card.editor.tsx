import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

import styles from "./statistic-card.editor.module.css";

interface StatisticCardProperties {
  cardTitle?: string;
  value?: string;
}

export function StatisticCardEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<StatisticCardProperties>({ nodeUid });
  const { cardTitle, value } = node.$$parsedProperties;
  const displayTitle = smartDisplayForEvaluableString(cardTitle, "", "<% … %>");
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.value}>
            {value || <div className={styles.valuePlaceholder}></div>}
          </div>
          <div className={styles.title}>
            {displayTitle || <div className={styles.titlePlaceholder}></div>}
          </div>
        </div>
        <div className={styles.icon}></div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.statistic-card--editor",
  EditorElementFactory(StatisticCardEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
