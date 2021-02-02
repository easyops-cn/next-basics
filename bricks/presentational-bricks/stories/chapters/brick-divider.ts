import { Story } from "@next-core/brick-types";

export const BrickDividerStory: Story = {
  storyId: "presentational-bricks.brick-divider",
  category: "other",
  type: "brick",
  author: "dophi",
  text: {
    en: "divider",
    zh: "分割线",
  },
  description: {
    en: "divider",
    zh: "分割线",
  },
  icon: {
    lib: "antd",
    type: "line",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-divider",
    },
    {
      brick: "div",
      properties: {
        style: {
          display: "grid",
          gridAutoFlow: "column",
          justifyContent: "left",
          alignItems: "center",
        },
      },
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "Link1",
              },
            },
            {
              brick: "presentational-bricks.brick-divider",
              properties: {
                type: "vertical",
              },
            },
            {
              brick: "presentational-bricks.brick-link",
              properties: {
                label: "Link2",
              },
            },
          ],
        },
      },
    },
    {
      brick: "presentational-bricks.brick-divider",
      properties: {
        dividerTitle: "标题",
      },
    },
    {
      brick: "presentational-bricks.brick-divider",
      properties: {
        dividerTitle: "标题",
        orientation: "left",
      },
    },
  ],
  previewColumns: 2,
};
