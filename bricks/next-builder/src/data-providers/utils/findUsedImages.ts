import { MemberExpression } from "@babel/types";
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
            hooks: {
              beforeVisit(node) {
                let member: MemberExpression;
                // Matching `<% IMG.get(...) %>`.
                if (
                  node.type === "CallExpression" &&
                  ((member = node.callee as MemberExpression),
                  member.type === "MemberExpression") &&
                  !member.computed &&
                  member.object.type === "Identifier" &&
                  member.object.name === IMG &&
                  member.property.type === "Identifier" &&
                  !member.computed &&
                  member.property.name === "get"
                ) {
                  // Matching `<% IMG.get("...") %>`.
                  let arg: EstreeLiteral;
                  if (
                    node.arguments.length > 0 &&
                    ((arg = node.arguments[0] as unknown as EstreeLiteral),
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
