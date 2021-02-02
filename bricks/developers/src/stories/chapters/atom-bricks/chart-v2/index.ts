import { Story } from "../../../interfaces";
// import { story as GeneralChart } from "./general-chart";
// import { story as BaseChart } from "./base-chart";
import { story as LineChart } from "./line-chart";
import { story as AreaChart } from "./area-chart";
import { story as BarChart } from "./bar-chart";
import { story as HorizontalBarChart } from "./horizontal-bar-chart";
import { story as PieChart } from "./pie-chart";
import { story as DonutChart } from "./donut-chart";
import { story as GaugeChart } from "./gauge-chart";
import { story as TimeSeriesChart } from "./time-series-chart";
import { story as RadarChart } from "./radar-chart";
import { story as MapChart } from "./map-chart";
import { story as TimeBarChart } from "./time-bar-chart";

export const stories: Story[] = [
  // BaseChart,
  LineChart,
  AreaChart,
  BarChart,
  HorizontalBarChart,
  PieChart,
  DonutChart,
  GaugeChart,
  TimeSeriesChart,
  RadarChart,
  // GeneralChart,
  MapChart,
  TimeBarChart,
];
