import { Identifier } from "@babel/types";
import type {
  BrickConf,
  BuiltinBrickEventHandler,
  ContextConf,
  CustomTemplate,
  CustomTemplateState,
  I18nData,
  RouteConf,
  Storyboard,
  UseProviderResolveConf,
} from "@next-core/brick-types";
import {
  parseStoryboard,
  type StoryboardNode,
  traverseStoryboard,
  visitStoryboardExpressions,
  EstreeLiteral,
  EstreeParent,
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
  | "UNKNOWN_EVENT_HANDLER"
  | "INSTALLED_APPS_USE_DYNAMIC_ARG"
  | "USING_ONCHANGE_IN_CTX"
  | "USING_USERESOLVE_IN_BRICK_LIFECYCLE"
  | "USING_WARNED_EXPRESSION_IN_TEMPLATE"
  | "USING_OLD_PROVODERS_IN_USEPROVIDER"
  | "USING_INJECT"
  | "USING_DYNAMIC_ARGUMENTS_IN_CTX_OR_STATE"
  | "USING_OLD_TEMPLATE"
  | "USING_PROVIDER_IN_ROUTE"
  | "USING_DEFINE_RESOLVES_IN_ROUTE"
  | "USING_DIRECT_IN_ROUTE"
  | "USING_CONTEXT_IN_BRICK"
  | "USING_EXPORTS_IN_BRICK";

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

const INSTALLED_APPS = "INSTALLED_APPS";
const HAS = "has";
const ACTIONS_BETTER_REPLACED_BY_TRACK = [
  "context.replace",
  "context.assign",
  "state.update",
] as unknown as BuiltinBrickEventHandler["action"][];

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
  const injectExp = /[$@]\{.*?\}/;
  const routePathExp = /^\$\{APP\.homepage\}/;
  const contextWithDynamicArgsExp = /\s(CTX|STATE)\[(.*?\])/g;
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
  const usingRedirectInRoute = new Map<string, LintDetailMeta>();
  const usingProviderInRoute = new Map<string, LintDetailMeta>();
  const usingDefineResolve = new Map<string, LintDetailMeta>();
  const usingCtxActionsInTemplate = new Map<string, Set<string>>();
  const unknownEventActions = new Map<string, LintDetailMeta>();
  const unknownEventHandlers = new Map<string, LintDetailMeta>();
  const usingWarnedOnChangeInCtxOrState = new Map<string, LintDetailMeta>();
  const usingContextInBrick = new Map<string, LintDetailMeta>();
  const usingExportInBrick = new Map<string, LintDetailMeta>();
  const usingUseResolveInBrickLifeCycle = new Map<string, LintDetailMeta>();
  const usingOldProvidersInUseProvider = new Map<string, LintDetailMeta>();
  const usingOldTemplate = new Map<string, LintDetailMeta>();

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
      case "Route": {
        const { providers, defineResolves, redirect, type } =
          node.raw as RouteConf;
        if (providers) {
          providers.forEach((provider) => {
            const providerName =
              typeof provider === "string" ? provider : provider.brick;
            addMeta(usingProviderInRoute, providerName, node, path);
          });
        }
        if (defineResolves) {
          defineResolves.forEach((defineResolve) => {
            addMeta(usingDefineResolve, defineResolve.id, node, path);
          });
        }
        if (type !== "redirect" && redirect) {
          addMeta(usingRedirectInRoute, node.raw.path, node, path);
        }
        break;
      }
      case "Brick": {
        const { brick, bg, portal, context, template, exports } =
          node.raw as BrickConf;
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
        if (context?.length) {
          context.forEach((item) => {
            addMeta(usingContextInBrick, item.name, node, path);
          });
        }
        if (template) {
          addMeta(usingOldTemplate, template, node, path);
        }
        if (exports) {
          addMeta(usingExportInBrick, brick, node, path);
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
        if (providerBrickRegExp.test(useProvider)) {
          addMeta(usingOldProvidersInUseProvider, useProvider, node, path);
        }
        break;
      }
      case "Context": {
        const { name } = node.raw as ContextConf | CustomTemplateState;
        if (node.onChange?.length) {
          const isWarned = node.onChange.every(
            (item) =>
              ACTIONS_BETTER_REPLACED_BY_TRACK.includes(item.raw?.action) ||
              (item.raw?.target && item.raw?.properties)
          );
          isWarned &&
            addMeta(usingWarnedOnChangeInCtxOrState, name, node, path);
        }
        break;
      }
      case "ResolveLifeCycle": {
        if (node.resolves?.length) {
          node.resolves.forEach((item) =>
            addMeta(
              usingUseResolveInBrickLifeCycle,
              item.raw?.useProvider || item.raw?.provider || item.raw?.ref,
              node,
              path
            )
          );
        }
        break;
      }
      case "Resolvable": {
        const { useProvider } = node.raw as UseProviderResolveConf;
        if (providerBrickRegExp.test(useProvider)) {
          addMeta(usingOldProvidersInUseProvider, useProvider, node, path);
        }
        break;
      }
    }
  });

  const { routes } = storyboard ?? {};
  const { customTemplates, menus } = storyboard.meta ?? {};
  const warnedUsingCtxTemplates: LintDetail[] = [];
  const warnedUsingTplVarTemplates: LintDetail[] = [];
  const usingWarnedExpressionInTemplate: LintDetail[] = [];
  const usingInject: LintDetail[] = [];
  const usingDynamicArgumentsInContext: LintDetail[] = [];
  let installedAppsUseDynamicArguments = false;

  visitStoryboardExpressions(
    [storyboard.routes, menus],
    (node, parent) => {
      !installedAppsUseDynamicArguments &&
        (installedAppsUseDynamicArguments = visitInstalledAppsFactory(
          node,
          parent
        ));
    },
    {
      matchExpressionString(value) {
        return value.includes("INSTALLED_APPS");
      },
    }
  );

  if (Array.isArray(routes)) {
    for (const route of routes) {
      const dynamicArgumentsContext = new Set<string>();
      const injects = new Set<string>();
      visitStoryboardExpressions(
        [route],
        () => {
          //
        },
        {
          matchExpressionString: (value) => {
            if (value && contextWithDynamicArgsExp.test(value)) {
              dynamicArgumentsContext.add(value);
            }
            return true;
          },
          visitNonExpressionString(value) {
            if (injectExp.test(value) && !routePathExp.test(value)) {
              injects.add(value);
            }
          },
        }
      );
      for (const [collection, warned] of [
        [injects, usingInject],
        [dynamicArgumentsContext, usingDynamicArgumentsInContext],
      ] as const) {
        if (collection.size > 0) {
          warned.push({
            message: route.alias,
            messageSuffix: `: ${limit(collection, 3).join(", ")}`,
            meta: {
              root: {
                type: "route",
                instanceId: route.iid,
              },
            },
          });
        }
      }
    }
  }

  if (Array.isArray(customTemplates)) {
    for (const tpl of customTemplates) {
      const contexts = new Set<string>();
      const tplVariables = new Set<string>();
      const warnedExpressionInTpl = new Set<string>();
      const injects = new Set<string>();
      const dynamicArgumentsContext = new Set<string>();
      visitStoryboardExpressions(
        [tpl.bricks, tpl.state],
        (node, parent) => {
          visitCTXOrTPLFatctory(
            node,
            parent,
            node.name === "CTX" ? contexts : tplVariables
          );
          !installedAppsUseDynamicArguments &&
            (installedAppsUseDynamicArguments = visitInstalledAppsFactory(
              node,
              parent
            ));
          visitTemplateExpressionFactory(node, parent, warnedExpressionInTpl);
        },
        {
          matchExpressionString: (value) => {
            if (value && contextWithDynamicArgsExp.test(value)) {
              dynamicArgumentsContext.add(value);
            }
            return true;
          },
          visitNonExpressionString(value) {
            if (injectExp.test(value)) {
              injects.add(value);
            }
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
        [warnedExpressionInTpl, usingWarnedExpressionInTemplate],
        [injects, usingInject],
        [dynamicArgumentsContext, usingDynamicArgumentsInContext],
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

  if (installedAppsUseDynamicArguments) {
    errors.push({
      type: "error",
      code: "INSTALLED_APPS_USE_DYNAMIC_ARG",
      message: {
        zh: "您在项目中使用了 INSTALLED_APPS.has 表达式, 并且使用了动态参数, 这将可能引起错误; 请将入参修改为静态参数, 例如: INSTALLED_APPS.has('xxx')",
        en: "You're using INSTALLED_APPS.has in project with dynamic arguments, it could be get the error result. Please use INSTALLED_APPS.has with static arguments, for example: INSTALLED_APPS.has('xxx')",
      },
    });
  }

  if (usingWarnedOnChangeInCtxOrState.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_ONCHANGE_IN_CTX",
      message: {
        zh: "您在 Context 或 State 的 onChange 中使用了 context.replace 或 set brick properties 等事件处理器, 请使用 track context 或 track state 代替:",
        en: "You are using an event handler such as context.replace or set brick properties in onChange of context or state. Please use track Context or track State instead:",
      },
      list: [...usingWarnedOnChangeInCtxOrState.keys()],
      details: [...usingWarnedOnChangeInCtxOrState.entries()].map(
        ([message, meta]) => ({
          message,
          meta,
        })
      ),
    });
  }

  if (usingUseResolveInBrickLifeCycle.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_USERESOLVE_IN_BRICK_LIFECYCLE",
      message: {
        zh: "您在 lifeCycle 中使用了 useResolve 获取数据, 建议您使用 context 或 state 代替:",
        en: "You are using useResolve in lifeCycle. Please use context or state instead:",
      },
      list: [...usingUseResolveInBrickLifeCycle.keys()],
      details: [...usingUseResolveInBrickLifeCycle.entries()].map(
        ([message, meta]) => ({
          message,
          meta,
        })
      ),
    });
  }

  if (usingWarnedExpressionInTemplate.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_WARNED_EXPRESSION_IN_TEMPLATE",
      message: {
        zh: "您正在模板中使用 QUERY 和 PATH 等变量，建议修改为从外部传入相关数据:",
        en: "You are using QUERY, PATH and other variables in the custom-template. Please pass in parameters from outside instead:",
      },
      list: usingWarnedExpressionInTemplate.map(
        (detail) => `${detail.message}${detail.messageSuffix}`
      ),
      details: usingWarnedExpressionInTemplate,
    });
  }

  if (usingOldProvidersInUseProvider.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_OLD_PROVODERS_IN_USEPROVIDER",
      message: {
        zh: "您在 useProvider 中调用了旧版的 Providers-of-xxx, 建议修改为直接调用契约:",
        en: "You are calling the old provider-of-xxx in useProvider. Please call the contract directly instead:",
      },
      list: [...usingOldProvidersInUseProvider.keys()],
      details: [...usingOldProvidersInUseProvider.entries()].map(
        ([message, meta]) => ({
          message,
          meta,
        })
      ),
    });
  }

  if (usingInject.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_INJECT",
      message: {
        zh: "您正在使用参数注入写法, 如 ${xxx} 或 @{xxx}, 建议修改为表达式:",
        en: "You are using the parameter injection method, such as ${xxx} or @{xxx}. Please use the expression instead:",
      },
      list: usingInject.map(
        (detail) => `${detail.message}${detail.messageSuffix}`
      ),
      details: usingInject,
    });
  }

  if (usingOldTemplate.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_OLD_TEMPLATE",
      message: {
        zh: "您正在使用旧的模板构件, 这种类型的构件在 v3 将决定废除，建议使用 Widget 或 自定义模板 构件进行代替: ",
        en: "You are using old template components, which will be decided to be abolished in v3, Please use Widget or CustomTemplate instead: ",
      },
      list: [...usingOldTemplate.keys()],
      details: [...usingOldTemplate.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingProviderInRoute.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_PROVIDER_IN_ROUTE",
      message: {
        zh: "您在路由上面定义了 provider, 建议在 context 中使用 useProvider 替代:",
        en: "You have defined Provider on the route, and this feature will be dropped in v3, Please use useProvider in route instead: ",
      },
      list: [...usingProviderInRoute.keys()],
      details: [...usingProviderInRoute.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingDefineResolve.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_DEFINE_RESOLVES_IN_ROUTE",
      message: {
        zh: "您在路由上面定义了 defineResolves, 建议在 context 中使用 useProvider 替代: ",
        en: "You have defined defineResolves on the route, and this feature will be dropped in v3, Please use useProvider in route instead: ",
      },
      list: [...usingDefineResolve.keys()],
      details: [...usingDefineResolve.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }
  if (usingRedirectInRoute.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_DIRECT_IN_ROUTE",
      message: {
        zh: "您在路由上面定义了 redirect, 但路由类型非 redirect, 这将导致 redirect 不生效: ",
        en: "You have defined redirect on the route, but the route type is not redirect, which will cause redirect to not take effect: ",
      },
      list: [...usingDefineResolve.keys()],
      details: [...usingDefineResolve.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingContextInBrick.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_CONTEXT_IN_BRICK",
      message: {
        zh: "您在构件上定义了 context, 建议将其迁移至路由上: ",
        en: "You have defined the context on the component, Please migrate it to the route: ",
      },
      list: [...usingContextInBrick.keys()],
      details: [...usingContextInBrick.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingExportInBrick.size > 0) {
    errors.push({
      type: "warn",
      code: "USING_EXPORTS_IN_BRICK",
      message: {
        zh: "您在构件上使用了 exports,该字段即将废弃, 建议使用 context 并指定 property 来声明一个上下文变量绑定到构件属性: ",
        en: "You have used exports on a component, and this field is about to be discarded. Please use context and specify property to declare a context variable bound to the component property: ",
      },
      list: [...usingExportInBrick.keys()],
      details: [...usingExportInBrick.entries()].map(([message, meta]) => ({
        message,
        meta,
      })),
    });
  }

  if (usingDynamicArgumentsInContext.length > 0) {
    errors.push({
      type: "warn",
      code: "USING_DYNAMIC_ARGUMENTS_IN_CTX_OR_STATE",
      message: {
        zh: "您通过动态访问 CTX/STATE, 这种编写方式是不推荐的, 建议使用静态访问写法替代, 例如: `CTX.a ? CTX.b : CTX.b`",
        en: "You use dynamic access to CTX/STATE, which is not recommended. Please use static access instead, for example: ` CTX. a ? CTX.b : CTX.b`",
      },
      list: usingDynamicArgumentsInContext.map(
        (detail) => `${detail.message}${detail.messageSuffix}`
      ),
      details: usingDynamicArgumentsInContext,
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

function visitCTXOrTPLFatctory(
  node: Identifier,
  parent: EstreeParent,
  collection: Set<string>
): void {
  if (node.name === "CTX" || node.name === "TPL") {
    const memberParent = parent[parent.length - 1];
    if (
      memberParent?.node.type === "MemberExpression" &&
      memberParent.key === "object"
    ) {
      const memberNode = memberParent.node;
      if (!memberNode.computed && memberNode.property.type === "Identifier") {
        collection.add(`${node.name}.${memberNode.property.name}`);
      } else if (
        memberNode.computed &&
        (memberNode.property as any).type === "Literal" &&
        typeof (memberNode.property as any).value === "string"
      ) {
        collection.add(`${node.name}[${(memberNode.property as any).raw}]`);
      } else {
        collection.add(`${node.name}[...]`);
      }
    } else {
      collection.add(node.name);
    }
  }
}

function visitInstalledAppsFactory(
  node: Identifier,
  parent: EstreeParent
): boolean {
  if (node.name === INSTALLED_APPS) {
    const memberParent = parent[parent.length - 1];
    const callParent = parent[parent.length - 2];
    if (
      callParent?.node.type === "CallExpression" &&
      callParent?.key === "callee" &&
      memberParent?.node.type === "MemberExpression" &&
      memberParent.key === "object" &&
      !memberParent.node.computed &&
      memberParent.node.property.type === "Identifier" &&
      memberParent.node.property.name === HAS
    ) {
      const args = callParent.node.arguments as unknown as EstreeLiteral[];
      if (
        args.length > 0 &&
        (args[0].type !== "Literal" || typeof args[0].value !== "string")
      ) {
        return true;
      }
    }
  }
}

function visitTemplateExpressionFactory(
  node: Identifier,
  parent: EstreeParent,
  collection: Set<string>
): void {
  if (node.name === "QUERY" || node.name === "PATH") {
    const memberParent = parent[parent.length - 1];
    if (
      memberParent?.node.type === "MemberExpression" &&
      memberParent.key === "object"
    ) {
      const memberNode = memberParent.node;
      if (!memberNode.computed && memberNode.property.type === "Identifier") {
        collection.add(`${node.name}.${memberNode.property.name}`);
      } else if (
        memberNode.computed &&
        (memberNode.property as any).type === "Literal" &&
        typeof (memberNode.property as any).value === "string"
      ) {
        collection.add(`${node.name}[${(memberNode.property as any).raw}]`);
      } else {
        collection.add(`${node.name}[...]`);
      }
    } else {
      collection.add(node.name);
    }
  }
}
