import { Story } from "@next-core/brick-types";

export const BasicIconStory: Story = {
  storyId: "presentational-bricks.basic-icon",
  category: "display-component",
  type: "brick",
  author: "qimengwu",
  text: {
    en: "basic icon",
    zh: "基础图标",
  },
  description: {
    en: "icon show",
    zh: "图标展示",
  },
  icon: {
    lib: "antd",
    icon: "smile",
  },
  conf: [
    {
      description: {
        title: "设置size控制图标的大小",
      },
      brick: "presentational-bricks.basic-icon",
      properties: {
        icon: {
          lib: "antd",
          icon: "smile",
          theme: "outlined",
          color: "#167be0",
        },
        size: "48px",
      },
    },
    {
      description: {
        title:
          "设置renderBg为true渲染图标背景，配置bg, bgSize, bgBorderRadius设置图标背景样式",
      },
      brick: "presentational-bricks.basic-icon",
      properties: {
        icon: {
          lib: "antd",
          icon: "smile",
          theme: "outlined",
          color: "#167be0",
        },
        size: "24px",
        renderBg: true,
        bg: "#ebf3fd",
        bgSize: "48px",
        bgBorderRadius: "3px",
      },
    },
    {
      description: {
        title: "设置imgSrc,imgStyle配置图片图标",
      },
      brick: "presentational-bricks.basic-icon",
      properties: {
        icon: {
          imgSrc: "http://placekitten.com/g/400/200",
          imgStyle: {
            borderRadius: "10px",
          },
        },
        size: "100px",
      },
    },
  ],
};
