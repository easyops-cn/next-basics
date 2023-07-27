import { Story } from "@next-core/brick-types";
import { markdownDisplaySvg } from "../images";
import { markdownDisplayNormalSvg } from "../images";
export const MarkdownDisplayStory: Story = {
  storyId: "presentational-bricks.markdown-display",
  category: "text",
  type: "brick",
  author: "lynette",
  text: {
    en: "Markdown Information Display",
    zh: "Markdown信息展示",
  },
  description: {
    en: "",
    zh: "Markdown展示",
  },
  icon: {
    imgSrc: markdownDisplaySvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.markdown-display[normal]",
      title: {
        en: "",
        zh: "基础Markdown信息展示",
      },
      thumbnail: markdownDisplayNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.markdown-display",
          properties: {
            value: "### 三级标题\n- 列表1\n- 列表2\n- 列表3",
          },
        },
      ],
    },
  ],
  previewColumns: 2,
};
