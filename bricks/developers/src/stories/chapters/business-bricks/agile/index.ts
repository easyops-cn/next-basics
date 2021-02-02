import { Chapter } from "../../../interfaces";
import { story as IssueList } from "./issue-list";
import { story as KanbanContainer } from "../../business-bricks/agile/kanban-container";
import { story as IssueCard } from "./issue-card";
import { story as CommentBrick } from "./comment-brick";
import { story as TplIssueDetailDrawer } from "./tpl-issue-detail-drawer";
import { story as TplCreateIssueModal } from "./tpl-create-issue-modal";
import { story as TplEditIssueModal } from "./tpl-edit-issue-modal";

export const chapter: Chapter = {
  category: "agile",
  title: {
    en: "Agile",
    zh: "敏捷管理",
  },
  stories: [
    IssueList,
    KanbanContainer,
    IssueCard,
    CommentBrick,
    TplIssueDetailDrawer,
    TplCreateIssueModal,
    TplEditIssueModal,
  ],
};
