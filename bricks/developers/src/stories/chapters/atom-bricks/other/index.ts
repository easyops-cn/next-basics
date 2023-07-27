import { Chapter } from "../../../interfaces";
import { story as PushHistoryRecord } from "./push-history-record";
import { story as recentVisit } from "./recent-visit";
import { story as excelExportUtils } from "./export-excel-data";
import { story as HttpProxy } from "./http-proxy";
import { story as RichEditor } from "./rich-editor";
import { story as NoOp } from "./no-op";
import { story as CollapsibleCardList } from "./collapsible-card-list";
import { story as EntryCardList } from "./entry-card-list";
import { story as FrontSearchTable } from "./front-search-table";
import { story as GeneralCardList } from "./general-card-list";
import { story as SearchableCardList } from "./searchable-card-list";
import { story as SearchableTable } from "./searchable-table";

export const chapter: Chapter = {
  category: "other",
  title: {
    en: "other",
    zh: "其他",
  },
  stories: [
    PushHistoryRecord,
    recentVisit,
    excelExportUtils,
    HttpProxy,
    RichEditor,
    NoOp,
    CollapsibleCardList,
    EntryCardList,
    FrontSearchTable,
    GeneralCardList,
    SearchableCardList,
    SearchableTable,
  ],
};
