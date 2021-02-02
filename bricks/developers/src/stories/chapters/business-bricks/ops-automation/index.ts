import { Chapter } from "../../../interfaces";
import { story as jobTasksList } from "./job-tasks-list";

export const chapter: Chapter = {
  category: "ops-automation",
  title: {
    en: "ops automation",
    zh: "运维自动化",
  },
  stories: [jobTasksList],
};
