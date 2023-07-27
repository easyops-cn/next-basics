import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./general-tag.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralTagProperties {
  tagList: unknown[];
}

export function BrickTag(): React.ReactElement {
  return <span className={styles.tag}></span>;
}

export function GeneralTagEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralTagProperties>({ nodeUid });

  const { tagList } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.tagContainer}>
        {Array.isArray(tagList) ? (
          tagList.map((item, index) => <BrickTag key={index} />)
        ) : (
          <BrickTag />
        )}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-tag--editor",
  EditorElementFactory(GeneralTagEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
