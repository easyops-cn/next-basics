import { sortBy } from "lodash";
import {
  BuilderGroupedChildNode,
  EventDetailOfNodeReorder,
} from "@next-core/editor-bricks-helper";

export interface ReorderMountPointsParams {
  draggingMountPoint: string;
  droppingMountPoint: string;
  siblingGroups: BuilderGroupedChildNode[];
}

export function reorderMountPoints({
  draggingMountPoint,
  droppingMountPoint,
  siblingGroups,
}: ReorderMountPointsParams): Pick<
  EventDetailOfNodeReorder,
  "nodeUids" | "nodeIds"
> {
  const mountPointList = siblingGroups.map((group) => group.mountPoint);
  const draggingIndex = mountPointList.indexOf(draggingMountPoint);
  const droppingIndex = mountPointList.indexOf(droppingMountPoint);
  mountPointList.splice(draggingIndex, 1);
  mountPointList.splice(droppingIndex, 0, draggingMountPoint);
  const nodeUids: number[] = [];
  const nodeIds: string[] = [];
  sortBy(siblingGroups, (group) => mountPointList.indexOf(group.mountPoint))
    .flatMap((group) => group.childNodes)
    .forEach((node) => {
      nodeUids.push(node.$$uid);
      nodeIds.push(node.id);
    });
  return {
    nodeUids,
    nodeIds,
  };
}
