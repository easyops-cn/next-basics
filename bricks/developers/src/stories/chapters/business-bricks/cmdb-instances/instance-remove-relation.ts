import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-remove-relation.md";
import {
  CMDB_HOST_INSTANCE_ID,
  CMDB_USER_INSTANCE_ID
} from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-remove-relation",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-remove-relation",
    zh: "移除实例关系"
  },
  description: {
    en: "cmdb instance remove relation",
    zh: "cmdb 移除实例关系"
  },
  icon: {
    lib: "fa",
    icon: "unlink"
  },
  conf: {
    brick: "cmdb-instances.instance-remove-relation",
    properties: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID,
      selectedKeys: [CMDB_USER_INSTANCE_ID],
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
  doc: docMD
};
