import { Story } from "@next-core/brick-types";
import { brickLinkSvg } from "../images";
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
    en: "",
    zh: "将值渲染成跳转链接，支持url模板配置",
  },
  icon: {
    imgSrc: brickLinkSvg,
  },
  conf: [
    {
      brick: "presentational-bricks.brick-link",
      properties: {
        dataset: { testid: "basic-usage-demo" },
        label: "aaa",
        url: "/resources/123",
        target: "_blank",
      },
    },
    {
      brick: "presentational-bricks.brick-link",
      properties: {
        label: "外链跳转",
        href: "https://www.baidu.com",
        target: "_blank",
      },
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
