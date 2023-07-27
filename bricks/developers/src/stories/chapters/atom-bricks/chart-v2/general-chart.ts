import { Story } from "../../../interfaces";
import doc from "../../../docs/chart-v2/general-chart.md";

export const story: Story = {
  storyId: "chart-v2.general-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Chart",
    zh: "chart-v2 图表",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display line, pie, or area chart as you like",
    zh: "根据需要自由定制图表",
  },
  conf: [
    {
      brick: "chart-v2.general-chart",
      properties: {
        height: 300,
        data: [
          { year: "1991", value: 15468 },
          { year: "1992", value: 16100 },
          { year: "1993", value: 15900 },
          { year: "1994", value: 17409 },
          { year: "1995", value: 17000 },
          { year: "1996", value: 31056 },
          { year: "1997", value: 31982 },
          { year: "1998", value: 32040 },
          { year: "1999", value: 33233 },
        ],
        xAxisField: "year",
        geometries: [
          {
            type: "area",
            yAxisField: "value",
          },
          {
            type: "line",
            yAxisField: "value",
          },
          {
            type: "point",
            yAxisField: "value",
            label: "value",
          },
        ],
        scale: {
          value: {
            min: 10000,
            nice: true,
          },
          year: {
            range: [0, 1],
          },
        },
        tooltip: {
          showCrosshairs: true, // 展示 Tooltip 辅助线
          shared: true,
        },
      },
    },
    {
      brick: "chart-v2.general-chart",
      properties: {
        height: 500,
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
        xAxisField: "月份",
        coordinate: {
          isTranspose: true,
          scale: [1, -1],
        },
        axis: {
          月均降雨量: { position: "right" },
          // 月份: { label: { offset: 15 } },
        },
        geometries: [
          {
            type: "interval",
            yAxisField: "月均降雨量",
            color: "name",
            adjust: "stack",
          },
        ],
        scale: {
          月均降雨量: {
            nice: true,
          },
        },
        tooltip: {
          showMarkers: false,
        },
        interaction: "active-region",
      },
    },
    {
      brick: "chart-v2.general-chart",
      properties: {
        height: 500,
        data: [
          { item: "事例一", count: 40, percent: 0.4 },
          { item: "事例二", count: 21, percent: 0.21 },
          { item: "事例三", count: 17, percent: 0.17 },
          { item: "事例四", count: 13, percent: 0.13 },
          { item: "事例五", count: 9, percent: 0.09 },
        ],
        // xAxisField: '',
        coordinate: {
          type: "theta",
          option: { radius: 0.75, innerRadius: 0 },
        },
        autoPercentField: "percent",
        geometries: [
          {
            type: "interval",
            yAxisField: "percent",
            color: "item",
            label: "percent",
            adjust: "stack",
          },
        ],
        tooltip: {
          showTitle: false,
          showMarkers: false,
        },
        interaction: "element-active",
      },
    },
  ],
  doc,
};
