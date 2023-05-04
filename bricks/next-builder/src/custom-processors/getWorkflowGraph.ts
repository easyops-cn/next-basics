import { getRuntime } from "@next-core/brick-kit";
import { isEmpty, uniq } from "lodash";

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
  steps: FlowNode[];
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

const hasChildrenFLow = ["start_approval", "gateway"];

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

function getRelatedNodes(
  startId: string,
  nodeMap: Map<string, FlowNode>
): string[] {
  const steps = [startId];

  const _getRelatedNodes = (id: string, nodeList: string[]): void => {
    const starNode = nodeMap.get(id);
    starNode?.next?.forEach((nextId) => {
      nodeList.push(nextId);
      _getRelatedNodes(nextId, nodeList);
    });
  };

  _getRelatedNodes(startId, steps);

  return uniq(steps);
}

export function getWorkflowGraph(flowData: FlowData): GraphData {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "node",
  };
  const { steps: nodes } = flowData;
  const graphNodes: GraphNode[] = [];
  const layerEdges: GraphEdge[] = [];
  const containerEdges: GraphEdge[] = [];
  const groupEdges: GraphEdge[] = [];
  const childrenLayoutEdges: GraphEdge[] = [];
  const nodeLinkEdges: GraphEdge[] = [];
  const childrenIds: string[] = [];

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

      node.next?.forEach((nextId) => {
        nodeLinkEdges.push({
          source: node.id,
          target: nextId,
          type: "dagre",
        });
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

      const groupIdList = [];

      if (node.type === "start_approval") {
        const startId = node.children[0];
        if (startId) {
          groupIdList.push({
            groupId: `${startId}Group`,
            startId,
          });
        }
      } else if (node.type === "gateway") {
        node.children.forEach((id) => {
          const type = nodeMap.get(id).type;

          // istanbul ignore else
          if (type === "condition") {
            groupIdList.push({
              groupId: `${id}Group`,
              startId: id,
            });
          }
        });
      }

      groupIdList.forEach(({ groupId, startId }) => {
        graphNodes.push({
          name: groupId,
          id: groupId,
          type: "node",
        });

        groupEdges.push({
          source: layoutId,
          target: groupId,
          type: "group",
        });

        const children = getRelatedNodes(startId, nodeMap);

        children.forEach((id) => {
          childrenLayoutEdges.push({
            source: groupId,
            target: id,
            type: "childrenLayout",
          });

          const nodeData = nodeMap.get(id);

          nodeData.next?.forEach((nextId) => {
            childrenLayoutEdges.push({
              source: id,
              target: nextId,
              type: "childrenDagre",
            });
          });
        });
      });
    }
  });

  const graphEdges = layerEdges.concat(
    containerEdges,
    groupEdges,
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
