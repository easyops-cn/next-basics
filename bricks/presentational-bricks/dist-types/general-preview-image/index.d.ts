export interface GeneralPreviewImageProps {
  height?: string | number;
  width?: string | number;
  src?: string;
  srcList?: string[];
  alt?: string;
  fallback?: string;
  canPreview?: boolean;
  customOperationPosition?: boolean;
  previewCurrentIndex?: number;
}

export declare class GeneralPreviewImageElement extends HTMLElement {
  height: string | number | undefined;
  width: string | number | undefined;
  src: string | undefined;
  srcList: string[] | undefined;
  alt: string | undefined;
  fallback: string | undefined;
  canPreview: boolean | undefined;
  customOperationPosition: boolean | undefined;
  previewCurrentIndex: number | undefined;
}
