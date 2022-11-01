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
  | "USING_CTX_IN_TPL"
  | "USING_TPL_VAR_IN_TPL";

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
  let usingScriptBrick = false;

  const ast = parseStoryboard(storyboard);
  traverseStoryboard(ast, (node) => {
    switch (node.type) {
      case "Brick": {
        const { brick } = node.raw;
        if (typeof brick === "string") {
          if (brick === "basic-bricks.script-brick") {
            usingScriptBrick = true;
          } else if (providerBrickRegExp.test(brick)) {
            warnedProviders.add(brick);
          }
        }
        break;
      }
      case "EventHandler": {
        const { target } = node.raw as CustomBrickEventHandler;
        if (typeof target === "string") {
          if (target !== "_self" && tagNameAsTargetRegExp.test(target)) {
            warnedTargets.add(target);
          }
        }
        break;
      }
    }
  });

  const { customTemplates } = storyboard.meta ?? {};
  const warnedUsingCtxTemplates: string[] = [];
  const warnedUsingTplVarTemplates: string[] = [];
  if (Array.isArray(customTemplates)) {
    for (const tpl of customTemplates) {
      const contexts = new Set<string>();
      const tplVariables = new Set<string>();
      visitStoryboardExpressions(
        [tpl.bricks, tpl.state],
        (node, parent) => {
          if (node.name === "CTX" || node.name === "TPL") {
            const collection = node.name === "CTX" ? contexts : tplVariables;
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
                collection.add(`${node.name}.${memberNode.property.name}`);
              } else if (
                memberNode.computed &&
                (memberNode.property as any).type === "Literal" &&
                typeof (memberNode.property as any).value === "string"
              ) {
                collection.add(
                  `${node.name}[${(memberNode.property as any).raw}]`
                );
              } else {
                collection.add(`${node.name}[...]`);
              }
            } else {
              collection.add(node.name);
            }
          }
        },
        {
          matchExpressionString(value) {
            return value.includes("CTX") || value.includes("TPL");
          },
        }
      );

      if (contexts.size > 0) {
        warnedUsingCtxTemplates.push(
          `${tpl.name}: ${limit(contexts, 3).join(", ")}`
        );
      }

      if (tplVariables.size > 0) {
        warnedUsingTplVarTemplates.push(
          `${tpl.name}: ${limit(tplVariables, 3).join(", ")}`
        );
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

  if (warnedUsingTplVarTemplates.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_TPL_VAR_IN_TPL",
      message: {
        zh: `您正在模板中使用 TPL 变量，它已废弃，建议统一修改为 STATE，它覆盖 TPL 的所有能力，同时支持追踪更新等特性：`,
        en: `You're using TPL variables in templates, which is deprecated. Please use STATE instead, which covers all capabilities of TPL, while supports auto track and more:`,
      },
      list: warnedUsingTplVarTemplates,
    });
  }

  return errors;
}

function limit(list: Set<string>, max: number): string[] {
  const limited = [...list];
  if (limited.length > max) {
    limited.splice(max, limited.length - max);
    limited.push("...");
  }
  return limited;
}
