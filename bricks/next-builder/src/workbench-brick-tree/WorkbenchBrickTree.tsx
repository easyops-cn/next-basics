import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  BuilderRuntimeEdge,
  BuilderRuntimeNode,
  useBuilderContextMenuStatus,
  useBuilderData,
  useBuilderDataManager,
  useBuilderNode,
  useHoverNodeUid,
} from "@next-core/editor-bricks-helper";
import {
  isBrickNode,
  isCustomTemplateNode,
  isRouteNode,
  isSnippetNode,
} from "@next-core/brick-utils";
import type { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import { sortBy } from "lodash";
import type {
  WorkbenchNodeData,
  WorkbenchRuntimeNode,
} from "../shared/workbench/interfaces";
import {
  dropOptions,
  WorkbenchTreeContext,
} from "../shared/workbench/WorkbenchTreeContext";
import { WorkbenchTree } from "../shared/workbench/WorkbenchTree";
import { deepMatch } from "../builder-container/utils";
import { WorkbenchBackendActionForInsertDetail } from "@next-types/preview";

export interface WorkbenchBrickTreeProps {
  placeholder?: string;
  searchPlaceholder?: string;
  activeInstanceId?: string;
  collapsedNodes?: string[];
  isDrag?: boolean;
  onNodeToggle?(nodeId: string, collapsed: boolean): void;
  onAddBrickDrop?(params: WorkbenchBackendActionForInsertDetail): void;
}

type WorkbenchBrickTreeNode =
  | WorkbenchRuntimeNode
  | {
      type: "mount-point";
      mountPoint: string;
      parent: WorkbenchRuntimeNode;
      mountPointType?: "routes" | "bricks";
    };

function isNormalNode(
  node: WorkbenchBrickTreeNode
): node is WorkbenchRuntimeNode {
  return node.type !== "mount-point";
}

export function WorkbenchBrickTree({
  placeholder,
  searchPlaceholder,
  activeInstanceId,
  collapsedNodes,
  isDrag,
  onNodeToggle,
  onAddBrickDrop,
}: WorkbenchBrickTreeProps): React.ReactElement {
  const { nodes, edges } = useBuilderData();
  const rootNode = useBuilderNode({ isRoot: true });
  const hoverNodeUid = useHoverNodeUid();
  const { active, node: activeContextMenuNode } = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const [tree, setTree] =
    useState<WorkbenchNodeData<WorkbenchBrickTreeNode>[]>();

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
    (
      {
        data,
      }: WorkbenchNodeData<WorkbenchBrickTreeNode> = {} as WorkbenchNodeData<WorkbenchBrickTreeNode>
    ) => {
      return data && isNormalNode(data)
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

  const getTree = useCallback(
    (
      rootNode: BuilderRuntimeNode,
      nodes: BuilderRuntimeNode[],
      edges: BuilderRuntimeEdge[]
    ): WorkbenchNodeData<WorkbenchBrickTreeNode>[] => {
      if (!rootNode) {
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
            (edge) => edge.parent === node.$$uid && !edge.$$isTemplateInternal
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

        for (const group of groups.values()) {
          group.data.mountPointType = group.children.some((child) =>
            isRouteNode(child.data as BuilderRouteOrBrickNode)
          )
            ? "routes"
            : "bricks";
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
        const getAliasName = (node: WorkbenchRuntimeNode): string => {
          const brick = node.brick as string;
          return node.alias ? node.alias : brick ? brick.split(".").pop() : "";
        };
        const name =
          node.type === "custom-template"
            ? node.templateId
            : node.type === "snippet"
            ? node.snippetId
            : getAliasName(node);
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
            node.$isRoot || rootNode.type === "routes"
              ? children.find(
                  (group) =>
                    group.name ===
                    (rootNode.type === "routes" ? rootNode.type : "bricks")
                )?.children
              : ["bricks", "custom-template", "snippet"].includes(rootNode.type)
              ? children
              : null,
          unreachable: node.$$unreachable,
        };
      }

      rootNode.$isRoot = true;
      return [getEntityNode(rootNode)];
    },
    []
  );

  const handleOnDrop = useCallback(
    (
      e: React.DragEvent<HTMLElement>,
      { curElement, overElement, parentElement, overStatus }: dropOptions
    ): void => {
      e.preventDefault();
      const getUid = (dom: HTMLElement): number => {
        const uid = dom.dataset.uid.split(":").shift();
        return Number(uid);
      };
      const overUid = getUid(overElement);
      const parentUid = getUid(parentElement);
      const nodeData =
        e.dataTransfer.getData("nodeData") &&
        JSON.parse(e.dataTransfer.getData("nodeData"));
      if (nodeData) {
        const { nodes, edges } = manager.getData();
        const overNode = nodes.find((item) => item.$$uid === overUid);
        const parentNode = nodes.find((item) => item.$$uid === parentUid);
        const mountPoint =
          overStatus === "inside"
            ? overNode.$$uid === rootNode.$$uid
              ? "bricks"
              : "content"
            : edges.find((item) => item.child === overUid).mountPoint;
        onAddBrickDrop({
          nodeData: nodeData,
          dragOverInstanceId: overNode.instanceId,
          parent: parentNode.instanceId,
          dragStatus: overStatus,
          brick: nodeData.brick,
          mountPoint,
          type: "brick",
        });
      } else if (parentElement) {
        manager.workbenchTreeNodeMove({
          dragNodeUid: getUid(curElement),
          dragOverNodeUid: overUid,
          dragParentNodeUid: parentUid,
          dragStatus: overStatus,
        });
      }
    },
    [manager, onAddBrickDrop, rootNode]
  );

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

  useEffect(() => {
    const removeListeners = [
      manager.onNodeUpdate((e) => {
        const { nodes, edges } = e.detail;
        setTree(getTree(rootNode, nodes, edges));
      }),
    ];
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
    };
  }, [getTree, manager, rootNode]);

  useEffect(() => {
    setTree(getTree(rootNode, nodes, edges));
  }, [nodes, edges, rootNode, getTree]);

  return (
    <WorkbenchTreeContext.Provider
      value={{
        hoverKey: active ? activeContextMenuNode.$$uid : hoverNodeUid,
        activeKey,
        basePaddingLeft: 0,
        collapsible: true,
        collapsedNodes,
        clickFactory,
        mouseEnterFactory,
        mouseLeaveFactory,
        contextMenuFactory,
        matchNode: matchBrickNode,
        onNodeToggle,
        getCollapsedId,
        onBrickDrop: handleOnDrop,
      }}
    >
      <WorkbenchTree
        nodes={tree}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        allowDragToInside={true}
        isDrag={isDrag}
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
        ? {
            name: node.data.name,
            proxy: node.data.proxy,
            previewSettings: node.data.previewSettings,
          }
        : isSnippetNode(node.data)
        ? node.name
        : [
            node.name,
            isBrickNode(node.data) ? node.data.$$normalized : node.data.path,
          ],
      lowerTrimmedQuery
    )
  );
}

function getCollapsedId(
  node: WorkbenchNodeData<WorkbenchBrickTreeNode>
): string {
  return node.data.type === "mount-point"
    ? `${node.data.parent.instanceId}:${node.data.mountPoint}`
    : node.data.instanceId;
}
