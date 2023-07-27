import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-charts/pie-chart.md";

export const story: Story = {
  storyId: "general-charts.pie-chart",
  type: "brick",
  author: "cyril",
  text: {
    en: "pie chart",
    zh: "饼图",
  },
  deprecated: true,
  description: {
    en: "show the percentage distribution of data",
    zh: "展示数据的百分比分布",
  },
  icon: {
    lib: "antd",
    type: "pie-chart",
  },
  conf: {
    brick: "general-charts.pie-chart",
    properties: {
      data: {
        legendList: ["开发", "测试", "预生产", "生产"],
        seriesData: [
          { name: "开发", value: 500 },
          { name: "测试", value: 1000 },
          { name: "预生产", value: 300 },
          { name: "生产", value: 100 },
        ],
      },
    },
  },
  doc: docMD,
};
