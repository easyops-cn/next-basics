import { Chapter } from "../../interfaces";
import { chapter as formInputBusinessChapter } from "./form-input-business";
import { chapter as formInputAdvancedChapter } from "./form-input-advanced";
import { chapter as OtherChapter } from "./other";
import { chapter as ChartChapter } from "./chart";
import { chapter as DataTransformChapter } from "./data-transform";
import { chapter as TopologyV2Chapter } from "./topology-v2";

export const atomBook: Chapter[] = [
  ChartChapter,
  formInputBusinessChapter,
  formInputAdvancedChapter,
  DataTransformChapter,
  TopologyV2Chapter,
  OtherChapter,
];
