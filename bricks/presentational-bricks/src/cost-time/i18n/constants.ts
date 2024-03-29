export const NS_LIBS_DATETIME = "libs-datetime";

export enum K {
  TODAY = "TODAY",
  YESTERDAY = "YESTERDAY",
  FUTURE_AFTER = "FUTURE_AFTER",
  FORMAT_SHORT = "FORMAT_SHORT",
  FORMAT_SHORT_DAY = "FORMAT_SHORT_DAY",
  SECONDS = "SECONDS",
  MILL_SECONDS = "MILL_SECONDS",
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DARS",
  MONTHS = "MONTHS",
  TEN_HOURS_TEN_MINUTES_TEST = "TEN_HOURS_TEN_MINUTES_TEST",
  ONE_TWO_SECONDS = "ONE_TWO_SECONDS",
  OO_TWO_ONE_SECONDS = "OO_TWO_ONE_SECONDS",
}

export type Locale = { [key in K]: string };
