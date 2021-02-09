import { Chapter } from "../../../interfaces";
import { story as brickForm } from "./brick-form";
import generalForm from "./general-form";
import { story as codeEditorLegacy } from "./code-editor-legacy";
import { story as codeEditor } from "./code-editor";
import cmdbInstanceSelect from "./cmdb-instance-select";
import cmdbInstancesInputForm from "./cmdb-instances-input-form";
import cmdbInstancesFilterForm from "./cmdb-instances-filter-form";
import cmdbInstancesFilterDisplay from "./cmdb-instances-filter-display";
import dynamicFormInputItem from "./dynamic-form-input-item";
import dynamicFormItem from "./dynamic-form-item";

export const chapter: Chapter = {
  category: "form-input",
  title: {
    en: "form input",
    zh: "表单输入",
  },
  stories: [
    generalForm,
    cmdbInstanceSelect,
    cmdbInstancesInputForm,
    cmdbInstancesFilterForm,
    cmdbInstancesFilterDisplay,
    codeEditor,
    brickForm,
    codeEditorLegacy,
    dynamicFormInputItem,
    dynamicFormItem,
  ],
};
