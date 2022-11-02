import { Story } from "@next-core/brick-types";

export const BrickAlertStatusStory: Story = {
  storyId: "presentational-bricks.brick-alert-status",
  category: "data-transform",
  type: "brick",
  author: "ice",
  text: {
    en: "Alert Status",
    zh: "告警状态",
  },
  icon: {
    lib: "fa",
    icon: "exclamation-circle",
  },
  description: {
    en: "translate alert status (0, 1, 2, 3) to meaningful text",
    zh: "将告警状态转换成文字表述",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        status: 0,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        status: 1,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        isRecover: true,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        isRecover: true,
        recoverType: "manual",
      },
    },
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        status: 3,
      },
    },
    {
      brick: "presentational-bricks.brick-alert-status",
      properties: {
        status: 4,
      },
    },
  ],
  previewColumns: 2,
};
