import { getRuntime } from "@next-core/brick-kit";
import { buildStoryboard } from "../shared/storyboard/buildStoryboard";

getRuntime().registerCustomProcessor(
  "nextBuilder.buildStoryboard",
  buildStoryboard
);
