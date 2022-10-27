import { Story } from "@next-core/brick-types";
import { logDisplaySvg } from "../images";
export const LogDisplayStory: Story = {
  storyId: "presentational-bricks.log-display",
  category: "display-component",
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
    imgSrc: logDisplaySvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.log-display[normal]",
      title: {
        en: "",
        zh: "基础日志内容展示",
      },
      bricks: [
        {
          brick: "presentational-bricks.log-display",
          properties: {
            value: "[2019.12.09]: easyops 执行了相关操作",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.log-display[load]",
      title: {
        en: "",
        zh: "日志内容展示加载",
      },
      bricks: [
        {
          brick: "presentational-bricks.log-display",
          properties: {
            loadingIcon: true,
          },
        },
      ],
    },
  ],
};
