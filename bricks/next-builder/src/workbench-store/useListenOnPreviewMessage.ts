import { useEffect } from "react";
import type { PreviewerMessageToBuilder } from "@next-types/preview";
import type {
  BuilderDataManager,
  BuilderRuntimeNode,
} from "@next-core/editor-bricks-helper";
import { sendHighlightBrick } from "./useHighlightBrick";

export function useListenOnPreviewMessage(manager: BuilderDataManager): void {
  useEffect(() => {
    const listener = ({
      data,
      origin,
    }: MessageEvent<PreviewerMessageToBuilder>): void => {
      if (
        origin !== location.origin ||
        !data ||
        data.sender !== "preview-container"
      ) {
        return;
      }
      if (data.type === "resize") {
        // Re-send highlight message to trigger resizing brick outline.
        sendHighlightBrick("active", manager.getActiveNodeUid(), manager);
        sendHighlightBrick("hover", manager.getHoverNodeUid(), manager);
      }
      if (data.forwardedFor !== "previewer") {
        return;
      }
      switch (data.type) {
        case "hover-on-brick":
          manager.setHoverNodeUid(
            findPreviewNode(data.iidList, manager)?.$$uid
          );
          break;
        case "hover-on-main":
          manager.setHoverNodeUid(manager.getData().rootId);
          break;
        case "select-brick": {
          const node = findPreviewNode(data.iidList, manager);
          if (node) {
            manager.nodeClick(node);
          }
          break;
        }
        case "context-menu-on-brick": {
          const node = findPreviewNode(data.iidList, manager);
          if (node) {
            manager.contextMenuChange({
              active: true,
              node,
              x: data.position.x,
              y: data.position.y,
            });
          }
          break;
        }
      }
    };
    window.addEventListener("message", listener);
    return () => {
      window.removeEventListener("message", listener);
    };
  }, [manager]);
}

function findPreviewNode(
  iidList: string[],
  manager: BuilderDataManager
): BuilderRuntimeNode {
  // Traverse possible bricks in current storyboard from bottom to top,
  // Find the first brick which is not a template internal node.
  for (const iid of iidList) {
    const node = manager
      .getData()
      .nodes.find((node) => node.instanceId === iid);
    if (node && !node.$$isTemplateInternalNode) {
      return node;
    }
  }
}
