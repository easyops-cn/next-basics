import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-charts/trend-chart.md";

export const story: Story = {
  storyId: "general-charts.trend-chart",
  type: "brick",
  author: "cyril",
  deprecated: true,
  text: {
    en: "trend chart",
    zh: "趋势图",
  },
  description: {
    en: "",
    zh: "展示数据随时间变化的趋势",
  },
  icon: {
    lib: "fa",
    icon: "dolly",
  },
  conf: {
    brick: "general-charts.trend-chart",
    properties: {
      data: {
        timeSeries: [
          1571302512,
          1571302994,
          1571303054,
          1571303653,
          1571304014,
          1571304493,
          1571304794,
          1571304852,
          1571304912,
          1571304972,
          1571305032,
          1571305093,
        ],
        legendList: ["进程占用内存 (192.168.100.162, 3306)"],
        trendDataList: [
          {
            id: "进程占用内存 (192.168.100.162, 3306)",
            name: "进程占用内存 (192.168.100.162, 3306)",
            data: [
              [1571302512000, 6068],
              [1571302994000, 6068],
              [1571303054000, 6068],
              [1571303653000, 6068],
              [1571304014000, 6068],
              [1571304493000, 6068],
              [1571304794000, 6084],
              [1571304852000, 6084],
              [1571304912000, 6084],
              [1571304972000, 6084],
              [1571305032000, 6084],
              [1571305093000, 6084],
            ],
          },
        ],
      },
    },
  },
  doc: docMD,
};
