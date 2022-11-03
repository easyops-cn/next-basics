import { Chapter } from "../../../interfaces";
import { story as entryCardList } from "./entry-card-list";
import { story as generalCardList } from "./general-card-list";
import { story as collapsibleCardList } from "./collapsible-card-list";
import { story as searchableCardList } from "./searchable-card-list";
export const chapter: Chapter = {
  category: "general-list-widgets",
  title: {
    en: "general-list-widgets",
    zh: "卡片列表",
  },
  stories: [
    generalCardList,
    searchableCardList,
    entryCardList,
    collapsibleCardList,
  ],
};
