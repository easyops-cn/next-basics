import { createContext } from "react";
export enum viewTypeEnum {
  DAY_GRID_MONTH = "dayGridMonth",
  DAY_GRID_WEEK = "dayGridWeek",
  CUSTOM_DAY = "customDay",
}
export const customDayViewContext = createContext({
  eventClick: (date: string, e: any) => {
    // handlecustomDay events div click
  },
  setViewType: (type: viewTypeEnum) => {
    //change viewType
  },
});
