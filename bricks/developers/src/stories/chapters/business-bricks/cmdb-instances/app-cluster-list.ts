import { Story } from "../../../interfaces";
import { CMDB_APP_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "cmdb-brick.app-cluster-list",
  type: "brick",
  author: "lynette",
  text: {
    en: "Cluster - Ip Topology List",
    zh: "集群-主机拓扑列表"
  },
  description: {
    en: "Cluster - Ip Topology List",
    zh: "同时展示单应用的集群主机信息"
  },
  icon: {
    lib: "fa",
    icon: "list"
  },
  conf: {
    brick: "cmdb-brick.app-cluster-list",
    properties: {
      instanceId: CMDB_APP_INSTANCE_ID,
      options: {
        withSearch: true,
        withTag: {
          category: "type"
        }
      }
    }
  }
};
