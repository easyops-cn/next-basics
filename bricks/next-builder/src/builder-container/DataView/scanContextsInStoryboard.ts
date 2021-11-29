import { Storyboard } from "@next-core/brick-types";
import { isObject, isEvaluable, preevaluate } from "@next-core/brick-utils";

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
      try {
        preevaluate(data, {
          withParent: true,
          hooks: {
            beforeVisitGlobal(node, parent): void {
              if (node.name === CTX) {
                const memberParent = parent[parent.length - 1];
                if (
                  memberParent?.node.type === "MemberExpression" &&
                  memberParent.key === "object"
                ) {
                  const memberNode = memberParent.node;
                  if (
                    !memberNode.computed &&
                    memberNode.property.type === "Identifier"
                  ) {
                    readContexts.add(memberNode.property.name);
                  } else if (
                    memberNode.computed &&
                    (memberNode.property as any).type === "Literal" &&
                    typeof (memberNode.property as any).value === "string"
                  ) {
                    readContexts.add((memberNode.property as any).value);
                  }
                }
              }
            },
          },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Parse evaluation string failed when scanning contexts:",
          error
        );
      }
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
