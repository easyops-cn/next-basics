import React from "react";
import { upperFirst } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  EditorBrickType,
  SlotContainer,
} from "@next-core/editor-bricks-helper";
import className from "classnames";
import styles from "./general-form.editor.module.css";
import formSharedStyle from "../shared/style/base-form-item.module.css";

enum LayoutType {
  Horizontal = "horizontal",
  Vertical = "vertical",
  Inline = "inline",
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralFormProperties {
  layout: LayoutType;
}

export function GeneralFormEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralFormProperties>({ nodeUid });

  const { layout = LayoutType.Horizontal } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid} type={EditorBrickType.CONTAINER}>
      <div
        className={className(
          styles.form,
          formSharedStyle[`formEditor${upperFirst(layout)}`]
        )}
      >
        <SlotContainer
          nodeUid={nodeUid}
          slotName="items"
          dropZoneBodyStyle={
            layout !== LayoutType.Inline ? { gridTemplateColumns: "1fr" } : {}
          }
        />
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-form--editor",
  EditorElementFactory(GeneralFormEditor, {
    selfLayout: EditorSelfLayout.CONTAINER,
  })
);
