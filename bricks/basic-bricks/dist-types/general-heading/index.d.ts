import React from "react";
type headType = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface GeneralHeadingProps {
  text?: string;
  type?: headType;
  customStyle?: React.CSSProperties;
}

export declare class GeneralHeadingElement extends HTMLElement {
  text: string | undefined;
  type: headType | undefined;
  customStyle: React.CSSProperties | undefined;
}
