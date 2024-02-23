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
    en: "This brick s primarily used to convert Cron job expressions into a readable format for users. Its main function is to display the complex timing configurations in an intuitive way",
    zh: "主要用于将定时任务表达式转化为用户易于阅读的格式。它的核心功能是将复杂的定时时间配置以直观的方式展示给用户",
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
