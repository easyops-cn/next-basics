import { getRuntime } from "@next-core/brick-kit";
import { MenuIcon } from "@next-core/brick-types";
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
    case "choice":
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
  stepMap: Map<string, StepItem>
): StepTreeNodeData[] {
  const treeList: StepTreeNodeData[] = [];
  stepIds?.forEach((id) => {
    const curStepData = stepMap.get(id);
    if (curStepData) {
      treeList.push({
        key: curStepData.id,
        name: curStepData.id,
        icon: getIcon(curStepData.type),
        data: curStepData,
        ...(curStepData.children
          ? { children: getChildren(curStepData.children, stepMap) }
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
    stepMap.set(item.id, item);
  });

  const stageList = getStageList(startNode, stepMap);

  const treeList: StepTreeNodeData[] = [];

  stageList.forEach((item) => {
    const treeData = {
      key: item.id,
      name: item.id,
      data: item,
      icon: getIcon(item.type),
      ...(item.children
        ? { children: getChildren(item.children, stepMap) }
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
