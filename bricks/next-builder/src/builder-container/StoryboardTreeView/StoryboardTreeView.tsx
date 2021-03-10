import React from "react";
import { useBuilderGroupedChildNodes } from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";

import styles from "./StoryboardTreeView.module.css";

export function StoryboardTreeView(): React.ReactElement {
  const groups = useBuilderGroupedChildNodes({ isRoot: true });
  const { dataType } = useBuilderUIContext();
  const showTreeNodes =
    dataType === BuilderDataType.ROUTE_OF_BRICKS ||
    dataType === BuilderDataType.CUSTOM_TEMPLATE;
  const mountPoint = "bricks";
  const childNodes = React.useMemo(
    () =>
      showTreeNodes
        ? groups.find((group) => group.mountPoint === mountPoint)?.childNodes ??
          []
        : [],
    [groups, showTreeNodes]
  );

  return (
    <ToolboxPane title="Storyboard">
      <div className={styles.treeView}>
        <div className={styles.treeWrapper}>
          {showTreeNodes && (
            <StoryboardTreeNodeList
              level={1}
              mountPoint={mountPoint}
              childNodes={childNodes}
            />
          )}
        </div>
      </div>
    </ToolboxPane>
  );
}
