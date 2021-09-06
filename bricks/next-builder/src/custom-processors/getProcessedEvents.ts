import { getRuntime } from "@next-core/brick-kit";
import { BrickEventsMap, BrickEventHandler } from "@next-core/brick-types";

interface EventsInfo {
  type: string;
  description?: string;
}

interface ProcessEvent {
  name?: string;
  events?: BrickEventHandler | BrickEventHandler[];
}

export function getProcessedEvents(
  eventsInfo: EventsInfo[] = [],
  eventsMap: BrickEventsMap = {}
): ProcessEvent[] {
  const processedEvents = [] as ProcessEvent[];

  for (const [name, events] of Object.entries(eventsMap)) {
    processedEvents.push({ name, events: [].concat(events) });
  }

  eventsInfo?.forEach((event) => {
    if (!processedEvents.some((item) => item?.name === event.type)) {
      processedEvents.push({ name: event.type, events: [] });
    }
  });

  return processedEvents;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getProcessedEvents",
  getProcessedEvents
);
