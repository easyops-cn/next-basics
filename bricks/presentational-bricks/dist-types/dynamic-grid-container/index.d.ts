import React from "react";
import type { UseBrickConf } from "@next-core/brick-types";
import type React from "react";

export interface DynamicGridContainerProps {
  useBrick?: UseBrickConf;
  data?: any[];
  containerStyle?: React.CSSProperties;
}

export interface DynamicGridContainerEvents {
  "dynamic-grid-container.rendered": CustomEvent<void>;
}

export interface DynamicGridContainerEventsMap {
  onDynamicGridContainerRendered: "dynamic-grid-container.rendered";
}

export declare class DynamicGridContainerElement extends HTMLElement {
  useBrick: UseBrickConf | undefined;
  data: any[] | undefined;
  containerStyle: React.CSSProperties | undefined;
}
