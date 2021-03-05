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
import styles from "./general-radio.editor.module.css";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralRadioProperties extends FormItemProps {
  type: "default" | "button";
}

export function GeneralRadioEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralRadioProperties>({ nodeUid });

  const { label, type = "default", required } = node.$$parsedProperties;

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
        <div className={styles.formRadioItem}>
          {range(0, 3).map((optionIndex) => (
            <span
              className={classNames(
                { [styles.option]: type === "default" },
                { [styles.buttonOption]: type === "button" }
              )}
              key={optionIndex}
            />
          ))}
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-radio--editor",
  EditorElementFactory(GeneralRadioEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
