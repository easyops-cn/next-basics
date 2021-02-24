/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import { BlockOutlined, BranchesOutlined } from "@ant-design/icons";
import {
  useBuilderGroupedChildNodes,
  useBuilderNode,
} from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";

import styles from "./StoryboardTreeView.module.css";

export function StoryboardTreeView(): React.ReactElement {
  const node = useBuilderNode({ isRoot: true });
  const groups = useBuilderGroupedChildNodes({ isRoot: true });
  const mountPoint = "bricks";
  const childNodes = React.useMemo(
    () =>
      groups.find((group) => group.mountPoint === mountPoint)?.childNodes ?? [],
    [groups]
  );

  return (
    node && (
      <ToolboxPane title="Tree View">
        <div className={styles.treeView}>
          <div className={styles.treeWrapper}>
            <div className={styles.treeName}>
              {node.type === "custom-template" ? (
                <>
                  <BlockOutlined />
                  <span>{node.templateId}</span>
                </>
              ) : (
                <>
                  <BranchesOutlined />
                  <span>{node.alias}</span>
                </>
              )}
            </div>
            <StoryboardTreeNodeList
              level={1}
              mountPoint={mountPoint}
              childNodes={childNodes}
            />
          </div>
        </div>
      </ToolboxPane>
    )
  );
}
