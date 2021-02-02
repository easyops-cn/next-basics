import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";

import styles from "./brick-quick-entries.editor.module.css";

interface BrickQuickEntriesProperties {
  column?: number;
  row?: number;
}

export function BrickQuickEntriesEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickQuickEntriesProperties>({ nodeUid });
  let { column, row } = node.$$parsedProperties;
  if (typeof column !== "number") {
    column = 1;
  }
  if (typeof row !== "number") {
    row = 1;
  }
  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div className={styles.card}>
        {range(0, row).map((r) => (
          <div
            key={r}
            className={styles.row}
            style={{
              gridTemplateColumns: `repeat(${column}, 1fr)`,
            }}
          >
            {range(0, column).map((c) => (
              <div key={c} className={styles.cell}>
                <div className={styles.icon}></div>
                <div className={styles.text}></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-quick-entries--editor",
  EditorElementFactory(BrickQuickEntriesEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
