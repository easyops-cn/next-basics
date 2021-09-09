import { getRuntime } from "@next-core/brick-kit";
import { processEvents } from "../shared/visual-events/getProcessedEvents";

getRuntime().registerCustomProcessor(
  "nextBuilder.getProcessedEvents",
  processEvents
);
