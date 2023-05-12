import { getRuntime } from "@next-core/brick-kit";
import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  SetPropsCustomBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  ConditionalEventHandler,
} from "@next-core/brick-types";
import { safeDumpFields } from "../builder-container/DataView/utils";
import {
  getHandlerType,
  isFlowAPiProvider,
} from "../shared/visual-events/processEventHandler";
import {
  HandlerType,
  EventFormField,
  CustomBrickEventType,
} from "../shared/visual-events/interfaces";
import { isNil, omitBy, omit } from "lodash";

export function covertEventToFormValue(
  handler: BrickEventHandler
): EventFormField {
  const handlerType = getHandlerType(handler);

  if (handlerType === HandlerType.BuiltinAction) {
    //特殊处理 history.push / segueId.push
    if (
      ["segue.push", "history.push"].includes(
        (handler as BuiltinBrickEventHandler).action
      )
    ) {
      const args = (handler as BuiltinBrickEventHandler).args ?? [];
      return {
        handlerType,
        action: (handler as BuiltinBrickEventHandler).action,
        [(handler as BuiltinBrickEventHandler).action === "segue.push"
          ? "segueId"
          : "path"]: args[0] as string,
        ...safeDumpFields(
          omitBy(
            {
              if: handler.if,
              args: args.length > 1 ? args.slice(1) : undefined,
              callback: (handler as BuiltinBrickEventHandler).callback,
            },
            isNil
          )
        ),
      };
    }

    return {
      handlerType,
      action: (handler as BuiltinBrickEventHandler).action,
      ...safeDumpFields(
        omitBy(
          {
            if: handler.if,
            args: (handler as BuiltinBrickEventHandler).args,
            callback: (handler as BuiltinBrickEventHandler).callback,
          },
          isNil
        )
      ),
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
      useProviderMethod:
        (handler as UseProviderEventHandler).method || "resolve",
      pollEnabled: poll?.enabled,
      ...(providerType === "flow" ? { flow: provider } : { provider }),
      ...safeDumpFields(
        omitBy(
          {
            if: handler.if,
            args: (handler as UseProviderEventHandler).args,
            callback: (handler as UseProviderEventHandler).callback,
            poll: poll ? omit(poll, "enabled") : undefined,
          },
          isNil
        )
      ),
    };
  } else if (handlerType === HandlerType.Conditional) {
    return {
      handlerType,
      ...safeDumpFields(
        omitBy(
          {
            if: handler.if,
            then: (handler as ConditionalEventHandler).then,
            else: (handler as ConditionalEventHandler).else,
          },
          isNil
        )
      ),
    };
  } else if (handlerType === CustomBrickEventType.SetProps) {
    const selectorType = "targetRef" in handler ? "targetRef" : "target";
    return {
      handlerType: HandlerType.CustomBrick,
      brickEventType: CustomBrickEventType.SetProps,
      selectorType,
      brickSelector: (handler as SetPropsCustomBrickEventHandler)[
        selectorType
      ] as string,
      ...safeDumpFields(
        omitBy(
          {
            if: handler.if,
            properties: (handler as SetPropsCustomBrickEventHandler).properties,
          },
          isNil
        )
      ),
    };
  } else if (handlerType === CustomBrickEventType.ExecuteMethod) {
    const selectorType = "targetRef" in handler ? "targetRef" : "target";
    return {
      handlerType: HandlerType.CustomBrick,
      brickEventType: CustomBrickEventType.ExecuteMethod,
      selectorType,
      brickSelector: (handler as ExecuteCustomBrickEventHandler)[
        selectorType
      ] as string,
      method: (handler as ExecuteCustomBrickEventHandler).method,
      ...safeDumpFields(
        omitBy(
          {
            if: handler.if,
            args: (handler as ExecuteCustomBrickEventHandler).args,
            callback: (handler as ExecuteCustomBrickEventHandler).callback,
          },
          isNil
        )
      ),
    };
  } else {
    return {} as EventFormField;
  }
}

getRuntime().registerCustomProcessor(
  "nextBuilder.covertEventToFormValue",
  covertEventToFormValue
);
