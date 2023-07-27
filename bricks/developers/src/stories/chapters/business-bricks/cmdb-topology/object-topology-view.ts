import { Story } from "../../../interfaces";
import { OBJECT_TOPOLOGY_VIEW_ID } from "../../../constants";
import doc from "../../../docs/cmdb-topology/object-topology-view.md";

export const story: Story = {
  storyId: "topology.object-topology-view",
  type: "brick",
  author: "ice",
  text: {
    en: "Object Topology View",
    zh: "模型视图"
  },
  icon: { lib: "fa", icon: "cube" },
  description: {
    en: "topology formed by CMDB object",
    zh: "CMDB 模型节点组成的拓扑视图"
  },
  conf: {
    brick: "div",
    slots: {
      content: {
        type: "bricks",
        bricks: [
          {
            brick: "topology.providers-of-view-detail",
            bg: true,
            properties: {
              args: ["_TOPO_VIEW", OBJECT_TOPOLOGY_VIEW_ID]
            }
          },
          {
            brick: "topology.object-topology-view",
            lifeCycle: {
              useResolves: [
                {
                  name: "viewDetail",
                  provider: "topology\\.providers-of-view-detail"
                }
              ]
            },
            properties: {
              readonly: true,
              searchable: false,
              dragEnabled: false,
              zoomEnabled: false,
              autoScale: true,
              autoCenter: true,
              nodeDraggable: true,
              hideLinks: false,
              widthRatio: 1
            }
          }
        ]
      }
    }
  },
  doc
};
