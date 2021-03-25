import { isNil } from "lodash";

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
  query: string,
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
      if (strValue?.toLowerCase().includes(query)) {
        found = true;
        break;
      }
    }
  }
  return found;
}
