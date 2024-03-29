import { Story } from "../../../interfaces";
import docMD from "../../../docs/tools/enhanced-tools-input-form.md";

export const story: Story = {
  storyId: "tools.enhanced-tools-input-form",
  type: "brick",
  author: "alexchen",
  text: {
    en: "Enhanced Dynamic Tools Input Form",
    zh: "动态参数的工具输入",
  },
  description: {
    en: "Enhanced Dynamic Tools Input Form",
    zh: "基于构件搭建的动态参数工具输入场景",
  },
  icon: {
    lib: "fa",
    icon: "running",
  },
  conf: {
    brick: "tools.enhanced-tools-input-form",
    lifeCycle: {
      useResolves: [
        {
          name: "toolData",
          useProvider: "providers-of-tool.basic-api-get-tool",
          args: ["b21cdeed0c7ec5f416a79d33f82705d4"],
        },
      ],
    },
  },
  doc: docMD,
};
