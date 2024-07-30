import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  CustomBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
  ConditionalEventHandler,
} from "@next-core/brick-types";
import { CustomBrickEventType, HandlerType } from "./interfaces";

export function isBuiltinHandler(
  handler: BrickEventHandler
): handler is BuiltinBrickEventHandler {
  return typeof (handler as BuiltinBrickEventHandler).action === "string";
}

export function isUseProviderHandler(
  handler: BrickEventHandler
): handler is UseProviderEventHandler {
  return typeof (handler as UseProviderEventHandler).useProvider === "string";
}

export function isExecuteCustomHandler(
  handler: CustomBrickEventHandler
): handler is ExecuteCustomBrickEventHandler {
  return !!(handler as ExecuteCustomBrickEventHandler).method;
}

export function isSetPropsCustomHandler(
  handler: CustomBrickEventHandler
): handler is SetPropsCustomBrickEventHandler {
  return !!(handler as SetPropsCustomBrickEventHandler).properties;
}

export function isFlowAPiProvider(provider: string): boolean {
  return provider?.includes("@");
}

export function isApiProxyProvider(provider: string): boolean {
  return provider === "basic.http-proxy-request";
}

export function isConditionalEventHandler(
  handler: BrickEventHandler
): handler is ConditionalEventHandler {
  return !!(handler as ConditionalEventHandler).then;
}

export function getHandlerType(
  handler: BrickEventHandler
): Exclude<HandlerType, HandlerType.CustomBrick> | CustomBrickEventType {
  if (isBuiltinHandler(handler)) {
    return HandlerType.BuiltinAction;
  } else if (isUseProviderHandler(handler)) {
    return HandlerType.UseProvider;
  } else if (isConditionalEventHandler(handler)) {
    return HandlerType.Conditional;
  } else if (isExecuteCustomHandler(handler)) {
    return CustomBrickEventType.ExecuteMethod;
  } else if (isSetPropsCustomHandler(handler)) {
    return CustomBrickEventType.SetProps;
  } else {
    return HandlerType.Unknown;
  }
}

export function getHandlerName(handler: BrickEventHandler): string {
  switch (getHandlerType(handler)) {
    case HandlerType.BuiltinAction:
      return (handler as BuiltinBrickEventHandler).action;
    case HandlerType.UseProvider:
      return `${(handler as UseProviderEventHandler).useProvider}.${
        (handler as UseProviderEventHandler).method ?? "resolve"
      }`;
    case HandlerType.Conditional:
      return "Conditional";
    case CustomBrickEventType.ExecuteMethod:
      return `${
        (handler as ExecuteCustomBrickEventHandler).target ||
        (handler as ExecuteCustomBrickEventHandler).targetRef
      }.${(handler as ExecuteCustomBrickEventHandler).method}`;
    case CustomBrickEventType.SetProps:
      return `${
        (handler as SetPropsCustomBrickEventHandler).target ||
        (handler as SetPropsCustomBrickEventHandler).targetRef
      }.setProperties`;
    default:
      return HandlerType.Unknown;
  }
}
