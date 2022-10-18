import { Story } from "@next-core/brick-types";
import { generalButtonSvg } from "../images";

export const generalButtonStory: Story = {
  storyId: "basic-bricks.general-button",
  category: "interact-basic",
  type: "brick",
  author: "jo",
  text: {
    en: "General button",
    zh: "通用按钮",
  },
  description: {
    en: "General button",
    zh: "可发送点击事件、可配置按钮名称、按钮跳转链接等",
  },
  icon: {
    imgSrc: generalButtonSvg,
  },
  conf: [
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonName: "新建",
        tooltip: "新建实例",
        buttonIcon: {
          lib: "fa",
          icon: "edit",
          prefix: "fas",
        },
        dataset: {
          testid: "basic-usage-demo",
        },
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonName: "新建",
        disabled: true,
        disabledTooltip: "无权限",
        tooltip: "新建实例",
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonShape: "round",
        buttonName: "搜索",
        buttonType: "primary",
        buttonIcon: "search",
        buttonUrl: "/",
        target: "_blank",
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
    {
      brick: "basic-bricks.general-button",
      properties: {
        buttonShape: "circle",
        buttonType: "icon",
        buttonIcon: "search",
        buttonUrl: "/",
        target: "_blank",
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
    {
      brick: "basic-bricks.general-button",
      description: {
        title: "文字按钮",
        message: "默认和平台文字颜色一致",
      },
      properties: {
        buttonType: "text",
        buttonName: "更多",
        buttonUrl: "/",
        target: "_blank",
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
    {
      brick: "basic-bricks.general-button",
      description: {
        title: "淡化文字按钮",
        message:
          "可以设置 `fadedText` 为 `true` 以淡化文字颜色。适用场景：用于卡片中或和其他按钮搭配使用。",
      },
      properties: {
        buttonType: "text",
        buttonName: "了解更多",
        fadedText: true,
        buttonUrl: "/",
        target: "_blank",
      },
      events: {
        "general.button.click": [{ action: "console.log" }],
      },
    },
  ],
  previewColumns: 2,
};
