import { Chapter } from "../../../interfaces";
import { story as roleSetUsersAndGroupsModal } from "./roles-members-setting-modal";

export const chapter: Chapter = {
  category: "permission",
  title: {
    en: "permission",
    zh: "权限相关",
  },
  stories: [roleSetUsersAndGroupsModal],
};
