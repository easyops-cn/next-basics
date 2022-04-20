// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useCallback, useEffect, useMemo } from "react";
import {
  useBuilderContextMenuStatus,
  useBuilderData,
  useBuilderDataManager,
  useBuilderNode,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";
import { isBrickNode, isCustomTemplateNode } from "@next-core/brick-utils";
import { sortBy } from "lodash";
import type {
  WorkbenchNodeData,
  WorkbenchRuntimeNode,
} from "../shared/workbench/interfaces";
import { WorkbenchTreeContext } from "../shared/workbench/WorkbenchTreeContext";
import { WorkbenchTree } from "../shared/workbench/WorkbenchTree";
import { deepMatch } from "../builder-container/utils";

export interface WorkbenchBrickTreeProps {
  type?: WorkbenchRuntimeNode["type"];
  placeholder?: string;
  searchPlaceholder?: string;
  activeInstanceId?: string;
}

type WorkbenchBrickTreeNode =
  | WorkbenchRuntimeNode
  | {
      type: "mount-point";
      mountPoint: string;
      parent: WorkbenchRuntimeNode;
    };

function isNormalNode(
  node: WorkbenchBrickTreeNode
): node is WorkbenchRuntimeNode {
  return node.type !== "mount-point";
}

export function WorkbenchBrickTree({
  type,
  placeholder,
  searchPlaceholder,
  activeInstanceId,
}: WorkbenchBrickTreeProps): React.ReactElement {
  const { nodes, edges } = useBuilderData();
  const rootNode = useBuilderNode({ isRoot: true });
  const hoverNodeUid = useHoverNodeUid();
  const { active, node: activeContextMenuNode } = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();

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
      node: WorkbenchRuntimeNode
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

      const maxSort =
        relatedEdges.length > 0
          ? relatedEdges[relatedEdges.length - 1].sort
          : 0;
      node.$nextChildSort = typeof maxSort === "number" ? maxSort + 1 : 1;

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
            labelColor: "var(--palette-gray-6)",
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
      node: WorkbenchRuntimeNode
    ): WorkbenchNodeData<WorkbenchBrickTreeNode> {
      let icon = "question";
      let color: string;
      if (node.$isRoot) {
        switch (node.type) {
          case "custom-template":
            icon = "block";
            color = "var(--palette-purple-7)";
            break;
          case "snippet":
            icon = "snippets";
            color = "var(--palette-teal-7)";
            break;
          default:
            icon = "branches";
            color = "var(--palette-blue-6)";
        }
      } else if (node.bg || node.type === "provider") {
        icon = "database";
        color = "var(--palette-orange-6)";
      } else if (node.portal) {
        icon = "message";
        color = "var(--palette-pink-6)";
      } else {
        switch (node.type) {
          case "routes":
            icon = "down";
            break;
          case "bricks":
            icon = "branches";
            color = "var(--palette-blue-6)";
            break;
          case "redirect":
            icon = "double-right";
            color = "var(--palette-cyan-6)";
            break;
          case "template":
            icon = "gold";
            color = "var(--palette-red-6)";
            break;
          case "brick":
            icon = "build";
            color = "var(--palette-green-6)";
            break;
        }
      }
      const children = getChildren(node);
      const name =
        node.type === "custom-template"
          ? node.templateId
          : node.type === "snippet"
          ? node.snippetId
          : node.alias;
      return {
        key: node.$$uid,
        name,
        icon: {
          lib: "antd",
          theme: "outlined",
          icon,
          color,
        },
        data: node,
        children:
          node.$isRoot || type === "routes"
            ? children.find(
                (group) => group.name === (type === "routes" ? type : "bricks")
              )?.children
            : ["bricks", "custom-template", "snippet"].includes(type)
            ? children
            : null,
      };
    }

    rootNode.$isRoot = true;
    return [getEntityNode(rootNode)];
  }, [doNotExpandTemplates, edges, nodes, rootNode, type]);

  const activeKey = useMemo(() => {
    return activeInstanceId
      ? nodes.find((node) => node.instanceId === activeInstanceId)?.$$uid
      : null;
  }, [activeInstanceId, nodes]);

  useEffect(
    () => {
      manager.setActiveNodeUid(activeKey);
    },
    // One-time effect only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <WorkbenchTreeContext.Provider
      value={{
        hoverKey: active ? activeContextMenuNode.$$uid : hoverNodeUid,
        activeKey,
        basePaddingLeft: 0,
        clickFactory,
        mouseEnterFactory,
        mouseLeaveFactory,
        contextMenuFactory,
        matchNode: matchBrickNode,
      }}
    >
      <WorkbenchTree
        nodes={tree}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
      />
    </WorkbenchTreeContext.Provider>
  );
}

function matchBrickNode(
  node: WorkbenchNodeData<WorkbenchBrickTreeNode>,
  lowerTrimmedQuery?: string
): boolean {
  return (
    node.data.type !== "mount-point" &&
    deepMatch(
      isCustomTemplateNode(node.data)
        ? node.name
        : [
            node.name,
            isBrickNode(node.data) ? node.data.$$normalized : node.data.path,
          ],
      lowerTrimmedQuery
    )
  );
}
