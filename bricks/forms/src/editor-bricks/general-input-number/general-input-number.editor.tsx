import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { FormItemProps } from "../shared/interface";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import styles from "./general-input-number.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralInputNumberProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralInputNumberEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralInputNumberProperties>({ nodeUid });
  const { label, placeholder, required } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid} brick={brick}>
      <div className={formSharedStyle.formItemWrapper}>
        <div
          className={classNames(formSharedStyle.labelContainer, {
            [formSharedStyle.requireMark]: required,
          })}
        >
          <span
            className={classNames({ [formSharedStyle.formLabel]: !!label })}
          >
            {label}
          </span>
        </div>
        <div
          className={formSharedStyle.formInputItem}
          style={{ flex: "0 0 90px", position: "relative" }}
        >
          <span className={formSharedStyle.placeholder}>{placeholder}</span>
          <span className={styles.stepMark}></span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-input-number--editor",
  EditorElementFactory(GeneralInputNumberEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
