import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
  EditorBrickType,
} from "@next-core/editor-bricks-helper";
import styles from "./side-bar.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface SideBarProperties {
  // someProps?: string;
}

export function SideBarEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<SideBarProperties>({ nodeUid });
  /**
   * 提示：使用构件的属性配置来呈现该构件的关键 UI 特征。
   * 例如：对于按钮构件，根据 `buttonType` 来显示对应的背景色。
   */
  // const { someProps } = node.$$parsedProperties;
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
      <div className={styles.wrapper}>
        <div className={styles.appName}>{node.alias}</div>
        {Array(5)
          .fill(1)
          .map((_, index) => (
            <div className={styles.sibarItem} key={index} />
          ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "frame-bricks.side-bar--editor",
  EditorElementFactory(SideBarEditor, {
    brickStyle: {
      height: "100%",
      minHeight: "100%",
    },
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
