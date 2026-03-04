import React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";

export interface ListContainerProps {
  data?: any[];
  useBrick?: UseBrickConf;
  extraContainerStyle?: React.CSSProperties;
  itemKey?: string;
  gap?: string | number;
  containerStyle?: React.CSSProperties;
}

export declare class ListContainerElement extends HTMLElement {
  data: any[] | undefined;
  useBrick: UseBrickConf | undefined;
  extraContainerStyle: React.CSSProperties | undefined;
  itemKey: string | undefined;
  gap: string | number | undefined;
  containerStyle: React.CSSProperties | undefined;
}
