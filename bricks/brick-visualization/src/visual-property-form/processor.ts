import {
  PropertyType,
  UnionPropertyType,
  BrickProperties,
  ItemModeType,
} from "./VisualPropertyForm";
import { safeDump, JSON_SCHEMA, safeLoad } from "js-yaml";
import { omit, isEmpty } from "lodash";
import { supportBasicType, OTHER_FORM_ITEM_FIELD } from "./constant";

export function isAdvanceMode(value: unknown): boolean {
  if (
    typeof value === "string" &&
    (value.startsWith("<%") || value.includes("${"))
  ) {
    return true;
  }

  return false;
}

export function mergeProperties(
  propertyList: PropertyType[] = [],
  brickProperties: BrickProperties = {}
): UnionPropertyType[] {
  return propertyList?.map((item) => ({
    ...item,
    value: brickProperties?.[item.name],
    mode: isAdvanceMode(brickProperties?.[item.name])
      ? ItemModeType.Advanced
      : ItemModeType.Normal,
  }));
}

export function yamlStringify(value: unknown, indent = 2) {
  return safeDump(value, {
    indent,
    schema: JSON_SCHEMA,
    skipInvalid: true,
    noRefs: true,
    noCompatMode: true,
  });
}

export function yaml(value: string): any {
  return safeLoad(value, { schema: JSON_SCHEMA, json: true });
}

export function isTransferrableType(value: unknown): boolean {
  return (
    typeof value !== "number" &&
    typeof value !== "boolean" &&
    typeof value !== "undefined"
  );
}

export function calculateValue(
  propertyList: PropertyType[] = [],
  brickProperties: BrickProperties = {}
): Record<string, any> {
  const processValue: Record<string, any> = {};

  for (const [key, value] of Object.entries(brickProperties)) {
    const find = propertyList.find((item) => item.name === key);
    if (!find) {
      if (!processValue[OTHER_FORM_ITEM_FIELD]) {
        processValue[OTHER_FORM_ITEM_FIELD] = {};
      }
      processValue[OTHER_FORM_ITEM_FIELD][key] = value;
    } else {
      processValue[key] = value;
      processValue[key] =
        !supportBasicType.includes(find.type as string) ||
        isTransferrableType(value)
          ? yamlStringify(value)
          : value;
    }
  }

  processValue[OTHER_FORM_ITEM_FIELD] = yamlStringify(
    processValue[OTHER_FORM_ITEM_FIELD]
  );

  return processValue;
}

export function processFormValue(values = {}): Record<string, any> {
  const formData: Record<string, any> = {};
  for (const [key, value] of Object.entries(values)) {
    formData[key] = isTransferrableType(value) ? yaml(value) : value;
  }

  return {
    ...omit(formData, OTHER_FORM_ITEM_FIELD),
    ...(isEmpty(formData[OTHER_FORM_ITEM_FIELD])
      ? {}
      : formData[OTHER_FORM_ITEM_FIELD]),
  };
}
