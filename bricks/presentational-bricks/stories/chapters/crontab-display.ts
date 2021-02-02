import { Story } from "@next-core/brick-types";

export const CrontabDisplayStory: Story = {
  storyId: "presentational-bricks.crontab-display",
  category: "form-input",
  type: "brick",
  author: "jo",
  text: {
    en: "Crontab Display",
    zh: "定时任务时间展示",
  },
  icon: {
    lib: "fa",
    icon: "hourglass",
  },
  description: {
    en: "Crontab humanized Display",
    zh: "把定时器的时间人性化展示",
  },
  conf: [
    {
      brick: "presentational-bricks.crontab-display",
      properties: {
        value: "5 9 3 * *",
      },
    },
    {
      brick: "presentational-bricks.crontab-display",
      properties: {
        value: "7 3 2 1 2",
      },
    },
  ],
};
