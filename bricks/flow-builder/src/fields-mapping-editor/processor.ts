import { safeDump, JSON_SCHEMA } from "js-yaml";
import { get, isNil, omit } from "lodash";
import { FlatFieldChildrenMap, FieldItem } from "./interfaces";

export function calcFieldPath(key: string): string[] {
  const arr = key.split("-");
  const path: string[] = [];

  arr.forEach((item) => {
    path.push(item);
    path.push("fields");
  });

  return path.slice(0, -1);
}

export function yamlStringify(value: unknown, indent = 2): string {
  try {
    return safeDump(value, {
      indent,
      schema: JSON_SCHEMA,
      skipInvalid: true,
      noRefs: true,
      noCompatMode: true,
    });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}

export function flatFieldChildren(
  fieldList: FieldItem[],
  obj: FlatFieldChildrenMap
): void {
  fieldList?.forEach((item) => {
    if (item.fields) {
      obj[item.key] = item.fields;
      flatFieldChildren(item.fields, obj);
    }
  });
}

export function getFieldChildrenMap(
  fieldList: FieldItem[]
): FlatFieldChildrenMap {
  const childrenObj: FlatFieldChildrenMap = {};
  flatFieldChildren(fieldList, childrenObj);

  return childrenObj;
}

export function processFieldValue(
  item: FieldItem,
  value: string,
  fieldList: FieldItem[],
  fieldChildrenMap: FlatFieldChildrenMap
): FieldItem {
  const path = calcFieldPath(item.key);
  const find = get(fieldList, path) as FieldItem;

  if (item.type === "object" && fieldChildrenMap[item.key]) {
    if (!isNil(value) && value !== "") {
      return {
        ...omit(find, "fields"),
        value,
      };
    } else {
      return {
        ...find,
        value,
        fields: fieldChildrenMap[item.key],
      };
    }
  }

  return {
    ...find,
    value,
  };
}

export function serializeFieldValue(value: unknown): string | unknown {
  if (value === null) {
    return "";
  }
  switch (typeof value) {
    case "string":
      return value;
    case "number":
    case "boolean":
      return String(value);
    case "undefined":
      return "";
    case "object":
      return yamlStringify(value);
    /* istanbul ignore next */
    default:
      throw new Error("Unsupported Field Type");
  }
}
