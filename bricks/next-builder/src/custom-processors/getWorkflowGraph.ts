import { getRuntime } from "@next-core/brick-kit";
import { isEmpty } from "lodash";

interface FlowNode {
  name?: string;
  id: string;
  type: FLowNodeType;
  actType?: string;
  sendContent?: string;
  allowRevoke?: boolean;
  gatewayType?: "inclusive" | "exclusive";
  approver?: string[];
  ccPerson?: string[];
  pre?: string[];
  next?: string[];
  parent?: string;
  children?: string[];
}

type FLowNodeType =
  | "approval"
  | "start_approval"
  | "cc"
  | "condition"
  | "gateway"
  | "start"
  | "end";

interface FlowNodeEdge {
  src: string;
  dst: string;
  type: string;
}

interface FlowData {
  nodes: FlowNode[];
  relations: FlowNodeEdge[];
}

interface GraphNode extends Omit<FlowNode, "type"> {
  data?: Record<string, any>;
  type: string;
}

interface GraphEdge {
  source: string;
  target: string;
  type: string;
}

interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
  root: string;
}

const hasChildrenFLow = ["start_approval"];

function getFlowNodeType(type: FLowNodeType): string {
  switch (type) {
    case "start":
      return "start";
    case "end":
      return "end";
    case "start_approval":
      return "container";
    case "gateway":
      return "gateway";
    default:
      return "node";
  }
}

export function getWorkflowGraph(flowData: FlowData): GraphData {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "node",
  };
  const { nodes, relations } = flowData;
  const graphNodes: GraphNode[] = [];
  const layerEdges: GraphEdge[] = [];
  const containerEdges: GraphEdge[] = [];
  const childrenLayoutEdges: GraphEdge[] = [];
  const nodeLinkEdges: GraphEdge[] = [];
  const childrenIds: string[] = [];
  let filterRelations = relations;

  const nodeMap = new Map<string, FlowNode>();

  nodes?.forEach((node) => {
    nodeMap.set(node.id, node);
    if (!isEmpty(node.children)) {
      node.children.forEach((id) => {
        childrenIds.push(id);
      });
    }
  });

  nodes?.forEach((node) => {
    graphNodes.push({
      name: node.name,
      id: node.id,
      type: getFlowNodeType(node.type),
      data: node,
    });

    if (!childrenIds.includes(node.id)) {
      layerEdges.push({
        source: rootId,
        target: node.id,
        type: "include",
      });
    }

    if (hasChildrenFLow.includes(node.type) && !isEmpty(node.children)) {
      const layoutId = `${node.id}Layout`;
      graphNodes.push({
        name: layoutId,
        id: layoutId,
        type: "node",
      });

      containerEdges.push({
        source: node.id,
        target: layoutId,
        type: "container",
      });

      node.children.forEach((id) => {
        childrenLayoutEdges.push({
          source: layoutId,
          target: id,
          type: "childrenLayout",
        });

        const filter = relations.filter((r) => r.src === id);

        filter.forEach((r) => {
          // istanbul ignore if
          if (node.children.includes(r.dst)) {
            childrenLayoutEdges.push({
              source: id,
              target: r.dst,
              type: "childrenDagre",
            });

            filterRelations = filterRelations.filter(
              (item) => !(item.src == id && item.dst == r.dst)
            );
          }
        });
      });
    }
  });

  filterRelations
    ?.filter((relation) => relation.type === "line")
    ?.forEach((relation) => {
      nodeLinkEdges.push({
        source: relation.src,
        target: relation.dst,
        type: "dagre",
      });
    });

  const graphEdges = layerEdges.concat(
    containerEdges,
    childrenLayoutEdges,
    nodeLinkEdges
  );

  return {
    root: rootId,
    nodes: [rootNode, ...graphNodes],
    edges: graphEdges,
  };
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getWorkflowGraph",
  getWorkflowGraph
);
