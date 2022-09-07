import { Story } from "@next-core/brick-types";

export const BrickPlaceholderStory: Story = {
  storyId: "presentational-bricks.brick-placeholder",
  category: "container-display",
  type: "brick",
  author: "cyril",
  text: {
    en: "brick placeholder",
    zh: "占位构件",
  },
  description: {
    en: "a placehold brick in grid layout",
    zh: "在编排时，可在 Grid 布局中临时占位",
  },
  icon: {
    lib: "fa",
    icon: "sticky-note",
  },
  conf: {
    brick: "presentational-bricks.brick-placeholder",
    properties: {
      girdRow: 1,
      gridColumn: 12,
      text: "这是一个占位构件",
    },
  },
};
