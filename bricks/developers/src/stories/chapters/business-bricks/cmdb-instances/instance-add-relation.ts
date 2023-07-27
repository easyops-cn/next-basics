import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-add-relation.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-add-relation",
  type: "brick",
  author: "jo",
  text: {
    en: "instance-add-relation",
    zh: "添加实例关系"
  },
  description: {
    en: "cmdb instance add relation",
    zh: "cmdb 添加实例关系"
  },
  icon: {
    lib: "fa",
    icon: "link"
  },
  conf: {
    brick: "cmdb-instances.instance-add-relation",
    properties: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID,
      relationSideId: "owner"
    },
    events: {
      "update.single.success": {
        action: "console.log"
      },
      "update.single.failed": {
        action: "console.warn"
      }
    }
  },
  actions: [
    {
      text: "添加关系",
      method: "handleReadSelection",
      args: [{ detail: { selectedKeys: [CMDB_HOST_INSTANCE_ID] } }],
      prompt: true
    }
  ],
  doc: docMD
};
