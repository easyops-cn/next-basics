import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../../../i18n/constants";
import { WorkFLowValueType } from "../../../interface";

export const conditionValueTypeList = [
  {
    label: i18next.t(`${NS_NEXT_BUILDER}:${K.FIXED_VALUE}`),
    value: WorkFLowValueType.CONST,
  },
  {
    label: i18next.t(`${NS_NEXT_BUILDER}:${K.DYNAMIC_VALUE}`),
    value: WorkFLowValueType.EXPR,
  },
];
