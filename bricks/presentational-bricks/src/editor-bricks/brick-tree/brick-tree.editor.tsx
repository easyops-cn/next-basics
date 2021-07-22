import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./brick-tree.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrickTreeProperties {
  // someProps?: string;
}

export function BrickTreeEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickTreeProperties>({ nodeUid });

  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.treeContainer}>
        {range(0, 4).map((_, index) => (
          <div key={index} className={styles.item}></div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-tree--editor",
  EditorElementFactory(BrickTreeEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
