import { Story } from "../../../interfaces";
import radarDoc from "../../../docs/chart-v2/radar-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(radarDoc);

export const story: Story = {
  storyId: "chart-v2.radar-chart",
  type: "brick",
  author: "momo",
  text: {
    en: "chart-v2 radar Chart",
    zh: "chart-v2 雷达图",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display radar chart",
    zh: "雷达图",
  },
  conf: [
    {
      brick: "chart-v2.radar-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        axis: {
          yAxis: {
            min: 0,
            max: 100,
          },
        },
        showPoint: true,
        showLine: true,
        height: 300,
        isCircle: false,
        xField: "item",
        yFields: ["a", "b"],
        data: [
          {
            item: "Design",
            a: 70,
            b: 30,
          },
          {
            item: "Development",
            a: 60,
            b: 70,
          },
          {
            item: "Marketing",
            a: 50,
            b: 60,
          },
        ],
      },
    },
  ],
  doc,
};
