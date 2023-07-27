import { getRuntime } from "@next-core/brick-kit";
import { isNil } from "lodash";

function defaultPlaceholderFn(key: string): string {
  return `\\{\\{\\s*(${key})\\s*\\}\\}`;
}

export function replacePlaceholder(
  contextData: Record<string, any>,
  placeholderRaw: unknown,
  placeholderFn = defaultPlaceholderFn
): any {
  const params = contextData || {};

  const replaceString = (str: string): string => {
    const reg = new RegExp(`^${placeholderFn("([^{}]+)")}$`);
    const match = str.trim().match(reg);

    if (match) {
      const [, key] = match;
      return params[key] ?? str;
    }

    for (const [key, value] of Object.entries(params)) {
      if (!isNil(value)) {
        str = str.replace(new RegExp(placeholderFn(key), "g"), value);
      }
    }

    return str;
  };

  const replaceObject = (
    obj: Record<string, any>,
    targetObj?: Record<string, any>
  ): Record<string, any> => {
    const c = targetObj || {};
    Object.keys(obj).forEach((key) => {
      const v = obj[key];
      if (typeof v === "object" && v !== null) {
        c[key] = Array.isArray(v) ? [] : {};
        replaceObject(v, c[key]);
      } else {
        c[key] = typeof v === "string" ? replaceString(v) : v;
      }
    });

    return c;
  };

  const replaceContent = (value: unknown): unknown => {
    if (isNil(value) || value === "") return value;

    if (typeof value === "string") {
      return replaceString(value);
    }

    if (typeof value === "object") {
      return replaceObject(value);
    }

    return value;
  };

  return replaceContent(placeholderRaw);
}

getRuntime().registerCustomProcessor(
  "flowBuilder.replacePlaceholder",
  replacePlaceholder
);
