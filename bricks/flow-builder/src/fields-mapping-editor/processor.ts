import { safeDump, JSON_SCHEMA, safeLoad } from "js-yaml";
import { get, isNil, omit } from "lodash";
import {
  FlatFieldChildrenMap,
  FieldItem,
  SimplifiedFieldItem,
} from "./interfaces";

export function calcFieldPath(key: string): string[] {
  const arr = key.split("-");
  const path: string[] = [];

  arr.forEach((item) => {
    path.push(item);
    path.push("fields");
  });

  return path.slice(0, -1);
}

export function yaml(value: string): unknown {
  let result;
  try {
    result = safeLoad(value, { schema: JSON_SCHEMA, json: true });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
  return result;
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
  value: unknown,
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

export function getFinalFieldsValue(
  fieldList: FieldItem[]
): SimplifiedFieldItem[] {
  const list = [] as SimplifiedFieldItem[];

  const processValue = (
    fieldList: FieldItem[],
    list: SimplifiedFieldItem[]
  ): void => {
    fieldList.forEach((item) => {
      const curField = {
        name: item.name,
        type: item.type,
        value: item.value,
      } as SimplifiedFieldItem;
      list.push(curField);

      if (item.fields) {
        curField.fields = [];
        processValue(item.fields, curField.fields);
      }
    });
  };

  processValue(fieldList, list);

  return list;
}

export function removeExtraFields(fieldsList: FieldItem[]): FieldItem[] {
  const list = [] as FieldItem[];
  const processFields = (fields: FieldItem[], arr: FieldItem[]): void => {
    fields.forEach((item) => {
      const curValue = { ...omit(item, "fields") } as FieldItem;
      arr.push(curValue);
      // 当该字段没有值的时候才展示其下面的 fields，有值的话代表对该字段整体赋值不需要再展示其下的 fields
      if (item.fields && (isNil(item.value) || item.value === "")) {
        curValue.fields = [];
        processFields(item.fields, curValue.fields);
      }
    });
  };

  processFields(fieldsList, list);

  return list;
}
