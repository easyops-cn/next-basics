import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-log/keywords-statistics-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "monitor-log.keywords-statistics",
  type: "template",
  author: "jo",
  text: {
    en: "Log Keywords Statistics Template",
    zh: "日志关键字统计模板"
  },
  description: {
    en: "Show Keyword Base On Search",
    zh: "显示日志搜索的关键字"
  },
  icon: {
    lib: "fa",
    icon: "search"
  },
  conf: [
    {
      template: "monitor-log.keywords-statistics",
      params: {
        fPath: "/usr/local/easyops/agent/log/easy_collector.log",
        keywords: ["INFO", "ERROR"],
        lastLines: 15,
        targets: [{ instanceId: CMDB_HOST_INSTANCE_ID }]
      }
    }
  ],
  doc: docMD
};
