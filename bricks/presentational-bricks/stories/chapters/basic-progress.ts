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
    en: "This component is primarily used for displaying progress information and supports both linear and circular presentation styles. Its main features include customizable progress values, display text, description information, and color mapping. By configuring properties, it is possible to achieve different color changes to reflect different stages of progress",
    zh: "展示进度信息，支持线性与圆形两种展示方式。其主要特性包括：可自定义进度值、展示文本、描述信息以及颜色映射等。通过配置属性，可以实现不同的颜色变化，以反映不同的进度阶段",
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
