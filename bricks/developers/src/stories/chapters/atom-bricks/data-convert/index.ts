import { Chapter } from "../../../interfaces";
import { story as providerQueryAdapter } from "./provider-query-adapter";

export const chapter: Chapter = {
  category: "data-convert",
  title: {
    en: "data-convert",
    zh: "数据转换工具",
  },
  stories: [providerQueryAdapter],
};
