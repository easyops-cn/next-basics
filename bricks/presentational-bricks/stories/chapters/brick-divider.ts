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
        zh: "Basic divider, it is primarily used for segmentation in layouts, supporting horizontal, vertical, and a special radiation type. The Divider component allows for customization of titles, styles, and display types, enhancing the visual effects and user experience of the interface",
        en: "基础分割线, 主要用于布局中的分割，可支持水平、垂直以及特殊的放射类型。分割线构件允许自定义标题、样式及显示类型，增强了界面的视觉效果和用户体验",
      },
      thumbnail: brickDividerNormalSvg,
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
