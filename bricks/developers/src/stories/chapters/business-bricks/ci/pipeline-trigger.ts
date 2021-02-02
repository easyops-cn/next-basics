import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/pipeline-trigger.md";

export const story: Story = {
  storyId: "ci.pipeline-trigger",
  type: "brick",
  text: {
    en: "Pipeline Event Trigger",
    zh: "流水线事件触发器",
  },
  description: {
    en: "",
    zh: "根据git提交事件，定时事件信息 触发流水线",
  },
  icon: {
    lib: "fa",
    icon: "hubspot",
    prefix: "fab",
  },
  conf: {
    brick: "ci.pipeline-trigger",
    properties: {
      projectId: "5921d23ec7a05",
      pipelineData: {
        alias_name: "开发打包流水线",
        creator: "emily",
        ctime: "2020-03-11 18:14:17",
        id: "5a0917fc1433a",
        notify: { methods: [], mode: [], user_groups: [], users: [] },
        step_timeout: 0,
        variables: [],
        workflow_type: "yaml_template",
        yaml_path: "undefined",
        yaml_string: null,
        yaml_url: null,
      },
    },
  },
  doc: docMD,
};
