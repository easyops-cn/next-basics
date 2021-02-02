import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-topology/instance-topology-view.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  storyId: "topology.instance-topology-view",
  type: "template",
  author: "ice",
  text: {
    en: "Instance Topology",
    zh: "实例拓扑"
  },
  description: {
    en: "show instances relation by topology view",
    zh: "用拓扑的方式来展示实例间关系"
  },
  icon: {
    lib: "fa",
    icon: "fire-alt"
  },
  conf: {
    template: "topology.instance-topology-view",
    params: {
      objectId: "HOST",
      instanceId: CMDB_HOST_INSTANCE_ID,
      initViewData: {
        object_id: "HOST",
        child: [
          {
            parentOut: "owner"
          }
        ]
      }
    }
  },
  doc: docMD
};
