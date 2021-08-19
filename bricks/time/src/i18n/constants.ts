export const NS_TIME = "time";

export enum K {
  TIME = "TIME",
  WEEK = "WEEK",
  MONTH = "MONTH",
}

export type Locale = { [key in K]: string };
