import React from "react";
import type React from "react";

export interface LogDisplayProps {
  value?: string;
  loadingIcon?: boolean;
  hasBackspace?: boolean;
  containerStyle?: React.CSSProperties;
}

export declare class LogDisplayElement extends HTMLElement {
  value: string | undefined;
  loadingIcon: boolean | undefined;
  hasBackspace: boolean | undefined;
  containerStyle: React.CSSProperties | undefined;
}
