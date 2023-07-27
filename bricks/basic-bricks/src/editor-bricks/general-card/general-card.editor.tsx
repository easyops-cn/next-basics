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
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

import styles from "./general-card.editor.module.css";

interface GeneralCardProperties {
  cardTitle?: string;
}

export function GeneralCardEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralCardProperties>({ nodeUid });
  const { cardTitle } = node.$$parsedProperties;
  const displayTitle = smartDisplayForEvaluableString(cardTitle, "", "<% … %>");

  return (
    <EditorContainer nodeUid={nodeUid} type={EditorBrickType.CONTAINER}>
      <div className={styles.card}>
        {displayTitle && <div className={styles.cardHead}>{displayTitle}</div>}
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
