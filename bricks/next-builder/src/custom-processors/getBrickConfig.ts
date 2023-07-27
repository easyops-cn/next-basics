import { getRuntime } from "@next-core/brick-kit";
import { find, get } from "lodash";
import {
  Story,
  StoryDocSlot,
  StoryDocProperty,
  StoryDocEvent,
  StoryDocMethod,
} from "@next-core/brick-types";

export function getBrickConfig(
  data: Story[],
  storyId: string
): {
  slots: StoryDocSlot[];
  properties: StoryDocProperty[];
  events: StoryDocEvent[];
  methods: StoryDocMethod[];
} {
  const story = find(data, ["storyId", storyId]);
  return {
    slots: get(story, "doc.slots") ?? [],
    properties: get(story, "doc.properties") ?? [],
    events: get(story, "doc.events") ?? [],
    methods: get(story, "doc.methods") ?? [],
  };
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getBrickConfig",
  getBrickConfig
);
