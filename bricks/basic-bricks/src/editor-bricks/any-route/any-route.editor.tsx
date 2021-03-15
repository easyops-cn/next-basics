import React from "react";
import { BranchesOutlined } from "@ant-design/icons";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./any-route.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface AppRouteProperties {
  // someProps?: string;
}

export function AnyRouteEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<AppRouteProperties>({ nodeUid });
  /**
   * 提示：使用构件的属性配置来呈现该构件的关键 UI 特征。
   * 例如：对于按钮构件，根据 `buttonType` 来显示对应的背景色。
   */
  // const { someProps } = node.$$parsedProperties;
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.wrapper}>
        <div className={styles.icon}>
          <BranchesOutlined />
        </div>
        <div className={styles.name}>{node.alias}</div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.any-route--editor",
  EditorElementFactory(AnyRouteEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
