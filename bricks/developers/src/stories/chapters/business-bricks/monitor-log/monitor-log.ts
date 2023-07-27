import { Story } from "../../../interfaces";
import docMD from "../../../docs/monitor-log/search-template.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "monitor-log.search",
  type: "template",
  author: "jo",
  text: {
    en: "Monitor log Search",
    zh: "监控日志查询"
  },
  description: {
    en: "Search Monitor Log",
    zh: "搜索监控相关日志"
  },
  icon: {
    lib: "fa",
    icon: "search"
  },
  conf: [
    {
      template: "monitor-log.search",
      params: {
        hosts: [{ instanceId: CMDB_HOST_INSTANCE_ID }]
      }
    }
  ],
  doc: docMD
};
