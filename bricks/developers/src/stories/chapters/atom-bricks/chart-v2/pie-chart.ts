import { Story } from "../../../interfaces";
import originDoc from "../../../docs/chart-v2/pie-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(originDoc);

export const story: Story = {
  storyId: "chart-v2.pie-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Pie Chart",
    zh: "chart-v2 饼图",
  },
  icon: { lib: "fa", icon: "chart-pie" },
  description: {
    en: "display pie chart",
    zh: "用于表示不同分类的占比情况",
  },
  conf: [
    {
      brick: "chart-v2.pie-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        data: [
          { item: "事例一", count: 40, percent: 0.4 },
          { item: "事例二", count: 21, percent: 0.21 },
          { item: "事例三", count: 17, percent: 0.17 },
          { item: "事例四", count: 13, percent: 0.13 },
          { item: "事例五", count: 9, percent: 0.09 },
        ],
        yField: "percent",
        groupField: "item",
        radius: 0.75,
        axis: {
          yAxis: {
            unit: "percent(1)",
          },
        },
      },
    },
    {
      brick: "chart-v2.pie-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        height: 300,
        data: [
          { item: "事例一", count: 40, percent: 0.4 },
          { item: "事例二", count: 21, percent: 0.21 },
          { item: "事例三", count: 17, percent: 0.17 },
          { item: "事例四", count: 13, percent: 0.13 },
          { item: "事例五", count: 9, percent: 0.09 },
        ],
        yField: "percent",
        groupField: "item",
        radius: 0.75,
        innerRadius: 0.5,
        axis: {
          yAxis: {
            unit: "percent(1)",
          },
        },
        innerTextCfg: {
          content: "some content",
          style: {
            fontSize: 16,
          },
        },
      },
    },
  ],
  doc,
};
