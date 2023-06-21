import { WorkFlowNode, WorkflowDataItem } from "../interface";
import { isEmpty } from "lodash";

type WalkNodeCallback = (stepData: WorkFlowNode) => void;

function walkChildren(
  children: string[],
  cb: WalkNodeCallback,
  option: {
    stepMap: Map<string, WorkFlowNode>;
  }
): void {
  const { stepMap } = option;
  children?.forEach((id) => {
    const curStepData = stepMap.get(id);
    cb(curStepData);

    if (!isEmpty(curStepData?.children)) {
      walkChildren(curStepData.children, cb, option);
    }
  });
}

function walkPreNode(
  prevIds: string[],
  cb: WalkNodeCallback,
  option: {
    stepMap: Map<string, WorkFlowNode>;
  }
): void {
  const { stepMap } = option;
  prevIds?.forEach((id) => {
    const curStepData = stepMap.get(id);
    cb(curStepData);

    if (!isEmpty(curStepData?.children)) {
      walkChildren(curStepData.children, cb, option);
    }

    if (!isEmpty(curStepData?.pre)) {
      walkPreNode(curStepData.pre, cb, option);
    }
  });
}

export function traverseWorkflowNode(
  id: string,
  cb: WalkNodeCallback,
  option: {
    stepMap: Map<string, WorkFlowNode>;
  }
): void {
  const { stepMap } = option;
  const curStepData = stepMap.get(id);
  cb(curStepData);
  if (!isEmpty(curStepData?.pre)) {
    walkPreNode(curStepData.pre, cb, { stepMap });
  }

  if (curStepData?.parent) {
    const parentData = stepMap.get(curStepData.parent);
    cb(parentData);

    if (!isEmpty(parentData?.pre)) {
      walkPreNode(parentData.pre, cb, { stepMap });
    }

    if (parentData?.parent) {
      traverseWorkflowNode(parentData.parent, cb, { stepMap });
    }
  }
}
