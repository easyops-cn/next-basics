import { Story } from "@next-core/brick-types";
import { generalLabelSvg } from "../images";
import { generalLabelPrefixIconSvg } from "../images";
export const GeneralLabelStory: Story = {
  storyId: "presentational-bricks.general-label",
  category: "text",
  type: "brick",
  author: "lynette",
  text: {
    en: "Text Information Display - Configurable Front and Rear Icons and Links",
    zh: "文本信息展示-可配置前后图标与链接",
  },
  description: {
    en: "Display label,prefix icon and suffix icon.Support for configuration click event and url.",
    zh: "可用来展示基本文案、前后缀图标，可配置点击事件和 url 的通用 label 构件",
  },
  icon: {
    imgSrc: generalLabelSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-label[suffix-icon]",
      title: {
        zh: "文本信息展示(后置图标)",
        en: "",
      },
      thumbnail: generalLabelPrefixIconSvg,
      bricks: [
        {
          brick: "presentational-bricks.general-label",
          properties: {
            suffixIcon: {
              lib: "antd",
              icon: "calendar",
              theme: "outlined",
              color: "#0071eb",
            },
            text: "2020-03-14",
          },
          events: {
            "label.click": {
              action: "console.log",
            },
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.general-label[prefix-icon]",
      title: {
        zh: "文本信息展示(前置图标)",
        en: "",
      },
      bricks: [
        {
          brick: "presentational-bricks.general-label",
          properties: {
            prefixIcon: {
              lib: "antd",
              icon: "tag",
              theme: "outlined",
            },
            text: "1.0.0",
            url: "/1",
          },
          events: {
            "label.click": {
              action: "console.log",
            },
          },
        },
      ],
    },
  ],
  previewColumns: 2,
};
