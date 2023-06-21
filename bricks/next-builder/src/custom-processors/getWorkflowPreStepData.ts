import { getRuntime } from "@next-core/brick-kit";
import { WorkFlowNode, WorkflowDataItem } from "../interface";
import { traverseWorkflowNode } from "../utils/traverseNodeFromStepId";

export function getWorkflowPreStepData(
  stepList: WorkFlowNode[],
  id: string,
  cb: (data: WorkFlowNode, arr: WorkflowDataItem[], startId?: string) => void
): WorkflowDataItem[] {
  const stepMap = new Map<string, WorkFlowNode>();
  stepList?.forEach((item) => {
    stepMap.set(item.id, item);
  });

  const result = [] as WorkflowDataItem[];

  traverseWorkflowNode(id, (stepData) => cb(stepData, result, id), { stepMap });

  return result;
}

getRuntime().registerCustomProcessor(
  "nextBuilder.getWorkflowPreStepData",
  getWorkflowPreStepData
);
