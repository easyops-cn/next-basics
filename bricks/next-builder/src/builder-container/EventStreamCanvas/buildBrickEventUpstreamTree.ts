/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import { isEmpty } from "lodash";
import { HierarchyPointNode } from "d3";
import {
  BrickEventHandler,
  ExecuteCustomBrickEventHandler,
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
    if (isEmpty(node.$$parsedEvents)) {
      continue;
    }
    const stack: EventUpstreamStack = [
      {
        type: EventUpstreamType.UPSTREAM_SOURCE,
      },
    ];
    for (const [eventType, handlers] of Object.entries(node.$$parsedEvents)) {
      collectEventUpstream({
        sourceNode: node,
        targetNode,
        rootEventNode,
        eventType,
        handlers: [].concat(handlers),
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
  eventType: string;
  handlers: BrickEventHandler[];
  stack: EventUpstreamStack;
}

function collectEventUpstream({
  sourceNode,
  targetNode,
  rootEventNode,
  eventType,
  handlers,
  stack,
}: CollectEventUpstreamParams): void {
  for (const handler of handlers as ExecuteCustomBrickEventHandler[]) {
    const currentStack = ([
      {
        type: getNextUpstreamType(stack[0].type),
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
          stack: currentStack,
          eventType: callbackType,
          handlers: [].concat(callbackHandlers),
        });
      }
    }
  }
}

function getNextUpstreamType(type: EventUpstreamType): EventUpstreamType {
  switch (type) {
    case EventUpstreamType.UPSTREAM_ROOT:
      return EventUpstreamType.UPSTREAM_SOURCE;
    case EventUpstreamType.UPSTREAM_SOURCE:
      return EventUpstreamType.UPSTREAM_EVENT;
    default:
      return EventUpstreamType.UPSTREAM_CALLBACK;
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
      case EventUpstreamType.UPSTREAM_EVENT:
        childEventNode = {
          type: item.type,
          eventType: item.eventType,
          handler: item.handler,
          children: [],
        };
        break;
      default:
        childEventNode = {
          type: item.type as EventUpstreamType.UPSTREAM_CALLBACK,
          callbackType: item.eventType,
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
