import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";

import styles from "./general-button.editor.module.css";

interface GeneralButtonProperties {
  buttonName?: string;
  buttonType?: GeneralButtonType;
}

enum GeneralButtonType {
  PRIMARY = "primary",
}

export function GeneralButtonEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralButtonProperties>({ nodeUid });
  const { buttonName, buttonType } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div
        className={classNames(styles.button, {
          [styles.primary]: buttonType === GeneralButtonType.PRIMARY,
        })}
      >
        {buttonName || node.alias}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-button--editor",
  EditorElementFactory(GeneralButtonEditor)
);
