import { Story } from "@next-core/brick-types";
import {
  basicIconSvg,
  basicIconWithArgumentsSvg,
  basicIconWithImgSrcSvg,
} from "../images";
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
    en: "basic-icon allows developers to easily integrate various icon sets into their web applications. It supports icons from our platform and custom images, providing great flexibility in design implementation. Through a series of customizable attributes such as `size`, `renderBg`, and `bg`, precise control over the appearance of icons is achieved, ensuring seamless integration with the overall interface.",
    zh: "图标展示，使开发人员能够轻松地将各种图标集成到他们的网页应用中。它支持我们平台的图标和自定义图片的图标，在设计实现上提供了极大的灵活性。通过一系列可自定义的属性，如 `size`、`renderBg` 和 `bg`，能够精确控制图标的外观，确保它们与整体界面无缝融合。",
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
      thumbnail: basicIconWithArgumentsSvg,
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
      thumbnail: basicIconWithImgSrcSvg,
    },
  ],
};
