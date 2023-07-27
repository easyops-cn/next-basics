import { Story } from "../../../interfaces";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";
// import docMD from "../../../docs/cmdb-instances/instance-set-permissions.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-set-permissions",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-set-permissions",
    zh: "设置权限"
  },
  description: {
    en: "cmdb set permission",
    zh: "cmdb 设置权限"
  },
  icon: {
    lib: "fa",
    icon: "cog"
  },
  conf: {
    brick: "cmdb-instances.instance-set-permissions",
    properties: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID
    },
    events: {
      "update.single.select": {
        action: "console.info"
      }
    }
  }
  // doc: docMD
};
