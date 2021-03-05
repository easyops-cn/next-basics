import { isEmpty } from "lodash";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import {
  BrickEventHandler,
  ExecuteCustomBrickEventHandler,
  MessageConf,
} from "@next-core/brick-types";

export interface BrickWithEvents {
  node: BuilderRuntimeNode;
  hasEvents: boolean;
  isTargetOfEvents: boolean;
}

export function getBricksWithEvents(
  nodes: BuilderRuntimeNode[]
): BrickWithEvents[] {
  const eventTargetSelectors = new Set<string>();
  const eventTargetRefs = new Set<string>();
  const nodesWhichTargetToSelf = new WeakSet<BuilderRuntimeNode>();
  const nodesWhichHasEvents = new WeakSet<BuilderRuntimeNode>();

  for (const node of nodes) {
    const flags = {
      targetToSelf: false,
    };
    let handlers: BrickEventHandler[] = [];
    if (!isEmpty(node.$$parsedEvents)) {
      handlers = Object.values(node.$$parsedEvents).flat();
    }
    if (!isEmpty(node.$$parsedLifeCycle)) {
      handlers = handlers.concat(
        Object.entries(node.$$parsedLifeCycle).flatMap(
          ([lifeCycleName, lifeCycleConf]) => {
            switch (lifeCycleName) {
              case "onBeforePageLoad":
              case "onPageLoad":
              case "onPageLeave":
              case "onBeforePageLeave":
              case "onAnchorLoad":
              case "onAnchorUnload":
              case "onMessageClose":
                return lifeCycleConf as BrickEventHandler[];
              case "onMessage":
                return ([] as MessageConf[])
                  .concat(lifeCycleConf)
                  .flatMap((messageConf) =>
                    ([] as BrickEventHandler[]).concat(messageConf.handlers)
                  );
              default:
                // eslint-disable-next-line no-console
                console.warn(`unknown lifeCycle: ${lifeCycleName}`);
                return [];
            }
          }
        )
      );
    }
    if (handlers.length > 0) {
      collectEventTargetSelectors(
        handlers,
        eventTargetSelectors,
        eventTargetRefs,
        flags
      );
      nodesWhichHasEvents.add(node);
    }
    if (flags.targetToSelf) {
      nodesWhichTargetToSelf.add(node);
    }
  }

  const bricksWithEvents: BrickWithEvents[] = [];
  for (const node of nodes) {
    const hasEvents = nodesWhichHasEvents.has(node);
    const isTargetOfEvents =
      (node.$$matchedSelectors as string[]).some((selector) =>
        eventTargetSelectors.has(selector)
      ) ||
      nodesWhichTargetToSelf.has(node) ||
      (!!node.ref && eventTargetRefs.has(node.ref as string));
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
  handlers: BrickEventHandler[],
  eventTargetSelectors: Set<string>,
  eventTargetRefs: Set<string>,
  flags: { targetToSelf: boolean }
): void {
  for (const handler of handlers as ExecuteCustomBrickEventHandler[]) {
    if (handler.target) {
      if (handler.target === "_self") {
        flags.targetToSelf = true;
      } else if (isNonEmptyPlainString(handler.target)) {
        // Split multiple css selectors, such as `#a,#b`.
        for (const target of handler.target.split(/\s*,\s*/)) {
          eventTargetSelectors.add(target);
        }
      }
    } else if (isNonEmptyPlainString(handler.targetRef)) {
      eventTargetRefs.add(handler.targetRef);
    }
    if (handler.callback) {
      for (const cb of Object.values(handler.callback) as BrickEventHandler[]) {
        collectEventTargetSelectors(
          [].concat(cb),
          eventTargetSelectors,
          eventTargetRefs,
          flags
        );
      }
    }
  }
}

function isNonEmptyPlainString(value: unknown): value is string {
  return value && typeof value === "string" && !/[<{}]/.test(value);
}
