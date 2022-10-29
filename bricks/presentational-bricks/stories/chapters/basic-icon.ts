import { Story } from "@next-core/brick-types";
import { basicIconSvg } from "../images";
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
    imgSrc: basicIconSvg,
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
      snippetId: "presentational-bricks.basic-icon[with-arguments]",
      bricks: [
        {
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
      ],
      title: {
        en: "basic-icon(with base argumnts)",
        zh: "基础图标(带基本参数)",
      },
    },
    {
      bricks: [
        {
          brick: "presentational-bricks.basic-icon",
          properties: {
            icon: {
              imgSrc: basicIconSvg,
              imgStyle: {
                borderRadius: "10px",
              },
            },
            size: "100px",
          },
        },
      ],
      snippetId: "presentational-bricks.basic-icon[with-imgSrc]",
      title: {
        zh: "基础图标(带imgSrc)",
        en: "basic-icon(with imgSrc)",
      },
    },
  ],
};
