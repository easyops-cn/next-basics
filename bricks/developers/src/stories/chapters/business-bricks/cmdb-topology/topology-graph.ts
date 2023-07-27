import { Story } from "../../../interfaces";
import {
  CMDB_BUSINESS_INSTANCE_ID,
  CMDB_APP_INSTANCE_ID
} from "../../../constants";

export const story: Story = {
  storyId: "topology.topology-graph",
  type: "brick",
  author: "ice",
  text: {
    en: "topology-graph-business",
    zh: "架构拓扑"
  },
  icon: { lib: "fa", icon: "cube" },
  description: {
    en: "",
    zh:
      "应用架构拓扑展示应用的分层架构拓扑，分别为应用层、服务节点、主机、集群；业务架构拓扑通过应用间关系来汇聚业务的访问关系，展示某业务的上下游系统"
  },
  conf: [
    {
      brick: "topology.topology-graph",
      properties: {
        objectId: "BUSINESS",
        instanceId: CMDB_BUSINESS_INSTANCE_ID
      }
    },
    {
      brick: "topology.topology-graph",
      properties: {
        objectId: "APP",
        instanceId: CMDB_APP_INSTANCE_ID
      }
    }
  ]
};
