import { Chapter } from "../../../interfaces";
import { story as SearchableTable } from "../general-tables/searchable-table";
import { story as FrontSearchTable } from "../general-tables/front-search-table";

export const chapter: Chapter = {
  category: "general-tables",
  title: {
    en: "General tables",
    zh: "表格相关",
  },
  stories: [SearchableTable, FrontSearchTable],
};
