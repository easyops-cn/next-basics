import React from "react";
import { PictureOutlined } from "@ant-design/icons";
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
import styles from "./upload-img.editor.module.css";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface UploadImgProperties extends FormItemProps {}

export function UploadImgEditor({
  nodeUid,
}: EditorComponentProps): React.ReactElement {
  const node = useBuilderNode<UploadImgProperties>({ nodeUid });
  const { label, required } = node.$$parsedProperties;
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
            {label}
          </span>
        </div>
        <div className={styles.formImageItem}>
          <span className={styles.icon}>
            <PictureOutlined />
          </span>
        </div>
      </div>
    </EditorContainer>
  );
}

customElements.define(
  "forms.upload-img--editor",
  EditorElementFactory(UploadImgEditor, {
    selfLayout: EditorSelfLayout.INLINE,
  })
);
