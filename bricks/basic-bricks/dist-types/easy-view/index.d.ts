import React from "react";
import type React from "react";

export interface EasyViewProps {
  gridAreas?: Record<string, (string | number)[]>;
  gridTemplateAreas?: string[][];
  gridTemplateColumns?: string | string[];
  gridTemplateRows?: string | string[];
  containerStyle?: React.CSSProperties;
  styleByAreas?: Record<string, React.CSSProperties>;
}

export declare class EasyViewElement extends HTMLElement {
  gridAreas: Record<string, (string | number)[]> | undefined;
  gridTemplateAreas: string[][] | undefined;
  gridTemplateColumns: string | string[] | undefined;
  gridTemplateRows: string | string[] | undefined;
  containerStyle: React.CSSProperties | undefined;
  styleByAreas: Record<string, React.CSSProperties> | undefined;
}
