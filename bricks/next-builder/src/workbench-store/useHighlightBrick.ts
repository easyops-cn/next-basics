import { useEffect } from "react";
import {
  useActiveNodeUid,
  useHoverNodeUid,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import type { PreviewMessageBuilderHoverOnBrick } from "@next-types/preview";

export function useHighlightBrick(
  type: "active" | "hover",
  manager: BuilderDataManager
): void {
  const hoverNodeUid = useHoverNodeUid();
  const activeNodeUid = useActiveNodeUid();
  const highlightNodeUid = type === "active" ? activeNodeUid : hoverNodeUid;

  useEffect(() => {
    let iid: string;
    if (highlightNodeUid) {
      const highlightNode = manager
        .getData()
        .nodes.find((node) => node.$$uid === highlightNodeUid);
      if (highlightNode && highlightNode.type === "brick") {
        iid = highlightNode.instanceId;
      }
    }
    window.postMessage({
      sender: "builder",
      type: type === "active" ? "select-brick" : "hover-on-brick",
      iid,
    } as PreviewMessageBuilderHoverOnBrick);
  }, [highlightNodeUid, manager, type]);
}
