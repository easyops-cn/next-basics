// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useCallback, useEffect, useMemo } from "react";
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
  activeInstanceId?: string;
  onNodeClick?(node: BuilderRuntimeNode): void;
}

type WorkbenchBrickTreeNode =
  | BuilderRuntimeNode
  | {
      type: "mount-point";
      mountPoint: string;
      parent: BuilderRuntimeNode;
    };

function isNormalNode(
  node: WorkbenchBrickTreeNode
): node is BuilderRuntimeNode {
  return node.type !== "mount-point";
}

export function WorkbenchBrickTree({
  type,
  placeholder,
  activeInstanceId,
  onNodeClick,
}: WorkbenchBrickTreeProps): React.ReactElement {
  const { nodes, edges } = useBuilderData();
  const rootNode = useBuilderNode({ isRoot: true });
  const hoverNodeUid = useHoverNodeUid();
  const manager = useBuilderDataManager();

  useEffect(() => {
    const fn = manager.onNodeClick((event) => {
      onNodeClick(event.detail);
    });
    return () => {
      fn();
    };
  }, [manager, onNodeClick]);

  const clickFactory = useCallback(
    ({ data }: WorkbenchNodeData<WorkbenchBrickTreeNode>) => {
      return isNormalNode(data)
        ? (event: React.MouseEvent) => {
            // Q: It's weird that we MUST stop propagation here.
            // Or this listener will be called twice.
            // This may be a known issue of React 16 with shadow DOM,
            // which is hopefully fixed in react 17.
            // And a potential workaround for react 16:
            // https://github.com/facebook/react/issues/9242#issuecomment-534096832
            event.stopPropagation();
            manager.nodeClick(data);
          }
        : null;
    },
    [manager]
  );

  const mouseEnterFactory = useCallback(
    ({ data }: WorkbenchNodeData<WorkbenchBrickTreeNode>) => {
      return isNormalNode(data)
        ? () => {
            const prevUid = manager.getHoverNodeUid();
            if (prevUid !== data.$$uid) {
              manager.setHoverNodeUid(data.$$uid);
            }
          }
        : null;
    },
    [manager]
  );

  const mouseLeaveFactory = useCallback(
    ({ data }: WorkbenchNodeData<WorkbenchBrickTreeNode>) => {
      return isNormalNode(data)
        ? () => {
            const prevUid = manager.getHoverNodeUid();
            if (prevUid === data.$$uid) {
              manager.setHoverNodeUid(undefined);
            }
          }
        : null;
    },
    [manager]
  );

  const contextMenuFactory = useCallback(
    ({ data }: WorkbenchNodeData<WorkbenchBrickTreeNode>) => {
      return isNormalNode(data)
        ? (event: React.MouseEvent) => {
            event.preventDefault();
            manager.contextMenuChange({
              active: true,
              node: data,
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

    function getChildren(
      node: BuilderRuntimeNode
    ): WorkbenchNodeData<WorkbenchBrickTreeNode>[] {
      const groups = new Map<
        string,
        WorkbenchNodeData<WorkbenchBrickTreeNode>
      >();
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
            key: `${node.$$uid}:${edge.mountPoint}`,
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

    function getEntityNode(
      node: BuilderRuntimeNode
    ): WorkbenchNodeData<WorkbenchBrickTreeNode> {
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
            ? children.find((group) => group.name === "routes")?.children
            : null,
      };
    }

    return getChildren(rootNode).find(
      (group) => group.name === (type === "routes" ? type : "bricks")
    )?.children;
  }, [doNotExpandTemplates, edges, nodes, rootNode, type]);

  const activeKey = useMemo(() => {
    return activeInstanceId
      ? nodes.find((node) => node.instanceId === activeInstanceId)?.$$uid
      : null;
  }, [activeInstanceId, nodes]);

  return (
    <WorkbenchTreeContext.Provider
      value={{
        hoverKey: hoverNodeUid,
        activeKey,
        clickFactory,
        mouseEnterFactory,
        mouseLeaveFactory,
        contextMenuFactory,
      }}
    >
      <WorkbenchTree nodes={tree} placeholder={placeholder} />
    </WorkbenchTreeContext.Provider>
  );
}
