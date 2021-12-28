import { Storyboard } from "@next-core/brick-types";
import {
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
  visitStoryboardExpressions(data, beforeVisitContext, {
    matchExpressionString(value) {
      return value.includes(CTX);
    },
    visitObject: function (
      value: unknown[] | Record<string | number | symbol, unknown>
    ) {
      if (
        !Array.isArray(value) &&
        (value.action === "context.replace" ||
          value.action === "context.assign") &&
        Array.isArray(value.args) &&
        typeof value.args[0] === "string" &&
        // Ignore evaluations and placeholders,
        // E.g.: `<% QUERY.x %>` or `${QUERY.x}`.
        !/[<{]/.test(value.args[0])
      ) {
        writeContexts.add(value.args[0]);
      }
    } as (v: object) => void,
  });
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
