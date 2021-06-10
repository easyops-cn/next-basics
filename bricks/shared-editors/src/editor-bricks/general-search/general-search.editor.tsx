import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./general-search.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralSearchProperties {
  placeholder?: string;
}

export function GeneralSearchEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralSearchProperties>({ nodeUid });
  const { placeholder } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={styles.searchContainer}>
        <div className={styles.placeholder}>
          {smartDisplayForEvaluableString(placeholder, "", "<% … %>")}
        </div>
        <SearchOutlined className={styles.searchIcon} />
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "shared-editors.general-search--editor",
  EditorElementFactory(GeneralSearchEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
