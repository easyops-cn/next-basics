import { Story } from "@next-core/brick-types";
import {
  logDisplayLoadSvg,
  logDisplayNormalSvg,
  logDisplaySvg,
} from "../images";
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
    en: "This brick is designed specifically for displaying text-based log information and supports a variety of configuration options to adapt to different usage scenarios",
    zh: "该构件是为展示文本日志信息而设计的，支持多种配置选项以适应不同的使用场景",
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
      thumbnail: logDisplayNormalSvg,
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
      thumbnail: logDisplayLoadSvg,
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
