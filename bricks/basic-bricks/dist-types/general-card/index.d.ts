import type React from "react";
import type { CardProps } from "antd/lib/card";
import type { OperationButton } from "../interfaces/index.js";

export interface GeneralCardProps {
  cardTitle?: string;
  fillVertical?: boolean;
  verticalCenter?: boolean;
  compactMode?: boolean;
  hasExtraSlot?: boolean;
  hasFooter?: boolean;
  isFixedFooter?: boolean;
  operationButtons?: OperationButton[];
  configProps?: CardProps;
  cardContentWrapperStyle?: React.CSSProperties;
}

export declare class GeneralCardElement extends HTMLElement {
  cardTitle: string | undefined;
  fillVertical: boolean | undefined;
  verticalCenter: boolean | undefined;
  compactMode: boolean | undefined;
  hasExtraSlot: boolean | undefined;
  hasFooter: boolean | undefined;
  isFixedFooter: boolean | undefined;
  operationButtons: OperationButton[] | undefined;
  configProps: CardProps | undefined;
  cardContentWrapperStyle: React.CSSProperties | undefined;
}
