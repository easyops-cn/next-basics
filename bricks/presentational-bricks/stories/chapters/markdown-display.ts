import { Story } from "@next-core/brick-types";

export const MarkdownDisplayStory: Story = {
  storyId: "presentational-bricks.markdown-display",
  category: "data-view-info",
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
    lib: "fa",
    icon: "file-alt",
  },
  conf: [
    {
      brick: "presentational-bricks.markdown-display",
      properties: {
        value: "### 三级标题\n- 列表1\n- 列表2\n- 列表3",
      },
    },
  ],
  previewColumns: 2,
};
