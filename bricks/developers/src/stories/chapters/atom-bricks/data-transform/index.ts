import { Chapter } from "../../../interfaces";
import { story as providerQueryAdapter } from "./provider-query-adapter";

export const chapter: Chapter = {
  category: "data-transform",
  title: {
    en: "data transform",
    zh: "信息自动转换",
  },
  stories: [providerQueryAdapter],
};
