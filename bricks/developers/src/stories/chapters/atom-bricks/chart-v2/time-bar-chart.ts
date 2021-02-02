import { Story } from "../../../interfaces";
import timeBarDoc from "../../../docs/chart-v2/time-bar-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(timeBarDoc);

export const story: Story = {
  storyId: "chart-v2.time-bar-chart",
  type: "brick",
  author: "momo",
  text: {
    en: "chart-v2 time bar Chart",
    zh: "chart-v2 时间条形图",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display time bar chart",
    zh: "时间条形图",
  },
  conf: [
    {
      brick: "chart-v2.time-bar-chart",
      properties: {
        height: 400,
        range: ["startTime", "endTime"],
        timeFormat: "absolute",
        xField: "task",
        xRange: {
          step: 60,
          from: 1523985432,
          to: 1523985610,
        },
        data: [
          {
            task: "1",
            startTime: 1523985432,
            endTime: 1523985550,
          },
          {
            task: "2",
            startTime: 1523985495,
            endTime: 1523985550,
          },
          {
            task: "3",
            startTime: 1523985495,
            endTime: 1523985610,
          },
        ],
      },
    },
    {
      brick: "chart-v2.time-bar-chart",
      properties: {
        height: 400,
        range: ["startTime", "endTime"],
        xField: "task",
        xRange: {
          step: 60,
          from: 1523985432,
          to: 1523985610,
        },
        data: [
          {
            task: "1",
            startTime: 1523985432,
            endTime: 1523985550,
          },
          {
            task: "2",
            startTime: 1523985495,
            endTime: 1523985550,
          },
          {
            task: "3",
            startTime: 1523985495,
            endTime: 1523985610,
          },
        ],
      },
    },
  ],
  doc,
};
