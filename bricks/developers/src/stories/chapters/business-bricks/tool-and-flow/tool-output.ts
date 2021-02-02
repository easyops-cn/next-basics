import { Story } from "../../../interfaces";
import docMD from "../../../docs/tools/tool-output.md";

export const story: Story = {
  storyId: "tools.tool-output",
  type: "template",
  author: "jo",
  text: {
    en: "Tool Log Output",
    zh: "工具执行日志信息输出"
  },
  description: {
    en: "Show Tool Log Message",
    zh: "展示工具输出的日志信息"
  },
  icon: {
    lib: "fa",
    icon: "tools"
  },
  conf: {
    template: "tools.tool-output",
    params: {
      execId: "201912_task15dd8a076c97b622279c"
    }
  },
  doc: docMD
};
