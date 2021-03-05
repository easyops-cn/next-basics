/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import {
  BrickEventHandler,
  MessageConf,
  UseProviderEventHandler,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { HierarchyPointLink } from "d3";
import { isEmpty } from "lodash";
import {
  EventDownstreamNode,
  EventDownstreamNodeOfRoot,
  EventDownstreamType,
} from "./interfaces";
import { styleConfig } from "./styleConfig";

export function buildBrickEventDownstreamTree(
  node: BuilderRuntimeNode
): EventDownstreamNodeOfRoot {
  const rootEventNode: EventDownstreamNode = {
    type: EventDownstreamType.ROOT,
    node,
    children: [],
  };
  rootEventNode.height = computeEventDownstreamNodeHeight(rootEventNode);

  if (!isEmpty(node.$$parsedEvents)) {
    for (const [eventType, handlers] of Object.entries(node.$$parsedEvents)) {
      processBrickEventDownstreamTree({
        eventNode: rootEventNode,
        type: EventDownstreamType.EVENT,
        eventType,
        handlers: [].concat(handlers),
      });
    }
  }

  if (!isEmpty(node.$$parsedLifeCycle)) {
    for (const [lifeCycleName, lifeCycleConf] of Object.entries(
      node.$$parsedLifeCycle
    )) {
      switch (lifeCycleName) {
        case "onBeforePageLoad":
        case "onPageLoad":
        case "onPageLeave":
        case "onBeforePageLeave":
        case "onAnchorLoad":
        case "onAnchorUnload":
        case "onMessageClose":
          processBrickEventDownstreamTree({
            eventNode: rootEventNode,
            type: EventDownstreamType.LIFE_CYCLE,
            eventType: lifeCycleName,
            handlers: ([] as BrickEventHandler[]).concat(lifeCycleConf),
          });
          break;
        case "onMessage":
          ([] as MessageConf[]).concat(lifeCycleConf).forEach((messageConf) => {
            processBrickEventDownstreamTree({
              eventNode: rootEventNode,
              type: EventDownstreamType.LIFE_CYCLE,
              eventType: lifeCycleName,
              handlers: ([] as BrickEventHandler[]).concat(
                messageConf.handlers
              ),
              channel: messageConf.channel,
            });
          });
          break;
        default:
          // eslint-disable-next-line no-console
          console.warn(`unknown lifeCycle: ${lifeCycleName}`);
      }
    }
  }

  return rootEventNode;
}

function processBrickEventDownstreamTree({
  eventNode,
  type,
  eventType,
  handlers,
  channel,
  parentHandlerIndex,
}: {
  eventNode: EventDownstreamNode;
  type: EventDownstreamType;
  eventType: string;
  handlers: BrickEventHandler[];
  channel?: string;
  parentHandlerIndex?: number;
}): void {
  const childEventNode = {
    type,
    eventType,
    handlers,
    parentHandlerIndex,
    channel,
    children: [],
  } as EventDownstreamNode;
  childEventNode.height = computeEventDownstreamNodeHeight(childEventNode);
  eventNode.children.push(childEventNode);
  handlers.forEach((handler, index) => {
    if ((handler as UseProviderEventHandler).callback) {
      for (const [callbackType, callbackHandlers] of Object.entries(
        (handler as UseProviderEventHandler).callback
      )) {
        processBrickEventDownstreamTree({
          eventNode: childEventNode,
          type: EventDownstreamType.CALLBACK,
          eventType: callbackType,
          handlers: [].concat(callbackHandlers),
          parentHandlerIndex: index,
        });
      }
    }
  });
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
