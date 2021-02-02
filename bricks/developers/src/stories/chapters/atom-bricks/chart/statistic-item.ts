import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-charts/statistic-item.md";

const colorMap = [
  {
    progress: 60,
    color: "blue",
  },
  {
    progress: 80,
    color: "orange",
  },
  {
    progress: 100,
    color: "green",
  },
];

export const story: Story = {
  storyId: "general-charts.statistic-item",
  type: "brick",
  author: "momo",
  text: {
    en: "statistic item",
    zh: "统计项",
  },
  description: {
    en: "show statistic value",
    zh: "展示统计值",
  },
  icon: {
    lib: "fa",
    icon: "dolly",
  },
  conf: [
    {
      brick: "general-charts.statistic-item",
      properties: {
        showCard: true,
        text: "暂无",
        value: -1,
        colorMap: [
          {
            progress: -1,
            color: "gray",
          },
          {
            progress: 60,
            color: "red",
          },
          {
            progress: 80,
            color: "orange",
          },
          {
            progress: 100,
            color: "green",
          },
        ],
        title: "标题",
        description: "描述",
      },
    },
    {
      brick: "presentational-bricks.brick-quick-entries",
      properties: {
        row: 1,
        column: 2,
        useBrick: [
          {
            brick: "general-charts.statistic-item",
            properties: {
              value: 25,
              text: 25,
              colorMap,
              title: "事件评分",
              description: "权重：80%",
            },
          },
          {
            brick: "general-charts.statistic-item",
            properties: {
              text: 75,
              value: 75,
              colorMap,
              title: "关联资源评分",
              description: "权重：20%",
            },
          },
        ],
      },
    },
  ],
  previewColumns: 2,
  doc: docMD,
};
