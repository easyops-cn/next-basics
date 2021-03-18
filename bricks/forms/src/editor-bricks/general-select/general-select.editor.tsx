import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import styles from "./general-select.editor.module.css";
import { FormItemProps } from "../shared/interface";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralSelectProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralSelectEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralSelectProperties>({ nodeUid });
  const { label, required, placeholder } = node.$$parsedProperties;

  return (
    <EditorContainer nodeUid={nodeUid}>
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
        <div className={formSharedStyle.formInputItem}>
          <span
            className={classNames(formSharedStyle.placeholder)}
            style={{ width: "90%" }}
          >
            {formCommonFieldDisplay(placeholder)}
          </span>
          <span className={styles.arrow}></span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-select--editor",
  EditorElementFactory(GeneralSelectEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
