import React from "react";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import classNames from "classnames";
import { ClockCircleOutlined } from "@ant-design/icons";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils/getSmartDisplay";
import styles from "./time-range-picker.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface TimeRangePickerProperties {
  required?: boolean;
  label?: string;
}

export function TimeRangePickerEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<TimeRangePickerProperties>({ nodeUid });
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
        <div className={styles.rangePickerItem}>
          <div className={styles.leftPicker}>
            <ClockCircleOutlined />
          </div>
          <span className={styles.union}></span>
          <div className={styles.rightPicker}>
            <ClockCircleOutlined />
          </div>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.time-range-picker--editor",
  EditorElementFactory(TimeRangePickerEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
