export interface CheckboxInfo {
  id: string;
  checked: boolean;
}

export interface MarkdownDisplayProps {
  value?: string;
  dataSource?: Record<string, any>;
  fields?: {
    value?: string;
  };
  imagePreview?: boolean;
  hideImgPreviewMask?: boolean;
  imagePreviewOperationInBottom?: boolean;
  linkTarget?: string;
  enableCodeCopy?: boolean;
}

export interface MarkdownDisplayEvents {
  "checkbox.change": CustomEvent<CheckboxInfo[]>;
}

export interface MarkdownDisplayEventsMap {
  onCheckboxChange: "checkbox.change";
}

export declare class MarkdownDisplayElement extends HTMLElement {
  value: string | undefined;
  dataSource: Record<string, any> | undefined;
  fields:
    | {
        value?: string;
      }
    | undefined;
  imagePreview: boolean | undefined;
  hideImgPreviewMask: boolean | undefined;
  imagePreviewOperationInBottom: boolean | undefined;
  linkTarget: string | undefined;
  enableCodeCopy: boolean | undefined;
}
