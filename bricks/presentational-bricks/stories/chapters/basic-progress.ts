import { Story } from "@next-core/brick-types";
import { basicProgressSvg } from "../images";
export const BasicProgressStory: Story = {
  storyId: "presentational-bricks.basic-progress",
  category: "display-component",
  type: "brick",
  author: "momo",
  text: {
    en: "basic progress",
    zh: "进度条",
  },
  description: {
    en: "progress show",
    zh: "进度条展示",
  },
  icon: {
    imgSrc: basicProgressSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.basic-progress",
      properties: {
        value: 75,
        text: "75%",
        colorMap: [
          { progress: 60, color: "red" },
          { progress: 80, color: "orange" },
          { progress: 100, color: "red" },
        ],
        description: "描述",
        type: "circle",
      },
    },
    {
      brick: "presentational-bricks.basic-progress",
      properties: {
        value: 75,
        configProps: {
          strokeColor: "yellow",
        },
        type: "line",
        fontSize: "10px",
      },
    },
  ],
};
