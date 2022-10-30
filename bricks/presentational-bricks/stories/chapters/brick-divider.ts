import { Story } from "@next-core/brick-types";
import { brickDividerSvg } from "../images";
import { brickDividerNormalSvg } from "../images";
export const BrickDividerStory: Story = {
  storyId: "presentational-bricks.brick-divider",
  category: "container-display",
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
    imgSrc: brickDividerSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-divider[normal]",
      title: {
        zh: "Basic divider",
        en: "基础分割线",
      },
      thumbnail: {
        imgSrc: brickDividerNormalSvg,
      },
      bricks: [
        {
          brick: "presentational-bricks.brick-divider",
          properties: {
            dividerTitle: "标题",
            orientation: "center",
          },
        },
      ],
    },
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
    {
      brick: "presentational-bricks.brick-divider",
      properties: {
        dividerTitle: "标题",
        type: "radiation",
        proportion: [1, 3],
      },
      description: {
        title: "type为 `radiation`类型",
        message:
          "符合一些特定的场景下使用，该样式目前不支持`orientation`、`dividerStyle`、`plain`这些样式，`proportion`适合数值显示场景下使用",
      },
    },
  ],
  previewColumns: 2,
};
