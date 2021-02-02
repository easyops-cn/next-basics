import React from "react";
import classNames from "classnames";
import { CalendarOutlined } from "@ant-design/icons";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { FormItemProps } from "../shared/interface";
import styles from "./general-date-picker.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralDatePickerProperties extends FormItemProps {
  placeholder?: string;
}

export function GeneralDatePickerEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralDatePickerProperties>({ nodeUid });
  const { label, required, placeholder } = node.$$parsedProperties;

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
          style={{ flex: "0 0 200px" }}
        >
          <span className={formSharedStyle.placeholder}>{placeholder}</span>
          <span className={styles.suffixIcon}>
            <CalendarOutlined />
          </span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-date-picker--editor",
  EditorElementFactory(GeneralDatePickerEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
