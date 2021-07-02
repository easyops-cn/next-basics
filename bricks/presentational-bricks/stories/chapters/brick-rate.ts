import { Story } from "@next-core/brick-types";

export const BrickRateStory: Story = {
  storyId: "presentational-bricks.brick-rate",
  category: "data-view",
  type: "brick",
  author: "astrid",
  text: {
    en: "rate",
    zh: "评分",
  },
  description: {
    en: "A quick rating operation on something",
    zh: "对事物进行快速的评级操作",
  },
  icon: {
    lib: "fa",
    icon: "comment",
    prefix: "fas",
  },
  conf: [
    {
      brick: "presentational-bricks.brick-rate",
      properties: {
        count: 5,
        value: 3.5,
        allowHalf: true,
        disabled: false,
        rateStyle: {
          color: "#ED493C",
        },
      },
      description: {
        title: "基本",
        message: "内容是普通的等级操作",
      },
    },
    {
      brick: "presentational-bricks.brick-rate",
      properties: {
        count: 5,
        value: 3.5,
        allowHalf: true,
        disabled: true,
        type: "A",
        rateStyle: {
          color: "#ED493C",
        },
      },
      description: {
        title: "更多选项",
        message: "图标可以替换成字符或者字母、数字",
      },
    },
    {
      brick: "presentational-bricks.brick-rate",
      properties: {
        count: 3,
        value: 3,
        allowHalf: true,
        disabled: true,
        rateIcon: {
          lib: "antd",
          icon: "heart",
        },
        colors: ["#FFCF64", "#FFA235", "#ED493C"],
      },
      description: {
        title: "等级图标每一级可以对应不同颜色",
        message:
          "等级图标每一级可以对应不同颜色，优先级高于rateStyle设置的color属性",
      },
    },
  ],
  previewColumns: 2,
};
