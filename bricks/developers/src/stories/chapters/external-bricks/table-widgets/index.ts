import { Chapter } from "../../../interfaces";
import { story as SearchableTable } from "./searchable-table";
import { story as FrontSearchTable } from "./front-search-table";

export const chapter: Chapter = {
  category: "table-widgets",
  title: {
    en: "Table Widgets",
    zh: "表格挂件",
  },
  stories: [SearchableTable, FrontSearchTable],
};
