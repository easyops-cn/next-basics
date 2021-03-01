/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import {
  BrickEventHandler,
  BrickEventHandlerCallback,
  BrickEventsMap,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import { HierarchyPointLink } from "d3";
import { EventDownstreamNode, EventDownstreamType } from "./interfaces";
import { styleConfig } from "./styleConfig";

export function buildBrickEventDownstreamTree(
  eventNode: EventDownstreamNode,
  events: BrickEventsMap,
  parentHandlerIndex?: number
): void {
  if (eventNode.type === EventDownstreamType.ROOT) {
    eventNode.height = computeEventDownstreamNodeHeight(eventNode);
  }
  for (const [eventType, handlerOrList] of Object.entries(events)) {
    const handlers: BrickEventHandler[] = [].concat(handlerOrList);
    const childEventNode: EventDownstreamNode =
      eventNode.type === EventDownstreamType.ROOT
        ? {
            type: EventDownstreamType.EVENT,
            eventType,
            handlers,
            children: [],
          }
        : {
            type: EventDownstreamType.CALLBACK,
            callbackType: eventType as keyof BrickEventHandlerCallback,
            parentHandlerIndex,
            handlers,
            children: [],
          };
    childEventNode.height = computeEventDownstreamNodeHeight(childEventNode);
    eventNode.children.push(childEventNode);
    // for (const handler of handlers) {
    handlers.forEach((handler, index) => {
      if ((handler as UseProviderEventHandler).callback) {
        buildBrickEventDownstreamTree(
          childEventNode,
          (handler as UseProviderEventHandler).callback as BrickEventsMap,
          index
        );
      }
    });
  }
}

function computeEventDownstreamNodeHeight(
  eventNode: EventDownstreamNode
): number {
  let height = styleConfig.node.padding * 2 + styleConfig.title.height;
  if (eventNode.type !== EventDownstreamType.ROOT) {
    height +=
      styleConfig.titleMarginBottom +
      eventNode.handlers.length * styleConfig.item.height +
      (eventNode.handlers.length - 1) * styleConfig.item.marginBottom;
  }
  return height;
}

export function computeEventDownstreamSourceX({
  source,
  target,
}: HierarchyPointLink<EventDownstreamNode>): number {
  if (target.data.type === EventDownstreamType.CALLBACK) {
    return (
      source.x -
      source.data.height / 2 +
      styleConfig.node.padding +
      styleConfig.title.height +
      styleConfig.titleMarginBottom +
      target.data.parentHandlerIndex *
        (styleConfig.item.height + styleConfig.item.marginBottom) +
      styleConfig.item.height / 2
    );
  }
  return source.x;
}
