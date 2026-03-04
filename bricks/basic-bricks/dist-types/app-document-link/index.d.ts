import React from "react";
import type React from "react";

export interface AppBarDocumentLinkProps {
  iconStyle?: React.CSSProperties;
  buttonStyle?: React.CSSProperties;
  isInNavbar?: boolean;
}

export declare class AppBarDocumentLinkElement extends HTMLElement {
  iconStyle: React.CSSProperties | undefined;
  buttonStyle: React.CSSProperties | undefined;
  isInNavbar: boolean | undefined;
}
