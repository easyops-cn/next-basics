// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useCallback, useMemo } from "react";
import {
  useBuilderData,
  useBuilderDataManager,
  useBuilderNode,
  useHoverNodeUid,
  type BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { sortBy } from "lodash";
import type { WorkbenchNodeData } from "../shared/workbench/interfaces";
import { WorkbenchTreeContext } from "../shared/workbench/WorkbenchTreeContext";
import { WorkbenchTree } from "../shared/workbench/WorkbenchTree";

export interface WorkbenchBrickTreeProps {
  type?: BuilderRuntimeNode["type"];
  placeholder?: string;
}

export function WorkbenchBrickTree({
  type,
  placeholder,
}: WorkbenchBrickTreeProps): React.ReactElement {
  const { nodes, edges } = useBuilderData();
  const rootNode = useBuilderNode({ isRoot: true });
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

  const contextMenuFactory = useCallback(
    (node: WorkbenchNodeData<BuilderRuntimeNode>) => {
      return node.data
        ? (event: React.MouseEvent) => {
            event.preventDefault();
            manager.contextMenuChange({
              active: true,
              node: node.data,
              x: event.clientX,
              y: event.clientY,
            });
          }
        : null;
    },
    [manager]
  );

  const doNotExpandTemplates = true;

  const tree = useMemo(() => {
    if (type === "redirect") {
      return [];
    }

    function getChildren(node: BuilderRuntimeNode): WorkbenchNodeData[] {
      const groups = new Map<string, WorkbenchNodeData>();
      const relatedEdges = sortBy(
        edges.filter(
          (edge) =>
            edge.parent === node.$$uid &&
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
            data: {
              type: "mount-point",
              mountPoint: edge.mountPoint,
              parent: node,
            },
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
        color = "var(--palette-orange-7)";
      } else if (node.portal) {
        icon = "message";
        color = "var(--palette-purple-7)";
      } else {
        switch (node.type) {
          case "routes":
            icon = "down";
            break;
          case "bricks":
            icon = "branches";
            color = "var(--palette-blue-7)";
            break;
          case "redirect":
            icon = "double-right";
            color = "var(--palette-cyan-7)";
            break;
          case "template":
            icon = "gold";
            color = "var(--palette-red-7)";
            break;
          case "brick":
            icon = "build";
            color = "var(--palette-green-7)";
            break;
        }
      }
      const children = getChildren(node);
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
        children:
          type === "bricks"
            ? children
            : type === "routes"
            ? children.find((group) => group.key === "routes")?.children
            : null,
      };
    }

    return getChildren(rootNode).find(
      (group) => group.key === (type === "routes" ? type : "bricks")
    )?.children;
  }, [doNotExpandTemplates, edges, nodes, rootNode, type]);

  return (
    <WorkbenchTreeContext.Provider
      value={{
        hoverKey: hoverNodeUid,
        mouseEnterFactory,
        mouseLeaveFactory,
        contextMenuFactory,
      }}
    >
      <WorkbenchTree nodes={tree} placeholder={placeholder} />
    </WorkbenchTreeContext.Provider>
  );
}
