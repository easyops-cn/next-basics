import { isNil, isRegExp } from "lodash";
import { isObject } from "@next-core/brick-utils";

export function deepFilter<T>(data: Array<T>, q: string): Array<T> {
  if (!q) {
    return data.slice();
  }
  return data.filter((item) => deepMatch(item, q?.trim().toLowerCase() ?? ""));
}

function deepMatch(data: unknown, lowerQ: string): boolean {
  if (typeof data === "string") {
    return data.toLowerCase().includes(lowerQ);
  }
  if (Array.isArray(data)) {
    return data.some((item) => deepMatch(item, lowerQ));
  }
  if (isObject(data)) {
    return Object.entries(data)
      .flat()
      .some((item) => deepMatch(item, lowerQ));
  }
  return false;
}

export function searchList<T>(
  list: Array<T>,
  q: string,
  field?: string
): Array<T> {
  const lowerCaseQuery = q?.trim().toLowerCase() ?? "";
  return list.filter((v: any) => {
    const value = field ? v[field] : v;
    if (typeof value === "object" && !isNil(value)) {
      return findQueryInObjectValues(value, lowerCaseQuery);
    } else {
      const stringValue =
        typeof value === "string" ? value : JSON.stringify(value);
      return stringValue.toLowerCase().includes(lowerCaseQuery);
    }
  });
}

export function findQueryInObjectValues(
  data: Record<string, any>,
  query: string | RegExp,
  keys?: string[]
): boolean {
  let found = false;
  for (const field in data) {
    if (!keys || keys.includes(field)) {
      const value = data[field];
      if (isNil(value)) {
        continue;
      }
      const strValue =
        typeof value === "string" ? value : JSON.stringify(value);
      if (isRegExp(query)) {
        const matched = query.test(strValue);
        if (matched) {
          found = true;
          break;
        }
        continue;
      }
      if (strValue?.toLowerCase().includes(query)) {
        found = true;
        break;
      }
    }
  }
  return found;
}
