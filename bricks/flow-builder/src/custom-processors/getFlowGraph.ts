import { getRuntime } from "@next-core/brick-kit";
import { isEmpty, difference, includes } from "lodash";
import { StepItem, StepType } from "../interfaces";
import { getStageList, checkRecurringNode } from "./getStepTreeData";

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
  const traversedNode: string[] = [];
  while (startId && !traversedNode.includes(startId)) {
    traversedNode.push(startId);
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

  const { steps = [], relations = [] } = data;

  const stepMap = new Map<string, StepItem>();
  const topLevelNodes = new Set<StepItem>([]);
  const startNode = steps.find((item) => item.id == startId);
  const childrenDagreNodes: string[] = [];

  if (startNode) {
    topLevelNodes.add(startNode);
  }

  steps.forEach((item) => {
    /* istanbul ignore if */
    if (!item.pre?.length && !item.parent) {
      topLevelNodes.add(item);
    }
    stepMap.set(item.id, item);
  });

  const stageList: StepItem[][] = [];
  topLevelNodes.forEach((startNode) => {
    // 检查该节点是否已经存在其他步骤中
    if (!checkRecurringNode(stageList, startNode)) {
      stageList.push(getStageList(startNode, stepMap));
    }
  });

  stageList.forEach((stage) => {
    stage.forEach((item) => {
      if (!edges.some((e) => e.target === item.id && e.source === rootId)) {
        edges.push({
          source: "contentFlow",
          target: item.id,
          type: "include",
        });
      }
    });
  });

  steps?.forEach((item) => {
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
      const sortChildren: string[] = [];
      childrenDagreNodes.push(...item.children);
      if (item.config?.startAt) {
        walkSteps(data.steps, item.config.startAt, (item) => {
          sortChildren.push(item.id);
        });

        // choice 分支下的节点不能通过 next 属性去获取，需要包含进去
        if (sortChildren.length !== item.children.length) {
          sortChildren.push(...difference(item.children, sortChildren));
        }
      } else {
        sortChildren.push(...item.children);
      }

      const branchProxyLayout = `${item.id}_layout`;
      nodes.push({
        id: branchProxyLayout,
        name: branchProxyLayout,
        type: "node",
      });

      groupEdges.push({
        source: item.id,
        target: branchProxyLayout,
        type: "group",
      });

      sortChildren.forEach((c) => {
        groupEdges.push({
          source: branchProxyLayout,
          target: c,
          type: "childrenLayout",
        });

        const filters = relations.filter((r) => r.src === c);
        filters.forEach((relation) => {
          // istanbul ignore if
          if (sortChildren.includes(relation.dst)) {
            groupEdges.push({
              source: c,
              target: relation.dst,
              type: "childrenDagre",
            });
          }
        });
      });

      // 去除掉原来 branch 分支与第一个步骤节点的关系(dagre), 调整为使用 childrenDagre，
      const index = relations.findIndex(
        (edge) => edge.src === item.id && edge.dst === sortChildren[0]
      );
      // istanbul ignore if
      if (index !== -1) {
        relations.splice(index, 1);
      }
    }
  });

  relations?.forEach((item) => {
    const findList = groupEdges.filter((e) => e.source === item.src);

    if (
      !(findList.length && findList.some((find) => find.target === item.dst))
    ) {
      edges.push({
        source: item.src,
        target: item.dst,
        type: "dagre",
      });
    }
  });

  const startFlowNode = {
    id: "startFlow",
    name: "request",
    type: "vnode",
    data: { id: "startFlow", name: "request" },
  };
  const endFlowNode = {
    id: "endFlow",
    name: "response",
    type: "vnode",
    data: { id: "endFlow", name: "response" },
  };
  const contentFlowNode = {
    id: "contentFlow",
    name: "content",
    type: "vnode",
    data: { id: "contentFlow", name: "content" },
  };

  const startEdges = {
    source: "root",
    target: "startFlow",
    type: "rootInclude",
  };
  const endEdges = { source: "root", target: "endFlow", type: "rootInclude" };
  const contentEdges = {
    source: "root",
    target: "contentFlow",
    type: "rootInclude",
  };

  const startToContentEdges = {
    source: "startFlow",
    target: "contentFlow",
    type: "contentDagre",
  };
  const contentToEndEdges = {
    source: "contentFlow",
    target: "endFlow",
    type: "contentDagre",
  };

  const startToEndEdges = {
    source: "startFlow",
    target: "endFlow",
    type: "contentDagre",
  };

  if (!nodes.length) {
    return {
      root: rootId,
      nodes: [rootNode, startFlowNode, endFlowNode],
      edges: [startEdges, endEdges, startToEndEdges],
    };
  }

  return {
    root: rootId,
    nodes: [rootNode, startFlowNode, contentFlowNode, endFlowNode, ...nodes],
    edges: [
      startEdges,
      contentEdges,
      endEdges,
      startToContentEdges,
      contentToEndEdges,
      ...edges,
      ...groupEdges,
    ],
  };
}

getRuntime().registerCustomProcessor("flowBuilder.getFlowGraph", getFlowGraph);
