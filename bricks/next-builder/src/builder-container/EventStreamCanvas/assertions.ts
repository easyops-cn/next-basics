import {
  BrickEventHandler,
  BuiltinBrickEventHandler,
  ExecuteCustomBrickEventHandler,
  SetPropsCustomBrickEventHandler,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import {
  EventDownstreamNode,
  EventDownstreamNodeOfLifeCycle,
  EventDownstreamType,
  EventStreamNode,
  EventUpstreamNodeOfLifeCycle,
  EventUpstreamType,
} from "./interfaces";

export function isEventDownstreamNode(
  eventNode: EventStreamNode
): eventNode is EventDownstreamNode {
  switch (eventNode.type) {
    case EventDownstreamType.ROOT:
    case EventDownstreamType.EVENT:
    case EventDownstreamType.LIFE_CYCLE:
    case EventDownstreamType.CALLBACK:
      return true;
    default:
      return false;
  }
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

export function hasChannel(
  eventNode: EventStreamNode
): eventNode is EventDownstreamNodeOfLifeCycle | EventUpstreamNodeOfLifeCycle {
  return (
    (eventNode.type === EventDownstreamType.LIFE_CYCLE ||
      eventNode.type === EventUpstreamType.UPSTREAM_LIFE_CYCLE) &&
    eventNode.eventType === "onMessage"
  );
}
