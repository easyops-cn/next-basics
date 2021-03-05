import React from "react";
import classNames from "classnames";
import {
  EditorComponentProps,
  EditorContainer,
  EditorElementFactory,
  EditorSelfLayout,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import styles from "./general-slide.editor.module.css";
import { FormItemProps } from "../shared/interface";
import formSharedStyle from "../shared/style/base-form-item.module.css";
import { formCommonFieldDisplay } from "../shared/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface GeneralSlideProperties extends FormItemProps {}

export function GeneralSlideEditor({
  nodeUid,
  brick,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<GeneralSlideProperties>({ nodeUid });

  const { label, required } = node.$$parsedProperties;

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
        <div className={styles.formSlideItem}>
          <div className={styles.slider}></div>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.general-slide--editor",
  EditorElementFactory(GeneralSlideEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
