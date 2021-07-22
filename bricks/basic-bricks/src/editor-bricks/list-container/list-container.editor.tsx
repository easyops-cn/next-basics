import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./list-container.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ListContainerProperties {
  // someProps?: string;
}

export function ListContainerEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<ListContainerProperties>({ nodeUid });
  /**
   * 提示：使用构件的属性配置来呈现该构件的关键 UI 特征。
   * 例如：对于按钮构件，根据 `buttonType` 来显示对应的背景色。
   */
  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.listContainer}>
        {range(0, 3).map((_, index) => (
          <div key={index} className={styles.content}></div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.list-container--editor",
  EditorElementFactory(ListContainerEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
