import { Story } from "@next-core/brick-types";
import { generalTooltipSvg } from "../images";
import { generalTooltipNormalSvg } from "../images";
export const GeneralTooltipStory: Story = {
  storyId: "presentational-bricks.general-tooltip",
  category: "feedback-and-tooltip",
  type: "brick",
  author: "jo",
  text: {
    en: "Tooltip Text Prompt",
    zh: "Tooltip文字提示",
  },
  description: {
    en: "general tooltip",
    zh: "普通的 tooltip",
  },
  icon: {
    imgSrc: generalTooltipSvg,
  },
  conf: [
    {
      snippetId: "presentational-bricks.general-tooltip[normal]",
      title: {
        en: "",
        zh: "基础的tooltips",
      },
      thumbnail: generalTooltipNormalSvg,
      message: {
        zh: "鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作；建议短文本提示信息不超过10个字，文字过长时请用气泡卡片",
        en: "",
      },
      bricks: [
        {
          brick: "presentational-bricks.general-tooltip",
          properties: {
            dataset: { testid: "basic-usage-demo" },
            icon: {
              lib: "fa",
              icon: "info-circle",
            },
            content: "这是一个 tooltips",
            text: "文案信息",
          },
        },
      ],
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
      snippetId: "presentational-bricks.general-tooltip[display-brick]",
      title: {
        en: "",
        zh: "带自定义展示内容tooltips",
      },
      message: {
        zh: "使用displayBrick自定义展示内容",
        en: "",
      },
      bricks: [
        {
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
      ],
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
        dataset: { testid: "basic-usage-demo2" },
      },
    },
  ],
  previewColumns: 2,
};
