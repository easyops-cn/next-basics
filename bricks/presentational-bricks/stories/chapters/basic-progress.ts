import { Story } from "@next-core/brick-types";
import {
  basicProgressCircleSvg,
  basicProgressLineSvg,
  basicProgressSvg,
} from "../images";
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
      snippetId: "presentational-bricks.basic-progress[circle]",
      bricks: [
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
      ],
      title: {
        zh: "圆形进度条",
        en: "circle progress",
      },
      thumbnail: basicProgressCircleSvg,
    },
    {
      snippetId: "presentational-bricks.basic-progress[line]",
      bricks: [
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
      title: {
        zh: "线性进度条",
        en: "line progress",
      },
      thumbnail: basicProgressLineSvg,
    },
  ],
};
