import { Chapter } from "../../../interfaces";
import { story as TopProcess } from "./top-process";
import { story as ProcessMonitor } from "./process-monitor";

export const chapter: Chapter = {
  category: "real-time-monitor",
  title: {
    en: "Real Time Monitor",
    zh: "实时监控",
  },
  stories: [TopProcess, ProcessMonitor],
};
