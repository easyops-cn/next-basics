import { Chapter } from "../../interfaces";
import { chapter as DataViewChapter } from "./data-view";
import { chapter as DataInputChapter } from "./form-input";
import { chapter as LayoutChapter } from "./layout-and-container";
import { chapter as NavigationChapter } from "./navigation";
import { chapter as OtherChapter } from "./other";
import { chapter as GeneralTables } from "./general-tables";
import { chapter as CardChapter } from "./card";
import { chapter as ValueMappingChapter } from "./value-mapping";
import { chapter as FeedbackTooltipChapter } from "./feedback-and-tooltip";
import { chapter as ChartChapter } from "./chart";
import { chapter as DataConvertChapter } from "./data-convert";
import { chapter as DescriptionChapter } from "./description";
import { chapter as TopologyV2Chapter } from "./topology-v2";

export const atomBook: Chapter[] = [
  LayoutChapter,
  CardChapter,
  GeneralTables,
  DescriptionChapter,
  ChartChapter,
  ValueMappingChapter,
  DataViewChapter,
  DataInputChapter,
  NavigationChapter,
  FeedbackTooltipChapter,
  DataConvertChapter,
  TopologyV2Chapter,
  OtherChapter,
];
