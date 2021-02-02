import { Story } from "../../../interfaces";
import docMD from "../../../docs/ci/log-viewer.md";

export const story: Story = {
  storyId: "ci.log-viewer",
  type: "brick",
  text: {
    en: "Log Viewer",
    zh: "步骤日志输出构件",
  },
  description: {
    en: "",
    zh: "显示流水线中选中的某个步骤（默认第一个步骤）的执行日志信息",
  },
  icon: {
    lib: "easyops",
    category: "model",
    icon: "logstash",
  },
  conf: {
    brick: "ci.log-viewer", // 输入定义：步骤Id 改成了输出步骤的detail包括步骤的log和yaml和stageName等信息
    properties: {
      step: {
        log: "日志信息",
        yaml: "yaml定义信息",
        log_id: "1",
        state: "succeeded",
        stageName: "stageName",
        name: "stepName",
        finished: 1560227239,
        started: 1560227228,
      },
    },
  },
  doc: docMD,
};
