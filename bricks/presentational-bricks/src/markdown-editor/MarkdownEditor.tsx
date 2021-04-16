import React, { forwardRef, useState, useEffect } from "react";
import { Input, Tabs, Button } from "antd";
import { FormItemWrapper, FormItemWrapperProps } from "@next-libs/forms";
import style from "./index.module.css";
import { WrapperFormItem } from "../brick-form/components/wrapper-form-item/WrapperFormItem";
import { MarkdownDisplay } from "../markdown-display/MarkdownDisplay";
import { ObjectStoreApi_putObject } from "@next-sdk/object-store-sdk";
import { forEach } from "lodash";
import { ImageInfo } from "./index";

interface MarkdownEditorProps extends FormItemWrapperProps {
  value: string;
  configProps?: Record<string, any>;
  onChange?: (value: string) => void;
  onUploadImage?: (value: ImageInfo) => void;
  previewContainerStyle?: React.CSSProperties;
  supportUploadImg?: boolean;
  bucketName?: string;
}

export function MarkdownEditorItem(
  props: MarkdownEditorProps,
  ref: any
): React.ReactElement {
  const {
    configProps,
    onChange,
    previewContainerStyle,
    supportUploadImg,
    bucketName,
    onUploadImage,
  } = props;
  const [value, setValue] = useState(props.value || "");

  const triggerChange = (value: string): void => {
    onChange?.(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setValue(e.target.value);
    triggerChange(e.target.value);
  };

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const transformResponseToUrl = (objectName: string): string => {
    return `/next/api/gateway/object_store.object_store.GetObject/api/v1/objectStore/bucket/${props.bucketName}/object/${objectName}`;
  };

  const filesPasted = (e: ClipboardEvent): void => {
    const items = e.clipboardData.items;
    forEach(items, async (item) => {
      const file = item.getAsFile();
      if (file?.type.startsWith("image/")) {
        const realFileName = e.clipboardData.getData("Text") || "image";
        const placeholderText = `{{ ${realFileName} }}`;
        let newValue = value
          ? value.slice(0, e.target.selectionStart) +
            placeholderText +
            value.slice(e.target.selectionEnd)
          : placeholderText;
        setValue(newValue);
        triggerChange(newValue);
        // 上传文件
        try {
          const response = await ObjectStoreApi_putObject(props.bucketName, {
            file: file,
          });

          const url = transformResponseToUrl(response.objectName);
          newValue = newValue.replace(
            placeholderText,
            `![${realFileName}](${url})`
          );

          setValue(newValue);
          triggerChange(newValue);
          onUploadImage({ name: realFileName, url });
        } catch (err) {
          // do nothing
        }
      }
    });
  };

  return (
    <Tabs defaultActiveKey="1" className={style.markdownEditorContainer}>
      <Tabs.TabPane tab="编辑" key="1">
        <Input.TextArea
          ref={ref}
          onChange={handleChange}
          value={value}
          {...(supportUploadImg && bucketName ? { onPaste: filesPasted } : {})}
          {...configProps}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="预览" key="2">
        <div
          className={style.markdownPreviewContainer}
          style={previewContainerStyle}
        >
          <MarkdownDisplay value={value} />
        </div>
      </Tabs.TabPane>
    </Tabs>
  );
}

export const MarkdownEditorItemWrapper = forwardRef(MarkdownEditorItem);

export function MarkdownEditor(props: MarkdownEditorProps): React.ReactElement {
  return (
    <FormItemWrapper {...props}>
      <MarkdownEditorItemWrapper
        value={props.value}
        onChange={props.onChange}
        onUploadImage={props.onUploadImage}
        configProps={props.configProps}
        previewContainerStyle={props.previewContainerStyle}
        supportUploadImg={props.supportUploadImg}
        bucketName={props.bucketName}
      />
    </FormItemWrapper>
  );
}

export const BrickMarkdownEditor = WrapperFormItem(MarkdownEditorItemWrapper);
