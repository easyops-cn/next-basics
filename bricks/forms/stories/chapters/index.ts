import { story as GeneralFromStory } from "./general-form";
import { TreeSelectStory } from "./tree-select";
import { GeneralCheckboxStory } from "./general-checkbox";
import { dynamicFormItemStory } from "./dynamic-form-item";
import { UploadFilesStory } from "./upload-files";
import { UploadFilesV2Story } from "./upload-files-v2";
import { GeneralModalStory } from "./general-modal";
import { GeneralRadioStory } from "./general-radio";
import { cmdbInstanceSelectStory } from "./cmdb-instance-select";

export const Chapters = [
  GeneralFromStory,
  GeneralCheckboxStory,
  TreeSelectStory,
  dynamicFormItemStory,
  UploadFilesStory,
  UploadFilesV2Story,
  GeneralModalStory,
  GeneralRadioStory,
  cmdbInstanceSelectStory,
];
