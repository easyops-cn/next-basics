import type React from "react";

export type DigitalNumberType = "default" | "custom";

export interface DigitalNumberProps {
  decimals?: number;
  decimal?: string;
  cellStyle?: CSSProperties;
  textStyle?: CSSProperties;
  easeSpeed?: number;
  delaySpeed?: number;
  maxLen?: number;
  value?: number;
  type?: DigitalNumberType;
  height?: number;
  width?: number;
  thousands?: boolean;
}

export declare class DigitalNumberElement extends HTMLElement {
  decimals: number | undefined;
  decimal: string | undefined;
  cellStyle: CSSProperties | undefined;
  textStyle: CSSProperties | undefined;
  easeSpeed: number | undefined;
  delaySpeed: number | undefined;
  maxLen: number | undefined;
  value: number | undefined;
  type: DigitalNumberType | undefined;
  height: number | undefined;
  width: number | undefined;
  thousands: boolean | undefined;
}
