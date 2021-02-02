import { Story } from "../../../interfaces";
import originDoc from "../../../docs/chart-v2/area-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(originDoc);

export const story: Story = {
  storyId: "chart-v2.area-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Area Chart",
    zh: "chart-v2 面积图",
  },
  icon: { lib: "fa", icon: "chart-area" },
  description: {
    en: "display area chart",
    zh:
      "又叫区域图。它是在折线图的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充",
  },
  conf: [
    {
      brick: "chart-v2.area-chart",
      properties: {
        height: 300,
        xField: "year",
        yField: "value",
        showLine: true,
        showPoint: false,
        axis: {
          yAxis: {
            min: 10000,
            unit: "kg",
          },
        },
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
      },
    },
    {
      brick: "chart-v2.area-chart",
      properties: {
        height: 300,
        xField: "time",
        yFields: ["in", "out"],
        showLine: true,
        showPoint: false,
        series: {
          out: {
            isNegative: true,
          },
        },
        thresholds: [
          {
            value: 100,
            color: "red",
          },
        ],
        axis: {
          xAxis: {
            type: "time",
          },
          yAxis: {
            unit: "kbps",
          },
        },
        data: [
          {
            in: 125,
            out: 63,
            time: 1589526600,
          },
          {
            in: 40,
            out: 11,
            time: 1589526660,
          },
          {
            in: 81,
            out: 12,
            time: 1589526720,
          },
          {
            in: 123,
            out: 63,
            time: 1589526780,
          },
          {
            in: 41,
            out: 12,
            time: 1589526840,
          },
          {
            in: 40,
            out: 12,
            time: 1589526900,
          },
          {
            in: 136,
            out: 68,
            time: 1589526960,
          },
          {
            in: 44,
            out: 12,
            time: 1589527020,
          },
          {
            in: 43,
            out: 11,
            time: 1589527080,
          },
          {
            in: 123,
            out: 64,
            time: 1589527140,
          },
          {
            in: 40,
            out: 12,
            time: 1589527200,
          },
          {
            in: 47,
            out: 12,
            time: 1589527260,
          },
          {
            in: 171,
            out: 64,
            time: 1589527320,
          },
          {
            in: 40,
            out: 12,
            time: 1589527380,
          },
          {
            in: 39,
            out: 11,
            time: 1589527440,
          },
          {
            in: 123,
            out: 63,
            time: 1589527500,
          },
          {
            in: 40,
            out: 12,
            time: 1589527560,
          },
          {
            in: 41,
            out: 11,
            time: 1589527620,
          },
          {
            in: 123,
            out: 63,
            time: 1589527680,
          },
          {
            in: 41,
            out: 12,
            time: 1589527740,
          },
          {
            in: 39,
            out: 11,
            time: 1589527800,
          },
          {
            in: 76,
            out: 58,
            time: 1589527860,
          },
          {
            in: 80,
            out: 15,
            time: 1589527920,
          },
          {
            in: 84,
            out: 12,
            time: 1589527980,
          },
          {
            in: 88,
            out: 60,
            time: 1589528040,
          },
          {
            in: 80,
            out: 15,
            time: 1589528100,
          },
          {
            in: 50,
            out: 12,
            time: 1589528160,
          },
          {
            in: 95,
            out: 59,
            time: 1589528220,
          },
          {
            in: 78,
            out: 15,
            time: 1589528280,
          },
          {
            in: 42,
            out: 12,
            time: 1589528340,
          },
          {
            in: 140,
            out: 68,
            time: 1589528400,
          },
          {
            in: 40,
            out: 12,
            time: 1589528460,
          },
          {
            in: 40,
            out: 11,
            time: 1589528520,
          },
          {
            in: 127,
            out: 60,
            time: 1589528580,
          },
          {
            in: 78,
            out: 15,
            time: 1589528640,
          },
          {
            in: 40,
            out: 12,
            time: 1589528700,
          },
          {
            in: 88,
            out: 61,
            time: 1589528760,
          },
          {
            in: 82,
            out: 15,
            time: 1589528820,
          },
          {
            in: 45,
            out: 12,
            time: 1589528880,
          },
          {
            in: 85,
            out: 60,
            time: 1589528940,
          },
          {
            in: 80,
            out: 16,
            time: 1589529000,
          },
          {
            in: 46,
            out: 11,
            time: 1589529060,
          },
          {
            in: 92,
            out: 60,
            time: 1589529120,
          },
          {
            in: 119,
            out: 16,
            time: 1589529180,
          },
          {
            in: 40,
            out: 12,
            time: 1589529240,
          },
          {
            in: 84,
            out: 59,
            time: 1589529300,
          },
          {
            in: 69,
            out: 13,
            time: 1589529360,
          },
          {
            in: 40,
            out: 12,
            time: 1589529420,
          },
          {
            in: 40,
            out: 12,
            time: 1589529480,
          },
          {
            in: 124,
            out: 64,
            time: 1589529540,
          },
          {
            in: 41,
            out: 11,
            time: 1589529600,
          },
          {
            in: 40,
            out: 11,
            time: 1589529660,
          },
          {
            in: 127,
            out: 64,
            time: 1589529720,
          },
          {
            in: 85,
            out: 13,
            time: 1589529780,
          },
          {
            in: 40,
            out: 12,
            time: 1589529840,
          },
          {
            in: 137,
            out: 67,
            time: 1589529900,
          },
          {
            in: 46,
            out: 12,
            time: 1589529960,
          },
          {
            in: 48,
            out: 11,
            time: 1589530020,
          },
          {
            in: 124,
            out: 63,
            time: 1589530080,
          },
          {
            in: null,
            out: null,
            time: 1589530140,
          },
          {
            in: null,
            out: null,
            time: 1589530200,
          },
        ],
      },
    },
  ],
  doc,
};
