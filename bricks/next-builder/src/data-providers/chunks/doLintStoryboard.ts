import type {
  CustomBrickEventHandler,
  I18nData,
  Storyboard,
} from "@next-core/brick-types";
import {
  parseStoryboard,
  scanStoryboardAst,
  traverseStoryboard,
} from "@next-core/brick-utils";

export type StoryboardErrorCode = "SCRIPT_BRICK" | "TAG_NAME_AS_TARGET";

export interface StoryboardError {
  type: "warn" | "error";
  code: StoryboardErrorCode;
  message: I18nData;
}

export function doLintStoryboard(storyboard: Storyboard): StoryboardError[] {
  const errors: StoryboardError[] = [];
  const ast = parseStoryboard(storyboard);

  const { bricks } = scanStoryboardAst(ast);
  if (bricks.includes("basic-bricks.script-brick")) {
    errors.push({
      type: "error",
      code: "SCRIPT_BRICK",
      message: {
        zh: "您正在使用 `basic-bricks.script-brick`，而它被认为不可维护、兼容性差。请使用微应用函数或自定义处理函数来代替。",
        en: "You're using `basic-bricks.script-brick` which is considered unmaintainable and poorly compatible. Please use storyboard functions or custom processors instead.",
      },
    });
  }

  const invalidTargetRegExp = /^[-\w]+(\\\.[-\w]+)*$/;
  traverseStoryboard(ast, (node) => {
    switch (node.type) {
      case "EventHandler": {
        const { target } = node.raw as CustomBrickEventHandler;
        if (typeof target === "string") {
          if (invalidTargetRegExp.test(target)) {
            errors.push({
              type: "error",
              code: "TAG_NAME_AS_TARGET",
              message: {
                zh: `您正在使用构件名作为事件目标: "${target}"，这可能导致意外选中其他构件，请改为使用 id 或 ref。`,
                en: `You're using brick tag name "${target}" as target selector which can cause other brick being selected. Please use id or ref instead.`,
              },
            });
          }
        }
        break;
      }
    }
  });

  return errors;
}
