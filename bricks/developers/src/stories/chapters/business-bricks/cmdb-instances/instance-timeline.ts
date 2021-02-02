import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-timeline.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-timeline",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-timeline",
    zh: "时间线事件列表"
  },
  description: {
    en: "cmdb instance change history timeline",
    zh: "cmdb 实例变更历史时间线"
  },
  icon: {
    lib: "fa",
    icon: "stream"
  },
  conf: {
    brick: "cmdb-instances.instance-timeline",
    properties: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID,
      showFilter: true
    }
  },
  doc: docMD
};
