import { Story } from "@next-core/brick-types";

export const LogDisplayStory: Story = {
  storyId: "presentational-bricks.log-display",
  category: "data-view",
  type: "brick",
  author: "jo",
  text: {
    en: "Log Display",
    zh: "日志内容展示",
  },
  description: {
    en: "Show Log",
    zh: "显示日志相关信息",
  },
  icon: {
    lib: "fa",
    icon: "file-code",
  },
  conf: [
    {
      brick: "presentational-bricks.log-display",
      properties: {
        value: "[2019.12.09]: easyops 执行了相关操作",
      },
    },
    {
      brick: "presentational-bricks.log-display",
      properties: {
        loadingIcon: true,
      },
    },
  ],
};
