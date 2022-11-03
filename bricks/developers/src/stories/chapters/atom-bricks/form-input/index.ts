import { Chapter } from "../../../interfaces";
import { story as codeEditorLegacy } from "./code-editor-legacy";
import cmdbInstancesInputForm from "./cmdb-instances-input-form";
import cmdbInstancesFilterForm from "./cmdb-instances-filter-form";
import cmdbInstancesFilterDisplay from "./cmdb-instances-filter-display";
import dynamicFormInputItem from "./dynamic-form-input-item";

export const chapter: Chapter = {
  category: "form-input",
  title: {
    en: "form input",
    zh: "表单输入",
  },
  stories: [
    cmdbInstancesInputForm,
    cmdbInstancesFilterForm,
    cmdbInstancesFilterDisplay,
    codeEditorLegacy,
    dynamicFormInputItem,
  ],
};
