import React from "react";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./general-menu.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ModalConfirmProperties {}

export function GeneralMenuEditor({
  nodeUid,
  editorProps,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<ModalConfirmProperties>({ nodeUid });

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.menuContainer}>
        {editorProps?.showSearch && (
          <div className={styles.search}>
            <SearchOutlined className={styles.searchIcon} />
          </div>
        )}
        <div className={styles.title}></div>
        {range(0, 3).map((_, index) => (
          <div key={index} className={styles.item}>
            <div className={styles.icon}></div>
            <div className={styles.text}></div>
          </div>
        ))}
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-menu--editor",
  EditorElementFactory(GeneralMenuEditor, {
    selfLayout: EditorSelfLayout.BLOCK,
  })
);
