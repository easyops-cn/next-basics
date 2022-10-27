import { Story } from "@next-core/brick-types";

export const StatisticCardStory: Story = {
  storyId: "presentational-bricks.statistic-card",
  category: "card-statistic",
  type: "brick",
  author: "william",
  text: {
    en: "Statistic Card",
    zh: "统计卡片",
  },
  description: {
    en: "Card showing statistics, usually used on the homepage",
    zh: "展示统计数据的卡片，一般在首页使用",
  },
  icon: {
    lib: "fa",
    icon: "info",
  },
  conf: [
    {
      snippetId: "presentational-bricks.statistic-card[normal]",
      title: {
        zh: "基础统计卡片",
        en: "",
      },
      bricks: [
        {
          brick: "presentational-bricks.statistic-card",
          properties: {
            cardTitle: "今日构建",
            value: 99,
            icon: {
              lib: "fa",
              icon: "clock",
            },
            url: "/list",
            tip: "敬请期待",
            disabled: true,
          },
        },
      ],
    },
  ],
  previewColumns: 2,
};
