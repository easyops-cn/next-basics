import { Story } from "@next-core/brick-types";
import { statisticCardNormalSvg } from "../images";

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
    en: "designed for displaying statistical information in a card format. It offers a variety of customizable properties to tailor the appearance and behavior to fit a range of needs",
    zh: "以卡片形式展示统计信息。它具有多种可自定义的属性，可以调整外观和行为以适应各种需求",
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
      thumbnail: statisticCardNormalSvg,
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
