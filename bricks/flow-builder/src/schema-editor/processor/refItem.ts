import { ProcessRefItemValue } from "../components/ref-item/RefItem";
import i18next from "i18next";
import { K, NS_FLOW_BUILDER } from "../../i18n/constants";

export function processRefItemInitValue(value: string): ProcessRefItemValue {
  return {
    name: value?.split(".")[0],
    field: value?.split(".")[1],
  };
}

export function processRefItemData(value: ProcessRefItemValue = {}): string {
  return `${value.name}.${value.field}`;
}

export function checkRequired(_: unknown, value: string): Promise<void> {
  const processedValue: ProcessRefItemValue = processRefItemInitValue(value);
  if (processedValue.field && processedValue.name) {
    return Promise.resolve();
  } else {
    return Promise.reject(
      new Error(i18next.t(`${NS_FLOW_BUILDER}:${K.REF_VALIDATE_REQUIRED_MSG}`))
    );
  }
}

export function extractRefType(ref = ""): string {
  return ref.split(".")[0];
}
