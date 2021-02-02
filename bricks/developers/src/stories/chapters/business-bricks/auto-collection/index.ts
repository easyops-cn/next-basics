import { Chapter } from "../../../interfaces";
import { story as CollectionInstanceList } from "./collection-instance-list";
import { story as CollectionHistoryList } from "./collection-history-list";

export const chapter: Chapter = {
  category: "auto-collection",
  title: {
    en: "Auto Collection",
    zh: "自动采集",
  },
  stories: [CollectionInstanceList, CollectionHistoryList],
};
