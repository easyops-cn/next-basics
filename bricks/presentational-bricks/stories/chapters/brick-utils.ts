import { Story } from "@next-core/brick-types";
import { brickUtilsSvg } from "../images";
export const BrickUtilsStory: Story = {
  storyId: "presentational-bricks.brick-utils",
  category: "other",
  type: "brick",
  author: "jo",
  text: {
    en: "Brick Of Provide Utils",
    zh: "提供工具函数的构件",
  },
  description: {
    en: "Provide",
    zh: "在构件提供一些常用的工具函数可以直接方便使用",
  },
  icon: {
    imgSrc: brickUtilsSvg,
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "presentational-bricks.brick-utils",
              bg: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: "复制",
              },
              events: {
                "general.button.click": [
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "copy",
                    args: ["text you want to copy"],
                  },
                ],
              },
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                id: "gButton",
                title: "the hidden text",
                style: {
                  marginTop: "10px",
                },
                buttonName: "复制 DOM 属性",
              },
              events: {
                "general.button.click": [
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "copyTargetProperty",
                    args: ["#gButton", "title"],
                  },
                ],
              },
            },
          ],
        },
      },
    },
  ],
  previewColumns: 2,
};
