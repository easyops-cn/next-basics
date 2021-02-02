import { Story } from "../../../interfaces";
import radarDoc from "../../../docs/chart-v2/map-chart.md";
import { mergeCommon } from "./utils";

const doc = mergeCommon(radarDoc);

export const story: Story = {
  storyId: "chart-v2.map-chart",
  type: "brick",
  author: "momo",
  text: {
    en: "chart-v2 map Chart",
    zh: "chart-v2 地图",
  },
  icon: { lib: "fa", icon: "chart-line" },
  description: {
    en: "display map chart",
    zh: "地图",
  },
  conf: [
    {
      brick: "chart-v2.map-chart",
      events: {
        "chart-v2.click": {
          action: "console.log",
        },
      },
      properties: {
        toolTipConfig: [
          {
            label: "拨测",
            field: "size",
          },
        ],
        longitude: "lng",
        latitude: "lat",
        data: [
          {
            name: "shanghai",
            lng: 121.47,
            lat: 31.23,
            color: "red",
            size: "10",
          },
          {
            name: "沈阳",
            lng: 123.38,
            lat: 41.8,
            color: "#2FC25B",
            size: "8",
          },
        ],
        height: 300,
      },
    },
  ],
  doc,
};
