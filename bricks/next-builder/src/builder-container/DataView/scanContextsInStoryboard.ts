import { MemberExpression } from "@babel/types";
import { Storyboard } from "@next-core/brick-types";
import {
  isObject,
  isEvaluable,
  preevaluate,
  PrecookVisitor,
} from "@next-core/brick-utils";

const CTX = "CTX";

export function scanContextsInStoryboard(storyboard: Storyboard): string[] {
  return scanContextsInAny([
    storyboard.routes,
    storyboard.meta?.customTemplates,
  ]);
}

export function scanContextsInAny(data: unknown): string[] {
  const { readContexts, writeContexts } = scanContextsInAnyByReadOrWrite(data);
  return Array.from(new Set(readContexts.concat(writeContexts)));
}

function scanContextsInAnyByReadOrWrite(data: unknown): {
  readContexts: string[];
  writeContexts: string[];
} {
  const readContexts = new Set<string>();
  const writeContexts = new Set<string>();
  collectContexts(data, readContexts, writeContexts);
  return {
    readContexts: Array.from(readContexts),
    writeContexts: Array.from(writeContexts),
  };
}

function collectContexts(
  data: unknown,
  readContexts: Set<string>,
  writeContexts: Set<string>,
  memo = new WeakSet()
): void {
  if (typeof data === "string") {
    if (data.includes(CTX) && isEvaluable(data)) {
      preevaluate(data, {
        visitors: {
          MemberExpression: (node: MemberExpression, state, callback) => {
            if (node.object.type === "Identifier" && node.object.name === CTX) {
              if (!node.computed && node.property.type === "Identifier") {
                readContexts.add(node.property.name);
              } else if (
                node.computed &&
                (node.property as any).type === "Literal" &&
                typeof (node.property as any).value === "string"
              ) {
                readContexts.add((node.property as any).value);
              }
            }
            PrecookVisitor.MemberExpression(node, state, callback);
          },
        },
      });
    }
  } else if (isObject(data)) {
    // Avoid call stack overflow.
    if (memo.has(data)) {
      return;
    }
    memo.add(data);
    if (Array.isArray(data)) {
      for (const item of data) {
        collectContexts(item, readContexts, writeContexts, memo);
      }
    } else {
      for (const item of Object.values(data)) {
        collectContexts(item, readContexts, writeContexts, memo);
      }
      if (
        (data.action === "context.replace" ||
          data.action === "context.assign") &&
        Array.isArray(data.args) &&
        typeof data.args[0] === "string" &&
        // Ignore evaluations and placeholders,
        // E.g.: `<% QUERY.x %>` or `${QUERY.x}`.
        !/[<{]/.test(data.args[0])
      ) {
        writeContexts.add(data.args[0]);
      }
    }
  }
}
