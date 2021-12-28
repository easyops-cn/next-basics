import { Storyboard } from "@next-core/brick-types";
import {
  EstreeLiteral,
  visitStoryboardExpressions,
  PrecookHooks,
} from "@next-core/brick-utils";

const IMG = "IMG";

export function findUsedImagesInStoryboard(
  storyboard: Storyboard,
  regex: RegExp,
  images: Set<string>
): void {
  const beforeVisitContext = beforeVisitImageFactory(images);
  visitStoryboardExpressions(storyboard, beforeVisitContext, {
    matchExpressionString(value) {
      return value.includes(IMG);
    },
    visitNonExpressionString(value) {
      findUsedImagesInString(value, regex, images);
    },
  });
}

export function findUsedImagesInString(
  value: string,
  regex: RegExp,
  images: Set<string>
): void {
  let match: RegExpExecArray;
  while ((match = regex.exec(value))) {
    images.add(match[1]);
  }
}

function beforeVisitImageFactory(
  images: Set<string>
): PrecookHooks["beforeVisitGlobal"] {
  return function beforeVisitImage(node, parent) {
    if (node.name === IMG) {
      const memberParent = parent[parent.length - 1];
      const callParent = parent[parent.length - 2];
      // Matching `<% IMG.get(...) %>`.
      if (
        callParent?.node.type === "CallExpression" &&
        callParent?.key === "callee" &&
        memberParent?.node.type === "MemberExpression" &&
        memberParent.key === "object" &&
        !memberParent.node.computed &&
        memberParent.node.property.type === "Identifier" &&
        memberParent.node.property.name === "get"
      ) {
        // Matching `<% IMG.get("...") %>`.
        let arg: EstreeLiteral;
        if (
          callParent.node.arguments.length > 0 &&
          ((arg = callParent.node.arguments[0] as unknown as EstreeLiteral),
          arg.type === "Literal") &&
          typeof arg.value === "string"
        ) {
          images.add(arg.value);
        } else {
          // eslint-disable-next-line no-console
          console.warn(
            "Unexpected dynamic accessing of `IMG.get(...)`:",
            callParent.node.arguments
          );
        }
      }
    }
  };
}
