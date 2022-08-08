import { BuilderRouteOrBrickNode } from "@next-core/brick-types";
import {
  BuilderCanvasData,
  BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";

export default function getGraphTreeByBuilderData({
  rootId,
  nodes,
  edges,
}: BuilderCanvasData): BuilderRouteOrBrickNode {
  const normalizeBuilderData = (
    node: BuilderRuntimeNode
  ): BuilderRouteOrBrickNode => {
    return Object.fromEntries(
      Object.entries(node).filter((item) => {
        if (
          item[0].startsWith("$") ||
          item[1] === undefined ||
          item[1] === null ||
          item[1] === ""
        )
          return false;
        return item;
      })
    ) as BuilderRouteOrBrickNode;
  };
  const root = nodes.find((item) => item.$$uid === rootId);
  if (!root) return;
  const rootNode = normalizeBuilderData(root);

  const walkEdges = (
    node: BuilderRuntimeNode,
    rootId?: number
  ): BuilderRouteOrBrickNode[] => {
    const parentUid = node?.$$uid ?? rootId;
    const childList = edges
      .filter((item) => item.parent === parentUid)
      .sort((a, b) => a.sort - b.sort)
      .map((item) => item.child);
    const childNode = childList
      .map((uid) => {
        const node = nodes.find((item) => item.$$uid === uid);
        if (!node) return null;
        const mountPoint = edges.find(
          (item) => item.child === node.$$uid
        )?.mountPoint;
        node.children = walkEdges({
          ...node,
        });
        return {
          ...normalizeBuilderData(node),
          mountPoint,
          alias:
            node.alias ||
            (node.brick ? (node.brick as string).split(".").pop() : ""),
        };
      })
      .filter(Boolean);
    return childNode;
  };

  rootNode.children = walkEdges(null, rootId);
  return rootNode;
}
