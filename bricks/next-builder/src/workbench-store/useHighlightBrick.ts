import { useEffect } from "react";
import {
  useActiveNodeUid,
  useBuilderContextMenuStatus,
  useHoverNodeUid,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import type {
  PreviewMessageBuilderHoverOnBrick,
  PreviewMessageBuilderSelectBrick,
  PreviewMessageBuilderHoverOnMain,
} from "@next-types/preview";

export function useHighlightBrick(
  type: "active" | "hover",
  manager: BuilderDataManager
): void {
  const hoverNodeUid = useHoverNodeUid();
  const activeNodeUid = useActiveNodeUid();
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
    if (
      highlightNode &&
      (highlightNode.type === "brick" ||
        highlightNode.type === "custom-template")
    ) {
      iid = highlightNode.instanceId;
      alias = highlightNode.alias;
    } else if (highlightNode.type === "bricks") {
      // root
      window.postMessage({
        sender: "builder",
        type: "hover-on-main",
      } as PreviewMessageBuilderHoverOnMain);
      return;
    }
  }
  window.postMessage({
    sender: "builder",
    type: type === "active" ? "select-brick" : "hover-on-brick",
    iid,
    alias,
  } as PreviewMessageBuilderHoverOnBrick | PreviewMessageBuilderSelectBrick);
}
