import React from "react";
import type React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import { ImageProps } from "rc-image";

export interface GeneralImageProps extends ImageProps {
  dataSource?: Record<string, any>;
  imgStyle?: React.CSSProperties;
  extra?: {
    useBrick: UseBrickConf;
  };
  extraContainerStyle?: React.CSSProperties;
  visible?: boolean;
  onVisibleChange?(visible: boolean, prevVisible: boolean): void;
}

export interface GeneralImageProps {
  imgSrc?: string;
  preview?: boolean;
  imgHeight?: string | number;
  imgStyle?: React.CSSProperties;
  imgWidth?: string | number;
  dataSource?: GeneralImageProps["dataSource"];
  placeholder?: string;
  imgAlt?: string;
  fallback?: string;
  extra?: GeneralImageProps["extra"];
  extraContainerStyle?: React.CSSProperties;
  visible?: boolean;
}

export interface GeneralImageEvents {
  "general-image.visible-change": CustomEvent<void>;
}

export interface GeneralImageEventsMap {
  onGeneralImageVisibleChange: "general-image.visible-change";
}

export declare class GeneralImageElement extends HTMLElement {
  imgSrc: string | undefined;
  preview: boolean | undefined;
  imgHeight: string | number | undefined;
  imgStyle: React.CSSProperties | undefined;
  imgWidth: string | number | undefined;
  dataSource: GeneralImageProps["dataSource"] | undefined;
  placeholder: string | undefined;
  imgAlt: string | undefined;
  fallback: string | undefined;
  extra: GeneralImageProps["extra"] | undefined;
  extraContainerStyle: React.CSSProperties | undefined;
  visible: boolean | undefined;
  open(): void;
  close(): void;
}
