import { getRuntime } from "@next-core/brick-kit";
import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  SetPropsCustomBrickEventHandler,
  ExecuteCustomBrickEventHandler,
} from "@next-core/brick-types";
import { safeDumpFields } from "../builder-container/DataView/utils";
import {
  getHanderType,
  isFlowAPiProvider,
} from "../shared//visual-events/processEventHandler";
import { HandlerType } from "../shared//visual-events/interfaces";

export function covertToEventFormValue(handler: BrickEventHandler): any {
  const handlerType = getHanderType(handler);

  if (handlerType === HandlerType.BuiltinAction) {
    return {
      handlerType,
      action: (handler as BuiltinBrickEventHandler).action,
      ...safeDumpFields({
        if: handler.if,
        args: (handler as BuiltinBrickEventHandler).args,
      }),
    };
  } else if (handlerType === HandlerType.UseProvider) {
    const providerType = isFlowAPiProvider(
      (handler as UseProviderEventHandler).useProvider
    )
      ? "flow"
      : "provider";
    const provider = (handler as UseProviderEventHandler).useProvider;
    return {
      handlerType,
      providerType,
      ...(providerType === "flow" ? { flow: provider } : { provider }),
      ...safeDumpFields({
        if: handler.if,
        args: (handler as UseProviderEventHandler).args,
        callback: (handler as UseProviderEventHandler).callback,
      }),
    };
  } else if (handlerType === HandlerType.SetPorps) {
    return {
      handlerType,
      brickSelector:
        (handler as SetPropsCustomBrickEventHandler).target ||
        (handler as SetPropsCustomBrickEventHandler).targetRef,
      ...safeDumpFields({
        if: handler.if,
        properties: (handler as SetPropsCustomBrickEventHandler).properties,
      }),
    };
  } else if (handlerType === HandlerType.ExectuteMethod) {
    return {
      handlerType,
      brickSelector:
        (handler as ExecuteCustomBrickEventHandler).target ||
        (handler as ExecuteCustomBrickEventHandler).targetRef,
      method: (handler as ExecuteCustomBrickEventHandler).method,
      ...safeDumpFields({
        if: handler.if,
        args: (handler as ExecuteCustomBrickEventHandler).args,
      }),
    };
  } else {
    return {};
  }
}

getRuntime().registerCustomProcessor(
  "nextBuilder.covertToEventFormValue",
  covertToEventFormValue
);
