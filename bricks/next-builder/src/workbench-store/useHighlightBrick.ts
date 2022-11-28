import { useEffect } from "react";
import {
  useActiveNodeUid,
  useBuilderContextMenuStatus,
  useHighlightNodes,
  useHoverNodeUid,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import type {
  PreviewMessageBuilderHoverOnBrick,
  PreviewMessageBuilderSelectBrick,
  PreviewMessageBuilderHoverOnMain,
  PreviewMessageBuilderHoverOnContext,
} from "@next-types/preview";

export function useHighlightBrick(
  type: "active" | "hover",
  manager: BuilderDataManager
): void {
  const hoverNodeUid = useHoverNodeUid();
  const activeNodeUid = useActiveNodeUid();
  const highlightNodes = useHighlightNodes();
  const { active, node: activeContextMenuNode } = useBuilderContextMenuStatus();
  const highlightNodeUid =
    type === "active"
      ? activeNodeUid
      : active
      ? activeContextMenuNode.$$uid
      : hoverNodeUid;

  useEffect(() => {
    sendHighlightBrick(type, highlightNodeUid, manager);
  }, [highlightNodeUid, manager, type]);

  useEffect(() => {
    sendHighlightBricks(highlightNodes, manager);
  }, [highlightNodes, manager]);
}

export function sendHighlightBrick(
  type: "active" | "hover",
  highlightNodeUid: number,
  manager: BuilderDataManager
): void {
  let iid: string;
  let alias: string;
  if (highlightNodeUid) {
    const highlightNode = manager
      .getData()
      .nodes.find((node) => node.$$uid === highlightNodeUid);
    if (highlightNode) {
      if (
        highlightNode.type === "brick" ||
        highlightNode.type === "custom-template"
      ) {
        iid = highlightNode.instanceId;
        alias = highlightNode.displayName || highlightNode.alias;
      } else if (highlightNode.type === "bricks") {
        // root
        window.postMessage({
          sender: "builder",
          type: "hover-on-main",
        } as PreviewMessageBuilderHoverOnMain);
        return;
      }
    }
  }
  window.postMessage({
    sender: "builder",
    type: type === "active" ? "select-brick" : "hover-on-brick",
    iid,
    alias,
  } as PreviewMessageBuilderHoverOnBrick | PreviewMessageBuilderSelectBrick);
}

export function sendHighlightBricks(
  highlightNodes: Set<number>,
  manager: BuilderDataManager
): void {
  const nodes = highlightNodes
    ? manager
        .getData()
        .nodes.filter((node) => [...highlightNodes].includes(node.$$uid))
    : [];
  window.postMessage({
    sender: "builder",
    type: "hover-on-context",
    highlightNodes: nodes.map((node) => ({
      iid: node.instanceId,
      alias: node.displayName || node.alias,
    })),
  } as PreviewMessageBuilderHoverOnContext);
}
