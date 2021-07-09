/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { useDrag, useDrop } from "react-dnd";
import classNames from "classnames";
import {
  useBuilderGroupedChildNodes,
  useBuilderDataManager,
  BuilderGroupedChildNode,
  useCanDrop,
  useBuilderNode,
  isRouteNode,
} from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import {
  DraggingMountPointItem,
  DraggingNodeItem,
  StoryboardTreeTransferType,
} from "../interfaces";
import { treeViewPaddingUnit } from "../constants";
import { reorderMountPoints } from "./reorderMountPoints";
import { handleDropOnNode } from "../StoryboardTreeNode/handleDropOnNode";

import styles from "./StoryboardTreeMountPoint.module.css";

export interface StoryboardTreeMountPointProps {
  level: number;
  nodeUid?: number;
  mountPoint: string;
}

export function StoryboardTreeMountPoint({
  level,
  nodeUid,
  mountPoint,
}: StoryboardTreeMountPointProps): React.ReactElement {
  const manager = useBuilderDataManager();
  const parentNode = useBuilderNode({ nodeUid });
  const siblingGroups = useBuilderGroupedChildNodes({
    nodeUid,
    doNotExpandTemplates: true,
  });
  const childNodes = React.useMemo(
    () =>
      siblingGroups.find((group) => group.mountPoint === mountPoint)
        ?.childNodes ?? [],
    [siblingGroups, mountPoint]
  );
  const isRouteMountPoint = React.useMemo(
    () => childNodes[0] && isRouteNode(childNodes[0]),
    [childNodes]
  );
  const canDrop = useCanDrop();

  const [{ isDragging }, dragRef, draggingPreviewRef] = useDrag({
    item: { type: StoryboardTreeTransferType.MOUNT_POINT, nodeUid, mountPoint },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ mountPointMoveDirection }, mountPointDropRef] = useDrop({
    accept: StoryboardTreeTransferType.MOUNT_POINT,
    canDrop: (item: DraggingMountPointItem) =>
      item.nodeUid === nodeUid && item.mountPoint !== mountPoint,
    collect: (monitor) => ({
      mountPointMoveDirection:
        monitor.isOver() &&
        monitor.canDrop() &&
        getMountPointMoveDirection({
          draggingMountPoint: monitor.getItem().mountPoint,
          droppingMountPoint: mountPoint,
          siblingGroups,
        }),
    }),
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        manager.nodeReorder({
          ...reorderMountPoints({
            draggingMountPoint: item.mountPoint,
            droppingMountPoint: mountPoint,
            siblingGroups,
          }),
          parentUid: nodeUid,
        });
      }
    },
  });

  const [{ isDraggingNodeOverCurrent }, nodeDropRef] = useDrop({
    accept: StoryboardTreeTransferType.NODE,
    canDrop: (item: DraggingNodeItem) =>
      canDrop(item.nodeUid, nodeUid) &&
      (Number(isRouteMountPoint) ^
        Number(isRouteNode({ type: item.nodeType } as any))) ===
        0,
    collect: (monitor) => ({
      isDraggingNodeOverCurrent: monitor.isOver() && monitor.canDrop(),
    }),
    drop: (item, monitor) => {
      if (!monitor.didDrop()) {
        handleDropOnNode({
          draggingItem: item,
          droppingMountPoint: mountPoint,
          droppingParentNode: parentNode,
          droppingSiblingGroups: siblingGroups,
          // When moving a node under a mount point,
          // just move it to the first position of the mount point.
          droppingIndex: 0,
          manager,
        });
      }
    },
  });

  return (
    <li
      className={classNames(
        styles.mountPoint,
        {
          [styles.dragging]: isDragging,
          [styles.draggingMountPointOverCurrent]: !!mountPointMoveDirection,
          [styles.draggingNodeOverCurrent]: isDraggingNodeOverCurrent,
          [styles.routeMountPoint]: isRouteMountPoint,
        },
        mountPointMoveDirection && styles[mountPointMoveDirection]
      )}
      ref={(node) => draggingPreviewRef(mountPointDropRef(node))}
    >
      <div className={styles.slotNameWrapper}>
        <div
          className={styles.slotName}
          ref={(node) => dragRef(nodeDropRef(node))}
          style={{
            paddingLeft: level * treeViewPaddingUnit,
          }}
        >
          {mountPoint}
        </div>
        <div
          className={styles.dropNodeCursor}
          style={{
            left: (level + 1) * treeViewPaddingUnit,
          }}
        />
      </div>
      <StoryboardTreeNodeList
        level={level + 1}
        mountPoint={mountPoint}
        childNodes={childNodes}
      />
      <div className={styles.dropMountPointCursor} />
    </li>
  );
}

interface MountPointMoveDirectionParams {
  draggingMountPoint: string;
  droppingMountPoint: string;
  siblingGroups: BuilderGroupedChildNode[];
}

function getMountPointMoveDirection({
  draggingMountPoint,
  droppingMountPoint,
  siblingGroups,
}: MountPointMoveDirectionParams): "up" | "down" {
  const mountPointList = siblingGroups.map((group) => group.mountPoint);
  const sourceIndex = mountPointList.indexOf(draggingMountPoint);
  const targetIndex = mountPointList.indexOf(droppingMountPoint);
  return sourceIndex > targetIndex ? "up" : "down";
}
