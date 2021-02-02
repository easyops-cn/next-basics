import { Chapter } from "../../../interfaces";
import { story as ObjectTree } from "./object-tree";
import { story as ModelIconCombinationModal } from "./model-icon-combination-modal";
import { story as ObjectAttrAdd } from "./tpl-cmdb-object-attr-add";

export const chapter: Chapter = {
  category: "cmdb-object",
  title: {
    en: "CMDB Object",
    zh: "CMDB模型",
  },
  stories: [ObjectTree, ModelIconCombinationModal, ObjectAttrAdd],
};
