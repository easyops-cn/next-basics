import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../../../i18n/constants";
import { WorkFLowValueType } from "../../../interface";

export const conditionValueTypeList = [
  {
    name: i18next.t(`${NS_NEXT_BUILDER}:${K.FIXED_VALUE}`),
    id: WorkFLowValueType.CONST,
  },
  {
    name: i18next.t(`${NS_NEXT_BUILDER}:${K.DYNAMIC_VALUE}`),
    id: WorkFLowValueType.EXPR,
  },
];

export const EXIST_COMPARATOR = "$exists";
