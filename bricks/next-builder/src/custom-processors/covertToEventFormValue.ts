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
import { omit } from "lodash";

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

    const poll = (handler as UseProviderEventHandler).poll;
    const provider = (handler as UseProviderEventHandler).useProvider;
    return {
      handlerType,
      providerType,
      pollEnabled: poll?.enabled,
      ...(providerType === "flow" ? { flow: provider } : { provider }),
      ...safeDumpFields({
        if: handler.if,
        args: (handler as UseProviderEventHandler).args,
        callback: (handler as UseProviderEventHandler).callback,
        ...(poll ? { poll: omit(poll, "enabled") } : {}),
      }),
    };
  } else if (handlerType === HandlerType.SetPorps) {
    const selectorType = "targetRef" in handler ? "targetRef" : "target";
    return {
      handlerType,
      selectorType,
      brickSelector: (handler as SetPropsCustomBrickEventHandler)[selectorType],
      ...safeDumpFields({
        if: handler.if,
        properties: (handler as SetPropsCustomBrickEventHandler).properties,
      }),
    };
  } else if (handlerType === HandlerType.ExectuteMethod) {
    const selectorType = "targetRef" in handler ? "targetRef" : "target";
    return {
      handlerType,
      selectorType,
      brickSelector: (handler as ExecuteCustomBrickEventHandler)[selectorType],
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
