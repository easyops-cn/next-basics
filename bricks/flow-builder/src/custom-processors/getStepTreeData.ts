import { getRuntime } from "@next-core/brick-kit";
import { MenuIcon } from "@next-core/brick-types";
import { isEmpty } from "lodash";
import { StepItem, StepType, StepTreeNodeData } from "../interfaces";

function getChildren(
  stepIds: string[],
  stepMap: Map<string, StepItem>,
  startAt: string,
  parentType: StepType,
  getIconFn: (type: string) => MenuIcon
): StepTreeNodeData[] {
  const treeList: StepTreeNodeData[] = [];

  let stageList;
  // switch / parallel 下的 branch 特殊处理
  if (["switch", "parallel"].includes(parentType)) {
    stageList = stepIds.map((id) => {
      const data = stepMap.get(id);
      if (data.type !== "branch") {
        // eslint-disable-next-line no-console
        console.error(
          `The children of switch and parallel can only be \`branch\` nodes, but current node type is \`${data.type}\``
        );
      }
      return data;
    });
  } else {
    const startNode = stepMap.get(startAt || stepIds[0]);

    stageList = getStageList(startNode, stepMap);
  }

  stageList?.forEach((curStepData) => {
    if (curStepData) {
      treeList.push({
        key: curStepData.id,
        id: curStepData.id,
        name: curStepData.name,
        iconTooltip: curStepData.type,
        icon: getIconFn?.(curStepData.type),
        data: curStepData,
        ...(!isEmpty(curStepData.children)
          ? {
              children: getChildren(
                curStepData.children,
                stepMap,
                curStepData.config?.startAt,
                curStepData.type,
                getIconFn
              ),
            }
          : {}),
      });
    }
  });

  return treeList;
}

export function checkRecurringNode(
  stageList: StepItem[][],
  step: StepItem
): boolean {
  return stageList?.some((stage) => stage?.some((item) => item.id === step.id));
}

export function getStageList(
  rootStep: StepItem,
  stepMap: Map<string, StepItem>
): StepItem[] {
  const nodeList = [rootStep];

  let node = rootStep;

  const traversedNode: string[] = [];
  while (
    stepMap.get(node?.next) &&
    !nodeList.some((item) => item.id === node.next)
  ) {
    traversedNode.push(node.next);
    const data = stepMap.get(node.next);
    nodeList.push(data);

    node = stepMap.get(node.next);
  }

  return nodeList;
}

export function getStepTreeData(
  rootId: string,
  stepList: StepItem[],
  getIconFn: (type: string) => MenuIcon
): StepTreeNodeData[] {
  const startNode = stepList.find((item) => item.id === rootId);
  if (!startNode) return [];

  const stepMap = new Map<string, StepItem>();
  const topLevelNodes = new Set<StepItem>([startNode]);
  stepList.forEach((item) => {
    /* istanbul ignore if */
    if (!item.pre && !item.parent) {
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

  const treeList: StepTreeNodeData[] = [];

  stageList.forEach((stage) => {
    stage.forEach((item) => {
      const treeData = {
        key: item.id,
        name: item.name,
        id: item.id,
        data: item,
        icon: getIconFn?.(item.type),
        iconTooltip: item.type,
        ...(!isEmpty(item.children)
          ? {
              children: getChildren(
                item.children,
                stepMap,
                item.config?.startAt,
                item.type,
                getIconFn
              ),
            }
          : {}),
      };

      treeList.push(treeData);
    });
  });

  return treeList;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getStepTreeData",
  getStepTreeData
);
