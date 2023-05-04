import { ProcessRefItemValue } from "../components/ref-item/RefItem";
import i18next from "i18next";
import { SchemaItemProperty, ModelDefinition } from "../interfaces";
import { K, NS_FLOW_BUILDER } from "../../i18n/constants";

export function processRefItemInitValue(value?: string): ProcessRefItemValue {
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

export function flattenRefField(
  field: SchemaItemProperty,
  importModelDefinition: ModelDefinition[],
  result: SchemaItemProperty[]
): void {
  const [modelName, refField] = field.ref.split(".");

  const find = importModelDefinition?.find((item) => item.name === modelName);

  if (find) {
    if (refField === "*") {
      flattenFields(find.fields, importModelDefinition, result);
    } else {
      const fieldData = find.fields.find((item) => item.name === refField);

      if (fieldData.ref) {
        flattenRefField(fieldData, importModelDefinition, result);
      } else if (fieldData) {
        result.push(fieldData);
      }
    }
  }
}

export function flattenFields(
  fields: SchemaItemProperty[],
  importModelDefinition: ModelDefinition[],
  result: SchemaItemProperty[]
): void {
  fields?.forEach((field) => {
    if (field.ref) {
      flattenRefField(field, importModelDefinition, result);
    } else {
      result.push(field);
    }
  });
}

export function getFlattenFields(
  fields: SchemaItemProperty[],
  importModelDefinition: ModelDefinition[]
): SchemaItemProperty[] {
  const result: SchemaItemProperty[] = [];
  flattenFields(fields, importModelDefinition, result);

  return result;
}
