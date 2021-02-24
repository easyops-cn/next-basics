import { isEmpty } from "lodash";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { BrickEventHandler } from "@next-core/brick-types";

export interface BricksWithEvents {
  node: BuilderRuntimeNode;
  hasEvents: boolean;
  isTargetOfEvents: boolean;
}

// Todo(steve): `targetRef` in custom templates.
export function getBricksWithEvents(
  nodes: BuilderRuntimeNode[]
): BricksWithEvents[] {
  const eventTargetSelectors = new Set<string>();
  const nodesWhichTargetToSelf = new WeakSet<BuilderRuntimeNode>();

  for (const node of nodes) {
    if (!isEmpty(node.$$parsedEvents)) {
      const flags = {
        targetToSelf: false,
      };
      for (const handlers of Object.values(node.$$parsedEvents)) {
        collectEventTargetSelectors(handlers, eventTargetSelectors, flags);
      }
      if (flags.targetToSelf) {
        nodesWhichTargetToSelf.add(node);
      }
    }
  }

  const bricksWithEvents: BricksWithEvents[] = [];
  for (const node of nodes) {
    const hasEvents = !isEmpty(node.$$parsedEvents);
    const isTargetOfEvents =
      (node.$$matchedSelectors as string[]).some((selector) =>
        eventTargetSelectors.has(selector)
      ) || nodesWhichTargetToSelf.has(node);
    if (hasEvents || isTargetOfEvents) {
      bricksWithEvents.push({
        node: node,
        hasEvents,
        isTargetOfEvents,
      });
    }
  }

  return bricksWithEvents;
}

function collectEventTargetSelectors(
  handlers: BrickEventHandler | BrickEventHandler[],
  eventTargetSelectors: Set<string>,
  flags: { targetToSelf: boolean }
): void {
  for (const handler of [].concat(handlers)) {
    if (isNonEmptyPlainString(handler.target)) {
      if (handler.target === "_self") {
        flags.targetToSelf = true;
      } else {
        for (const target of handler.target.split(/\s*,\s*/)) {
          eventTargetSelectors.add(target);
        }
      }
    }
    if (handler.callback) {
      for (const cb of Object.values(handler.callback)) {
        collectEventTargetSelectors(
          cb as BrickEventHandler,
          eventTargetSelectors,
          flags
        );
      }
    }
  }
}

function isNonEmptyPlainString(value: unknown): value is string {
  return value && typeof value === "string" && !/[<{}]/.test(value);
}
