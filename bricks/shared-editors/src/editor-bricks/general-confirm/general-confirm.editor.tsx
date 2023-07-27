import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./general-confirm.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ModalConfirmProperties {}

export function GeneralConfirmEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<ModalConfirmProperties>({ nodeUid });

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.confirmContainer}>
        <div className={styles.content}>
          <span className={styles.icon}></span>
          <div className={styles.text}>
            <div className={styles.title}></div>
            {range(0, 2).map((_, index) => (
              <div key={index} className={styles.cell}></div>
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <span className={styles.confirmBtn}></span>
          <span className={styles.cancelBtn}></span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-confirm--editor",
  EditorElementFactory(GeneralConfirmEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
