import { getRuntime } from "@next-core/brick-kit";
import { castArray } from "lodash";
import { BrickEventsMap, BrickEventHandler } from "@next-core/brick-types";

interface EventsInfo {
  type: string;
  description?: string;
}

interface ProcessEvent {
  name?: string;
  events?: BrickEventHandler[];
}

export function getProcessedEvents(
  eventsInfo: EventsInfo[] = [],
  eventsMap: BrickEventsMap = {}
): ProcessEvent[] {
  const processedEvents = [] as ProcessEvent[];

  eventsInfo?.forEach((info) => {
    processedEvents.push({ name: info.type, events: [] });
  });

  for (const [name, events] of Object.entries(eventsMap)) {
    const find = processedEvents.find((item) => item.name === name);
    if (find) {
      find.events.push(...castArray(events));
    } else {
      processedEvents.push({ name, events: castArray(events) });
    }
  }

  return processedEvents;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getProcessedEvents",
  getProcessedEvents
);
