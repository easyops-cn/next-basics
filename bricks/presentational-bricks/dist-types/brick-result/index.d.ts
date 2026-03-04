import type React from "react";

export enum BrickResultStatus {
  Success = "success",
  Error = "error",
  Info = "info",
  Warning = "warning",
  E404 = "404",
  E403 = "403",
  E500 = "500",
}

export enum EmptyResultStatus {
  BrowserTooOld = "browser-too-old",
  Empty = "empty",
  NoData = "no-data",
  NoHistoryVersion = "no-history-version",
  NoVisitRecord = "no-visit-record",
  SearchEmpty = "search-empty",
  WelcomeToCreate = "welcome-to-create",
}

export type IllustrationsStatus = "illustrations";

export interface IllustrationsConfig {
  imageStyle?: CSSProperties;
  name?: string;
  category?: string;
  size?: IconSize;
}

export enum IconSize {
  Small = "small",
  Middle = "middle",
  Large = "large",
  XLarge = "xlarge",
  Unset = "unset",
}

export interface BrickResultProps {
  status?: BrickResultStatus | EmptyResultStatus | IllustrationsStatus;
  customTitle?: string;
  subTitle?: string;
  icon?: string;
  illustrationsConfig?: IllustrationsConfig;
  useNewIllustration?: boolean;
  emptyResultSize?: IconSize;
}

export declare class BrickResultElement extends HTMLElement {
  status:
    | BrickResultStatus
    | EmptyResultStatus
    | IllustrationsStatus
    | undefined;
  customTitle: string | undefined;
  subTitle: string | undefined;
  icon: string | undefined;
  illustrationsConfig: IllustrationsConfig | undefined;
  useNewIllustration: boolean | undefined;
  emptyResultSize: IconSize | undefined;
}
