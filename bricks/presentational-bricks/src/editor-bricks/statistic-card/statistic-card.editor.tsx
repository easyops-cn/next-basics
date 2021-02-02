import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";

import styles from "./statistic-card.editor.module.css";

interface StatisticCardProperties {
  cardTitle?: string;
  value?: string;
}

export function StatisticCardEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<StatisticCardProperties>({ nodeUid });
  const { cardTitle, value } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div className={styles.card}>
        <div className={styles.description}>
          <div className={styles.value}>
            {value || <div className={styles.valuePlaceholder}></div>}
          </div>
          <div className={styles.title}>
            {cardTitle || <div className={styles.titlePlaceholder}></div>}
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
