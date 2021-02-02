import { Story } from "../../../interfaces";
import originDoc from "../../../docs/chart-v2/gauge-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(originDoc);

export const story: Story = {
  storyId: "chart-v2.gauge-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Gauge Chart",
    zh: "chart-v2 仪表盘",
  },
  icon: { lib: "easyops", category: "app", icon: "monitor-dashboard" },
  description: {
    en: "display gauge chart",
    zh:
      "目前很多的管理报表或报告上都是用这种图表，以直观的表现出某个指标的进度或实际情况",
  },
  conf: [
    {
      brick: "chart-v2.gauge-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        data: [{ item: "事例一", count: 40, percent: 98 }],
        yField: "percent",
        gaugeTitle: "CPU",
        thresholdColors: [
          {
            value: 50,
            color: "#0086FA",
          },
          {
            value: 90,
            color: "#FFBF00",
          },
          {
            value: 100,
            color: "#F5222D",
          },
        ],
        axis: {
          yAxis: {
            min: 0,
            max: 100,
            unit: "%",
          },
        },
      },
    },
  ],
  doc,
};
