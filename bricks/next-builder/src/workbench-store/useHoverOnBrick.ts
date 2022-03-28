import { useEffect } from "react";
import {
  useHoverNodeUid,
  type BuilderDataManager,
} from "@next-core/editor-bricks-helper";
import type { PreviewMessageBuilderHoverOnBrick } from "@next-types/preview";

export function useHoverOnBrick(manager: BuilderDataManager): void {
  const hoverNodeUid = useHoverNodeUid();
  useEffect(() => {
    let iid: string = undefined;
    if (hoverNodeUid) {
      const hoverNode = manager
        .getData()
        .nodes.find((node) => node.$$uid === hoverNodeUid);
      if (hoverNode && hoverNode.type === "brick") {
        iid = hoverNode.instanceId;
      }
    }
    window.postMessage({
      sender: "builder",
      type: "hover-on-brick",
      iid,
    } as PreviewMessageBuilderHoverOnBrick);
  }, [hoverNodeUid, manager]);
}
