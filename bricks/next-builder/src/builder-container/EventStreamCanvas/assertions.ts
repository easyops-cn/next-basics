import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import {
  EventDownstreamNode,
  EventDownstreamType,
  EventStreamNode,
} from "./interfaces";

export function isEventDownstreamNode(
  eventNode: EventStreamNode
): eventNode is EventDownstreamNode {
  return [
    EventDownstreamType.ROOT,
    EventDownstreamType.EVENT,
    EventDownstreamType.CALLBACK,
  ].includes((eventNode as EventDownstreamNode).type);
}

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

export function isExecuteHandler(
  handler: BrickEventHandler
): handler is ExecuteCustomBrickEventHandler {
  return !!(
    ((handler as ExecuteCustomBrickEventHandler).target ||
      (handler as ExecuteCustomBrickEventHandler).targetRef) &&
    (handler as ExecuteCustomBrickEventHandler).method
  );
}

export function isSetPropsHandler(
  handler: BrickEventHandler
): handler is SetPropsCustomBrickEventHandler {
  return !!(
    ((handler as SetPropsCustomBrickEventHandler).target ||
      (handler as SetPropsCustomBrickEventHandler).targetRef) &&
    (handler as SetPropsCustomBrickEventHandler).properties
  );
}
