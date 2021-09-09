import { EventsInfo, ProcessEvent } from "./interfaces";
import { BrickEventsMap } from "@next-core/brick-types";
import { castArray } from "lodash";

export function processEvents(
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
