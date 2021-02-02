import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-edit.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-edit",
  type: "brick",
  author: "cyril",
  text: {
    en: "Instance Edit",
    zh: "单实例编辑"
  },
  description: {
    en: "cmdb instances edit",
    zh: "cmdb 单实例编辑"
  },
  icon: {
    lib: "fa",
    icon: "pen"
  },
  conf: {
    brick: "cmdb-instances.instance-edit",
    properties: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      objectId: "HOST",
      blackList: ["_agentStatus", "_agentHeartBeat"]
    },
    events: {
      "update.single.cancel": {
        action: "console.log"
      }
    }
  },
  doc: docMD
};
