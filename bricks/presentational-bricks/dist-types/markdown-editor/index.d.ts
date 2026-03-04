import React from "react";
import type React from "react";

export interface ImageInfo {
  name: string;
  url: string;
}

export interface MarkdownEditorProps {
  value?: string;
  supportUploadImg?: boolean;
  imagePreview?: boolean;
  bucketName?: string;
  imgCompressDisabled?: boolean;
  previewContainerStyle?: React.CSSProperties;
  markdownEditorContainerStyle?: React.CSSProperties;
  textareaStyle?: React.CSSProperties;
  dataSource?: Record<string, any>;
  fields?: {
    value?: string;
  };
  inputMinRows?: number;
  inputMaxRows?: number;
}

export interface MarkdownEditorEvents {
  "markdown.value.change": CustomEvent<string>;
  "image.upload": CustomEvent<ImageInfo>;
}

export interface MarkdownEditorEventsMap {
  onMarkdownValueChange: "markdown.value.change";
  onImageUpload: "image.upload";
}

export declare class MarkdownEditorElement extends HTMLElement {
  value: string | undefined;
  supportUploadImg: boolean | undefined;
  imagePreview: boolean | undefined;
  bucketName: string | undefined;
  imgCompressDisabled: boolean | undefined;
  previewContainerStyle: React.CSSProperties | undefined;
  markdownEditorContainerStyle: React.CSSProperties | undefined;
  textareaStyle: React.CSSProperties | undefined;
  dataSource: Record<string, any> | undefined;
  fields:
    | {
        value?: string;
      }
    | undefined;
  inputMinRows: number | undefined;
  inputMaxRows: number | undefined;
}
