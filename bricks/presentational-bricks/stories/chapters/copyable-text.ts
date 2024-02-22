import { Story } from "@next-core/brick-types";
import { copyableTextNormalSvg, copyableTextSvg } from "../images";
export const CopyableTextStory: Story = {
  storyId: "presentational-bricks.copyable-text",
  category: "text",
  type: "brick",
  author: "ann",
  text: {
    en: "copyable-text",
    zh: "可复制文本",
  },
  description: {
    en: "allows users to easily copy text with a simple click interaction,customizable tooltips, and options to hide the text or change the display style",
    zh: "通过简单的点击交互轻松复制文本,可自定义的提示文案，以及隐藏文本或更改显示样式的选项",
  },
  icon: {
    imgSrc: copyableTextSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.copyable-text[normal]",
      title: {
        zh: "基础可复制文本",
        en: "",
      },
      thumbnail: copyableTextNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.copyable-text",
          properties: {
            text: "This is a copyable text.",
            hiddenText: true,
            tooltips: "自定义提示文案",
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.copyable-text",
      properties: {
        text: "This is a copyable text.",
        type: "input",
      },
    },
  ],
};
