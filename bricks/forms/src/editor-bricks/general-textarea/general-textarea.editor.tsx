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
import styles from "./general-textarea.editor.module.css";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralTextareaProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralTextareaEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralTextareaProperties>({ nodeUid });
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
            {formCommonFieldDisplay(label)}
          </span>
        </div>
        <div
          className={formSharedStyle.formInputItem}
          style={{ minHeight: 100 }}
        >
          <span className={formSharedStyle.placeholder}>
            {formCommonFieldDisplay(placeholder)}
          </span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-textarea--editor",
  EditorElementFactory(GeneralTextareaEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
