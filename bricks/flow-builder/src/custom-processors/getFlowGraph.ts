import { getRuntime } from "@next-core/brick-kit";
import { isEmpty } from "lodash";
import { StepItem, StepType } from "../interfaces";

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

const hasChildrenFLow = ["switch", "parallel", "map"];
const childrenFLow = ["branch", "iterator"];

function getStepType(type: StepType): string {
  switch (type) {
    case "switch":
    case "parallel":
    case "map":
      return "container";
    case "branch":
    case "iterator":
      return "group";
    default:
      return "node";
  }
}

function walkSteps(
  steps: StepItem[],
  startAt: string,
  callback: (item: StepItem) => void
): void {
  let startId = startAt;
  while (startId) {
    const find = steps?.find((item) => item.id === startId);
    if (find) {
      callback(find);
    } else {
      // eslint-disable-next-line no-console
      console.warn(
        `The current id \`${startId}\` is not found in the step list`
      );
    }
    startId = find?.next;
  }
}

export function getFlowGraph(data: OriginData, startId: string): GraphData {
  const rootId = "root";
  const rootNode = {
    id: rootId,
    type: "node",
  };
  const nodes = [] as GraphNode[];
  const edges = [] as GraphEdges[];
  const groupEdges = [] as GraphEdges[];

  walkSteps(data.steps, startId, (item) => {
    edges.push({
      source: rootId,
      target: item.id,
      type: "include",
    });
  });

  data.steps?.forEach((item) => {
    nodes.push({
      id: item.id,
      name: item.name,
      type: getStepType(item.type),
      data: item,
    });

    if (hasChildrenFLow.includes(item.type) && !isEmpty(item.children)) {
      item.children.forEach((c) => {
        groupEdges.push({
          source: item.id,
          target: c,
          type: "container",
        });
      });
    }

    if (childrenFLow.includes(item.type) && !isEmpty(item.children)) {
      const sortChildren = [];
      if (item.config?.startAt) {
        walkSteps(data.steps, item.config.startAt, (item) => {
          sortChildren.push(item.id);
        });
      } else {
        sortChildren.push(...item.children);
      }
      sortChildren.forEach((c) => {
        groupEdges.push({
          source: item.id,
          target: c,
          type: "group",
        });
      });
    }
  });

  data.relations?.forEach((item) => {
    const source = groupEdges.find((e) => e.source === item.src);
    const target = groupEdges.find((e) => e.target === item.dst);
    if (!(source && target)) {
      edges.push({
        source: item.src,
        target: item.dst,
        type: "dagre",
      });
    }
  });

  return {
    root: rootId,
    nodes: [rootNode, ...nodes],
    edges: [...edges, ...groupEdges],
  };
}

getRuntime().registerCustomProcessor("flowBuilder.getFlowGraph", getFlowGraph);
