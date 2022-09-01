import { Story } from "@next-core/brick-types";

export const MarkdownDisplayStory: Story = {
  storyId: "presentational-bricks.markdown-display",
  category: "data-view-info",
  type: "brick",
  author: "lynette",
  text: {
    en: "Markdown Display",
    zh: "展示Markdown",
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
