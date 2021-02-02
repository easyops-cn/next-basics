import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/workflow-stage-editor.md";

export const story: Story = {
  storyId: "ci.workflow-stage-editor",
  type: "brick",
  text: {
    en: "Workflow Stage Editor",
    zh: "工作流阶段编辑器",
  },
  description: {
    en: "",
    zh: "编辑工作流阶段构件",
  },
  icon: {
    lib: "fa",
    icon: "grip-lines",
    prefix: "fas",
  },
  conf: [
    {
      brick: "ci.workflow-stage-editor",
      properties: {
        fixedLayout: false,
        onlyFields: true,
        stage: {
          name: "stage 2",
          parallel: false,
          steps: [],
        },
      },
    },
  ],
  doc: docMD,
};
