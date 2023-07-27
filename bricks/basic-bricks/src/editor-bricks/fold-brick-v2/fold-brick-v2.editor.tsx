import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  SlotContainer,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./fold-brick-v2.editor.module.css";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface FoldBrickV2Properties {
  // someProps?: string;
  foldName?: string;
}

export function FoldBrickV2Editor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<FoldBrickV2Properties>({ nodeUid });
  const { foldName } = node.$$parsedProperties;
  const displayName = smartDisplayForEvaluableString(
    foldName,
    node.alias,
    node.alias
  );
  /**
   * 提示：使用构件的属性配置来呈现该构件的关键 UI 特征。
   * 例如：对于按钮构件，根据 `buttonType` 来显示对应的背景色。
   */
  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.wrapper}>{displayName}</div>
      <div className={styles.content}>
        <SlotContainer nodeUid={nodeUid} slotName="content" />
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.fold-brick-v2--editor",
  EditorElementFactory(FoldBrickV2Editor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
