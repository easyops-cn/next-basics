import { MemberExpression } from "@babel/types";
import { Storyboard } from "@next-core/brick-types";
import {
  createProviderClass,
  isEvaluable,
  isObject,
  precookFunction,
  PrecookFunctionVisitor,
  PrecookVisitor,
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
  collectFunctions(
    [storyboard.routes, storyboard.meta?.customTemplates],
    collection
  );
  if (Array.isArray(storyboard.meta?.functions)) {
    for (const fn of storyboard.meta.functions) {
      collectFunctionsInFunctionSource(fn.source, collection);
    }
  }
  return Array.from(collection);
}

function collectFunctions(
  data: unknown,
  collection: Set<string>,
  memo = new WeakSet()
): void {
  if (typeof data === "string") {
    if (data.includes(FN) && isEvaluable(data)) {
      try {
        preevaluate(data, {
          visitors: {
            MemberExpression: (node: MemberExpression, state, callback) => {
              addToFunctionCollection(node, collection);
              PrecookVisitor.MemberExpression(node, state, callback);
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
    }
  } else if (isObject(data)) {
    // Avoid call stack overflow.
    if (memo.has(data)) {
      return;
    }
    memo.add(data);
    if (Array.isArray(data)) {
      for (const item of data) {
        collectFunctions(item, collection, memo);
      }
    } else {
      for (const item of Object.values(data)) {
        collectFunctions(item, collection, memo);
      }
    }
  }
}

function collectFunctionsInFunctionSource(
  source: string,
  collection: Set<string>
): void {
  try {
    precookFunction(source, {
      visitors: {
        MemberExpression: (node: MemberExpression, state, callback) => {
          addToFunctionCollection(node, collection);
          PrecookFunctionVisitor.MemberExpression(node, state, callback);
        },
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      "Parse functions source failed when scanning functions:",
      error
    );
  }
}

function addToFunctionCollection(
  node: MemberExpression,
  collection: Set<string>
): void {
  if (
    !node.computed &&
    node.object.type === "Identifier" &&
    node.object.name === FN &&
    node.property.type === "Identifier"
  ) {
    collection.add(node.property.name);
  }
}

customElements.define(
  "next-builder.provider-scan-functions-in-storyboard",
  createProviderClass(ScanFunctionsInStoryboard)
);
