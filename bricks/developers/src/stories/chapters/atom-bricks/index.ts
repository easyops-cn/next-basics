import { Chapter } from "../../interfaces";
import { chapter as DataViewChapter } from "./data-view";
import { chapter as DataInputChapter } from "./form-input";
import { chapter as LayoutChapter } from "./layout-and-container";
import { chapter as OtherChapter } from "./other";
import { chapter as GeneralTables } from "./general-tables";
import { chapter as CardChapter } from "./card";
import { chapter as ChartChapter } from "./chart";
import { chapter as DataConvertChapter } from "./data-convert";
import { chapter as TopologyV2Chapter } from "./topology-v2";

export const atomBook: Chapter[] = [
  LayoutChapter,
  CardChapter,
  GeneralTables,
  ChartChapter,
  DataViewChapter,
  DataInputChapter,
  DataConvertChapter,
  TopologyV2Chapter,
  OtherChapter,
];
