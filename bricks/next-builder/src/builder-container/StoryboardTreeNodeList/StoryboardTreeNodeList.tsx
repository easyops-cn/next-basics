/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { BuilderRuntimeNode } from "@next-core/editor-bricks-helper";
import { StoryboardTreeNode } from "../StoryboardTreeNode/StoryboardTreeNode";

import styles from "./StoryboardTreeNodeList.module.css";

export interface StoryboardTreeNodeListProps {
  level: number;
  mountPoint: string;
  childNodes: BuilderRuntimeNode[];
}

export function StoryboardTreeNodeList({
  level,
  mountPoint,
  childNodes,
}: StoryboardTreeNodeListProps): React.ReactElement {
  return (
    <ul className={styles.treeNodeList}>
      {childNodes.map((child) => (
        <StoryboardTreeNode
          key={child.$$uid}
          level={level}
          mountPoint={mountPoint}
          nodeUid={child.$$uid}
        />
      ))}
    </ul>
  );
}
