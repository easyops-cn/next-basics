import React, { useCallback, useEffect, useState } from "react";
import { omit, pick } from "lodash";
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
import type {
  PreviewMessageFromPreviewer,
  PreviewMessagePreviewerRealTimeDataInspectChange,
  RealTimeDataAnnotation,
} from "@next-types/preview";
import { NodeNameSuffix } from "./NodeNameSuffix";
import { RealTimeDataContext } from "./RealTimeDataContext";

export interface WorkbenchDataTreeProps extends ContextOfWorkbenchTree {
  trees: WorkbenchNodeData[];
  placeholder?: string;
  searchPlaceholder?: string;
  noSearch?: boolean;
  dropEmit?: (detail: dropEmitProps) => void;
  matchNodeDataFields?: string | string[];
  onNodeNameSuffixClick?: (node: WorkbenchNodeData) => void;
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
  onNodeNameSuffixClick,
}: WorkbenchDataTreeProps): React.ReactElement {
  const manager = useBuilderDataManager();
  const { nodes } = useBuilderData();

  const mouseEnterFactory = useCallback(
    ({ data }: WorkbenchNodeData<ContextConf>) => {
      return () => {
        if (!data) return;
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

  const [realTimeDataValues, setRealTimeDataValues] = useState<
    Record<string, RealTimeDataAnnotation>
  >({});

  useEffect(() => {
    const listener = ({
      data,
    }: MessageEvent<PreviewMessageFromPreviewer>): void => {
      if (isPreviewMessagePreviewerRealTimeDataInspectChange(data)) {
        if (data.changeType === "initialize") {
          setRealTimeDataValues(data.detail.data);
        } else if (data.changeType === "update") {
          setRealTimeDataValues((prev) => ({
            ...prev,
            [data.detail.name]: data.detail.annotation,
          }));
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, []);

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
        collapsible: true,
        showMatchedNodeOnly: true,
        matchNode: (node, lowerTrimmedQuery) =>
          deepMatch(node.name, lowerTrimmedQuery) ||
          (!!matchNodeDataFields?.length &&
            deepMatch(
              Object.values(
                omit(
                  (matchNodeDataFields === "*"
                    ? node.data
                    : pick(node.data, matchNodeDataFields)) as object,
                  ["$key"]
                )
              ),
              lowerTrimmedQuery
            )),
        NodeNameSuffix,
      }}
    >
      <RealTimeDataContext.Provider
        value={{ realTimeDataValues, onClick: onNodeNameSuffixClick }}
      >
        <WorkbenchTree
          nodes={trees}
          placeholder={placeholder}
          searchPlaceholder={searchPlaceholder}
          allowDrag={true}
          allowDragToRoot={true}
          allowDragToInside={false}
          dropEmit={dropEmit}
        />
      </RealTimeDataContext.Provider>
    </WorkbenchTreeContext.Provider>
  );
}

function isPreviewMessagePreviewerRealTimeDataInspectChange(
  data: PreviewMessageFromPreviewer
): data is PreviewMessagePreviewerRealTimeDataInspectChange {
  return (
    data.sender === "previewer" && data.type === "real-time-data-inspect-change"
  );
}
