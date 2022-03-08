// istanbul ignore file
// For temporary usage only, will change soon.
import React, { useMemo } from "react";
import {
  BuilderRuntimeEdge,
  BuilderRuntimeNode,
  useBuilderData,
} from "@next-core/editor-bricks-helper";
import { sortBy } from "lodash";
import {
  WorkbenchNodeData,
  WorkbenchNodeType,
  WorkbenchTree,
} from "../workbench-tree/WorkbenchTree";

export interface WorkbenchStoryboardTreeProps {
  placeholder?: string;
}

export function WorkbenchStoryboardTree({
  placeholder,
}: WorkbenchStoryboardTreeProps): React.ReactElement {
  const { nodes, edges, rootId } = useBuilderData();
  const tree = useMemo(
    () =>
      getChildren(rootId, nodes, edges, true).find(
        (group) => group.key === "bricks"
      )?.children,
    [edges, nodes, rootId]
  );
  return <WorkbenchTree nodes={tree} placeholder={placeholder} />;
}

function getChildren(
  nodeUid: number,
  nodes: BuilderRuntimeNode[],
  edges: BuilderRuntimeEdge[],
  doNotExpandTemplates?: boolean
): WorkbenchNodeData[] {
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
    group.children.push(
      getEntityNode(childNode, nodes, edges, doNotExpandTemplates)
    );
  }

  return Array.from(groups.values());
}

function getEntityNode(
  node: BuilderRuntimeNode,
  nodes: BuilderRuntimeNode[],
  edges: BuilderRuntimeEdge[],
  doNotExpandTemplates?: boolean
): WorkbenchNodeData {
  return {
    key: node.$$uid,
    name: node.alias,
    type: node.bg
      ? "provider"
      : node.portal
      ? "portal"
      : (node.type as WorkbenchNodeType),
    // link: `#brick,${node.instanceId}`,
    children: getChildren(node.$$uid, nodes, edges, doNotExpandTemplates),
  };
}
