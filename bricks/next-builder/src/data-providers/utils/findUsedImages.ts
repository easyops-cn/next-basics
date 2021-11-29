import { Storyboard } from "@next-core/brick-types";
import {
  isEvaluable,
  isObject,
  preevaluate,
  EstreeLiteral,
} from "@next-core/brick-utils";

const IMG = "IMG";

export function findUsedImagesInStoryboard(
  storyboard: Storyboard,
  regex: RegExp,
  images: Set<string>
): void {
  function walk(value: unknown): void {
    if (typeof value === "string") {
      if (value.includes(IMG) && isEvaluable(value)) {
        try {
          preevaluate(value, {
            withParent: true,
            hooks: {
              beforeVisitGlobal(node, parent) {
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
                      ((arg = callParent.node
                        .arguments[0] as unknown as EstreeLiteral),
                      arg.type === "Literal") &&
                      typeof arg.value === "string"
                    ) {
                      images.add(arg.value);
                    } else {
                      // eslint-disable-next-line no-console
                      console.warn(
                        "Unexpected dynamic accessing of `IMG.get(...)`:",
                        value
                      );
                    }
                  }
                }
              },
            },
          });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(
            "Parse evaluation string failed when scanning images:",
            error
          );
        }
      } else {
        findUsedImagesInString(value, regex, images);
      }
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (isObject(value)) {
      Object.values(value).forEach(walk);
    }
  }
  walk(storyboard);
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
