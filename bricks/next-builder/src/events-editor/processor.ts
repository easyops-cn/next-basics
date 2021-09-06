import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  CustomBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
} from "@next-core/brick-types";
import { HandlerType } from "./components/handler-item/HandlerItem";

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

export function getHanderType(handler: BrickEventHandler): HandleType {
  if (isBuiltinHandler(handler)) {
    return HandlerType.BuiltinAction;
  } else if (isUseProviderHandler(handler)) {
    return HandlerType.UseProvider;
  } else if (isExecuteCustomHandler(handler)) {
    return HandlerType.ExectuteMethod;
  } else if (isSetPropsCustomHandler(handler)) {
    return HandlerType.SetPorps;
  } else {
    return HandlerType.Unkown;
  }
}

export function getHandlerName(handler: BrickEventHandler): string {
  switch (getHanderType(handler)) {
    case HandlerType.BuiltinAction:
      return (handler as BuiltinBrickEventHandler).action;
    case HandlerType.UseProvider:
      return `${(handler as UseProviderEventHandler).useProvider}.${
        (handler as UseProviderEventHandler).method ?? "resolve"
      }`;
    case HandlerType.ExectuteMethod:
      return `${
        (handler as ExecuteCustomBrickEventHandler).target ||
        (handler as ExecuteCustomBrickEventHandler).targetRef
      }.${(handler as ExecuteCustomBrickEventHandler).method}`;
    case HandlerType.SetPorps:
      return `${
        (handler as SetPropsCustomBrickEventHandler).target ||
        (handler as SetPropsCustomBrickEventHandler).targetRef
      }.setProperties`;
    default:
      return HandlerType.Unkown;
  }
}
