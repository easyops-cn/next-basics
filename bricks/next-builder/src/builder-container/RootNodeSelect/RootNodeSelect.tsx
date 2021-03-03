import { BlockOutlined, BranchesOutlined } from "@ant-design/icons";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import React from "react";

import styles from "./RootNodeSelect.module.css";

export function RootNodeSelect(): React.ReactElement {
  const rootNode = useBuilderNode({ isRoot: true });
  if (!rootNode) {
    return null;
  }
  if (rootNode.type === "custom-template") {
    return (
      <div className={styles.rootNodeBox}>
        <BlockOutlined />
        <span>{rootNode.templateId}</span>
      </div>
    );
  }
  // Todo(lynette): click to switch between routes.
  return (
    <div className={styles.rootNodeBox}>
      <BranchesOutlined />
      <span>{rootNode.alias}</span>
    </div>
  );
}
