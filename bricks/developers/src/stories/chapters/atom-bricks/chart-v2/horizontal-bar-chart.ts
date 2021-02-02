import { Story } from "../../../interfaces";
import originDoc from "../../../docs/chart-v2/horizontal-bar-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(originDoc);

export const story: Story = {
  storyId: "chart-v2.horizontal-bar-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Horizontal Bar Chart",
    zh: "chart-v2 横向柱状图",
  },
  icon: { lib: "fa", icon: "align-left" },
  description: {
    en: "display horizontal bar chart",
    zh: "相比于纵向柱状图，横向柱状图更适用于分类较多的场景",
  },
  conf: [
    {
      brick: "chart-v2.horizontal-bar-chart",
      properties: {
        height: 300,
        xField: "月份",
        yField: "月均降雨量",
        groupField: "name",
        axis: {
          yAxis: {
            unit: "mm",
          },
        },
        data: [
          { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
          { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
          { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
          { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
          { name: "London", 月份: "May", 月均降雨量: 47 },
          { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
          { name: "London", 月份: "Jul.", 月均降雨量: 24 },
          { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
          { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
          { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
          { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
          { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
          { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
          { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
          { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
          { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
        ],
      },
    },
    {
      brick: "chart-v2.horizontal-bar-chart",
      properties: {
        height: 400,
        xField: "月份",
        yField: "月均降雨量",
        groupField: "name",
        axis: {
          yAxis: {
            max: 120,
            unit: "mm",
          },
        },
        adjustType: "dodge",
        data: [
          { name: "London", 月份: "Jan.", 月均降雨量: 18.9 },
          { name: "London", 月份: "Feb.", 月均降雨量: 28.8 },
          { name: "London", 月份: "Mar.", 月均降雨量: 39.3 },
          { name: "London", 月份: "Apr.", 月均降雨量: 81.4 },
          { name: "London", 月份: "May", 月均降雨量: 47 },
          { name: "London", 月份: "Jun.", 月均降雨量: 20.3 },
          { name: "London", 月份: "Jul.", 月均降雨量: 24 },
          { name: "London", 月份: "Aug.", 月均降雨量: 35.6 },
          { name: "Berlin", 月份: "Jan.", 月均降雨量: 12.4 },
          { name: "Berlin", 月份: "Feb.", 月均降雨量: 23.2 },
          { name: "Berlin", 月份: "Mar.", 月均降雨量: 34.5 },
          { name: "Berlin", 月份: "Apr.", 月均降雨量: 99.7 },
          { name: "Berlin", 月份: "May", 月均降雨量: 52.6 },
          { name: "Berlin", 月份: "Jun.", 月均降雨量: 35.5 },
          { name: "Berlin", 月份: "Jul.", 月均降雨量: 37.4 },
          { name: "Berlin", 月份: "Aug.", 月均降雨量: 42.4 },
        ],
      },
    },
  ],
  doc,
};
