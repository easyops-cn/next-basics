import { Identifier } from "@babel/types";
import {
  isEvaluable,
  isObject,
  preevaluate,
  PreevaluateResult,
} from "@next-core/brick-utils";

export function replaceWidgetFunctions<T>(data: T, appId: string): T {
  const stringifyAppId = JSON.stringify(appId);
  const patterns = new Map<string, string>([
    ["FN", `__WIDGET_FN__[${stringifyAppId}]`],
    ["IMG", `__WIDGET_IMG__(${stringifyAppId})`],
    ["I18N", `__WIDGET_I18N__(${stringifyAppId})`],
  ]);
  const keywords = [...patterns.keys()];

  function replace<T>(value: T): T {
    if (typeof value === "string") {
      if (keywords.some((k) => value.includes(k)) && isEvaluable(value)) {
        const replacements: Identifier[] = [];
        let result: PreevaluateResult;
        try {
          result = preevaluate(value, {
            hooks: {
              beforeVisitGlobal(node) {
                if (patterns.has(node.name)) {
                  replacements.push(node);
                }
              },
            },
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            "Parse evaluation string failed when scanning functions:",
            error
          );
        }
        if (replacements.length > 0) {
          const { prefix, source, suffix } = result;
          const chunks: string[] = [];
          let prevStart = 0;
          for (let i = 0; i < replacements.length; i++) {
            const { name, start, end } = replacements[i];
            chunks.push(source.substring(prevStart, start), patterns.get(name));
            prevStart = end;
          }
          chunks.push(source.substring(prevStart));
          return `${prefix}${chunks.join("")}${suffix}` as T & string;
        }
      }
      return value;
    }

    if (Array.isArray(value)) {
      return value.map(replace) as T & unknown[];
    }

    if (isObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, replace(v)])
      ) as T & Record<string, unknown>;
    }

    return value;
  }
  return replace(data);
}
