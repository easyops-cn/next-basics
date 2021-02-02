import { Chapter } from "../../../interfaces";
import { story as brickForm } from "./brick-form";
import generalForm from "./general-form";
import generalInput from "./general-input";
import generalSelect from "./general-select";
import generalDatePicker from "./general-date-picker";
import generalTimePicker from "./general-time-picker";
import timeRangePicker from "./time-range-picker";
import generalInputNumber from "./general-input-number";
import generalTextArea from "./general-textarea";
import generalSwitch from "./general-switch";
import generalButtons from "./general-buttons";
import generalStructsFormItem from "./general-structs-form-item";
import userOrUserGroupSelect from "./user-or-user-group-select";
import crontabInput from "./form-crontab-input";
import { story as codeEditorLegacy } from "./code-editor-legacy";
import { story as codeEditor } from "./code-editor";
import cmdbInstanceSelect from "./cmdb-instance-select";
import cmdbInstanceSelectPanel from "./cmdb-instance-select-panel";
import cmdbInstancesInputForm from "./cmdb-instances-input-form";
import cmdbInstancesFilterForm from "./cmdb-instances-filter-form";
import cmdbInstancesFilterDisplay from "./cmdb-instances-filter-display";
import autoComplete from "./general-auto-complete";
import inputWithUnit from "./input-with-unit";
import uploadImg from "./upload-img";
import generalFormItem from "./general-form-item";
import informMethodsForm from "./inform-methods-form";
import iconSelect from "./icon-select";
import dynamicFormInputItem from "./dynamic-form-input-item";
import dynamicFormItem from "./dynamic-form-item";
import generalCascader from "./general-cascader";
import generalSlide from "./general-slide";
import cmdbObjectAttrValue from "./cmdb-object-attr-value";
import advanceSetting from "./advance-setting";
import formModal from "./form-modal";

export const chapter: Chapter = {
  category: "form-input",
  title: {
    en: "form input",
    zh: "表单输入",
  },
  stories: [
    generalForm,
    generalFormItem,
    generalInput,
    generalInputNumber,
    autoComplete,
    generalSelect,
    generalDatePicker,
    generalTimePicker,
    timeRangePicker,
    generalTextArea,
    generalSwitch,
    generalButtons,
    userOrUserGroupSelect,
    cmdbInstanceSelect,
    cmdbInstanceSelectPanel,
    cmdbInstancesInputForm,
    cmdbInstancesFilterForm,
    cmdbInstancesFilterDisplay,
    informMethodsForm,
    crontabInput,
    codeEditor,
    brickForm,
    codeEditorLegacy,
    inputWithUnit,
    uploadImg,
    iconSelect,
    dynamicFormInputItem,
    generalStructsFormItem,
    dynamicFormItem,
    generalCascader,
    generalSlide,
    cmdbObjectAttrValue,
    advanceSetting,
    formModal,
  ],
};
