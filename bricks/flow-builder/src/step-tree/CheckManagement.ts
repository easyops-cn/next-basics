import { StepCheckMap } from "./interfaces";
import { StepItem, StepTreeNodeData } from "../interfaces";
import { isEmpty } from "lodash";

export function getUniqueKey(node: StepItem): string {
  return `${node.parent || null}-${
    (node.pre && node.pre?.length && node.pre[0]) || null
  }-${node.id}-${node.next || null}`;
}

export function initStepMap(steps: StepItem[]): Map<string, StepItem> {
  const map = new Map();

  steps?.forEach((step) => {
    const id = getUniqueKey(step);

    map.set(id, { ...step, checked: true });
  });

  return map;
}

export function getItemCheck(map: StepCheckMap, node: StepItem): boolean {
  const id = getUniqueKey(node);
  return map.get(id)?.checked;
}

function processChildrenCheck(
  map: StepCheckMap,
  children: StepTreeNodeData[],
  checked: boolean
): void {
  children?.forEach((node) => {
    const uniqueId = getUniqueKey(node.data);

    map.set(uniqueId, { ...node.data, checked });

    const c = node.children;
    if (!isEmpty(c)) {
      processChildrenCheck(map, c, checked);
    }
  });
}

export function processCheck(
  node: StepTreeNodeData,
  checked: boolean
): StepCheckMap {
  const map = new Map();
  const uniqueId = getUniqueKey(node.data);

  map.set(uniqueId, { ...node.data, checked });

  const children = node.children;
  if (!isEmpty(children)) {
    processChildrenCheck(map, children, checked);
  }

  return map;
}

export function getCheckStepList(map: StepCheckMap): StepItem[] {
  return Array.from(map.values());
}
