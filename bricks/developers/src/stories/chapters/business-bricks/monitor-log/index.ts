import { Chapter } from "../../../interfaces";
import { story as monitorLogTemplate } from "./monitor-log";
import { story as logKeywordsStatisticsTemplate } from "./log-keywords-statistics-template";
import { story as filesTableTemplate } from "./files-table-template";
import { story as tailLog } from "./tail-log";

export const chapter: Chapter = {
  category: "monitor-log",
  title: {
    en: "log",
    zh: "日志相关",
  },
  stories: [
    monitorLogTemplate,
    logKeywordsStatisticsTemplate,
    filesTableTemplate,
    tailLog,
  ],
};
