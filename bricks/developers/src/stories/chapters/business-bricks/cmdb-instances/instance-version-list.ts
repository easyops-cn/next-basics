import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-version-list.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-version-list",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-version-list",
    zh: "时间线卡片列表"
  },
  description: {
    en: "cmdb instance version timeline",
    zh: "cmdb 版本时间线卡片列表"
  },
  icon: {
    lib: "fa",
    icon: "history"
  },
  conf: {
    brick: "cmdb-instances.instance-version-list",
    properties: {
      objectId: "TOOL_HISTORY_VERSION",
      showFilter: true,
      card: {
        fields: ["vName", "vCreator", "checkType", "ctime"]
      }
    }
  },
  doc: docMD
};
