import { Story } from "@next-core/brick-types";
import { crontabDisplaySvg } from "../images";
export const CrontabDisplayStory: Story = {
  storyId: "presentational-bricks.crontab-display",
  category: "data-transform",
  type: "brick",
  author: "jo",
  text: {
    en: "【Tool Flow】Crontab Display",
    zh: "【工具流程】定时任务时间展示",
  },
  icon: {
    imgSrc: crontabDisplaySvg,
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
