import React from "react";
import classNames from "classnames";
import { ClockCircleOutlined } from "@ant-design/icons";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { FormItemProps } from "../shared/interface";
import styles from "./general-time-picker.editor.module.css";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralTimePickerProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralTimePickerEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralTimePickerProperties>({ nodeUid });
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
        <div
          className={formSharedStyle.formInputItem}
          style={{ flex: "0 0 200px" }}
        >
          <span className={formSharedStyle.placeholder}>
            {formCommonFieldDisplay(placeholder)}
          </span>
          <span className={styles.suffixIcon}>
            <ClockCircleOutlined />
          </span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-time-picker--editor",
  EditorElementFactory(GeneralTimePickerEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
