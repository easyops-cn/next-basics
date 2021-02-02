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

interface GridLayoutProperties {
  columns?: string;
}

export function GridLayoutEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GridLayoutProperties>({ nodeUid });
  const { columns } = node.$$parsedProperties;

  return (
    <EditorContainer
      nodeUid={nodeUid}
      brick={brick}
      type={EditorBrickType.CONTAINER}
      isTransparentContainer
    >
      <SlotContainer
        nodeUid={nodeUid}
        slotName="items"
        slotContentLayout={EditorSlotContentLayout.GRID}
        showOutlineIfEmpty
        dropZoneBodyStyle={
          typeof columns === "number"
            ? {
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
              }
            : undefined
        }
      />
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.grid-layout--editor",
  EditorElementFactory(GridLayoutEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
