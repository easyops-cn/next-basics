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
import styles from "./brick-alert.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrickAlertProperties {
  showIcon?: boolean;
  description?: string;
  enableMessageSlot?: boolean;
  enableDescSlot?: boolean;
  enableActionSlot: boolean;
}

export function BrickAlertEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickAlertProperties>({ nodeUid });
  const {
    showIcon,
    enableMessageSlot,
    enableDescSlot,
    enableActionSlot,
    description,
  } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.alertContainer}>
        {showIcon && <span className={styles.icon}></span>}

        <div className={styles.content}>
          <div className={styles.title}>
            {enableMessageSlot ? (
              <SlotContainer
                nodeUid={nodeUid}
                slotName="message"
                slotContainerStyle={{ flex: 2 }}
                showOutlineIfEmpty
              />
            ) : (
              <div className={styles.message} />
            )}
            {enableActionSlot && (
              <SlotContainer
                nodeUid={nodeUid}
                slotName="action"
                slotContentLayout={EditorSlotContentLayout.INLINE}
                slotContainerStyle={{ flex: 1 }}
                showOutlineIfEmpty
              />
            )}
          </div>
          {enableDescSlot ? (
            <SlotContainer
              nodeUid={nodeUid}
              slotName="description"
              showOutlineIfEmpty
            />
          ) : (
            description && <div className={styles.description} />
          )}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-alert--editor",
  EditorElementFactory(BrickAlertEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
