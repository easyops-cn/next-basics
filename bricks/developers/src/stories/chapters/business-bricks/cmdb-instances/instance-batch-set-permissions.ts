import { Story } from "../../../interfaces";
// import docMD from "../../../docs/cmdb-instances/instance-batch-set-permissions.md";

import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-batch-set-permissions",
  type: "brick",
  author: "lynette",
  text: {
    en: "instance-batch-set-permissions",
    zh: "批量设置权限"
  },
  description: {
    en: "cmdb batch set permissions",
    zh: "cmdb 批量设置权限"
  },
  icon: {
    lib: "fa",
    icon: "cogs"
  },
  conf: {
    brick: "cmdb-instances.instance-batch-set-permissions",
    properties: {
      objectId: "APP",
      selectedKeys: [CMDB_APP_INSTANCE_ID]
    }
  }
  // doc: docMD
};
