import type {
  BrickConf,
  BuiltinBrickEventHandler,
  CustomTemplate,
  I18nData,
  Storyboard,
} from "@next-core/brick-types";
import {
  parseStoryboard,
  type StoryboardNode,
  traverseStoryboard,
  visitStoryboardExpressions,
} from "@next-core/brick-utils";

// https://github.com/type-challenges/type-challenges/issues/18153
type UnionToFnIntersection<T> = (
  T extends unknown ? (arg: () => T) => unknown : never
) extends (arg: infer P) => unknown
  ? P
  : never;
type UnionToTuple<
  T,
  A extends unknown[] = []
> = UnionToFnIntersection<T> extends () => infer R
  ? UnionToTuple<Exclude<T, R>, [R, ...A]>
  : A;

export type StoryboardErrorCode =
  | "SCRIPT_BRICK"
  | "TAG_NAME_AS_TARGET"
  | "PROVIDER_AS_BRICK"
  | "MISUSE_OF_PORTAL_BRICK"
  | "USING_CTX_IN_TPL"
  | "USING_TPL_VAR_IN_TPL"
  | "UNKNOWN_EVENT_ACTION"
  | "UNKNOWN_EVENT_HANDLER";

export interface StoryboardError {
  type: "warn" | "error";
  code: StoryboardErrorCode;
  message: I18nData;
  list?: string[];
  details?: LintDetail[];
}

export interface LintDetail {
  message: string;
  messageSuffix?: string;
  meta: LintDetailMeta;
}

export interface LintDetailMeta {
  root?:
    | {
        type: "route";
        alias?: string;
        instanceId: string;
      }
    | {
        type: "template";
        templateId: string;
      };
  brick?: {
    instanceId: string;
  };
}

export function doLintStoryboard(storyboard: Storyboard): StoryboardError[] {
  const builtinActions = new Set([
    "history.push",
    "history.replace",
    "history.goBack",
    "history.goForward",

    // Extended History
    "history.reload",
    "history.pushQuery",
    "history.replaceQuery",
    "history.pushAnchor",
    // "history.replaceAnchor",

    // Overridden History
    "history.block",
    "history.unblock",

    // Segues
    "segue.push",
    "segue.replace",

    // Alias
    "alias.push",
    "alias.replace",

    // localStorage
    "localStorage.setItem",
    "localStorage.removeItem",

    // sessionStorage
    "sessionStorage.setItem",
    "sessionStorage.removeItem",

    // Iframe
    "legacy.go",

    // Browser method
    "location.reload",
    "location.assign",
    "window.open",
    "event.preventDefault",
    "console.log",
    "console.error",
    "console.warn",
    "console.info",

    // Antd message
    "message.success",
    "message.error",
    "message.info",
    "message.warn",

    // `handleHttpError`
    "handleHttpError",

    // Storyboard context
    "context.assign",
    "context.replace",
    "context.refresh",
    "context.load",

    // Update template state
    "state.update",
    "state.refresh",
    "state.load",

    // Find related tpl and dispatch event.
    "tpl.dispatchEvent",

    // Websocket event
    "message.subscribe",
    "message.unsubscribe",

    // Theme and mode.
    "theme.setDarkTheme",
    "theme.setLightTheme",
    "theme.setTheme",
    "mode.setDashboardMode",
    "mode.setDefaultMode",
    "menu.clearMenuTitleCache",
    "menu.clearMenuCache",
    "preview.debug",

    // Analytics
    "analytics.event",
  ] as UnionToTuple<BuiltinBrickEventHandler["action"]>);
  const tagNameAsTargetRegExp = /^[-\w]+(\\\.[-\w]+)*$/;
  const providerBrickRegExp = /^providers-of-/;
  const customProviderBrickRegExp = /\.provider-/;
  const portalBricks = new Set([
    "basic-bricks.delete-confirm-modal",
    "basic-bricks.general-drawer",
    "basic-bricks.general-modal",
    "forms.form-modal",
    "forms.general-modal",
    "presentational-bricks.modal-confirm",
  ]);
  const warnedTargets = new Map<string, LintDetailMeta>();
  const warnedProviders = new Map<string, LintDetailMeta>();
  const warnedPortalBricks = new Map<string, LintDetailMeta>();
  const usingCtxActionsInTemplate = new Map<string, Set<string>>();
  const unknownEventActions = new Map<string, LintDetailMeta>();
  const unknownEventHandlers = new Map<string, LintDetailMeta>();

  const errors: StoryboardError[] = [];
  const usingScriptBrick: LintDetail[] = [];

  const addMeta = (
    map: Map<string, LintDetailMeta>,
    message: string,
    node: StoryboardNode,
    path: StoryboardNode[]
  ): void => {
    if (!map.has(message)) {
      map.set(message, getMetaByPath(path.concat(node)));
    }
  };

  const ast = parseStoryboard(storyboard);
  traverseStoryboard(ast, (node, path) => {
    switch (node.type) {
      case "Brick": {
        const { brick, bg, portal } = node.raw as BrickConf;
        if (typeof brick === "string") {
          if (brick === "basic-bricks.script-brick") {
            const meta = getMetaByPath(path.concat(node));
            usingScriptBrick.push({
              message: meta.root
                ? meta.root.type === "route"
                  ? meta.root.alias
                  : meta.root.templateId
                : "unknown",
              meta,
            });
          } else if (providerBrickRegExp.test(brick)) {
            addMeta(warnedProviders, brick, node, path);
          } else if (bg && customProviderBrickRegExp.test(brick)) {
            addMeta(warnedProviders, brick, node, path);
          } else if (portalBricks.has(brick) && !portal) {
            addMeta(warnedPortalBricks, brick, node, path);
          }
        }
        break;
      }
      case "EventHandler": {
        const { target, targetRef, action, useProvider, method, properties } =
          node.raw as {
            target?: string;
            targetRef?: string;
            action?: BuiltinBrickEventHandler["action"];
            useProvider?: string;
            method?: unknown;
            properties?: unknown;
          };
        const isBuiltinAction = typeof action === "string";
        if (isBuiltinAction) {
          switch (action) {
            case "context.assign":
            case "context.load":
            case "context.refresh":
            case "context.replace": {
              const meta = getMetaByPath(path.concat(node));
              if (meta.root?.type === "template") {
                let list = usingCtxActionsInTemplate.get(meta.root.templateId);
                if (!list) {
                  usingCtxActionsInTemplate.set(
                    meta.root.templateId,
                    (list = new Set())
                  );
                }
                list.add(action);
              }
              break;
            }
            default:
              // Unknown actions.
              if (!builtinActions.has(action)) {
                addMeta(unknownEventActions, `action: ${action}`, node, path);
              }
          }
        } else if (typeof target === "string") {
          // Tag name as target.
          if (target !== "_self" && tagNameAsTargetRegExp.test(target)) {
            addMeta(warnedTargets, target, node, path);
          }
        }
        // Unknown event handlers.
        let reason = "";
        if (
          !(
            isBuiltinAction ||
            typeof useProvider === "string" ||
            ((target || targetRef) &&
              ((reason = "Missing `method` or `properties`: "),
              method || properties))
          )
        ) {
          addMeta(
            unknownEventHandlers,
            limitString(`${reason}${JSON.stringify(node.raw)}`, 100),
            node,
            path
          );
        }
        break;
      }
    }
  });

  const { customTemplates } = storyboard.meta ?? {};
  const warnedUsingCtxTemplates: LintDetail[] = [];
  const warnedUsingTplVarTemplates: LintDetail[] = [];
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

      const usingCtxActions = usingCtxActionsInTemplate.get(tpl.name);
      if (usingCtxActions) {
        for (const action of usingCtxActions) {
          contexts.add(action);
        }
      }

      for (const [collection, warned] of [
        [contexts, warnedUsingCtxTemplates],
        [tplVariables, warnedUsingTplVarTemplates],
      ] as const) {
        if (collection.size > 0) {
          warned.push({
            message: tpl.name,
            messageSuffix: `: ${limit(collection, 3).join(", ")}`,
            meta: {
              root: {
                type: "template",
                templateId: tpl.name,
              },
            },
          });
        }
      }
    }
  }

  if (unknownEventActions.size > 0) {
    errors.push({
      type: "error",
      code: "UNKNOWN_EVENT_ACTION",
      message: {
        zh: "您正在使用一些未知的事件动作：",
        en: "You're using unknown event actions:",
      },
      list: [...unknownEventActions.keys()],
      details: [...unknownEventActions.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (unknownEventHandlers.size > 0) {
    errors.push({
      type: "error",
      code: "UNKNOWN_EVENT_HANDLER",
      message: {
        zh: "您正在使用一些未知的事件处理器：",
        en: "You're using unknown event handlers:",
      },
      list: [...unknownEventHandlers.keys()],
      details: [...unknownEventHandlers.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingScriptBrick.length > 0) {
    errors.push({
      type: "error",
      code: "SCRIPT_BRICK",
      message: {
        zh: "您正在使用 `basic-bricks.script-brick`，而它被认为不可维护、兼容性差。请使用微应用函数或自定义处理函数来代替。",
        en: "You're using `basic-bricks.script-brick` which is considered unmaintainable and poorly compatible. Please use storyboard functions or custom processors instead.",
      },
      details: usingScriptBrick,
    });
  }

  if (warnedTargets.size > 0) {
    errors.push({
      type: "error",
      code: "TAG_NAME_AS_TARGET",
      message: {
        zh: "您正在使用构件名作为事件目标，这可能导致意外选中其他构件，请改为使用 id 或 ref：",
        en: "You're using brick tag name as target selector which can cause other brick being selected. Please use id or ref instead:",
      },
      list: [...warnedTargets.keys()],
      details: [...warnedTargets.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (warnedProviders.size > 0) {
    errors.push({
      type: "warn",
      code: "PROVIDER_AS_BRICK",
      message: {
        zh: "您正在使用 Provider 作为构件，现在推荐使用 `useProvider`，无需提前声明：",
        en: "You're using provider as brick. Please use `useProvider` instead, which is more convenient:",
      },
      list: [...warnedProviders.keys()],
      details: [...warnedProviders.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (warnedPortalBricks.size > 0) {
    errors.push({
      type: "warn",
      code: "MISUSE_OF_PORTAL_BRICK",
      message: {
        zh: "您正在使用一些模态框类的构件，但没有将其放置于 portal 中，可能引起页面布局异常：",
        en: "You're using modal bricks, without setting its placement to portal, which can cause unexpected page layout:",
      },
      list: [...warnedPortalBricks.keys()],
      details: [...warnedPortalBricks.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (warnedUsingCtxTemplates.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_CTX_IN_TPL",
      message: {
        zh: "您正在模板中使用 CTX，这破坏了模板的封装性，建议配置为 STATE，并在外部通过属性传递给模板：",
        en: "You're using CTX in templates, which breaks the encapsulation of templates. Please use STATE instead, and pass in externally through properties:",
      },
      list: warnedUsingCtxTemplates.map(
        (detail) => `${detail.message}${detail.messageSuffix}`
      ),
      details: warnedUsingCtxTemplates,
    });
  }

  if (warnedUsingTplVarTemplates.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_TPL_VAR_IN_TPL",
      message: {
        zh: "您正在模板中使用 TPL 变量，它已废弃，建议统一修改为 STATE，它覆盖 TPL 的所有能力，同时支持追踪更新等特性：",
        en: "You're using TPL variables in templates, which is deprecated. Please use STATE instead, which covers all capabilities of TPL, while supports auto track and more:",
      },
      list: warnedUsingTplVarTemplates.map(
        (detail) => `${detail.message}${detail.messageSuffix}`
      ),
      details: warnedUsingTplVarTemplates,
    });
  }

  return errors;
}

function getMetaByPath(path: StoryboardNode[]): LintDetailMeta {
  const meta: LintDetailMeta = {};
  for (let i = path.length - 1; i >= 0; i--) {
    const cursor = path[i];
    switch (cursor.type) {
      case "Brick":
        if (!meta.brick && cursor.raw.iid) {
          meta.brick = {
            instanceId: cursor.raw.iid,
          };
        }
        break;
      case "Route":
        if (!meta.root) {
          meta.root = {
            type: "route",
            alias: cursor.raw.alias,
            instanceId: cursor.raw.iid,
          };
        }
        break;
      case "Template":
        meta.root = {
          type: "template",
          templateId: (cursor.raw as CustomTemplate).name,
        };
        break;
    }
  }

  return meta;
}

function limit(list: Set<string>, max: number): string[] {
  const limited = [...list];
  if (limited.length > max) {
    limited.splice(max, limited.length - max);
    limited.push("...");
  }
  return limited;
}

function limitString(string: string, max: number): string {
  if (string.length > max) {
    return `${string.substring(0, max - 3)}...`;
  }
  return string;
}
