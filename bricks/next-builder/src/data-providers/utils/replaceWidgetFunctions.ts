import {
  isEvaluable,
  isObject,
  preevaluate,
  PreevaluateResult,
} from "@next-core/brick-utils";

const FN = "FN";
const __WIDGET_FN__ = "__WIDGET_FN__";

export function replaceWidgetFunctions<T>(data: T, appId: string): T {
  function replace<T>(value: T): T {
    if (typeof value === "string") {
      if (value.includes(FN) && isEvaluable(value)) {
        const replacements: number[] = [];
        let result: PreevaluateResult;
        try {
          result = preevaluate(value, {
            hooks: {
              beforeVisit(node) {
                if (node.type === "MemberExpression") {
                  if (
                    !node.computed &&
                    node.object.type === "Identifier" &&
                    node.object.name === FN &&
                    node.property.type === "Identifier"
                  ) {
                    replacements.push(node.object.start, node.object.end);
                  }
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
          for (let i = 0; i < replacements.length; i += 2) {
            const start = replacements[i];
            chunks.push(source.substring(prevStart, start));
            prevStart = replacements[i + 1];
          }
          chunks.push(source.substring(prevStart));
          return `${prefix}${chunks.join(
            `${__WIDGET_FN__}[${JSON.stringify(appId)}]`
          )}${suffix}` as T & string;
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
