import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-detail.md";

import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-instances.instance-detail",
  type: "brick",
  author: "lynette",
  text: {
    en: "Instance Detail",
    zh: "实例详情",
  },
  description: {
    en: "cmdb instance detail",
    zh: "cmdb 实例详情",
  },
  icon: {
    lib: "fa",
    icon: "book",
  },
  conf: {
    brick: "cmdb-instances.instance-detail",
    properties: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      objectId: "HOST",
      attrCustomConfigs: {
        hostname: {
          useBrick: {
            brick: "presentational-bricks.brick-link",
            transform: {
              label: "@{instanceData.hostname}",
              url: "/cmdb-instances/HOST/instance/@{instanceData.instanceId}",
            },
          },
        },
      },
      fieldsByTag: [
        {
          name: "基本信息",
          fields: [
            "hostname",
            "ip",
            "memSize",
            "memo",
            "disk",
            "owner",
            "_deviceList_CLUSTER",
          ],
        },
        {
          name: "agent信息",
          fields: ["agentVersion", "_agentStatus", "_agentHeartBeat"],
        },
      ],
      relationFieldUrlTemplate:
        "/legacy/cmdb-instance-management/#{_object_id}/instance/#{instanceId}",
    },
  },
  doc: docMD,
};
