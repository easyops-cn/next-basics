import { Story } from "@next-core/brick-types";

export const GeneralTooltipStory: Story = {
  storyId: "presentational-bricks.general-tooltip",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "jo",
  text: {
    en: "general tooltip",
    zh: "普通 tooltip",
  },
  description: {
    en: "general tooltip",
    zh: "普通的 tooltip",
  },
  icon: {
    lib: "fa",
    icon: "discord",
    prefix: "fab",
  },
  conf: [
    {
      description: {
        title: "使用说明",
        message:
          "鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作；建议短文本提示信息不超过10个字，文字过长时请用气泡卡片",
      },
      brick: "presentational-bricks.general-tooltip",
      properties: {
        icon: {
          lib: "fa",
          icon: "info-circle",
        },
        content: "这是一个 tooltips",
        text: "文案信息",
      },
    },
    {
      brick: "presentational-bricks.general-tooltip",
      properties: {
        type: "popover",
        icon: {
          lib: "fa",
          icon: "info-circle",
        },
        content: "this is popover",
      },
    },
    {
      brick: "presentational-bricks.general-tooltip",
      properties: {
        type: "popover",
        icon: {
          lib: "fa",
          icon: "atom",
        },
        content: ["名称：APP", "创建时间：2019-12-21", "修改时间: 2020-02-21"],
      },
    },
    {
      description: {
        title: "使用displayBrick自定义展示内容",
      },
      brick: "presentational-bricks.general-tooltip",
      properties: {
        displayBrick: {
          useBrick: {
            brick: "presentational-bricks.brick-value-mapping",
            properties: {
              mapping: {
                "0": {
                  color: "red",
                  text: "紧急",
                },
              },
              showTagCircle: true,
              value: 0,
            },
          },
        },
        content: "这是一个 tooltips",
        type: "tooltip",
      },
    },
    {
      description: {
        title: "在整体内容上hover时显示tooltip",
      },
      brick: "presentational-bricks.general-tooltip",
      properties: {
        content: "这是一个 tooltips",
        text: "文案信息",
        type: "tooltip",
        triggerByIcon: false,
      },
    },
  ],
  previewColumns: 2,
};
