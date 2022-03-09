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
  WorkbenchTree,
} from "../workbench-tree/WorkbenchTree";
import { WorkbenchTreeContext } from "../workbench-tree/WorkbenchTreeContext";

export interface WorkbenchBrickTreeProps {
  placeholder?: string;
}

export function WorkbenchBrickTree({
  placeholder,
}: WorkbenchBrickTreeProps): React.ReactElement {
  const { nodes, edges, rootId } = useBuilderData();
  const hoverNodeUid = useHoverNodeUid();
  const manager = useBuilderDataManager();

  const mouseEnterFactory = useCallback(
    (node: WorkbenchNodeData<BuilderRuntimeNode>) => {
      return node.data
        ? () => {
            const prevUid = manager.getHoverNodeUid();
            if (prevUid !== node.data.$$uid) {
              manager.setHoverNodeUid(node.data.$$uid);
            }
          }
        : null;
    },
    [manager]
  );

  const mouseLeaveFactory = useCallback(
    (node: WorkbenchNodeData<BuilderRuntimeNode>) => {
      return node.data
        ? () => {
            const prevUid = manager.getHoverNodeUid();
            if (prevUid === node.data.$$uid) {
              manager.setHoverNodeUid(undefined);
            }
          }
        : null;
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
            name: edge.mountPoint,
            icon: {
              lib: "antd",
              theme: "outlined",
              icon: "down",
            },
            labelColor: "var(--palette-gray-7)",
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
      let icon = "question";
      let color: string;
      if (node.bg || node.type === "provider") {
        icon = "database";
        color = "orange";
      } else if (node.portal) {
        icon = "message";
        color = "purple";
      } else {
        switch (node.type) {
          case "routes":
          case "bricks":
          case "redirect":
            icon = "branches";
            color = "blue";
            break;
          case "template":
            icon = "gold";
            color = "red";
            break;
          case "brick":
            icon = "build";
            color = "green";
            break;
        }
      }
      return {
        key: node.$$uid,
        name: node.alias,
        icon: {
          lib: "antd",
          theme: "outlined",
          icon,
          color,
        },
        data: node,
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
