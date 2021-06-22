import { getRuntime } from "@next-core/brick-kit";
import { cloneDeep, isEmpty } from "lodash";
import { Edge, FlowConfig } from "./interfaces";

export function getFlowConfigDagre(flowConfigList: FlowConfig[]): any {
  const root: FlowConfig = {
    id: "__EasyopsFlowConfigRoot__",
    type: "node",
    flowType: "__EasyopsFlowConfigStart__",
    action: null,
    children: [],
  };
  const edges: Edge[] = [];
  const cloneFlowConfigList = cloneDeep(flowConfigList);
  const configIds: string[] = cloneFlowConfigList.map((config) => config.id);

  cloneFlowConfigList.forEach((config) => {
    config.flowType = config.action.type;
    config.type = "node";
    if (isEmpty(config.parents)) {
      edges.push({
        source: root.id,
        target: config.id,
        type: "link",
      });
      config.parents = Array.isArray(config.parents)
        ? config.parents.concat(root.id)
        : [root.id];
    } else {
      config.parents.forEach((parent) => {
        if (configIds.includes(parent)) {
          edges.push({
            source: parent,
            target: config.id,
            type: "link",
          });
        }
      });
    }
  });
  return {
    nodes: [root, ...cloneFlowConfigList],
    edges: edges,
  };
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getFlowConfigDagre",
  getFlowConfigDagre
);
