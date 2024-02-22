import { Story } from "@next-core/brick-types";
import {
  brickLinkOutsideSvg,
  brickLinkSvg,
  brickLinkWithIconEventsSvg,
} from "../images";
import { brickLinkNormalSvg } from "../images";
export const BrickLinkStory: Story = {
  storyId: "presentational-bricks.brick-link",
  category: "text",
  type: "brick",
  author: "lynette",
  text: {
    en: "link",
    zh: "链接",
  },
  description: {
    en: "Link component,it supports a variety of property configurations and event handling, making the creation and customization of links extremely convenient. The link component not only provides basic text and URL settings but also supports custom label colors, underlining, icons, and disabled states, among other UI features",
    zh: "链接，该构件支持丰富的属性配置和事件处理，使得创建和定制链接变得极其便捷。链接构件不仅提供了基础的文字和URL设置，还支持自定义标签颜色、下划线显示、图标以及禁用状态等UI特性",
  },
  icon: {
    imgSrc: brickLinkSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.brick-link[normal]",
      title: {
        zh: "通用链接",
        en: "",
      },
      thumbnail: brickLinkNormalSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-link",
          properties: {
            dataset: { testid: "basic-usage-demo" },
            label: "aaa",
            url: "/resources/123",
            target: "_blank",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-link[outside]",
      title: {
        zh: "通用链接(外部跳转)",
        en: "",
      },
      thumbnail: brickLinkOutsideSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-link",
          properties: {
            label: "外链跳转",
            href: "https://www.baidu.com",
            target: "_blank",
          },
        },
      ],
    },
    {
      snippetId: "presentational-bricks.brick-link[with-icon-events]",
      title: {
        zh: "通用链接(带图标事件)",
        en: "",
      },
      thumbnail: brickLinkWithIconEventsSvg,
      bricks: [
        {
          brick: "presentational-bricks.brick-link",
          properties: {
            label: "查看",
            icon: {
              lib: "antd",
              type: "file-search",
              theme: "outlined",
            },
          },
          events: {
            "link.click": {
              action: "console.log",
            },
          },
        },
      ],
    },
    {
      brick: "presentational-bricks.brick-link",
      properties: {
        label: "查看",
        icon: {
          lib: "antd",
          type: "file-search",
          theme: "outlined",
        },
      },
      events: {
        "link.click": {
          action: "console.log",
        },
      },
    },
    {
      brick: "presentational-bricks.brick-link",
      properties: {
        label: "禁用时候的链接",
        disabled: true,
        tooltip: "提示",
      },
    },
    {
      brick: "presentational-bricks.brick-link",
      description: {
        title: '文本链接，`type` 为 "text"',
        message: "适用场景：不希望链接过于突出的情况下使用。",
      },
      properties: {
        label: "查看",
        type: "text",
        url: "/",
      },
    },
  ],
  previewColumns: 2,
};
