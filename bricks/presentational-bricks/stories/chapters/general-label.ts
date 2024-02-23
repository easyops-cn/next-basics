import { Story } from "@next-core/brick-types";
import { generalLabelSuffixIconSvg, generalLabelSvg } from "../images";
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
    en: "suitable for use cases that require displaying static text information on the interface. The component supports a variety of attribute configurations, such as text content, prefix and suffix icons, URL links, making the presentation of information more intuitive and visually appealing",
    zh: "支持丰富的属性配置，如文字内容、前后缀图标、链接URL等，使得信息的呈现更加直观和美观",
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
      thumbnail: generalLabelSuffixIconSvg,
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
      thumbnail: generalLabelPrefixIconSvg,
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
