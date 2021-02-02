import { Chapter } from "../../../interfaces";
import { story as diffViewer } from "./diff-viewer";
import { story as LogKeywordsStatistics } from "./log-keywords-statistics";
import { story as CodeDisplay } from "./code-display";
export const chapter: Chapter = {
  category: "data-view",
  title: {
    en: "data view",
    zh: "数据展示",
  },
  stories: [diffViewer, LogKeywordsStatistics, CodeDisplay],
};
