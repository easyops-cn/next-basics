import { BuiltinAction, ActionOPtions } from "./interfaces";
import { chain } from "lodash";

export function getOptionTitle(handler: string): string {
  return handler.split(".")[0];
}

export function getActionOptions(actions: BuiltinAction[]): ActionOPtions[] {
  return chain(actions)
    .groupBy((item) => getOptionTitle(item.value))
    .map((values, key) => ({ label: key, options: values }))
    .value();
}
