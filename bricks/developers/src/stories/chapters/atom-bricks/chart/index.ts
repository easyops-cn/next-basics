import { Chapter } from "../../../interfaces";
import { story as PieChart } from "./pie-chart";
import { story as TrendChart } from "./trend-chart";
import { story as barChart } from "./bar-chart";
import { stories } from "../chart-v2";

export const chapter: Chapter = {
  category: "chart",
  title: {
    en: "chart",
    zh: "图表相关",
  },
  stories: [barChart, PieChart, TrendChart, ...stories],
};
