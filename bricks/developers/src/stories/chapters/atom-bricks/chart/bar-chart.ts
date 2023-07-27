import { Story } from "../../../interfaces";
import docMD from "../../../docs/general-charts/bar-chart.md";

export const story: Story = {
  storyId: "general-charts.bar-chart",
  type: "brick",
  author: "cyril",
  text: {
    en: "bar chart",
    zh: "柱状图",
  },
  deprecated: true,
  description: {
    en: "show data",
    zh: "展示数据",
  },
  icon: {
    lib: "antd",
    type: "bar-chart",
  },
  conf: {
    brick: "general-charts.bar-chart",
    properties: {
      title: "主机数量",
      data: {
        labels: ["开发", "测试", "预生产", "生产"],
        seriesData: [
          {
            name: "集群1",
            data: [100, 200, 300, 400],
          },
          {
            name: "集群2",
            data: [50, 100, 150, 200],
          },
        ],
      },
    },
  },
  doc: docMD,
};
