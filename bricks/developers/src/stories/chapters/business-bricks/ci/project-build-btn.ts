import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/project-build-btn.md";

export const story: Story = {
  storyId: "ci.project-build-btn",
  type: "brick",
  text: {
    en: "Build Btn",
    zh: "构建流水线按钮",
  },
  description: {
    en: "",
    zh: "点击执行项目中对应的流水线",
  },
  icon: {
    lib: "antd",
    icon: "play-circle",
    theme: "outlined",
  },
  conf: [
    {
      brick: "ci.project-build-btn",
      properties: {
        projectId: "5a0917e4c077c",
        btnText: "构建",
        pipelineList: [
          {
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
        ],
        originBtnProps: {
          icon: "play-circle",
        },
      },
    },
  ],
  doc: docMD,
};
