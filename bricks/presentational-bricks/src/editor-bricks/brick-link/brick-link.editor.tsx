import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";
import classNames from "classnames";
import styles from "./brick-link.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BrickLinkProperties {
  label: string;
}

export function BrickLinkEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<BrickLinkProperties>({ nodeUid });
  const { label } = node.$$parsedProperties;
  const displayLabel = smartDisplayForEvaluableString(label, "", "<% … %>");
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div
        className={classNames(styles.linkContainer, { [styles.empty]: !label })}
      >
        {label}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "presentational-bricks.brick-link--editor",
  EditorElementFactory(BrickLinkEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
