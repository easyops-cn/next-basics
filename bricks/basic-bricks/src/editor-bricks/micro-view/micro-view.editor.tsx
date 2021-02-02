import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  SlotContainer,
  EditorBrickType,
  EditorSelfLayout,
  EditorSlotContentLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";

import styles from "./micro-view.editor.module.css";

interface MicroViewProperties {
  pageTitle?: string;
}

export function MicroViewEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<MicroViewProperties>({ nodeUid });
  const { pageTitle } = node.$$parsedProperties;

  return (
    <EditorContainer
      nodeUid={nodeUid}
      brick={brick}
      type={EditorBrickType.TRANSPARENT_CONTAINER}
      editorContainerStyle={{
        height: "100%",
        minHeight: "100%",
      }}
      editorBodyStyle={{
        height: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={styles.microViewHeader}>
        {pageTitle ? (
          <div className={styles.pageTitle}>{pageTitle}</div>
        ) : (
          <div className={`${styles.pageTitle} ${styles.untitled}`}>
            Untitled Page
          </div>
        )}
        <SlotContainer
          nodeUid={nodeUid}
          slotName="toolbar"
          slotContainerStyle={{ minWidth: "var(--editor-brick-inline-width)" }}
          slotContentLayout={EditorSlotContentLayout.INLINE}
        />
      </div>
      <SlotContainer
        nodeUid={nodeUid}
        slotName="content"
        slotContainerStyle={{ flex: 1 }}
        dropZoneStyle={{ height: "100%", minHeight: "100%" }}
      />
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.micro-view--editor",
  EditorElementFactory(MicroViewEditor, {
    brickStyle: {
      height: "100%",
      minHeight: "100%",
    },
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);

customElements.define(
  "basic-bricks.micro-app--editor",
  EditorElementFactory(MicroViewEditor, {
    brickStyle: {
      height: "100%",
      minHeight: "100%",
    },
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
