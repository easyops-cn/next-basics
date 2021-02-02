import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/workflow-editor.md";

export const plugin = {
  category: "default",
  creator: "easyops",
  ctime: "2019-08-01 13:13:06",
  description: "plugin 1",
  instanceId: "58f074bff10f3",
  name: "plugin1",
};

export const pluginVersion = {
  instanceId: "5a235e83eea81",
  version: "0.0.1",
  args: [
    { name: "arg1", type: "string" },
    { name: "arg2", type: "string" },
    { name: "arg3", type: "string" },
  ],
  image: "docker.easyops.local/ci/image1",
  share_args: [{ name: "aaa" }, { name: "bbb" }, { name: "ccc" }],
};

export const story: Story = {
  storyId: "ci.workflow-editor",
  type: "brick",
  text: {
    en: "Workflow Editor",
    zh: "工作流编辑器",
  },
  description: {
    en: "",
    zh: "编辑模板，流水线的工作流构件",
  },
  icon: {
    lib: "fa",
    icon: "layer-group",
    prefix: "fas",
  },
  conf: [
    {
      brick: "ci.workflow-editor",
      properties: {
        workflow: {
          name: "pipeline_id",
          kind: "pipeline",
          stages: [
            {
              name: "stage 1",
              parallel: true,
              steps: [
                {
                  name: "step-1",
                  mode: "plugin",
                  category: plugin.category,
                  plugin: plugin.name,
                  version: pluginVersion.version,
                  image: pluginVersion.image,
                  privileged: false,
                  env: [{ name: "aaa", value: 111 }],
                  volumeMounts: [
                    { name: "volume1", path: "" },
                    { name: "volume2", path: "" },
                  ],
                  imagePullPolicy: "if-not-present",
                  settings: {},
                },
                {
                  name: "step-2",
                  category: "custom",
                  image: "xxx.com/image2",
                  privileged: true,
                  env: [{ name: "bbb", value: 222 }],
                  volumeMounts: [
                    { name: "volume1", path: "" },
                    { name: "volume2", path: "/path" },
                  ],
                  imagePullPolicy: "always",
                  commands: ["command1", "command2"],
                },
              ],
            },
            {
              name: "stage 2",
              parallel: false,
              steps: [],
            },
          ],
          volumes: [
            {
              name: "volume1",
              emptyDir: {},
            },
            {
              name: "volume2",
              hostPath: {
                path: "/path",
              },
            },
          ],
        },
        features: {
          stageEditor: true,
          stepEditor: true,
        },
        readonly: false,
        unselectable: false,
      },
    },
  ],
  doc: docMD,
};
