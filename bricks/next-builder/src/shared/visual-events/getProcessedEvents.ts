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

// export function traverseHandlerCallback(callback: BrickEventHandlerCallback, prevkey: string): void {
//   for (const [name, events] of Object.entries(callback)) {
//     castArray(events).forEach((item, index) => {
//       const key = `${prevkey}-callback-${name}-${index}`;
//       item.key = key;

//       if ((item as UseProviderEventHandler).callback) {
//         traverseHandlerCallback((item as UseProviderEventHandler).callback, key)
//       }
//     });
//   }
// }

// export function addUniqKeyToEvent(eventList: ProcessEvent[] = []): ProcessEventWithKey[] {
//   const mutableEvents = cloneDeep(eventList) as ProcessEventWithKey[];

//   mutableEvents.forEach((item, index) => {
//     item.key = String(index);
//     item.events.forEach((row, index) => {
//       const key = `${item.key}-events-${index}`;
//       row.key = key;
//       if ((row as UseProviderEventHandler).callback) {
//         traverseHandlerCallback((row as UseProviderEventHandler).callback, key);
//       }
//     })
//   });

//   return mutableEvents;
// }
