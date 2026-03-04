import type { CSSProperties } from "react";

export interface GeneralTextProps {
  text?: string;
  fontSize?: CSSProperties["fontSize"];
  fontWeight?: CSSProperties["fontWeight"];
  color?: CSSProperties["color"];
  lineHeight?: CSSProperties["lineHeight"];
  textAlign?: CSSProperties["textAlign"];
  display?: CSSProperties["display"];
  customStyle?: CSSProperties;
}

export declare class GeneralTextElement extends HTMLElement {
  text: string | undefined;
  fontSize: CSSProperties["fontSize"] | undefined;
  fontWeight: CSSProperties["fontWeight"] | undefined;
  color: CSSProperties["color"] | undefined;
  lineHeight: CSSProperties["lineHeight"] | undefined;
  textAlign: CSSProperties["textAlign"] | undefined;
  display: CSSProperties["display"] | undefined;
  customStyle: CSSProperties | undefined;
}
