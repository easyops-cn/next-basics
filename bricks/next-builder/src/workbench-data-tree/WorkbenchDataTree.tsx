import React, { useCallback } from "react";
import {
  useBuilderData,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { WorkbenchNodeData } from "../shared/workbench/interfaces";
import {
  dropEmitProps,
  WorkbenchTree,
} from "../shared/workbench/WorkbenchTree";
import {
  ContextOfWorkbenchTree,
  WorkbenchTreeContext,
} from "../shared/workbench/WorkbenchTreeContext";
import { ContextConf } from "@next-core/brick-types";
import { scanContextsInAny } from "../builder-container/DataView/scanContextsInStoryboard";
import { deepMatch } from "../builder-container/utils/deepMatch";
import { pick } from "lodash";

export interface WorkbenchDataTreeProps extends ContextOfWorkbenchTree {
  trees: WorkbenchNodeData[];
  placeholder?: string;
  searchPlaceholder?: string;
  noSearch?: boolean;
  dropEmit?: (detail: dropEmitProps) => void;
  matchNodeDataFields?: string | string[];
}

export function WorkbenchDataTree({
  trees,
  placeholder,
  searchPlaceholder,
  dropEmit,
  activeKey,
  nodeKey,
  clickFactory,
  contextMenuFactory,
  matchNodeDataFields,
}: WorkbenchDataTreeProps): React.ReactElement {
  const manager = useBuilderDataManager();
  const { nodes } = useBuilderData();

  const mouseEnterFactory = useCallback(
    ({ data }: WorkbenchNodeData<ContextConf>) => {
      return () => {
        const nodesToHighlight = new Set<number>();
        const keyWord = nodes[0]?.type === "custom-template" ? "STATE" : "CTX";
        nodes.forEach((node) => {
          if (
            scanContextsInAny(node.$$normalized, keyWord).includes(data.name)
          ) {
            nodesToHighlight.add(node.$$uid);
          }
        });
        manager.setHighlightNodes(nodesToHighlight);
      };
    },
    [manager, nodes]
  );

  const mouseLeaveFactory = useCallback(() => {
    return () => {
      manager.setHighlightNodes(new Set());
    };
  }, [manager]);

  return (
    <WorkbenchTreeContext.Provider
      value={{
        basePaddingLeft: 5,
        mouseEnterFactory,
        mouseLeaveFactory,
        activeKey,
        nodeKey,
        clickFactory,
        contextMenuFactory,
        showMatchedNodeOnly: true,
        matchNode: (node, lowerTrimmedQuery) =>
          deepMatch(node.name, lowerTrimmedQuery) ||
          (!!matchNodeDataFields?.length &&
            deepMatch(
              matchNodeDataFields === "*"
                ? node.data
                : pick(node.data, matchNodeDataFields),
              lowerTrimmedQuery
            )),
      }}
    >
      <WorkbenchTree
        nodes={trees}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        allowDragToRoot={true}
        allowDragToInside={false}
        dropEmit={dropEmit}
      />
    </WorkbenchTreeContext.Provider>
  );
}
