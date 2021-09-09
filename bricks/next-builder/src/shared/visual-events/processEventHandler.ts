import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  CustomBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
} from "@next-core/brick-types";
import { HandlerType } from "./interfaces";

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

export function getHandlerType(handler: BrickEventHandler): HandlerType {
  if (isBuiltinHandler(handler)) {
    return HandlerType.BuiltinAction;
  } else if (isUseProviderHandler(handler)) {
    return HandlerType.UseProvider;
  } else if (isExecuteCustomHandler(handler)) {
    return HandlerType.ExecuteMethod;
  } else if (isSetPropsCustomHandler(handler)) {
    return HandlerType.SetProps;
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
    case HandlerType.ExecuteMethod:
      return `${
        (handler as ExecuteCustomBrickEventHandler).target ||
        (handler as ExecuteCustomBrickEventHandler).targetRef
      }.${(handler as ExecuteCustomBrickEventHandler).method}`;
    case HandlerType.SetProps:
      return `${
        (handler as SetPropsCustomBrickEventHandler).target ||
        (handler as SetPropsCustomBrickEventHandler).targetRef
      }.setProperties`;
    default:
      return HandlerType.Unknown;
  }
}
