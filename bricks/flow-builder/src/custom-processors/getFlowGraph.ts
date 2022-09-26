import { getRuntime } from "@next-core/brick-kit";
import { StepItem, StepType } from "../interfaces";

interface Relation {
  dst: string;
  src: string;
  __modifiedDst?: string;
  __virtual?: boolean;
}
interface OriginData {
  relations: Relation[];
  steps: StepItem[];
}

interface GraphNode {
  id: string;
  type: string;
  data?: Record<string, any>;
  [key: string]: any;
}

interface GraphEdges {
  source: string;
  target: string;
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdges[];
  root: string;
}

export function getFlowGraph(data: OriginData): GraphData {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "node",
  };
  const nodes = [] as GraphNode[];
  const edges = [] as GraphEdges[];

  // 过滤掉 branch 类型的节点，在 graph 中不显示
  const branchNodes = data.steps?.filter((item) => item.type === "branch");
  const filterSteps = data.steps?.filter((item) => item.type !== "branch");

  filterSteps?.forEach((item) => {
    nodes.push({
      id: item.id,
      name: item.name,
      type: item.type === "end" ? "end" : "node",
      data: item,
    });

    edges.push({
      source: rootId,
      target: item.id,
      type: "include",
    });
  });

  //过滤掉 branch 之前的关系

  branchNodes?.forEach((node) => {
    const relationA = data.relations?.find(
      (relation) => relation.dst === node.id
    );
    const relationB = data.relations.find(
      (relation) => relation.src === node.id
    );

    if (relationA && relationB) {
      relationA.__modifiedDst = relationB.dst;
      relationB.__virtual = true;
    } else if (relationA || relationB) {
      relationA.__virtual = true;
    }
  });

  data.relations?.forEach((item) => {
    if (!item.__virtual) {
      edges.push({
        source: item.src,
        target: item.__modifiedDst ?? item.dst,
        type: "dagre",
      });
    }
  });

  return {
    root: rootId,
    nodes: [rootNode, ...nodes],
    edges,
  };
}

getRuntime().registerCustomProcessor("flowBuilder.getFlowGraph", getFlowGraph);
