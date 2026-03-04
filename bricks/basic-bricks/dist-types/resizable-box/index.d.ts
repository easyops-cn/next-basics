import React from "react";
import type React from "react";

export type ResizeDirection = "left" | "right" | "top" | "bottom";

export interface ResizableBoxProps {
  resizeDirection?: ResizeDirection;
  storageKey?: string;
  defaultSize?: number;
  minSize?: number;
  resizable?: boolean;
  minSpace?: number;
  boxStyle?: React.CSSProperties;
  boxStyleWhenNotResizing?: React.CSSProperties;
  variant?: "dashboard" | "default";
}

export declare class ResizableBoxElement extends HTMLElement {
  resizeDirection: ResizeDirection | undefined;
  storageKey: string | undefined;
  defaultSize: number | undefined;
  minSize: number | undefined;
  resizable: boolean | undefined;
  minSpace: number | undefined;
  boxStyle: React.CSSProperties | undefined;
  boxStyleWhenNotResizing: React.CSSProperties | undefined;
  variant: "dashboard" | "default" | undefined;
}
