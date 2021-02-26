/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import {
  BrickEventHandler,
  BrickEventHandlerCallback,
  BrickEventsMap,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import { EventDownstreamNode, EventDownstreamType } from "./interfaces";
import { styleConfig } from "./styleConfig";

export function buildBrickEventDownstreamTree(
  eventNode: EventDownstreamNode,
  events: BrickEventsMap
): void {
  eventNode.height = computeEventNodeHeight(eventNode);
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
            handlers,
            children: [],
          };
    eventNode.children.push(childEventNode);
    for (const handler of handlers) {
      if ((handler as UseProviderEventHandler).callback) {
        buildBrickEventDownstreamTree(
          childEventNode,
          (handler as UseProviderEventHandler).callback as BrickEventsMap
        );
      }
    }
  }
}

function computeEventNodeHeight(eventNode: EventDownstreamNode): number {
  let height = styleConfig.node.padding * 2 + styleConfig.title.height;
  if (eventNode.type !== EventDownstreamType.ROOT) {
    height +=
      eventNode.handlers.length * styleConfig.item.height +
      (eventNode.handlers.length - 1) * styleConfig.item.marginBottom;
  }
  return height;
}
