import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";
import styles from "./page-title.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PageTitleProperties {
  pageTitle?: string;
}

export function PageTitleEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<PageTitleProperties>({ nodeUid });
  const { pageTitle } = node.$$parsedProperties;
  const displayPageTitle = smartDisplayForEvaluableString(
    pageTitle,
    "",
    "<% … %>"
  );
  return (
    <EditorContainer nodeUid={nodeUid}>
      {displayPageTitle ? (
        <div className={styles.pageTitle}>{displayPageTitle}</div>
      ) : (
        <div className={`${styles.pageTitle} ${styles.untitled}`}>
          Untitled Page
        </div>
      )}
    </EditorContainer>
  );
}

customElements.define(
  "basic-bricks.page-title--editor",
  EditorElementFactory(PageTitleEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
