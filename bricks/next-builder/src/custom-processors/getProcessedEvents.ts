import { getRuntime } from "@next-core/brick-kit";
import { getProcessedEvents } from "../shared/visual-events/getProcessedEvents";

getRuntime().registerCustomProcessor(
  "nextBuilder.getProcessedEvents",
  getProcessedEvents
);
