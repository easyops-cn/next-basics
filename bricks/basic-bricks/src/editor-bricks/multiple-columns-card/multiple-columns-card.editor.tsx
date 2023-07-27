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
import { castArray } from "lodash";
import styles from "./multiple-columns-card.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface MultipleColumnsCardProperties {
  gridColumns: Array<string | number>;
}

export function MultipleColumnsCardEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<MultipleColumnsCardProperties>({ nodeUid });

  const { gridColumns } = node.$$parsedProperties;

  const columns =
    castArray(gridColumns).reduce((str, value) => {
      if (typeof value === "string") {
        str += `${value} `;
      } else if (typeof value === "number") {
        str += `${value}fr `;
      }
      return str;
    }, "") || "1fr";

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div>
        <SlotContainer
          nodeUid={nodeUid}
          slotName="content"
          showOutlineIfEmpty
          dropZoneBodyStyle={{ display: "grid", gridTemplateColumns: columns }}
          slotContainerStyle={{ padding: "20px" }}
          slotContentLayout={EditorSlotContentLayout.GRID}
        />
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.multiple-columns-card--editor",
  EditorElementFactory(MultipleColumnsCardEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
