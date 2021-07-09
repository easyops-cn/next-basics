import { isNil, omit } from "lodash";
import {
  processValidatorInitValue,
  formatValidatorData,
} from "./filedValidatorItem";
import {
  EditorTitleProps,
  SchemaItemProperty,
  AddedSchemaFormItem,
  SchemaRootNodeProperty,
} from "../interfaces";
import { numberTypeList } from "../constants";

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
    ...([...numberTypeList, "string"].includes(data.type)
      ? { validate: processValidatorInitValue(data.validate) }
      : {}),
  };
}

export function processItemData(
  data = {} as AddedSchemaFormItem
): SchemaItemProperty {
  return {
    ...omit(data, "origin", "validate"),
    ...(data.validate ? { validate: formatValidatorData(data.validate) } : {}),
  };
}

export function processFields(
  list: SchemaItemProperty[],
  requiredList: string[],
  defaultData: Record<string, unknown>,
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    const property = {
      ...omit(item, "fields"),
      ...(requiredList.includes(item.name) || requiredList.includes(item.ref)
        ? { required: true }
        : {}),
      ...(!isNil(defaultData[item.name])
        ? { default: defaultData[item.name] }
        : {}),
    } as SchemaItemProperty;

    result.push(property);
    if (item.fields) {
      property.fields = [];
      processFields(item.fields, requiredList, defaultData, property.fields);
    }
  });
}

export function processFormInitvalue(
  data: SchemaRootNodeProperty
): SchemaItemProperty {
  const result: SchemaItemProperty = omit(data, [
    "fields",
    "required",
    "default",
  ]);

  const requiredList = data.required || [];
  const defaultData = data.default || {};
  result.fields = [];
  if (requiredList.includes(data.name) || requiredList.includes(data.ref)) {
    result.required = true;
  }

  processFields(data.fields, requiredList, defaultData, result.fields);

  return result;
}

export function collectFields(
  list: SchemaItemProperty[],
  requiredList: string[],
  defaultData: Record<string, unknown>,
  result: SchemaItemProperty[]
): void {
  list?.forEach((item) => {
    if (item.required) {
      requiredList.push(item.name || item.ref);
    }

    if (!isNil(item.default)) {
      defaultData[item.name] = item.default;
    }

    const property = {
      ...omit(item, ["fields", "required", "default"]),
    } as SchemaItemProperty;

    result.push(property);

    if (item.fields) {
      property.fields = [];
      collectFields(item.fields, requiredList, defaultData, property.fields);
    }
  });
}

export function processFormData(
  data: SchemaItemProperty
): SchemaRootNodeProperty {
  const result: SchemaItemProperty = omit(data, "fields");
  const requiredList: string[] = [];
  const defaultData: Record<string, unknown> = {};
  result.fields = [];

  if (data.required) {
    requiredList.push(data.name);
  }

  if (!isNil(data.default)) {
    defaultData[data.name] = data.default;
  }

  collectFields(data.fields, requiredList, defaultData, result.fields);

  return {
    ...result,
    required: requiredList,
    default: defaultData,
  };
}
