import { getRuntime } from "@next-core/brick-kit";
import { MenuIcon } from "@next-core/brick-types";
import { isEmpty } from "lodash";
import { StepItem, StepType, StepTreeNodeData } from "../interfaces";

function getIcon(type: StepType): MenuIcon {
  let icon = "question";
  let color: string;

  switch (type) {
    case "task":
      icon = "forward";
      color = "var(--palette-cyan-6)";
      break;
    case "branch":
      icon = "node-expand";
      color = "var(--palette-yellow-6)";
      break;
    case "switch":
      icon = "rollback";
      color = "var(--palette-indigo-6)";
      break;
    case "map":
      icon = "retweet";
      color = "var(--palette-orange-6)";
      break;
    case "iterator":
      icon = "interaction";
      color = "var(--palette-blue-6)";
      break;
    case "parallel":
      icon = "apartment";
      color = "var(--palette-teal-6)";
      break;
    case "success":
      icon = "check-square";
      color = "var(--palette-green-6)";
      break;
    case "failed":
      icon = "close-square";
      color = "var(--palette-red-6)";
      break;
    case "pass":
      icon = "rise";
      color = "var(--palette-purple-6)";
  }
  return {
    lib: "antd",
    theme: "outlined",
    icon,
    color,
  };
}

function getChildren(
  stepIds: string[],
  stepMap: Map<string, StepItem>,
  startAt: string
): StepTreeNodeData[] {
  const treeList: StepTreeNodeData[] = [];

  /* istanbul ignore if */
  if (!startAt) {
    // eslint-disable-next-line no-console
    console.error(`no start node specified in step of ${stepIds.join(",")}`);
  }
  const startNode = stepMap.get(startAt || stepIds[0]);

  const stageList = getStageList(startNode, stepMap);

  stageList?.forEach((curStepData) => {
    if (curStepData) {
      treeList.push({
        key: curStepData.id,
        id: curStepData.id,
        name: curStepData.name,
        iconTooltip: curStepData.type,
        icon: getIcon(curStepData.type),
        data: curStepData,
        ...(!isEmpty(curStepData.children)
          ? {
              children: getChildren(
                curStepData.children,
                stepMap,
                curStepData.config?.startAt
              ),
            }
          : {}),
      });
    }
  });

  return treeList;
}

function getStageList(
  rootStep: StepItem,
  stepMap: Map<string, StepItem>
): StepItem[] {
  const nodeList = [rootStep];

  let node = rootStep;

  while (stepMap.get(node.next)) {
    const data = stepMap.get(node.next);
    nodeList.push(data);

    node = stepMap.get(node.next);
  }

  return nodeList;
}

export function getStepTreeData(
  rootId: string,
  stepList: StepItem[]
): StepTreeNodeData[] {
  const startNode = stepList.find((item) => item.id === rootId);
  if (!startNode) return [];

  const stepMap = new Map<string, StepItem>();
  stepList.forEach((item) => {
    /* istanbul ignore if */
    if (!item.next && !item.pre && !item.parent) {
      // eslint-disable-next-line no-console
      console.warn(`${item.id} is isolated node`);
    }
    stepMap.set(item.id, item);
  });

  const stageList = getStageList(startNode, stepMap);

  const treeList: StepTreeNodeData[] = [];

  stageList.forEach((item) => {
    const treeData = {
      key: item.id,
      name: item.name,
      id: item.id,
      data: item,
      icon: getIcon(item.type),
      iconTooltip: item.type,
      ...(!isEmpty(item.children)
        ? {
            children: getChildren(item.children, stepMap, item.config?.startAt),
          }
        : {}),
    };

    treeList.push(treeData);
  });

  return treeList;
}

getRuntime().registerCustomProcessor(
  "flowBuilder.getStepTreeData",
  getStepTreeData
);
