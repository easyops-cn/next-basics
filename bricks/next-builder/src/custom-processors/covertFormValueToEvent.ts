import { getRuntime } from "@next-core/brick-kit";
import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  UseProviderEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
} from "@next-core/brick-types";
import { castArray, isNil, set } from "lodash";
import {
  safeLoadFields,
  safeLoadField,
} from "../builder-container/DataView/utils";
import {
  CustomBrickEventType,
  EventFormField,
  HandlerType,
} from "../shared/visual-events/interfaces";

export function covertFormValueToEvent(
  formValue: EventFormField
): BrickEventHandler {
  if (formValue.handlerType === HandlerType.BuiltinAction) {
    //特殊处理 history.push / segueId.push
    if (["segue.push", "history.push"].includes(formValue.action)) {
      const restArgs =
        formValue.args !== undefined
          ? safeLoadField(formValue.args, "args")
          : [];
      return {
        action: formValue.action as string,
        ...safeLoadFields({
          if: formValue.if,
          callback: formValue.callback,
        }),
        args: [
          formValue.action === "segue.push"
            ? formValue.segueId
            : formValue.path,
          ...(isNil(restArgs) ? [] : castArray(restArgs)),
        ],
      } as BuiltinBrickEventHandler;
    }

    return {
      action: formValue.action,
      ...safeLoadFields({
        if: formValue.if,
        args: formValue.args,
        callback: formValue.callback,
      }),
    } as BuiltinBrickEventHandler;
  } else if (formValue.handlerType === HandlerType.UseProvider) {
    const useProvider =
      formValue.providerType === "provider"
        ? formValue.provider
        : formValue.flow;

    const loadFields = safeLoadFields({
      if: formValue.if,
      args: formValue.args,
      poll: formValue.poll,
      callback: formValue.callback,
    });

    if (loadFields.poll && formValue.pollEnabled) {
      set(loadFields, "poll.enabled", formValue.pollEnabled);
    }

    return {
      useProvider,
      ...(formValue.useProviderMethod === "resolve"
        ? {}
        : { method: formValue.useProviderMethod }),
      ...loadFields,
    } as UseProviderEventHandler;
  } else if (
    formValue.handlerType === HandlerType.CustomBrick &&
    formValue.brickEventType === CustomBrickEventType.ExecuteMethod
  ) {
    return {
      ...(formValue.selectorType === "target"
        ? { target: formValue.brickSelector }
        : { targetRef: formValue.brickSelector }),
      method: formValue.method,
      ...safeLoadFields({
        if: formValue.if,
        args: formValue.args,
        callback: formValue.callback,
      }),
    } as ExecuteCustomBrickEventHandler;
  } else if (
    formValue.handlerType === HandlerType.CustomBrick &&
    formValue.brickEventType === CustomBrickEventType.SetProps
  ) {
    return {
      ...(formValue.selectorType === "target"
        ? { target: formValue.brickSelector }
        : { targetRef: formValue.brickSelector }),
      ...safeLoadFields({
        if: formValue.if,
        properties: formValue.properties,
      }),
    } as SetPropsCustomBrickEventHandler;
  }
}

getRuntime().registerCustomProcessor(
  "nextBuilder.covertFormValueToEvent",
  covertFormValueToEvent
);
