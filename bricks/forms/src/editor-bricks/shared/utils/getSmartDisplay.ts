import { smartDisplayForEvaluableString } from "@next-core/brick-utils";

export function formCommonFieldDisplay(field: string) {
  return smartDisplayForEvaluableString(field, "", "<% … %>");
}
