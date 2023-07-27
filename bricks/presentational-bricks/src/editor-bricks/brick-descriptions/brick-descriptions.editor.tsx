import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { range } from "lodash";
import styles from "./brick-descriptions.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrickDescriptionsProperties {
  column: number;
}

export function BrickDescriptionsEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickDescriptionsProperties>({ nodeUid });
  const { column = 3 } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.descriptionContainer}>
        <div className={styles.title}></div>
        <div
          className={styles.content}
          style={{ gridTemplateColumns: `repeat(${column}, 1fr)` }}
        >
          {range(0, column * 2).map((_, index) => (
            <div key={index} className={styles.item} />
          ))}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-descriptions--editor",
  EditorElementFactory(BrickDescriptionsEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
