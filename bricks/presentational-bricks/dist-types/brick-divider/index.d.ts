import React from "react";
import type React from "react";

export interface BrickDividerProps {
  dividerTitle?: string;
  type?: "horizontal" | "vertical" | "radiation";
  dashed?: boolean;
  dividerStyle?: React.CSSProperties;
  orientation?: "center" | "left" | "right";
  plain?: boolean;
  proportion?: number[];
}

export declare class BrickDividerElement extends HTMLElement {
  dividerTitle: string | undefined;
  type: "horizontal" | "vertical" | "radiation" | undefined;
  dashed: boolean | undefined;
  dividerStyle: React.CSSProperties | undefined;
  orientation: "center" | "left" | "right" | undefined;
  plain: boolean | undefined;
  proportion: number[] | undefined;
}
