import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import classNames from "classnames";
import styles from "./input-with-unit.editor.module.css";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils/getSmartDisplay";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface InputWithUnitProperties {
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export function InputWithUnitEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<InputWithUnitProperties>({ nodeUid });

  const { placeholder, label, required } = node.$$parsedProperties;
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
        <div className={styles.unitFormItem}>
          <div className={styles.input}>
            <div className={classNames(styles.placeholder, styles.stepMark)}>
              <span>{formCommonFieldDisplay(placeholder)}</span>
            </div>
          </div>
          <div className={styles.unit}></div>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.input-with-unit--editor",
  EditorElementFactory(InputWithUnitEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
