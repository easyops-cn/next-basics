import { BuiltinAction, ActionOptions } from "./interfaces";
import { chain } from "lodash";
import i18next from "i18next";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

export function getOptionTitle(handler: string): string {
  return handler.split(".")[0];
}

export function getActionOptions(
  actions: BuiltinAction[],
  recommendedIds: string[]
): ActionOptions[] {
  const recommendActions = {
    label: i18next.t(`${NS_NEXT_BUILDER}:${K.RECOMMENDED_ACTIONS}`),
    options: actions.filter((item) => recommendedIds?.includes(item.value)),
  };

  const restActions = chain(
    actions.filter((item) => !recommendedIds?.includes(item.value))
  )
    .groupBy((item) => getOptionTitle(item.value))
    .map((values, key) => ({ label: key, options: values }))
    .value();

  return [recommendActions, ...restActions];
}
