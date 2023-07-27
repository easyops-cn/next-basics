import { Chapter } from "../../../interfaces";
import { story as DeployList } from "./deploy-list";

export const chapter: Chapter = {
  category: "deploy",
  title: {
    en: "Deploy",
    zh: "发布部署",
  },
  stories: [DeployList],
};
