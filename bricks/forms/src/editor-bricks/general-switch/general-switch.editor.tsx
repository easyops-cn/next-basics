import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import formSharedStyle from "../shared//style/base-form-item.module.css";
import styles from "./general-switch.editor.module.css";
import { FormItemProps } from "../shared/interface";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralSwitchProperties extends FormItemProps {}

export function GeneralSwitchEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralSwitchProperties>({ nodeUid });

  const { required, label } = node.$$parsedProperties;

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
        <div className={styles.formSwitchItem}>
          <div className={styles.switch}></div>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-switch--editor",
  EditorElementFactory(GeneralSwitchEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
