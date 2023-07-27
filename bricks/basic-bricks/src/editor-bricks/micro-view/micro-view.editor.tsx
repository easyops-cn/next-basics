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
  useBuilderNodeMountPoints,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

import styles from "./micro-view.editor.module.css";

interface MicroViewProperties {
  pageTitle?: string;
}

const majorSlots = new Set(["titleBar", "toolbar", "content"]);

export function MicroViewEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<MicroViewProperties>({ nodeUid });
  const mountPoints = useBuilderNodeMountPoints({ nodeUid });

  const { pageTitle } = node.$$parsedProperties;
  const displayPageTitle = smartDisplayForEvaluableString(
    pageTitle,
    "",
    "<% … %>"
  );

  const hasTitleBar = mountPoints.includes("titleBar");
  const minorSlots = mountPoints.filter(
    (mountPoint) => !majorSlots.has(mountPoint)
  );

  return (
    <EditorContainer
      nodeUid={nodeUid}
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
      {minorSlots.length > 0 && (
        <div className={styles.minorSlots}>
          {minorSlots.map((slotName) => (
            <SlotContainer
              key={slotName}
              nodeUid={nodeUid}
              slotName={slotName}
            />
          ))}
        </div>
      )}
      <div className={styles.microViewHeader}>
        {hasTitleBar ? (
          <SlotContainer
            nodeUid={nodeUid}
            slotName="titleBar"
            slotContainerStyle={{
              flex: 1,
            }}
            slotContentLayout={EditorSlotContentLayout.INLINE}
          />
        ) : displayPageTitle ? (
          <div className={styles.pageTitle}>{displayPageTitle}</div>
        ) : (
          <div className={`${styles.pageTitle} ${styles.untitled}`}>
            Untitled Page
          </div>
        )}
        <SlotContainer
          nodeUid={nodeUid}
          slotName="toolbar"
          slotContainerStyle={{
            flex: 2,
          }}
          slotContentLayout={EditorSlotContentLayout.INLINE}
          dropZoneBodyStyle={{ justifyContent: "flex-end" }}
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
