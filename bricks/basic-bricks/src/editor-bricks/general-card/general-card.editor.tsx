import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  SlotContainer,
  EditorBrickType,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";

import styles from "./general-card.editor.module.css";

interface GeneralCardProperties {
  cardTitle?: string;
}

export function GeneralCardEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralCardProperties>({ nodeUid });
  const { cardTitle } = node.$$parsedProperties;

  return (
    <EditorContainer
      nodeUid={nodeUid}
      brick={brick}
      type={EditorBrickType.CONTAINER}
    >
      <div className={styles.card}>
        {cardTitle && <div className={styles.cardHead}>{cardTitle}</div>}
        <div className={styles.cardBody}>
          <SlotContainer nodeUid={nodeUid} slotName="content" />
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-card--editor",
  EditorElementFactory(GeneralCardEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
