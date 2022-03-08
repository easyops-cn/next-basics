// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useCallback, useMemo } from "react";
import {
  BuilderRuntimeNode,
  useBuilderData,
  useBuilderDataManager,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";
import { sortBy } from "lodash";
import {
  WorkbenchNodeData,
  WorkbenchNodeType,
  WorkbenchTree,
} from "../workbench-tree/WorkbenchTree";
import { WorkbenchTreeContext } from "../workbench-tree/WorkbenchTreeContext";

export interface WorkbenchStoryboardTreeProps {
  placeholder?: string;
}

export function WorkbenchStoryboardTree({
  placeholder,
}: WorkbenchStoryboardTreeProps): React.ReactElement {
  const { nodes, edges, rootId } = useBuilderData();
  const hoverNodeUid = useHoverNodeUid();
  const manager = useBuilderDataManager();

  const mouseEnterFactory = useCallback(
    (nodeUid: number) => {
      return () => {
        const prevUid = manager.getHoverNodeUid();
        if (prevUid !== nodeUid) {
          manager.setHoverNodeUid(nodeUid);
        }
      };
    },
    [manager]
  );

  const mouseLeaveFactory = useCallback(
    (nodeUid: number) => {
      return () => {
        const prevUid = manager.getHoverNodeUid();
        if (prevUid === nodeUid) {
          manager.setHoverNodeUid(undefined);
        }
      };
    },
    [manager]
  );

  const doNotExpandTemplates = true;

  const tree = useMemo(() => {
    function getChildren(nodeUid: number): WorkbenchNodeData[] {
      const groups = new Map<string, WorkbenchNodeData>();
      const relatedEdges = sortBy(
        edges.filter(
          (edge) =>
            edge.parent === nodeUid &&
            (doNotExpandTemplates
              ? !edge.$$isTemplateInternal
              : !edge.$$isTemplateDelegated)
        ),
        [(edge) => edge.sort]
      );

      for (const edge of relatedEdges) {
        let group = groups.get(edge.mountPoint);
        if (!group) {
          group = {
            key: edge.mountPoint,
            type: "mount-point",
            name: edge.mountPoint,
            children: [],
          };
          groups.set(edge.mountPoint, group);
        }
        const childNode = nodes.find((node) => node.$$uid === edge.child);
        group.children.push(getEntityNode(childNode));
      }

      return Array.from(groups.values());
    }

    function getEntityNode(node: BuilderRuntimeNode): WorkbenchNodeData {
      return {
        key: node.$$uid,
        name: node.alias,
        type: node.bg
          ? "provider"
          : node.portal
          ? "portal"
          : (node.type as WorkbenchNodeType),
        // link: `#brick,${node.instanceId}`,
        children: getChildren(node.$$uid),
      };
    }

    return getChildren(rootId).find((group) => group.key === "bricks")
      ?.children;
  }, [doNotExpandTemplates, edges, nodes, rootId]);

  return (
    <WorkbenchTreeContext.Provider
      value={{
        hoverKey: hoverNodeUid,
        mouseEnterFactory,
        mouseLeaveFactory,
      }}
    >
      <WorkbenchTree nodes={tree} placeholder={placeholder} />
    </WorkbenchTreeContext.Provider>
  );
}
