import type { CSSProperties } from "react";

export enum IconSize {
  Small = "small",
  Middle = "middle",
  Large = "large",
  XLarge = "xlarge",
  Unset = "unset",
}

export interface IllustrationHeader {
  title?: string;
  description?: string;
}

export interface IllustrationFooter {
  text?: string;
  label?: string;
  target?: string;
  url?: string;
}

export type IllustrationMode = "feedback" | "guide";

export interface BrickIllustrationProps {
  name?: string;
  size?: IconSize;
  category?: string;
  header?: IllustrationHeader;
  footer?: IllustrationFooter;
  mode?: IllustrationMode;
  imageStyle?: CSSProperties;
  useNewIllustration?: boolean;
}

export declare class BrickIllustrationElement extends HTMLElement {
  name: string | undefined;
  size: IconSize | undefined;
  category: string | undefined;
  header: IllustrationHeader | undefined;
  footer: IllustrationFooter | undefined;
  mode: IllustrationMode | undefined;
  imageStyle: CSSProperties | undefined;
  useNewIllustration: boolean | undefined;
}
