import React from "react";
import type React from "react";

export enum OpenDirection {
  LeftTop = "leftTop",
  LeftBottom = "leftBottom",
  RightTop = "rightTop",
  RightBottom = "rightBottom",
  Center = "center",
}

export interface GeneralPopupProps {
  popupId?: string;
  popupWidth?: React.CSSProperties["width"];
  popupHeight?: React.CSSProperties["height"];
  popupTitle?: string;
  openDirection?: OpenDirection;
  isVisible?: boolean;
  dragHeaderStyle?: Record<string, any>;
  dragWrapperStyle?: Record<string, any>;
  resize?: boolean;
}

export declare class GeneralPopupElement extends HTMLElement {
  popupId: string | undefined;
  popupWidth: React.CSSProperties["width"] | undefined;
  popupHeight: React.CSSProperties["height"] | undefined;
  popupTitle: string | undefined;
  openDirection: OpenDirection | undefined;
  isVisible: boolean | undefined;
  dragHeaderStyle: Record<string, any> | undefined;
  dragWrapperStyle: Record<string, any> | undefined;
  resize: boolean | undefined;
  open(): void;
  close(): void;
}
