import React from "react";
import type React from "react";

export interface CostTimeProps {
  cost?: number;
  startTime?: string | number;
  endTime?: string | number;
  unitStyle?: React.CSSProperties;
  dataSource?: any;
  fields?: {
    cost?: string;
    startTime?: string;
    endTime?: string;
  };
}

export declare class CostTimeElement extends HTMLElement {
  cost: number | undefined;
  startTime: string | number | undefined;
  endTime: string | number | undefined;
  unitStyle: React.CSSProperties | undefined;
  dataSource: any | undefined;
  fields:
    | {
        cost?: string;
        startTime?: string;
        endTime?: string;
      }
    | undefined;
}
