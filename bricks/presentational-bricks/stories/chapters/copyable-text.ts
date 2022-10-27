import { Story } from "@next-core/brick-types";
import { copyableTextSvg } from "../images";
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
    en: "copyable text component",
    zh: "可复制文本",
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
