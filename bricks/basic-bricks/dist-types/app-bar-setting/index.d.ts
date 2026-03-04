import React from "react";
import type React from "react";

export interface AppBarSettingProps {
  usernameStyle?: React.CSSProperties;
  dropdownIconStyle?: React.CSSProperties;
}

export declare class AppBarSettingElement extends HTMLElement {
  usernameStyle: React.CSSProperties | undefined;
  dropdownIconStyle: React.CSSProperties | undefined;
}
