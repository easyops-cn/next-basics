import { Chapter } from "../../../interfaces";
import { story as AddProjectBtn } from "./add-project-btn";
import { story as FlowChart } from "./flow-chart";
import { story as LogViews } from "./log-viewer";
import { story as BuildListEvent } from "./build-list-event";
import { story as BuildListBranch } from "./build-list-branch";
import { story as BuildActions } from "./build-actions";
import { story as ProjectBuildBtn } from "./project-build-btn";
import { story as WorkflowEditor } from "./workflow-editor";
import { story as WorkflowStageEditor } from "./workflow-stage-editor";
import { story as WorkflowStepEditor } from "./workflow-step-editor";
import { story as VariablesFormItem } from "./variables-form-item";
import { story as PipelineTrigger } from "./pipeline-trigger";

export const chapter: Chapter = {
  category: "ci",
  title: {
    en: "CI",
    zh: "持续集成",
  },
  stories: [
    AddProjectBtn,
    FlowChart,
    LogViews,
    BuildListEvent,
    BuildListBranch,
    BuildActions,
    ProjectBuildBtn,
    WorkflowEditor,
    WorkflowStageEditor,
    WorkflowStepEditor,
    VariablesFormItem,
    PipelineTrigger,
  ],
};
