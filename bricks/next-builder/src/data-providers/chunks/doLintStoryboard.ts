import type {
  CustomBrickEventHandler,
  I18nData,
  Storyboard,
} from "@next-core/brick-types";
import {
  parseStoryboard,
  traverseStoryboard,
  visitStoryboardExpressions,
} from "@next-core/brick-utils";

export type StoryboardErrorCode =
  | "SCRIPT_BRICK"
  | "TAG_NAME_AS_TARGET"
  | "PROVIDER_AS_BRICK"
  | "USING_CTX_IN_TPL";

export interface StoryboardError {
  type: "warn" | "error";
  code: StoryboardErrorCode;
  message: I18nData;
  list?: string[];
}

export function doLintStoryboard(storyboard: Storyboard): StoryboardError[] {
  const tagNameAsTargetRegExp = /^[-\w]+(\\\.[-\w]+)*$/;
  const warnedTargets = new Set<string>();
  const providerBrickRegExp = /^providers-of-/;
  const warnedProviders = new Set<string>();

  const errors: StoryboardError[] = [];
  const ast = parseStoryboard(storyboard);
  let usingScriptBrick = false;
  traverseStoryboard(ast, (node) => {
    switch (node.type) {
      case "Brick": {
        const { brick } = node.raw;
        if (typeof brick === "string") {
          if (brick === "basic-bricks.script-brick") {
            usingScriptBrick = true;
          } else if (
            providerBrickRegExp.test(brick) &&
            !warnedProviders.has(brick)
          ) {
            warnedProviders.add(brick);
          }
        }
        break;
      }
      case "EventHandler": {
        const { target } = node.raw as CustomBrickEventHandler;
        if (typeof target === "string") {
          if (
            target !== "_self" &&
            tagNameAsTargetRegExp.test(target) &&
            !warnedTargets.has(target)
          ) {
            warnedTargets.add(target);
          }
        }
        break;
      }
    }
  });

  const { customTemplates } = storyboard.meta ?? {};
  const warnedUsingCtxTemplates: string[] = [];
  if (Array.isArray(customTemplates)) {
    for (const tpl of customTemplates) {
      const contexts: string[] = [];
      visitStoryboardExpressions(
        [tpl.bricks, tpl.state],
        (node, parent) => {
          if (node.name === "CTX") {
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
                contexts.push(`CTX.${memberNode.property.name}`);
              } else if (
                memberNode.computed &&
                (memberNode.property as any).type === "Literal" &&
                typeof (memberNode.property as any).value === "string"
              ) {
                contexts.push(`CTX[${(memberNode.property as any).raw}]`);
              } else {
                contexts.push(`CTX[...]`);
              }
            } else {
              contexts.push("CTX");
            }
          }
        },
        "CTX"
      );

      if (contexts.length > 0) {
        warnedUsingCtxTemplates.push(`${tpl.name}: ${contexts.join(", ")}`);
      }
    }
  }

  if (usingScriptBrick) {
    errors.push({
      type: "error",
      code: "SCRIPT_BRICK",
      message: {
        zh: "您正在使用 `basic-bricks.script-brick`，而它被认为不可维护、兼容性差。请使用微应用函数或自定义处理函数来代替。",
        en: "You're using `basic-bricks.script-brick` which is considered unmaintainable and poorly compatible. Please use storyboard functions or custom processors instead.",
      },
    });
  }

  if (warnedTargets.size > 0) {
    errors.push({
      type: "error",
      code: "TAG_NAME_AS_TARGET",
      message: {
        zh: `您正在使用构件名作为事件目标，这可能导致意外选中其他构件，请改为使用 id 或 ref：`,
        en: `You're using brick tag name as target selector which can cause other brick being selected. Please use id or ref instead:`,
      },
      list: [...warnedTargets],
    });
  }

  if (warnedProviders.size > 0) {
    errors.push({
      type: "warn",
      code: "PROVIDER_AS_BRICK",
      message: {
        zh: `您正在使用 Provider 作为构件，现在推荐使用 \`useProvider\`，无需提前声明：`,
        en: `You're using provider as brick. Please use \`useProvider\` instead, which is more convenient:`,
      },
      list: [...warnedProviders],
    });
  }

  if (warnedUsingCtxTemplates.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_CTX_IN_TPL",
      message: {
        zh: `您正在模板中使用 CTX，这破坏了模板的封装性，建议配置为 STATE，并在外部通过属性传递给模板：`,
        en: `You're using CTX in templates, which breaks the encapsulation of templates. Please use STATE instead, and pass in externally through properties:`,
      },
      list: warnedUsingCtxTemplates,
    });
  }

  return errors;
}
