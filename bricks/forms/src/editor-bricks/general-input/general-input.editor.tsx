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
import { FormItemProps } from "../shared/interface";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralInputProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralInputEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralInputProperties>({ nodeUid });
  const { label, placeholder, required } = node.$$parsedProperties;

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
          <span className={formSharedStyle.placeholder}>
            {formCommonFieldDisplay(placeholder)}
          </span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-input--editor",
  EditorElementFactory(GeneralInputEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
