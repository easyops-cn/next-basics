import { Story } from "../../../interfaces";
import docMD from "../../../docs/ops-automation/job-tasks-list.md";
import { JOB_ID } from "../../../constants";

export const story: Story = {
  storyId: "ops-automation.job-tasks-list",
  type: "template",
  author: "jo",
  text: {
    en: "Job tasks list",
    zh: "作业任务列表"
  },
  description: {
    en: "Operation and maintenance automation job task list",
    zh: "运维自动化作业任务列表"
  },
  icon: {
    lib: "fa",
    icon: "box"
  },
  conf: {
    template: "ops-automation.job-tasks-list",
    params: {
      jobId: JOB_ID,
      urlTemplate: "/"
    }
  },
  doc: docMD
};
