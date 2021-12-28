import { Storyboard } from "@next-core/brick-types";
import {
  isObject,
  PrecookHooks,
  EstreeLiteral,
  visitStoryboardExpressions,
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
  const beforeVisitContext = beforeVisitContextFactory(readContexts);
  visitStoryboardExpressions(data, beforeVisitContext, CTX);
  collectWritingContexts(data, writeContexts);
  return {
    readContexts: Array.from(readContexts),
    writeContexts: Array.from(writeContexts),
  };
}

function beforeVisitContextFactory(
  readContexts: Set<string>
): PrecookHooks["beforeVisitGlobal"] {
  return function beforeVisitContext(node, parent): void {
    if (node.name === CTX) {
      const memberParent = parent[parent.length - 1];
      if (
        memberParent?.node.type === "MemberExpression" &&
        memberParent.key === "object"
      ) {
        const memberNode = memberParent.node;
        const property = memberNode.property as unknown as EstreeLiteral;
        if (!memberNode.computed && memberNode.property.type === "Identifier") {
          readContexts.add(memberNode.property.name);
        } else if (
          memberNode.computed &&
          property.type === "Literal" &&
          typeof property.value === "string"
        ) {
          readContexts.add(property.value);
        }
      }
    }
  };
}

function collectWritingContexts(
  data: unknown,
  writeContexts: Set<string>,
  memo = new WeakSet()
): void {
  if (isObject(data)) {
    // Avoid call stack overflow.
    if (memo.has(data)) {
      return;
    }
    memo.add(data);
    for (const item of Array.isArray(data) ? data : Object.values(data)) {
      collectWritingContexts(item, writeContexts, memo);
    }
    if (
      (data.action === "context.replace" || data.action === "context.assign") &&
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
