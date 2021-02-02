import { Story } from "../../../interfaces";
import docMD from "../../../docs/tools/execution-result-trend-chart.md";
import { TOOL_EXECUTE_TASK_ID2 } from "../../../constants";

export const story: Story = {
  storyId: "tools.execution-result-trend-chart",
  type: "template",
  author: "ice",
  text: {
    en: "Trend Chart of Execution Result",
    zh: "趋势图展示工具输出"
  },
  description: {
    en: "use trend chart to display output by tool execution",
    zh: "使用趋势图来展示工具输出, 仅限于输出只有两列数据"
  },
  icon: {
    lib: "fa",
    icon: "chart-line"
  },
  conf: {
    template: "tools.execution-result-trend-chart",
    params: {
      execId: TOOL_EXECUTE_TASK_ID2
    }
  },
  doc: docMD
};
