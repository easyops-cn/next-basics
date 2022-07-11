import { ProcessEvent } from "./interfaces";
import {
  BrickEventsMap,
  BrickEventHandler,
  UseProviderEventHandler,
  BrickEventHandlerCallback,
} from "@next-core/brick-types";
import { castArray } from "lodash";

export function processHandlers(
  eventList: BrickEventHandler | BrickEventHandler[]
): BrickEventHandler[] {
  const _processHandlers = (handler: BrickEventHandlerCallback): void => {
    for (const [name, events] of Object.entries(handler)) {
      const list = castArray(events);
      handler[name as keyof BrickEventHandlerCallback] = list;
      list.forEach((item) => {
        if (item?.callback) {
          _processHandlers(item.callback);
        }
      });
    }
  };

  const processedList = castArray(eventList);
  processedList.forEach((handler) => {
    if ((handler as UseProviderEventHandler)?.callback) {
      _processHandlers((handler as UseProviderEventHandler).callback);
    }
  });

  return processedList;
}

export function getProcessedEvents(
  eventsMap: BrickEventsMap = {}
): ProcessEvent[] {
  const processedEvents = [] as ProcessEvent[];
  for (const [name, events] of Object.entries(eventsMap)) {
    processedEvents.push({ name, events: processHandlers(events) });
  }

  return processedEvents;
}
