import type { CSSProperties } from "react";
export type AlertType = "success" | "error" | "info" | "warning";

export interface BrickAlertProps {
  message?: string;
  messageStyle?: CSSProperties;
  description?: string;
  type?: AlertType;
  showIcon?: boolean;
  closable?: boolean;
  enableDescSlot?: boolean;
  enableMessageSlot?: boolean;
  enableActionSlot?: boolean;
  localStorageKey?: string;
  stripLocalStorageUrlSuffix?: boolean;
  foldDesc?: boolean;
  foldDescLabel?: string;
  noBorderRadio?: boolean;
  iconSize?: "big" | "small" | "default";
}

export declare class BrickAlertElement extends HTMLElement {
  message: string | undefined;
  messageStyle: CSSProperties | undefined;
  description: string | undefined;
  type: AlertType | undefined;
  showIcon: boolean | undefined;
  closable: boolean | undefined;
  enableDescSlot: boolean | undefined;
  enableMessageSlot: boolean | undefined;
  enableActionSlot: boolean | undefined;
  localStorageKey: string | undefined;
  stripLocalStorageUrlSuffix: boolean | undefined;
  foldDesc: boolean | undefined;
  foldDescLabel: string | undefined;
  noBorderRadio: boolean | undefined;
  iconSize: "big" | "small" | "default" | undefined;
}
