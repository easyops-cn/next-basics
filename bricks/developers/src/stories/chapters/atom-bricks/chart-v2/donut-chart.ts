import { Story } from "../../../interfaces";
import originDoc from "../../../docs/chart-v2/donut-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(originDoc);

export const story: Story = {
  storyId: "chart-v2.donut-chart",
  type: "brick",
  author: "ice",
  text: {
    en: "chart-v2 Donut Chart",
    zh: "chart-v2 环图",
  },
  icon: { lib: "fa", icon: "dot-circle" },
  description: {
    en: "display donut chart",
    zh: "其本质是饼图将中间区域挖空；能相对简单的对比不同的环图",
  },
  conf: [
    {
      brick: "chart-v2.donut-chart",
      properties: {
        height: 300,
        data: [
          { type: "分类一", value: 27 },
          { type: "分类二", value: 25 },
          { type: "分类三", value: 18 },
          { type: "分类四", value: 15 },
          { type: "分类五", value: 10 },
          { type: "Other", value: 5 },
        ],
        yField: "value",
        radius: 0.75,
        innerRadius: 0.5,
        groupField: "type",
        padding: [40, 0],
      },
    },
  ],
  doc,
};
