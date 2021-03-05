/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import { isEmpty } from "lodash";
import { HierarchyPointNode } from "d3";
import {
  BrickEventHandler,
  ExecuteCustomBrickEventHandler,
  MessageConf,
} from "@next-core/brick-types";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import {
  EventUpstreamNode,
  EventUpstreamNodeOfRoot,
  EventUpstreamType,
} from "./interfaces";
import { styleConfig } from "./styleConfig";

export function buildBrickEventUpstreamTree(
  targetNode: BuilderRuntimeNode,
  nodes: BuilderRuntimeNode[]
): EventUpstreamNodeOfRoot {
  const rootEventNode: EventUpstreamNode = {
    type: EventUpstreamType.UPSTREAM_ROOT,
    node: targetNode,
    children: [],
  };
  rootEventNode.height = computeEventUpstreamNodeHeight(rootEventNode);
  for (const node of nodes) {
    const stack: EventUpstreamStack = [
      {
        type: EventUpstreamType.UPSTREAM_SOURCE,
      },
    ];
    let mergedEvents: {
      type: EventUpstreamType;
      eventType: string;
      handlers: BrickEventHandler[];
    }[] = [];
    if (!isEmpty(node.$$parsedEvents)) {
      mergedEvents = Object.entries(node.$$parsedEvents).map(
        ([eventType, handlers]) => ({
          type: EventUpstreamType.UPSTREAM_EVENT,
          eventType,
          handlers: [].concat(handlers),
        })
      );
    }
    if (!isEmpty(node.$$parsedLifeCycle)) {
      mergedEvents = mergedEvents.concat(
        Object.entries(node.$$parsedLifeCycle).map(
          ([lifeCycleName, lifeCycleConf]) => {
            let handlers: BrickEventHandler[] = [];
            switch (lifeCycleName) {
              case "onBeforePageLoad":
              case "onPageLoad":
              case "onPageLeave":
              case "onBeforePageLeave":
              case "onAnchorLoad":
              case "onAnchorUnload":
              case "onMessageClose":
                handlers = [].concat(lifeCycleConf);
                break;
              case "onMessage":
                handlers = ([] as MessageConf[])
                  .concat(lifeCycleConf)
                  .flatMap((messageConf) =>
                    ([] as BrickEventHandler[]).concat(messageConf.handlers)
                  );
                break;
              default:
                // eslint-disable-next-line no-console
                console.warn(`unknown lifeCycle: ${lifeCycleName}`);
            }
            return {
              type: EventUpstreamType.UPSTREAM_LIFE_CYCLE,
              eventType: lifeCycleName,
              handlers,
            };
          }
        )
      );
    }
    for (const { type, eventType, handlers } of mergedEvents) {
      collectEventUpstream({
        sourceNode: node,
        targetNode,
        rootEventNode,
        type,
        eventType,
        handlers,
        stack,
      });
    }
  }
  return rootEventNode;
}

type EventUpstreamStack = EventUpstreamStackItem[];

interface EventUpstreamStackItem {
  type: EventUpstreamType;
  eventType?: string;
  handler?: BrickEventHandler;
}

interface CollectEventUpstreamParams {
  sourceNode: BuilderRuntimeNode;
  targetNode: BuilderRuntimeNode;
  rootEventNode: EventUpstreamNode;
  type: EventUpstreamType;
  eventType: string;
  handlers: BrickEventHandler[];
  stack: EventUpstreamStack;
}

function collectEventUpstream({
  sourceNode,
  targetNode,
  rootEventNode,
  type,
  eventType,
  handlers,
  stack,
}: CollectEventUpstreamParams): void {
  for (const handler of handlers as ExecuteCustomBrickEventHandler[]) {
    const currentStack = ([
      {
        type,
        eventType,
        handler,
      },
    ] as EventUpstreamStack).concat(stack);
    if (handler.target) {
      if (targetNode.$$matchedSelectors.includes(handler.target as string)) {
        buildByStack(rootEventNode, currentStack, sourceNode);
      }
    } else if (handler.targetRef) {
      if (targetNode.ref && handler.targetRef === targetNode.ref) {
        buildByStack(rootEventNode, currentStack, sourceNode);
      }
    }
    if (handler.callback) {
      for (const [callbackType, callbackHandlers] of Object.entries(
        handler.callback
      )) {
        collectEventUpstream({
          sourceNode,
          targetNode,
          rootEventNode,
          type: EventUpstreamType.UPSTREAM_CALLBACK,
          eventType: callbackType,
          handlers: [].concat(callbackHandlers),
          stack: currentStack,
        });
      }
    }
  }
}

function buildByStack(
  rootEventNode: EventUpstreamNode,
  stack: EventUpstreamStack,
  sourceNode: BuilderRuntimeNode
): void {
  let currentEventNode: EventUpstreamNode = rootEventNode;
  for (const item of stack) {
    let childEventNode: EventUpstreamNode;
    switch (item.type) {
      case EventUpstreamType.UPSTREAM_SOURCE:
        childEventNode = {
          type: item.type,
          node: sourceNode,
          children: [],
        };
        break;
      default:
        childEventNode = {
          type: item.type as EventUpstreamType.UPSTREAM_EVENT,
          eventType: item.eventType,
          handler: item.handler,
          children: [],
        };
    }
    childEventNode.height = computeEventUpstreamNodeHeight(childEventNode);
    currentEventNode.children.push(childEventNode);
    currentEventNode = childEventNode;
  }
}

function computeEventUpstreamNodeHeight(eventNode: EventUpstreamNode): number {
  let height = styleConfig.node.padding * 2 + styleConfig.title.height;
  if (eventNode.type !== EventUpstreamType.UPSTREAM_SOURCE) {
    height += styleConfig.titleMarginBottom + styleConfig.item.height;
  }
  return height;
}

export function computeEventUpstreamSourceX(
  source: HierarchyPointNode<EventUpstreamNode>
): number {
  if (source.data.type !== EventUpstreamType.UPSTREAM_SOURCE) {
    return (
      source.x -
      source.data.height / 2 +
      styleConfig.node.padding +
      styleConfig.title.height +
      styleConfig.titleMarginBottom +
      styleConfig.item.height / 2
    );
  }
  return source.x;
}
