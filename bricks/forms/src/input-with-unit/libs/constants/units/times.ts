import { Unit } from "./interface";
import { NS_FORMS, K } from "../../../../i18n/constants";
import i18n from "i18next";
export const times: Unit[] = [
  {
    id: "ms",
    divisor: 1,
    display: i18n.t(`${NS_FORMS}:${K.MILLSECOND}`),
  },
  {
    id: "s",
    divisor: 1000,
    display: i18n.t(`${NS_FORMS}:${K.SECOND}`),
  },
  {
    id: "min",
    divisor: 1000 * 60,
    display: i18n.t(`${NS_FORMS}:${K.MINUTE}`),
  },
  {
    id: "hour",
    divisor: 1000 * 60 * 60,
    display: i18n.t(`${NS_FORMS}:${K.HOUR}`),
  },
  {
    id: "day",
    divisor: 1000 * 60 * 60 * 24,
    display: i18n.t(`${NS_FORMS}:${K.DAY}`),
  },
  {
    id: "week",
    divisor: 1000 * 60 * 60 * 24 * 7,
    display: i18n.t(`${NS_FORMS}:${K.WEEK}`),
  },
];
