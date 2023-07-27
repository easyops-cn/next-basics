import {
  BuilderRuntimeNode,
  isRouteNode,
  useBuilderData,
} from "@next-core/editor-bricks-helper";
import { useCallback } from "react";
import { BuilderClipboard, BuilderClipboardType } from "../interfaces";

export type CanPaste = (
  clipboard: BuilderClipboard,
  node: BuilderRuntimeNode
) => boolean;

/**
 * Returns whether the current clipboard node can be pasted
 * inside specific node.
 *
 * This is useful for checking available paste zone and preventing
 * pasting a node into its self or descendants, or pasting a wrong
 * type of node.
 */
export function useCanPaste(): CanPaste {
  const { nodes, edges } = useBuilderData();
  return useCallback(
    (clipboard: BuilderClipboard, targetNode: BuilderRuntimeNode) => {
      if (!clipboard || !targetNode) {
        return false;
      }
      let sourceNode: BuilderRuntimeNode;
      if (clipboard.type === BuilderClipboardType.CUT) {
        sourceNode = nodes.find(
          (n) => n.instanceId === clipboard.sourceInstanceId
        );
      } else {
        sourceNode = nodes.find((n) => n.id === clipboard.sourceId);
      }
      if (
        (sourceNode || clipboard.nodeType) &&
        (isRouteNode(sourceNode || ({ type: clipboard.nodeType } as any))
          ? targetNode.type !== "routes"
          : targetNode.type === "routes" || targetNode.type === "redirect")
      ) {
        return false;
      }
      if (!sourceNode) {
        // The source node is identified by url params,
        // so it maybe not found if the params are manually specified.
        // However, if the source node is from another route or template,
        // it will be not found either.
        return true;
      }
      const traverse = (parentId: number): boolean => {
        if (parentId === targetNode.$$uid) {
          return false;
        }
        return !edges.some((edge) => {
          if (edge.parent === parentId) {
            return !traverse(edge.child);
          }
          return false;
        });
      };
      return traverse(sourceNode.$$uid);
    },
    [edges, nodes]
  );
}
