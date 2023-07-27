import { Storyboard } from "@next-core/brick-types";
import {
  createProviderClass,
  PrecookHooks,
  visitStoryboardExpressions,
  visitStoryboardFunctions,
} from "@next-core/brick-utils";

const FN = "FN";

export interface ScanFunctionsInStoryboardParams {
  storyboard: Storyboard;
}

export function ScanFunctionsInStoryboard({
  storyboard,
}: ScanFunctionsInStoryboardParams): string[] {
  const collection = new Set<string>();
  const beforeVisitFunction = beforeVisitFunctionFactory(collection);
  const { customTemplates, functions } = storyboard.meta ?? {};
  visitStoryboardExpressions(
    [storyboard.routes, customTemplates],
    beforeVisitFunction,
    FN
  );
  visitStoryboardFunctions(functions, beforeVisitFunction);
  return Array.from(collection);
}

function beforeVisitFunctionFactory(
  collection: Set<string>
): PrecookHooks["beforeVisitGlobal"] {
  return function beforeVisitFunction(node, parent): void {
    if (node.name === FN) {
      const memberParent = parent[parent.length - 1];
      if (
        memberParent?.node.type === "MemberExpression" &&
        memberParent.key === "object" &&
        !memberParent.node.computed &&
        memberParent.node.property.type === "Identifier"
      ) {
        collection.add(memberParent.node.property.name);
      }
    }
  };
}

customElements.define(
  "next-builder.provider-scan-functions-in-storyboard",
  createProviderClass(ScanFunctionsInStoryboard)
);
