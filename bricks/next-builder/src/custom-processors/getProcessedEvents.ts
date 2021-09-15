import { getRuntime } from "@next-core/brick-kit";
import { BrickEventsMap } from "@next-core/brick-types";
import { processHandlers } from "../shared/visual-events/getProcessedEvents";
import { ProcessEvent } from "../shared/visual-events/interfaces";

export function getProcessedEvents(
  eventsMap: BrickEventsMap = {}
): ProcessEvent[] {
  const processedEvents = [] as ProcessEvent[];
  for (const [name, events] of Object.entries(eventsMap)) {
    processedEvents.push({ name, events: processHandlers(events) });
  }

  return processedEvents;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getProcessedEvents",
  getProcessedEvents
);
