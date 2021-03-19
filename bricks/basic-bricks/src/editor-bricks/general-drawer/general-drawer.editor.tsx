import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  SlotContainer,
  EditorBrickType,
  EditorSlotContentLayout,
} from "@next-core/editor-bricks-helper";
import styles from "./general-drawer.editor.module.css";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralDrawerProperties {
  customTitle: string;
}

export function GeneralDrawerEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralDrawerProperties>({ nodeUid });

  const { customTitle } = node.$$parsedProperties;
  const displayTitle = smartDisplayForEvaluableString(
    customTitle,
    "",
    "<% … %>"
  );

  return (
    <EditorContainer nodeUid={nodeUid} type={EditorBrickType.CONTAINER}>
      <div className={styles.drawer}>
        <div className={styles.headerContainer}>
          {displayTitle && <div className={styles.title}>{displayTitle}</div>}
          {!displayTitle && (
            <div className={styles.leftHeaderSlot}>
              <SlotContainer
                nodeUid={nodeUid}
                slotName="headerLeft"
                slotContainerStyle={{ flex: 1 }}
                slotContentLayout={EditorSlotContentLayout.INLINE}
              />
            </div>
          )}
          <div className={styles.rightHeaderSlot}>
            <SlotContainer
              nodeUid={nodeUid}
              slotName="headerRight"
              slotContainerStyle={{ flex: 1 }}
              slotContentLayout={EditorSlotContentLayout.INLINE}
              dropZoneBodyStyle={{ justifyContent: "flex-end" }}
            />
          </div>
        </div>
        <div className={styles.contentSlot}>
          <SlotContainer
            nodeUid={nodeUid}
            slotName="content"
            slotContainerStyle={{ height: "100%" }}
            slotContentLayout={EditorSlotContentLayout.BLOCK}
            dropZoneStyle={{ height: "100%" }}
          />
        </div>
        <div className={styles.footerSlot}>
          <SlotContainer
            nodeUid={nodeUid}
            slotName="footer"
            slotContentLayout={EditorSlotContentLayout.INLINE}
            slotContainerStyle={{ flex: 1 }}
          />
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-drawer--editor",
  EditorElementFactory(GeneralDrawerEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
