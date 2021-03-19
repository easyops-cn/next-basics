import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  SlotContainer,
  EditorSlotContentLayout,
} from "@next-core/editor-bricks-helper";
import styles from "./general-modal.editor.module.css";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

interface GeneralModalProperties {
  modalTitle?: string;
  okText?: string;
  cancelText?: string;
}

export function GeneralModalEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralModalProperties>({ nodeUid });
  const {
    modalTitle,
    okText = "确认",
    cancelText = "取消",
  } = node.$$parsedProperties;
  const displayTitle = smartDisplayForEvaluableString(
    modalTitle,
    "",
    "<% … %>"
  );

  const displayOk = smartDisplayForEvaluableString(okText, "", "<% … %>");
  const displayCancel = smartDisplayForEvaluableString(
    cancelText,
    "",
    "<% … %>"
  );

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.modal}>
        <div className={styles.header}>
          {displayTitle && <div className={styles.title}>{displayTitle}</div>}
        </div>

        <div className={styles.modalBody}>
          <SlotContainer
            nodeUid={nodeUid}
            slotName="content"
            slotContentLayout={EditorSlotContentLayout.BLOCK}
          />
        </div>

        <div className={styles.footer}>
          <div className={styles.cancelBtn}>{displayCancel}</div>
          <div className={styles.okBtn}>{displayOk}</div>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-modal--editor",
  EditorElementFactory(GeneralModalEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
