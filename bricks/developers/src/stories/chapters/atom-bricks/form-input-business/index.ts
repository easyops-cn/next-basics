import { Chapter } from "../../../interfaces";
import cmdbInstancesInputForm from "./cmdb-instances-input-form";
import cmdbInstancesFilterForm from "./cmdb-instances-filter-form";
import cmdbInstancesFilterDisplay from "./cmdb-instances-filter-display";

export const chapter: Chapter = {
  category: "form-input-business",
  title: {
    en: "form input business",
    zh: "业务构件表单输入",
  },
  stories: [
    cmdbInstancesInputForm,
    cmdbInstancesFilterForm,
    cmdbInstancesFilterDisplay,
  ],
};
