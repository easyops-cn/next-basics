import { isNil } from "lodash";
import moment from "moment";

export function parseFormValues(
  values: Record<string, unknown>,
  valueTypes?: Record<string, unknown>,
  parsedValues?: Record<string, unknown>,
  basePath?: string
): Record<string, unknown> {
  if (!parsedValues) {
    parsedValues = {};
  }

  const isArrayValues = Array.isArray(values);

  Object.entries(values).forEach(([key, value]) => {
    const path = basePath
      ? `${basePath}${isArrayValues ? `[${key}]` : `.${key}`}`
      : key;

    if (typeof value === "object" && value !== null) {
      parseFormValues(
        value as Record<string, unknown>,
        valueTypes,
        parsedValues,
        path
      );
    }

    const valueType = valueTypes?.[path];
    let parsedValue = value;

    if (typeof valueType === "string") {
      const matches = valueType.match(/^moment(?:\|(.+))?$/);
      if (matches && !isNil(value)) {
        parsedValue = moment(value, matches[1]);
      }
    }
    parsedValues[path] = parsedValue;
  });

  return parsedValues;
}
