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
    en: "Markdown display, supports image preview, as well as flexible image manipulation settings",
    zh: "Markdown展示，支持图片预览，以及灵活的图片操作设置",
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
