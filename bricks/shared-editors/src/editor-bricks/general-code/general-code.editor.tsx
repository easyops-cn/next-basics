import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./general-code.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ModalConfirmProperties {}

export function GeneralCodeEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<ModalConfirmProperties>({ nodeUid });

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.codeContainer}>
        <div className={styles.leftView}></div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-code--editor",
  EditorElementFactory(GeneralCodeEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
