import React from "react";
import classNames from "classnames";
import { range } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { FormItemProps } from "../shared/interface";
import styles from "./general-checkbox.editor.module.css";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralCheckboxProperties extends FormItemProps {}

export function GeneralCheckboxEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralCheckboxProperties>({ nodeUid });

  const { required, label } = node.$$parsedProperties;

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
        <div className={styles.formCheckboxItem}>
          {range(0, 3).map((optionIndex) => (
            <span className={styles.option} key={optionIndex} />
          ))}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-checkbox--editor",
  EditorElementFactory(GeneralCheckboxEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
