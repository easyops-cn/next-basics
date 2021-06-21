import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { PictureFilled } from "@ant-design/icons";
import styles from "./brick-result.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrickResultProperties {
  // someProps?: string;
}

export function BrickResultEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickResultProperties>({ nodeUid });
  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.resultContainer}>
        <div className={styles.icon}>
          <PictureFilled />
        </div>
        <div className={styles.content}></div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-result--editor",
  EditorElementFactory(BrickResultEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
