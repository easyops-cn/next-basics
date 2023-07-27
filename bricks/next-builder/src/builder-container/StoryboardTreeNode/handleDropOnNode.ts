/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import {
  BuilderGroupedChildNode,
  BuilderRuntimeNode,
  getSortedIdsAfterDropped,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { DraggingNodeItem } from "../interfaces";

export interface HandleDropOnNodeParams {
  draggingItem: DraggingNodeItem;
  droppingMountPoint: string;
  droppingParentNode: BuilderRuntimeNode;
  droppingSiblingGroups: BuilderGroupedChildNode[];
  droppingIndex: number;
  manager: BuilderDataManager;
}

export function handleDropOnNode({
  draggingItem,
  droppingMountPoint,
  droppingParentNode,
  droppingSiblingGroups,
  droppingIndex,
  manager,
}: HandleDropOnNodeParams): void {
  const {
    nodeUid: draggingNodeUid,
    nodeId: draggingNodeId,
    nodeInstanceId: draggingNodeInstanceId,
  } = draggingItem;
  let draggingIndex = -1;
  let draggingMountPoint: string;
  for (const group of droppingSiblingGroups) {
    draggingIndex = group.childNodes.findIndex(
      (n) => n.$$uid === draggingNodeUid
    );
    if (draggingIndex > -1) {
      draggingMountPoint = group.mountPoint;
      break;
    }
  }

  if (draggingMountPoint === droppingMountPoint) {
    if (droppingIndex !== draggingIndex) {
      manager.nodeReorder({
        ...getSortedIdsAfterDropped({
          draggingNodeUid,
          draggingNodeId,
          draggingIndex,
          droppingMountPoint,
          droppingSiblingGroups,
          droppingIndex,
        }),
        parentUid: droppingParentNode.$$uid,
      });
    }
  } else {
    manager.nodeMove({
      ...getSortedIdsAfterDropped({
        draggingNodeUid,
        draggingNodeId,
        droppingIndex,
        droppingMountPoint,
        droppingSiblingGroups,
      }),
      nodeUid: draggingNodeUid,
      parentUid: droppingParentNode.$$uid,
      nodeInstanceId: draggingNodeInstanceId,
      nodeData: {
        parent: droppingParentNode.instanceId,
        mountPoint: droppingMountPoint,
      },
    });
  }
}
