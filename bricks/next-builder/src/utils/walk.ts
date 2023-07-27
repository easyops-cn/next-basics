import { isObject } from "@next-core/brick-utils";

export default function walk(
  node: Record<string, any>,
  fn: (key: string, value: any) => void | [string, any]
): Record<string, any> {
  return Array.isArray(node)
    ? node.map((item) => walk(item, fn))
    : node && isObject(node)
    ? Object.fromEntries(
        Object.entries(node).map(([k, v]) => {
          const result = fn(k, v);
          if (result) {
            return result;
          }
          if (Array.isArray(v)) {
            v = v.map((item) => walk(item, fn));
          } else if (isObject(v)) {
            v = walk(v, fn);
          }
          return [k, v];
        })
      )
    : node;
}
