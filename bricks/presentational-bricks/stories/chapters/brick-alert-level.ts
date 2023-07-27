import { Story } from "@next-core/brick-types";

export const BrickAlertLevelStory: Story = {
  storyId: "presentational-bricks.brick-alert-level",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "alert level",
    zh: "告警等级",
  },
  description: {
    en: "",
    zh: "将数值渲染成通用告警等级显示方式",
  },
  icon: {
    lib: "fa",
    icon: "bell",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-alert-level",
      properties: {
        value: 0,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-level",
      properties: {
        value: 1,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-level",
      properties: {
        value: 2,
      },
    },
  ],
  previewColumns: 2,
};
