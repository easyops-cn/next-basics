import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

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
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralButtonProperties>({ nodeUid });
  const { buttonName, buttonType } = node.$$parsedProperties;
  const displayName = smartDisplayForEvaluableString(
    buttonName,
    node.alias,
    node.alias
  );

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div
        className={classNames(styles.button, {
          [styles.primary]: buttonType === GeneralButtonType.PRIMARY,
        })}
      >
        <div className={styles.buttonName}>{displayName}</div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.general-button--editor",
  EditorElementFactory(GeneralButtonEditor)
);
