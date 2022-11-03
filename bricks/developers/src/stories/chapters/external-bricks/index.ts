import { Chapter } from "../../interfaces";
import { chapter as GeneralListWidgetChapter } from "./general-list-widgets";
import { chapter as tableWidgetChapter } from "./table-widgets";

export const externalBook: Chapter[] = [
  GeneralListWidgetChapter,
  tableWidgetChapter,
];
