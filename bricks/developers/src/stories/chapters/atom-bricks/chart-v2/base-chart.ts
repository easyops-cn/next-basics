import { Story } from "../../../interfaces";
import doc from "../../../docs/chart-v2/base-chart.md";

export const story: Story = {
  storyId: "chart-v2.base-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Base Chart",
    zh: "chart-v2 基本图表",
  },
  icon: { lib: "fa", icon: "chart-area" },
  description: {
    en: "display area chart",
    zh:
      "又叫区域图。它是在折线图的基础之上形成的, 它将折线图中折线与自变量坐标轴之间的区域使用颜色或者纹理填充",
  },
  conf: [
    {
      brick: "chart-v2.base-chart",
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
        xField: "year",
        yField: "value",
        showLine: true,
        showPoint: false,
        axis: {
          value: {
            min: 10000,
            unit: "kg",
          },
        },
      },
    },
  ],
  doc,
};
