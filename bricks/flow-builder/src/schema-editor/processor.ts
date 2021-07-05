import { omit } from "lodash";
import {
  EditorTitleProps,
  SchemaItemProperty,
  AddedSchemaFormItem,
  SchemaRootNodeProperty,
} from "./interfaces";

export function getGridTemplateColumns(titleList: EditorTitleProps[]): string {
  return titleList.map((item) => item.width ?? "1fr").join(" ");
}

export function calcItemPosition(traceId: string): string[] {
  const arr = traceId.split("-");
  const path: string[] = [];

  arr?.forEach((item) => {
    path.push(item);
    path.push("fields");
  });

  return path.slice(1, -1);
}

export function isTypeChange(
  current: SchemaItemProperty,
  prev: SchemaItemProperty
): boolean {
  if (current.type) {
    if (prev.ref || (prev.type && current.type !== prev.type)) return true;
  }

  if (current.ref) {
    if (prev.type || (prev.ref && prev.ref !== current.ref)) return true;
  }

  return false;
}

export function processItemInitValue(
  data = {} as SchemaItemProperty
): AddedSchemaFormItem {
  return {
    ...data,
    origin: data.ref ? "reference" : "normal",
  };
}

export function processItemData(
  data = {} as AddedSchemaFormItem
): SchemaItemProperty {
  return omit(data, "origin");
}

export function processFields(
  list: SchemaItemProperty[],
  requiredList: string[],
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    const property = {
      ...omit(item, "fields"),
      ...(requiredList.includes(item.name) || requiredList.includes(item.ref)
        ? { required: true }
        : {}),
    } as SchemaItemProperty;

    result.push(property);
    if (item.fields) {
      property.fields = [];
      processFields(item.fields, requiredList, property.fields);
    }
  });
}

export function processFormInitvalue(
  data: SchemaRootNodeProperty
): SchemaItemProperty {
  if (data.required) {
    const result: SchemaItemProperty = omit(data, ["fields", "required"]);
    result.required =
      data.required.includes(data.name) || data.required.includes(data.ref);
    result.fields = [];

    processFields(data.fields, data.required, result.fields);
    return result;
  }

  return data as any as SchemaItemProperty;
}

export function collectFields(
  list: SchemaItemProperty[],
  requiredList: string[],
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    if (item.required) {
      requiredList.push(item.name || item.ref);
    }

    const property = {
      ...omit(item, ["fields", "required"]),
    } as SchemaItemProperty;

    result.push(property);

    if (item.fields) {
      property.fields = [];
      collectFields(item.fields, requiredList, property.fields);
    }
  });
}

export function processFormData(
  data: SchemaItemProperty
): SchemaRootNodeProperty {
  const result: SchemaItemProperty = omit(data, "fields");
  const requiredList: string[] = [];
  result.fields = [];

  if (data.required) {
    requiredList.push(data.name);
  }

  collectFields(data.fields, requiredList, result.fields);

  return {
    ...result,
    required: requiredList,
  };
}
