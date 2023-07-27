import { Story } from "@next-core/brick-types";

export const BrickAlertNumberStory: Story = {
  storyId: "presentational-bricks.brick-alert-number",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "alert number",
    zh: "告警数量",
  },
  icon: {
    lib: "fa",
    icon: "sort-numeric-up-alt",
  },
  description: {
    en: "alert number",
    zh: "数值 0 将带有绿色背景，1 带有黄色背景",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-alert-number",
      properties: {
        value: 0,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-number",
      properties: {
        value: 5,
      },
    },
  ],
  previewColumns: 2,
};
