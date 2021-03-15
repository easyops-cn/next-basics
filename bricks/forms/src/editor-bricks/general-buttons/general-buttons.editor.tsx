import React from "react";
import classNames from "classnames";
import { upperFirst } from "lodash";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { FormItemProps } from "../shared/interface";
import styles from "./general-buttons.editor.module.css";
import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

export type BtnType = "default" | "primary" | "dashed" | "danger" | "link";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralButtonsProperties extends FormItemProps {
  submitText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
}

export function GeneralButtonsEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralButtonsProperties>({ nodeUid });
  const { submitText, cancelText, showCancelButton } = node.$$parsedProperties;
  const displaySubmitText = smartDisplayForEvaluableString(
    submitText,
    "",
    node.alias
  );
  const displayCancelText = smartDisplayForEvaluableString(
    cancelText,
    "",
    node.alias
  );
  return (
    <EditorContainer nodeUid={nodeUid}>
      <div className={formSharedStyle.formItemWrapper}>
        <div className={formSharedStyle.labelContainer}></div>
        <div className={styles.formButtonItem}>
          {
            <div className={classNames(styles.submitBtn)}>
              {displaySubmitText}
            </div>
          }
          {showCancelButton && (
            <div className={styles.cancelBtn}>{displayCancelText}</div>
          )}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-buttons--editor",
  EditorElementFactory(GeneralButtonsEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
