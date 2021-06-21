import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  SlotContainer,
} from "@next-core/editor-bricks-helper";
import styles from "./general-form-item.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralFormItemProperties {}

export function GeneralFormItemEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralFormItemProperties>({ nodeUid });

  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.itemContainer}>
        <SlotContainer
          nodeUid={nodeUid}
          slotName="control"
          showOutlineIfEmpty
        />
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-form-item--editor",
  EditorElementFactory(GeneralFormItemEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
