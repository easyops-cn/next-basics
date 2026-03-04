import React from "react";
import type React from "react";

export interface AppBarWrapperProps {
  isFixed?: boolean;
  displayCenter?: boolean;
  extraAppBarContentStyle?: React.CSSProperties;
}

export declare class AppBarWrapperElement extends HTMLElement {
  isFixed: boolean | undefined;
  displayCenter: boolean | undefined;
  extraAppBarContentStyle: React.CSSProperties | undefined;
}
