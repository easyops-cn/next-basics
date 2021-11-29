import { Storyboard, StoryboardFunction } from "@next-core/brick-types";
import {
  createProviderClass,
  isEvaluable,
  isObject,
  precookFunction,
  PrecookHooks,
  preevaluate,
} from "@next-core/brick-utils";

const FN = "FN";

export interface ScanFunctionsInStoryboardParams {
  storyboard: Storyboard;
}

export function ScanFunctionsInStoryboard({
  storyboard,
}: ScanFunctionsInStoryboardParams): string[] {
  const collection = new Set<string>();
  const beforeVisitGlobal = beforeVisitGlobalFactory(collection);
  collectFunctions(
    [storyboard.routes, storyboard.meta?.customTemplates],
    beforeVisitGlobal
  );
  if (Array.isArray(storyboard.meta?.functions)) {
    for (const fn of storyboard.meta.functions) {
      collectFunctionsInFunctionSource(fn, beforeVisitGlobal);
    }
  }
  return Array.from(collection);
}

function collectFunctions(
  data: unknown,
  beforeVisitGlobal: PrecookHooks["beforeVisitGlobal"],
  memo = new WeakSet()
): void {
  if (typeof data === "string") {
    if (data.includes(FN) && isEvaluable(data)) {
      try {
        preevaluate(data, {
          withParent: true,
          hooks: { beforeVisitGlobal },
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          "Parse evaluation string failed when scanning functions:",
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
        collectFunctions(item, beforeVisitGlobal, memo);
      }
    } else {
      for (const item of Object.values(data)) {
        collectFunctions(item, beforeVisitGlobal, memo);
      }
    }
  }
}

function collectFunctionsInFunctionSource(
  { source, typescript }: StoryboardFunction,
  beforeVisitGlobal: PrecookHooks["beforeVisitGlobal"]
): void {
  try {
    precookFunction(source, {
      typescript,
      withParent: true,
      hooks: { beforeVisitGlobal },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Parse functions source failed when scanning functions:",
      error
    );
  }
}

function beforeVisitGlobalFactory(
  collection: Set<string>
): PrecookHooks["beforeVisitGlobal"] {
  return function beforeVisitGlobal(node, parent): void {
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
