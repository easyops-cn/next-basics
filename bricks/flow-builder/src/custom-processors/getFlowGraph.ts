import { getRuntime } from "@next-core/brick-kit";
import { StepItem } from "../interfaces";

interface Relation {
  dst: string;
  src: string;
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

  data.steps?.forEach((item) => {
    nodes.push({
      id: item.id,
      type: "node",
      data: item,
    });

    edges.push({
      source: rootId,
      target: item.id,
      type: "include",
    });
  });

  data.relations?.forEach((item) => {
    edges.push({
      source: item.src,
      target: item.dst,
      type: "dagre",
    });
  });

  return {
    root: rootId,
    nodes: [rootNode, ...nodes],
    edges,
  };
}

getRuntime().registerCustomProcessor("flowBuilder.getFlowGraph", getFlowGraph);
