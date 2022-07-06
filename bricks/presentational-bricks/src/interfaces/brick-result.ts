import { CSSProperties } from "react";

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
}
